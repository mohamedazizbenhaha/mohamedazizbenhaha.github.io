"""
Fail if a credential is sitting in plaintext in a tracked file.

Why this exists: the Zotero API key was hard-coded in `.mcp.json`, and because
`_template/` is the canonical copy, every paper created after it inherited the
same key by construction. Nothing was wrong at any point -- the file worked, the
sync worked, the gates were green -- which is exactly the failure mode a gate is
for. Found in the 2026-09-19 audit, before this tree had any git history; a
secret committed once stays in history forever, so the gate has to exist before
`git init`, not after.

The rule it enforces: a credential lives in the environment, and the file names
it. `"ZOTERO_API_KEY": "${ZOTERO_API_KEY}"` passes. The literal does not.

    python scripts/check_secrets.py              scan this space
    python scripts/check_secrets.py --root W:/myphd/claude   scan a whole tree

Exit 0 if clean, 1 if any plaintext credential was found.
"""

import argparse
import pathlib
import re
import subprocess
import sys

if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = pathlib.Path(__file__).resolve().parent.parent

SCAN_SUFFIXES = {
    ".json",
    ".yaml",
    ".yml",
    ".toml",
    ".env",
    ".ini",
    ".cfg",
    ".py",
    ".ps1",
    ".sh",
    ".md",
    ".txt",
    ".js",
    ".mjs",
    ".ts",
    ".html",
    # firmware: Wi-Fi and broker passwords live in C headers
    ".c",
    ".h",
    ".cpp",
    ".hpp",
    ".ino",
    ".csv",
    ".conf",
}

# Directories that are never ours: dependencies, caches, derived output, and the
# literature corpus (third-party PDFs and their conversions -- a false positive
# there is noise, and nothing in it is a credential of ours).
SKIP_DIRS = {
    ".venv",
    "venv",
    ".git",
    "node_modules",
    "__pycache__",
    ".mypy_cache",
    ".ruff_cache",
    ".obsidian",
    ".trash",
    "graphify-out",
    "site-packages",
    "build-out",
    "literature",
    "feed claude",
    "feed calude",
    ".index",
}

# A name that means credential, followed by a value long enough to be one.
NAME = (
    r"[A-Za-z0-9_\-\.]*(?:API[_\-]?KEY|SECRET|TOKEN|PASSWORD|PASSWD|PRIVATE[_\-]?KEY|ACCESS[_\-]?KEY"
    r"|WIFI[_\-]?PASS|MQTT[_\-]?PASS|PSK)"
)
# `NAME = "value"`, `"NAME": "value"`, and C's `#define NAME "value"`. Wi-Fi
# passwords may be 8 characters (WPA2's minimum), so 8 is the floor.
ASSIGN = re.compile(
    rf'["\']?({NAME})["\']?\s*(?:[:=]\s*|\s+)["\']([^"\'\s,]{{8,}})["\']', re.IGNORECASE
)

# Provider keys recognisable by their prefix alone, whatever the variable is
# called (GymTracker keeps Groq keys in an array, which ASSIGN cannot see).
PREFIXED = re.compile(r"\b(gsk_|sk-ant-|sk-|ghp_|github_pat_|AKIA|AIza|xox[bp]-)[A-Za-z0-9_-]{16,}")

# Values that name a credential instead of being one.
PLACEHOLDER = re.compile(
    r"^\s*(\$\{|\$[A-Z_]|%[A-Z_]+%|<|\{\{|os\.environ|process\.env|getenv)"
    r"|^(your[_\-]|my[_\-]|xxx|changeme|replace[_\-]|redacted|dummy|example|placeholder|none|null|true|false)",
    re.IGNORECASE,
)


def mask(v: str) -> str:
    return v[:4] + "…" + v[-2:] if len(v) > 8 else "…"


def allowed(root: pathlib.Path) -> set[tuple[str, str]]:
    """Known, documented exceptions: `.secrets-allow` at the scan root, one per line,
    `<relative/path> <name> <reason>`. A line without a reason is ignored, so an
    exception cannot be added silently. Example: a setup-AP password that is an open
    firmware finding, fixed only by a separate decision."""
    f = root / ".secrets-allow"
    out = set()
    for line in f.read_text(encoding="utf-8").splitlines() if f.exists() else []:
        parts = line.split(maxsplit=2)
        if len(parts) == 3 and not line.lstrip().startswith("#"):
            out.add((parts[0], parts[1]))
    return out


def files(root: pathlib.Path):
    """Files git would commit (tracked + untracked, minus .gitignore). Ignored
    files -- phone backups, sync-key.txt -- are private on purpose, never shipped."""
    try:
        out = subprocess.run(
            ["git", "ls-files", "-co", "--exclude-standard"],
            cwd=root, capture_output=True, text=True, check=True,
        ).stdout
        return [root / f for f in out.splitlines()]
    except (OSError, subprocess.CalledProcessError):
        return list(root.rglob("*"))


def scan(root: pathlib.Path) -> list[tuple[pathlib.Path, int, str, str]]:
    hits = []
    ok = allowed(root)
    for path in files(root):
        if path.suffix.lower() not in SCAN_SUFFIXES or not path.is_file():
            continue
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        if path.name == pathlib.Path(__file__).name:
            continue
        try:
            text = path.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        for n, line in enumerate(text.splitlines(), 1):
            for name, value in ASSIGN.findall(line):
                if (path.relative_to(root).as_posix(), name) in ok:
                    continue
                if not PLACEHOLDER.search(value):
                    hits.append((path, n, name, value))
            for m in PREFIXED.finditer(line):
                if (path.relative_to(root).as_posix(), m.group(1)) not in ok:
                    hits.append((path, n, m.group(1), m.group(0)))
    return hits


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument(
        "--root", default=str(ROOT), help="tree to scan (default: this space)"
    )
    args = ap.parse_args()
    root = pathlib.Path(args.root).resolve()

    hits = scan(root)
    if not hits:
        print(f"check_secrets: clean ({root})")
        sys.exit(0)

    print(f"check_secrets: {len(hits)} plaintext credential(s) under {root}\n")
    for path, n, name, value in hits:
        try:
            shown = path.relative_to(root).as_posix()
        except ValueError:
            shown = path.as_posix()
        print(f"  {shown}:{n}  {name} = {mask(value)}")
    print(
        "\nMove each value to an environment variable and reference it as"
        '\n  "NAME": "${NAME}"'
        "\nthen regenerate the credential -- it has been on disk in the clear."
    )
    sys.exit(1)


if __name__ == "__main__":
    main()
