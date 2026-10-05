"""
WhatsApp / Meta catalogue: 3 images per programme and language, plus the Meta data feeds.

    python scripts/catalog.py              # all programmes in catalog/items.json
    python scripts/catalog.py slug1 slug2  # re-render only these images (feeds are always rebuilt for all)

Reads catalog/items.json (which programmes, outcomes, price rate) and programmes/<slug>[-fr].json.
Writes catalog/img/<slug>-<lang>-<n>.jpg, catalog/feed-fr.csv (primary, French)
catalog/feed-en.csv (English language feed, same ids)
and catalog/feed-countries.csv (country feed: price in EUR outside Tunisia).
Needs Microsoft Edge (headless) and internet access for the Google fonts.
"""

import csv
import html
import json
import pathlib
import re
import subprocess
import sys
import tempfile
import time

from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
CAT = ROOT / "catalog"
EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
NAME = "Mohamed Aziz BEN HAHA"
OVERFLOW = []
SMALL = []

T = {
    "en": {
        "tag": "In-company training", "badge": "Eligible for CNFCPP (TFP) refund",
        "role": "PhD · Cloud &amp; DevOps engineer · CKA, AWS",
        "total": "total duration", "mods": "modules + final project", "mods_only": "modules",
        "site": "On-site", "remote": "or remote", "prep": "Prepares the core topics of", "and": "and",
        "programme": "Programme", "buffer": "Buffer", "buffer_focus": "Catch-up, revision, extra lab time",
        "sum": "<b>{m} h</b> of modules + <b>{b} h</b> buffer = <b>{t} h</b> in total",
        "outcomes": ("What your team", "will be able to do"),
        "core": [", core topics"],
        "desc": [
            "In-company training, on-site or remote.{cnfcpp}",
            "{outcome}",
            "Programme ({sumtxt})\n{rows}",
            "For: {aud}\nPrerequisites: {pre}\nFormat: {fmt}\nAssessment: {ass}",
            "{certs}",
            "{price} Send a message with your team size and preferred dates.",
            "Trainer: " + NAME + ", PhD, Cloud & DevOps engineer (CKA, AWS)",
        ],
        "cnfcpp_txt": " Eligible for CNFCPP (TFP) refund.",
        "sumtxt": "{t} h: {m} h of modules + {b} h buffer for catch-up, revision and extra lab time",
        "price_on": "Indicative price excl. tax for one in-company group; final quote on request.",
        "price_off": "Price on quote.",
        "facts": {"aud": "Audience", "pre": "Prerequisites", "fmt": "Format", "ass": "Assessment", "out": "Outcome"},
    },
    "fr": {
        "tag": "Formation intra-entreprise", "badge": "Éligible au remboursement CNFCPP (TFP)",
        "role": "PhD · Ingénieur Cloud &amp; DevOps · CKA, AWS",
        "total": "durée totale", "mods": "modules + projet final", "mods_only": "modules",
        "site": "Sur site", "remote": "ou à distance", "prep": "Prépare les thèmes principaux de", "and": "et",
        "programme": "Programme", "buffer": "Réserve", "buffer_focus": "Rattrapage, révision, TP supplémentaires",
        "sum": "<b>{m} h</b> de modules + <b>{b} h</b> de réserve = <b>{t} h</b> au total",
        "outcomes": ("Ce que votre équipe", "saura faire"),
        "core": [", thèmes principaux"],
        "desc": [
            "Formation intra-entreprise, sur site ou à distance.{cnfcpp}",
            "{outcome}",
            "Programme ({sumtxt})\n{rows}",
            "Public : {aud}\nPrérequis : {pre}\nFormat : {fmt}\nÉvaluation : {ass}",
            "{certs}",
            "{price} Envoyez-nous la taille de votre équipe et vos dates souhaitées.",
            "Formateur : " + NAME + ", PhD, ingénieur Cloud & DevOps (CKA, AWS)",
        ],
        "cnfcpp_txt": " Éligible au remboursement CNFCPP (TFP).",
        "sumtxt": "{t} h : {m} h de modules + {b} h de réserve pour rattrapage, révision et TP supplémentaires",
        "price_on": "Prix indicatif HT pour un groupe intra-entreprise ; devis final sur demande.",
        "price_off": "Prix sur devis.",
        "facts": {"aud": "Public", "pre": "Prérequis", "fmt": "Format", "ass": "Évaluation", "out": "Résultat"},
    },
}

