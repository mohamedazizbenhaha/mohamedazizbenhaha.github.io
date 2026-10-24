"""
Build the CV PDFs from cv/cv-<lang>.html and check that ATS parsers can read them.

    python scripts/build_cv.py            build + check every cv/cv-*.html
    python scripts/build_cv.py fr         only cv/cv-fr.html
    python scripts/build_cv.py --check    check the existing PDFs, no rebuild

Output: cv/out/<stem>.pdf and cv/out/<stem>-p<n>.png (previews).
Checks, per PDF, with five independent text extractors (pypdf, pdfminer, PyMuPDF,
xpdf and poppler pdftotext):
  words     every word of the page's visible text comes out whole (catches "De vOps")
  blocks    every bullet, title and row comes out whole, not mixed with the other column
            (the order of whole sections is printed when it differs, not failed)
  pages     no two pages return the same text
  fonts     no Type3 font (Chrome embeds variable fonts as Type3; parsers misread them)
  facts     every number exists in content.md (scripts/check_facts.py)
Needs Microsoft Edge (headless). Fonts are bundled in cv/fonts (static files, see cv/fonts.css).
Exit 0 when every check passes, 1 otherwise.
"""

import html as htmllib
import pathlib
import re
import subprocess
import sys
import time

import fitz
import pypdf
from pdfminer.high_level import extract_text as pdfminer_text

ROOT = pathlib.Path(__file__).resolve().parent.parent
CV = ROOT / "cv"
OUT = CV / "out"
EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
# two different pdftotext engines are on this machine; both are common in ATS pipelines
PDFTOTEXT = {"xpdf": r"A:\Git\mingw64\bin\pdftotext.exe", "poppler": r"A:\texlive\2025\bin\windows\pdftotext.exe"}
WORD = re.compile(r"[A-Za-zÀ-ÿœŒ][A-Za-zÀ-ÿœŒ0-9+#/.-]*[A-Za-zÀ-ÿœŒ0-9+#]")


def render(src: pathlib.Path, pdf: pathlib.Path) -> None:
    pdf.unlink(missing_ok=True)
    subprocess.run([EDGE, "--headless=new", "--disable-gpu", f"--user-data-dir={OUT / 'prof'}",
                    "--no-pdf-header-footer", "--virtual-time-budget=8000",
                    f"--print-to-pdf={pdf}", src.as_uri()], capture_output=True)
    for _ in range(60):  # msedge.exe can hand off to a running browser and return before the file exists
        if pdf.exists() and pdf.stat().st_size:
            break
        time.sleep(0.5)
    time.sleep(0.5)
    doc = fitz.open(pdf)
    for i, page in enumerate(doc, 1):
        page.get_pixmap(dpi=110).save(OUT / f"{pdf.stem}-p{i}.png")


def visible(raw: str) -> str:
    raw = re.sub(r"(?s)<(script|style|svg|head)\b.*?</\1>", " ", raw)
    raw = re.sub(r"</?(?:b|u|i|a|em|strong|span)\b[^>]*>", "", raw)  # inline tags add no space
    return htmllib.unescape(re.sub(r"<[^>]+>", " ", raw))


def flat(s: str) -> str:
    return " ".join(s.split())


def headings(raw: str) -> list[str]:
    return [flat(visible(h)) for h in re.findall(r"(?s)<h2[^>]*>(.*?)</h2>", raw)]


def blocks(raw: str) -> list[str]:
    """Each bullet, paragraph, title and list row: an ATS must get each one whole, not mixed with the other column."""
    body = re.sub(r"(?s)<(head|svg)\b.*?</\1>", " ", raw)
    # header contact and date/place lines: each item is its own block (they may sit on different lines)
    body = re.sub(r'(?s)<p class="(?:reach|meta)">(.*?)</p>', lambda m: "".join(
        f"<p>{x}</p>" for x in re.findall(r"(?s)<span[^>]*>(.*?)</span>\s*(?=<span|<br>|$)", m.group(1).strip())), body)
    found = re.findall(r"(?s)<(li|p|h[1-3])\b[^>]*>(.*?)</\1>", body)
    found += [("div", d) for d in re.findall(r"(?s)<div>((?:(?!<div|<p).)*?)</div>", body)]
    return [b for b in (flat(visible(t)) for _, t in found) if b]


def extractors(pdf: pathlib.Path) -> dict[str, list[str]]:
    """Page texts from each extractor."""
    out = {}
    out["pypdf"] = [p.extract_text() or "" for p in pypdf.PdfReader(pdf).pages]
    n = len(out["pypdf"])
    out["pdfminer"] = [pdfminer_text(str(pdf), page_numbers=[i]) for i in range(n)]
    out["pymupdf"] = [p.get_text() for p in fitz.open(pdf)]
    for name, exe in PDFTOTEXT.items():
        if pathlib.Path(exe).exists():
            out[name] = [subprocess.run([exe, "-f", str(i + 1), "-l", str(i + 1), "-enc", "UTF-8", str(pdf), "-"],
                                        capture_output=True).stdout.decode("utf-8", "replace") for i in range(n)]
    return out


def fold(s: str) -> str:
    """Typographic variants an ATS treats as equal (ligatures, curly quotes, hyphenation at line ends)."""
    s = s.replace("ﬁ", "fi").replace("ﬂ", "fl").replace("’", "'").replace("ʼ", "'")
    return re.sub(r"-\s*\n\s*", "-", s)


def check(src: pathlib.Path, pdf: pathlib.Path) -> bool:
    raw = src.read_text(encoding="utf-8")
    words = set(WORD.findall(visible(raw)))
    heads, blks = headings(raw), blocks(raw)
    ok = True
    for name, pages in extractors(pdf).items():
        text = fold("\n".join(pages))
        got = set(WORD.findall(text))
        missing = sorted(w for w in words if w not in got and w not in text)
        line = flat(text)
        broken = [b for b in blks if b not in line]
        seen = re.findall("|".join(map(re.escape, sorted(set(heads), key=len, reverse=True))), line)
        dup = len(pages) != len({p.strip() for p in pages})
        status = "ok" if not missing and not broken and not dup else "FAIL"
        ok &= status == "ok"
        print(f"  {name:9} {status}  words {len(words) - len(missing)}/{len(words)}"
              f"  blocks {len(blks) - len(broken)}/{len(blks)}"
              + (f" missing {missing[:12]}" if missing else "")
              + "".join(f"\n            split: {b[:90]}" for b in broken[:6])
              + (" | duplicate pages" if dup else "")
              + ("" if seen == heads else f"\n            section order: {' > '.join(seen)}"))
    type3 = {f[3] or f"#{f[0]}" for page in fitz.open(pdf) for f in page.get_fonts() if f[2] == "Type3"}
    print("  fonts    ", "ok" if not type3 else f"FAIL Type3 fonts (variable font?): {sorted(type3)}")
    ok &= not type3
    facts = subprocess.run([sys.executable, str(ROOT / "scripts" / "check_facts.py"), str(src)],
                           capture_output=True, text=True)
    print("  facts    ", "ok" if facts.returncode == 0 else "FAIL\n" + facts.stdout + facts.stderr)
    return ok and facts.returncode == 0


def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    only_check = "--check" in sys.argv
    srcs = [CV / f"cv-{a}.html" for a in args] or sorted(CV.glob("cv-*.html"))
    OUT.mkdir(exist_ok=True)
    ok = True
    for src in srcs:
        pdf = OUT / f"{src.stem}.pdf"
        if not only_check:
            render(src, pdf)
        print(f"{pdf.name}: {len(fitz.open(pdf))} pages")
        ok &= check(src, pdf)
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
