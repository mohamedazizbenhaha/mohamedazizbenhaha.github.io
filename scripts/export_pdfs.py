"""Export every built programme .docx to res/programmes/pdf/ through Microsoft Word (Windows).

    python scripts/export_pdfs.py            # all programmes
    python scripts/export_pdfs.py <slug>...  # some

PDFs are optimised for print (0): screen mode downsampled the logo and the cover tiles until they looked pixelated.
They are what the website offers for preview.
"""
import json, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC, OUT = ROOT / 'programmes', ROOT / 'res' / 'programmes'
PDF = OUT / 'pdf'


def main(slugs):
    files = [SRC / f'{s}.json' for s in slugs] if slugs else sorted(
        f for f in SRC.glob('*.json') if not f.name.startswith(('.', '_')))
    PDF.mkdir(exist_ok=True)
    ps = ["$w = New-Object -ComObject Word.Application; $w.Visible = $false"]
    for f in files:
        name = json.loads(f.read_text(encoding='utf-8'))['file']
        src, dst = OUT / name, PDF / (Path(name).stem + '.pdf')
        ps.append(f"$d = $w.Documents.Open('{src}', $false, $true); "
                  f"$d.ExportAsFixedFormat('{dst}', 17, $false, 0); $d.Close($false)")
    ps.append("$w.Quit()")
    subprocess.run(['powershell', '-NoProfile', '-Command', '; '.join(ps)], check=True)
    print(f'exported {len(files)} PDF(s) to {PDF.relative_to(ROOT)}')


if __name__ == '__main__':
    main(sys.argv[1:])