FONT = ('<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800'
        '&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">')
CSS = """*{margin:0;padding:0;box-sizing:border-box}html,body{width:1080px;height:1080px;overflow:hidden}
body{font-family:Manrope;background:radial-gradient(1200px 700px at 85% -10%,#2a2008 0%,#07070a 55%);color:#ece9e2;padding:80px 90px;display:flex;flex-direction:column;position:relative}
.top{display:flex;justify-content:space-between;align-items:center;gap:20px}
.tag{font:700 20px Manrope;letter-spacing:.16em;text-transform:uppercase;color:#d4a024;white-space:nowrap}
.badge{font:700 19px Manrope;letter-spacing:.06em;color:#fff;border:1.5px solid #fff;border-radius:999px;padding:10px 20px;white-space:nowrap}
h1{font-family:'Bricolage Grotesque';font-weight:800;line-height:.95;letter-spacing:-.03em;margin-top:80px}h1 span{color:#d4a024}
h2{font:800 66px/1 'Bricolage Grotesque';letter-spacing:-.025em;margin-top:44px}h2 span{color:#d4a024}
.sub{font:500 32px/1.35 Manrope;color:#a9a6a0;margin-top:28px;max-width:860px}
.facts{display:grid;grid-template-columns:repeat(3,1fr);margin-top:50px;border-top:1px solid #2c2a25;padding-top:30px}
.f{font:600 21px/1.3 Manrope;color:#a9a6a0}.f b{display:block;font:800 50px/1.1 'Bricolage Grotesque';color:#f2c45a}
.c{font:600 21px/1.5 Manrope;color:#a9a6a0;margin-top:30px}
.mods{margin-top:30px;border-top:1px solid #2c2a25}
.m{display:grid;grid-template-columns:70px 1fr 110px;align-items:baseline;padding:13px 0;border-bottom:1px solid #2c2a25}
.m i{font:800 26px 'Bricolage Grotesque';color:#d4a024;font-style:normal}
.m b{font:700 27px/1.2 Manrope}.m p{font:500 18px/1.35 Manrope;color:#a9a6a0;margin-top:3px}
.m em{font:800 30px 'Bricolage Grotesque';color:#f2c45a;font-style:normal;text-align:right}
.m.buf b,.m.buf em{color:#a9a6a0}
.tot{font:600 20px Manrope;color:#a9a6a0;margin-top:16px;text-align:right}.tot b{color:#ece9e2}
.out{margin-top:34px;display:flex;flex-direction:column;gap:20px}
.o{display:grid;grid-template-columns:60px 1fr;align-items:start}
.o i{font:800 26px/1.4 'Bricolage Grotesque';color:#d4a024;font-style:normal}
.o div{font:600 26px/1.35 Manrope}.o span{color:#a9a6a0;font-weight:500}
.brand{position:absolute;left:90px;bottom:70px;display:flex;align-items:center;gap:22px}
.brand .n{font:700 28px Manrope}.brand .r{font:500 21px Manrope;color:#8d8a84;margin-top:2px}
.brand .sep{width:1.5px;height:62px;background:#3a3730}.brand .logo{height:66px;width:auto;flex:none}
.sm .brand{gap:18px}.sm .brand .logo{height:52px}.sm .brand .sep{height:48px}
.sm .brand .n{font-size:23px}.sm .brand .r{font-size:17px}"""

