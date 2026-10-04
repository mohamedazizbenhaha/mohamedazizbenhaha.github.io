"""Write programmes/INDEX.md: one row per catalogue course with preview links (PDF) and Word files, EN and FR.

    python scripts/programme_index.py

Course numbers and titles come from the title table in W:/trainings-catalog/HANDOFF.md.
"""
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'programmes'
HANDOFF = Path('W:/trainings-catalog/HANDOFF.md')
PREVIEW = 'https://deploy-preview-1--mohamedazizbenhaha.netlify.app/res/programmes/pdf/'


def main():
    rows = re.findall(r'^\| (\d+) \| (.+?) \| (.+?) \| `(.+?)` \|$', HANDOFF.read_text(encoding='utf-8'), re.M)
    out = ['# Training programmes: index', '',
           'Preview = PDF on the Netlify deploy preview (branch `redesign`); Word = the source .docx in this repo.',
           'Regenerate with `python scripts/programme_index.py` after `build_programmes.py` and `export_pdfs.py`.', '',
           '| # | Course | Hours | English | French |', '|---|---|---|---|---|']
    for n, en, fr, slug in rows:
        cells = []
        for s in (slug, slug + '-fr'):
            p = SRC / f'{s}.json'
            if not p.exists():
                cells.append('not produced'); continue
            g = json.loads(p.read_text(encoding='utf-8'))
            stem = Path(g['file']).stem
            cells.append(f'[Preview]({PREVIEW}{stem}.pdf) · [Word](../res/programmes/{g["file"]})')
        hours = ''
        p = SRC / f'{slug}.json'
        if p.exists():
            g = json.loads(p.read_text(encoding='utf-8'))
            core = sum(ph['hours'] for ph in g['phases'] if not ph.get('optional')) + (g.get('buffer') or 0)
            extra = sum(ph['hours'] for ph in g['phases'] if ph.get('optional'))
            hours = f'{core:g} h' + (f' + {extra:g} h optional' if extra else '')
        out.append(f'| {n} | {en} / {fr} | {hours} | {cells[0]} | {cells[1]} |')
    (SRC / 'INDEX.md').write_text('\n'.join(out) + '\n', encoding='utf-8')
    print('wrote programmes/INDEX.md')


if __name__ == '__main__':
    main()
