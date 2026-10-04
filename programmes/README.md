# Training programme documents

One template for every programme's Word file (white pages, gold accents, black cover with the site's Nabeul tiles).

- Data: one `<slug>.json` per programme here. Start a new one from `_example.json` (files starting with `_` or `.` are not built).
- Look: `STYLES`, `CHAR_STYLES`, cover constants (`COVER_ROWS`, `TILE_COLS`, `AUTHOR_Y`) in `scripts/build_programmes.py`.
- Output: `res/programmes/<file>`; link it from `doc:` in `PROGS` (`main.js`) to get the Download button.

```
python scripts/build_programmes.py [slug] [--force]   # build (refuses to overwrite a file edited in Word)
python scripts/sync_programmes.py [slug]              # after editing a .docx in Word: text -> JSON, look -> report
python scripts/export_pdfs.py [slug]                  # Word -> res/programmes/pdf/ (screen-optimised previews)
python scripts/programme_index.py                      # programmes/INDEX.md: table of all courses with preview links
python scripts/programme_site.py                       # programmes.js: PROGS for the website Training tabs (run after any JSON change)
```

Editing in Word: change text freely; change a look everywhere by modifying its style ("Prog …", Heading 1/2, "Prog Table");
the cover tiles (picture) and author block (floating table) can be dragged. Sync reports style, hand-formatting and position
changes; fold them into the constants above, then rebuild with `--force`.

Optional fields: `subtitle`, `audience_line`, `certifications`, `facts`, phase `intro`/`note`/`math`/`project`,
`portfolio` (`{"intro", "rows": [{"name", "shows", "phase", "build"}]}`), `notes`, `buffer` (hours shown as a row before the total, added to it and to the cover), `lang` (`"fr"` = French labels and decimal comma), `hours` (cover figure, default = sum of
phases), phase `optional: true` (outside the total and buffer rule, shown as "+ N h optional"), `labels` (override any fixed wording, see `LABELS`).

Needs Python with python-docx, Pillow, PyMuPDF; sync also needs Microsoft Word (Windows).