# The brand is pinned at the same height on every card (70 px from the bottom). A page-2 title that wraps puts "Programme" on its
# last line; content that would reach the brand is tightened step by step, only when needed
# (row padding, then heading size, then outcome spacing), so cards that already fit render unchanged.
FIT = """<script>document.fonts.ready.then(()=>{
const b=document.querySelector('.brand'),top=b.getBoundingClientRect().top-20;
const ok=()=>[...document.body.children].every(e=>e===b||e.tagName==='SCRIPT'||e.getBoundingClientRect().bottom<=top);
const h=document.querySelector('h2');
if(document.querySelector('.mods')&&h.offsetHeight>parseFloat(getComputedStyle(h).fontSize)*2.2)h.querySelector('br').replaceWith(' ');
for(let z=62;document.querySelector('.mods')&&z>=50&&h.offsetHeight>z*2.2;z-=4)h.style.fontSize=z+'px';
if(h.offsetHeight>parseFloat(getComputedStyle(h).fontSize)*2.2)h.style.fontSize='';
const set=(sel,prop,v)=>document.querySelectorAll(sel).forEach(e=>e.style[prop]=v);
const steps=[];
for(let p=12;p>=7;p--)steps.push(()=>set('.m','padding',p+'px 0'));
steps.push(()=>set('.m','gridTemplateColumns','58px 1fr 80px'));
steps.push(()=>{set('.m p','fontSize','16px');set('.m b','fontSize','25px')});
steps.push(()=>{set('h2','marginTop','30px');set('.mods,.out','marginTop','22px')});
for(let s=60;s>=54;s-=6)steps.push(()=>set('h2','fontSize',Math.min(s,parseFloat(getComputedStyle(h).fontSize))+'px'));
steps.push(()=>set('.tot','marginTop','8px'));
for(let p=6;p>=5;p--)steps.push(()=>set('.m','padding',p+'px 0'));
steps.push(()=>{set('.m p','fontSize','15px');set('.m b','fontSize','23px')});
for(let g=16;g>=8;g-=4)steps.push(()=>set('.out','gap',g+'px'));
for(let s=24;s>=21;s--)steps.push(()=>set('.o div','fontSize',s+'px'));
let n=0;for(const f of steps){if(ok())break;f();n++}
if(!ok())document.body.insertAdjacentHTML('beforeend','<i style="position:absolute;left:0;right:0;bottom:0;height:30px;background:#fff"></i>');
if(n)document.body.insertAdjacentHTML('beforeend','<i style="position:fixed;left:0;top:1080px;width:1080px;height:10px;background:#fff"></i>');
});</script>"""


def esc(s):
    return html.escape(s, quote=False)


def hrs(x):
    return f"{x:g}"


def is_project(ph):
    return re.search(r"proje[ct]t?", ph["name"], re.I) is not None


def certs_short(p, t):
    out = []
    for c in p.get("certifications") or []:
        for s in t["core"]:
            c = c.replace(s, "")
        out.append(re.sub(r"\s*\([^)]*\)", "", c).strip())
    if not out:
        return ""
    return out[0] if len(out) == 1 else ", ".join(out[:-1]) + f" {t['and']} " + out[-1]


def glue(s):
    # keep "(RHEL 10)" and "sans-fil :" on one line
    s = re.sub(r"\([^)]*\)", lambda m: m.group(0).replace(" ", "\u00a0"), s)
    return re.sub(r" ([:;!?])", "\u00a0\\1", s)


def keep(s):
    # escaped and glued text whose hyphenated words never break (t-SNE, sans-fil)
    return re.sub(r"(\S+-\S+)", r"<b style='font:inherit;white-space:nowrap'>\1</b>", esc(glue(s)))


def title_lines(title):
    w = title.split()
    if len(w) == 1:
        return title, ""
    cuts = [i for i in range(1, len(w)) if " ".join(w[:i]).count("(") == " ".join(w[:i]).count(")") and re.search(r"\w", w[i])]
    best = min(cuts or range(1, len(w)), key=lambda i: abs(len(" ".join(w[:i])) - len(" ".join(w[i:]))))
    return " ".join(w[:best]), " ".join(w[best:])


