"""
Fail if a number in generated text does not exist in content.md.

content.md is the single source of facts. A CV, cover letter or page built from
it may reword, but must not invent a figure ("500+ hours" cannot become "900+").

    python scripts/check_facts.py                    index.html visible text vs content.md
    python scripts/check_facts.py out.txt cv.html    check these files instead
    python scripts/check_facts.py --source other.md out.txt

Numbers are compared as normalised tokens: "1,000" and "1 000" both read 1000,
"3.5" stays 3.5. `scripts/facts_allow.txt` lists numbers known to be absent from
content.md (one per line, `number  # reason`); each is content.md drift to fix,
not a licence to invent.

Exit 0 if every number is backed, 1 otherwise.
"""

import argparse
import html
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
NUM = re.compile(r"\d+(?:[ ,.]\d{3})*(?:[.,]\d+)?")


def norm(tok: str) -> str:
    tok = tok.strip()
    if re.fullmatch(r"\d{1,3}(?:[ ,.]\d{3})+", tok):  # thousands grouping
        return re.sub(r"[ ,.]", "", tok)
    return tok.replace(",", ".")


def numbers(text: str) -> set[str]:
    return {norm(m) for m in NUM.findall(text)}


def visible_text(raw: str, suffix: str) -> str:
    if suffix in (".html", ".htm"):
        raw = re.sub(r"<(script|style)\b.*?</\1>", " ", raw, flags=re.S | re.I)
        raw = re.sub(r"<[^>]+>", " ", raw)
        raw = html.unescape(raw)
    return raw


def load_allow(path: pathlib.Path) -> set[str]:
    if not path.exists():
        return set()
    out = set()
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.split("#")[0].strip()
        if line:
            out.add(norm(line))
    return out


def check(source_text: str, outputs: dict[str, str], allow: set[str]) -> list[tuple[str, str]]:
    known = numbers(source_text) | allow
    bad = []
    for name, text in outputs.items():
        for n in sorted(numbers(text) - known, key=float):
            bad.append((name, n))
    return bad


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("files", nargs="*")
    ap.add_argument("--source", default=str(ROOT / "content.md"))
    ap.add_argument("--allow", default=str(ROOT / "scripts/facts_allow.txt"))
    a = ap.parse_args()
    files = [pathlib.Path(f) for f in a.files] or [ROOT / "index.html"]
    src = pathlib.Path(a.source).read_text(encoding="utf-8")
    outs = {f.name: visible_text(f.read_text(encoding="utf-8", errors="replace"), f.suffix.lower()) for f in files}
    bad = check(src, outs, load_allow(pathlib.Path(a.allow)))
    for name, n in bad:
        print(f"  not in content.md: {n}  ({name})")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
