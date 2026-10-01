# Web resume

Public portfolio of Mohamed Aziz Ben Haha. Live: https://mohamedazizbenhaha.netlify.app
Repo: `mohamedazizbenhaha/mohamedazizbenhaha.github.io` (**public** — everything committed is world-readable).

## Run it
- Preview: `preview_start resume` (port 8770).
- Gates before any commit: `python scripts/run_gates.py` (secrets + broken local links).
  The pre-commit hook runs the secrets check; fresh clone: `git config core.hooksPath .githooks`.
- Deploy: push to `main`. **Ask before pushing** — it publishes.

## Stack
No build step, no libraries. `index.html` (markup, English copy) + `style.css` + `main.js` (French copy in `FR`, experience data in `EXP`, interactions). Design work: skills `impeccable`, `design-taste-frontend`.

## Rules
- No credential in the page, ever: a static site cannot hide one. Contact = mailto or Netlify Forms.
- Content: `content.md` is the single source (built from the CVs in `W:\myphd\administrative\`). Edit it first, then the page; never re-parse the PDFs.
  Never list a private repo or unpublished result without asking.
- Never read a large file whole: Grep, then read by line range.
- Shared scripts (`check_secrets.py`, `.githooks/`) are copies from `W:\My Systems\_template\`; fix there first.