def pages(p, lang, outcomes, cnfcpp, small=False):
    t = T[lang]
    logo = (ROOT / "res/logo.svg").read_text(encoding="utf-8").replace(
        "<svg ", '<svg class=logo ', 1)
    brand = (f"<div class=brand>{logo}<div class=sep></div><div><div class=n>{NAME}</div>"
             f"<div class=r>{t['role']}</div></div></div>")
    badge = f"<div class=badge>{t['badge']}</div>" if cnfcpp else ""
    top = f"<div class=top><div class=tag>{t['tag']}</div>{badge}</div>"
    core = [ph for ph in p["phases"] if not ph.get("optional")]
    mods = sum(ph["hours"] for ph in core)
    buf = p.get("buffer") or 0
    total = mods + buf
    n_mod = sum(1 for ph in core if not is_project(ph))
    has_proj = any(is_project(ph) for ph in core)
    l1, l2 = title_lines(p["title"])
    size = max(58, min(120,int(120 * 11 / max(len(l1), len(l2), 1))))
    facts = "".join(f"<div class=f><b>{a}</b>{b}</div>" for a, b in [
        (f"{hrs(total)} h", t["total"]),
        (str(n_mod), t["mods"] if has_proj else t["mods_only"]),
        (t["site"], t["remote"])])
    cs = certs_short(p, t)
    cert = f"<div class=c>{t['prep']} {esc(cs)}</div>" if cs else ""
    one = (f"{top}<h1 style='font-size:{size}px'>{keep(l1)}<br><span>{keep(l2)}</span></h1>"
           f"<div class=sub>{esc(p['subtitle'])}.</div><div class=facts>{facts}</div>{cert}{brand}")
    rows, k = "", 0
    for ph in core:
        if is_project(ph):
            num = "P"
        else:
            k += 1
            num = f"{k:02d}"
        rows += (f"<div class=m><i>{num}</i><div><b>{esc(ph['name'])}</b><p>{esc(ph['focus'])}</p></div>"
                 f"<em>{hrs(ph['hours'])} h</em></div>")
    if buf:
        rows += (f"<div class='m buf'><i>+</i><div><b>{t['buffer']}</b><p>{t['buffer_focus']}</p></div>"
                 f"<em>{hrs(buf)} h</em></div>")
    two = (f"{top}<h2>{keep(p['title'])}<br><span>{t['programme']}</span></h2><div class=mods>{rows}</div>"
           f"<div class=tot>{t['sum'].format(m=hrs(mods), b=hrs(buf), t=hrs(total))}</div>{brand}")
    outs = "".join(f"<div class=o><i>{i:02d}</i><div>{keep(a)} <span>{keep(b)}</span></div></div>"
                   for i, (a, b) in enumerate(outcomes, 1))
    h1, h2 = t["outcomes"]
    three = f"{top}<h2>{h1}<br><span>{h2}</span></h2><div class=out>{outs}</div>{brand}"
    wrap = lambda body: f"<!doctype html><meta charset=utf-8>{FONT}<style>{CSS}</style><body{' class=sm' if small else ''}>{body}{FIT}"
    return [wrap(one), wrap(two), wrap(three)], (mods, buf, total)


def render(htmls, stems, tmp):
    """Screenshots the cards; returns True when any of them needed tightening."""
    tight = False
    for h, stem in zip(htmls, stems):
        src = tmp / f"{stem}.html"
        png = tmp / f"{stem}.png"
        src.write_text(h, encoding="utf-8")
        subprocess.run([EDGE, "--headless=new", "--disable-gpu", "--hide-scrollbars",
                        f"--user-data-dir={tmp / 'prof'}", "--window-size=1080,1090",
                        "--virtual-time-budget=6000", f"--screenshot={png}", src.as_uri()],
                       capture_output=True)
        for _ in range(60):  # msedge.exe can hand off to a running browser and return before the file exists
            if png.exists() and png.stat().st_size:
                break
            time.sleep(0.5)
        time.sleep(0.5)
        full = Image.open(png).convert("RGB")
        if full.convert("L").getpixel((540, 1085)) > 200:  # FIT had to tighten this card
            tight = True
        im = full.crop((0, 0, 1080, 1080))
        im.save(CAT / "img" / f"{stem}.jpg", quality=90)
        # content that reaches the brand even after FIT shows as a white bar in the bottom margin
        if im.convert("L").crop((0, 1035, 1080, 1080)).getextrema()[1] > 110:
            OVERFLOW.append(stem)
    return tight


def fact(p, label):
    return next((f["value"] for f in p.get("facts", []) if f["label"] == label), "")


def description(p, lang, sums, cnfcpp, priced):
    t = T[lang]
    mods, buf, total = sums
    rows = []
    k = 0
    colon = " : " if lang == "fr" else ": "
    for ph in p["phases"]:
        if ph.get("optional"):
            continue
        if is_project(ph):
            rows.append(f"{ph['name']} ({hrs(ph['hours'])} h){colon}{ph['focus']}")
        else:
            k += 1
            rows.append(f"{k:02d} {ph['name']} ({hrs(ph['hours'])} h){colon}{ph['focus']}")
    cs = certs_short(p, t)
    F = t["facts"]
    parts = [s.format(
        cnfcpp=t["cnfcpp_txt"] if cnfcpp else "",
        outcome=fact(p, F["out"]) + ".",
        sumtxt=t["sumtxt"].format(m=hrs(mods), b=hrs(buf), t=hrs(total)) if buf else f"{hrs(total)} h",
        rows="\n".join(rows),
        aud=fact(p, F["aud"]), pre=fact(p, F["pre"]), fmt=fact(p, F["fmt"]), ass=fact(p, F["ass"]),
        certs=f"{t['prep']} {cs}." if cs else "",
        price=t["price_on"] if priced else t["price_off"]) for s in t["desc"]]
    return "\n\n".join(x for x in parts if x.strip())


