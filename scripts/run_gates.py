"""
Checks to pass before a commit or deploy.

    python scripts/run_gates.py

1. secrets  -- no plaintext credential in a tracked file (scripts/check_secrets.py)
2. refs     -- every local src/href in the HTML/CSS/JS points at a file that exists

Exit 0 if every gate passes.
"""

import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
REF = re.compile(r"""(?:src|href)\s*=\s*["']\s*([^"'#?]+)|url\(\s*["']?([^"')#?]+)""")


def refs():
    missing = []
    for f in [*ROOT.glob("*.html"), *ROOT.glob("*.css"), *ROOT.glob("*.js")]:
        for m in REF.finditer(f.read_text(encoding="utf-8", errors="replace")):
            ref = (m.group(1) or m.group(2)).strip()
            if re.match(r"^(https?:|mailto:|tel:|data:|//|javascript:)", ref) or not ref or "${" in ref:
                continue
            if not (ROOT / ref).exists():
                missing.append(f"{f.name}: {ref}")
    for line in missing:
        print("  missing", line)
    return not missing


def main():
    ok = subprocess.run([sys.executable, str(ROOT / "scripts/check_secrets.py")]).returncode == 0
    print("secrets:", "ok" if ok else "FAIL")
    r = refs()
    print("refs:", "ok" if r else "FAIL")
    sys.exit(0 if ok and r else 1)


if __name__ == "__main__":
    main()