def main():
    cfg = json.loads((CAT / "items.json").read_text(encoding="utf-8"))
    base, cnfcpp, pr = cfg["base_url"].rstrip("/"), cfg["cnfcpp"], cfg["price"]
    rate, cur, ab = pr.get("per_hour"), pr["currency"], pr.get("abroad")
    (CAT / "img").mkdir(exist_ok=True)
    primary, english, countries = [], [], []
    only = set(sys.argv[1:])
    unknown = only - set(cfg["items"])
    if unknown:
        sys.exit(f"not in catalog/items.json: {', '.join(sorted(unknown))}")
    with tempfile.TemporaryDirectory(ignore_cleanup_errors=True) as d:
        tmp = pathlib.Path(d).resolve()
        for slug, item in cfg["items"].items():
            progs = {lang: json.loads((ROOT / "programmes" / f"{slug}{'-fr' if lang == 'fr' else ''}.json")
                                      .read_text(encoding="utf-8")) for lang in ("fr", "en")}
            # a crowded course gets the compact brand on all its cards, in both languages
            todo = not only or slug in only
            built = {}
            for small in ((True,) if item.get("compact") else (False, True)):
                built = {lang: pages(progs[lang], lang, item["outcomes"][lang], cnfcpp, small) for lang in ("fr", "en")}
                if not todo:
                    break
                if item.get("compact"):
                    SMALL.append(slug)
                tight = [render(built[lang][0], [f"{slug}-{lang}-{n}" for n in (1, 2, 3)], tmp) for lang in ("fr", "en")]
                if small or not any(tight):
                    break
                OVERFLOW[:] = [o for o in OVERFLOW if not o.startswith(slug + "-")]  # first pass is redone
                SMALL.append(slug)
            for lang in ("fr", "en"):
                p = progs[lang]
                htmls, sums = built[lang]
                stems = [f"{slug}-{lang}-{n}" for n in (1, 2, 3)]
                imgs = [f"{base}/catalog/img/{s}.jpg" for s in stems]
                pdf = f"{base}/res/programmes/pdf/{pathlib.Path(p['file']).stem}.pdf"
                row = {"id": f"{item['code']}-{hrs(sums[2])}", "title": f"{p['title']} ({hrs(sums[2])} h)",
                       "description": description(p, lang, sums, cnfcpp, rate is not None), "link": pdf}
                if lang == "fr":
                    row.update({"availability": "in stock", "condition": "new",
                                "price": f"{rate * sums[2]:.2f} {cur}" if rate is not None else "",
                                "image_link": imgs[0], "additional_image_link": ",".join(imgs[1:]),
                                "brand": NAME})
                    primary.append(row)
                    if ab and ab.get("per_hour") is not None:
                        countries += [{"id": row["id"], "override": c, "price": f"{ab['per_hour'] * sums[2]:.2f} {ab['currency']}"}
                                      for c in ab["countries"]]
                else:
                    row["override"] = "en_XX"
                    english.append(row)
                print(f"  {slug} {lang}: {'3 images' if not only or slug in only else 'feed only'}")
    cols = ["id", "title", "description", "availability", "condition", "price", "link",
            "image_link", "additional_image_link", "brand"]
    for name, rows, c in (("feed-fr.csv", primary, cols),
                          ("feed-en.csv", english, ["id", "override", "title", "description", "link"]),
                          ("feed-countries.csv", countries, ["id", "override", "price"])):
        with open(CAT / name, "w", encoding="utf-8", newline="") as f:
            w = csv.DictWriter(f, fieldnames=c)
            w.writeheader()
            w.writerows(rows)
    print(f"feeds: {len(primary)} items")
    if SMALL:
        print("compact brand (crowded course):", ", ".join(SMALL))
    if OVERFLOW:
        print("OVERFLOW (text runs into the bottom margin, shorten or tighten):", ", ".join(OVERFLOW))
    if rate is None:
        print("WARNING: price.per_hour is null, so the price column is empty and Meta will reject the feed.")


if __name__ == "__main__":
    sys.exit(main())
