# START HERE (handoff, updated 2026-10-06: catalogue live on main, Commerce Manager setup in progress)

## State
- **MERGED TO PRODUCTION 2026-10-05 (user's word): `redesign` fast-forwarded into `main`** → https://mohamedazizbenhaha.netlify.app (Netlify rebuilds on the push). Branch `redesign` still exists: keep using it for review, push there first, then ask before merging to `main` again. The contact QR (`res/contact-qr.svg`) was regenerated for the production .vcf URL at the merge (decoded OK with zxing-cpp). Review URL: https://deploy-preview-3--mohamedazizbenhaha.netlify.app (Deploy Preview protection in the new Netlify account may still return 401: Site configuration → Visitor access).
- **Merged to `main` 2026-10-05 (twice): mobile pass, favicon, Search Console file, then share image `res/og-card.jpg` + 1,000+ hours in meta + unused images removed.** Next: ask the user. The leaked app password (mohamedaziz.benhaha@gmail.com) was revoked by the user 2026-10-05. After each merge, open a new draft PR from `redesign` for a fresh deploy preview (a merged PR freezes its preview).
- Files: `index.html` (markup + English copy) · `style.css` · `main.js` (French copy in `FR`, experience data in `EXP`, interactions) · `programmes.js` (training catalogue, generated) · `res/` assets. Facts: `content.md`. Product brief: `PRODUCT.md`.

## WhatsApp / Meta catalogue (NEXT SESSION STARTS HERE)
**LIVE 2026-10-06 (user's word): `redesign` fast-forwarded into `main` (c245d42).** Checked on production: the 3 feeds answer 200 (text/csv) and all 195 links in them (39 PDFs + 156 images) answer 200; feed-fr.csv matches the repo. Next: Commerce Manager setup with the user, step by step (results below under "Commerce Manager log").

**Earlier state 2026-10-06: CLOSED.** All 39 items (234 images + 3 feeds) reviewed by the user, last fixes applied (brand block same height per course, compact block for crowded/listed courses, brand 70 px from the bottom), pushed to `redesign` (tree clean). **Next session: make it live** = merge `redesign` into `main` on the user's word (the feeds and images point at production URLs, so nothing works in Meta before the merge), check the URLs answer 200, then guide the Commerce Manager setup (step 4 under "Original plan").
- Rules (also in memory): B2B only (companies + training centres), dark & gold cards, logo + name one block at the bottom, PhD in the byline, white logo and white CNFCPP (TFP) badge, hours only, same text across any design options.
- Template: `python scripts/catalog.py [slug ...]` (run from PowerShell; needs Edge + internet for fonts). With slugs it re-renders only those images; feeds are always rebuilt for every item. It prints `OVERFLOW: ...` for any card whose text runs into the bottom margin.
- Input `catalog/items.json`: `price` (per hour × total hours, one in-company group, excl. tax; **user's choice: 100 TND/h in Tunisia, 100 EUR/h abroad**; DevOps 81 h = 8,100) and `items` (slug → `code` + 5 `outcomes` per language as [bold start, rest]).
- Everything else comes from `programmes/<slug>.json` and `<slug>-fr.json`: title, subtitle, phases (name, focus, hours), buffer, certifications, facts (Audience/Public, Prerequisites/Prérequis, Format, Assessment/Évaluation, Outcome/Résultat), file → PDF link.
- Output: `catalog/img/<slug>-<lang>-<1..3>.jpg` (cover · programme with buffer row and right-aligned total · team outcomes), `catalog/feed-fr.csv` (primary, French, TND), `catalog/feed-en.csv` (language feed, `override=en_XX`), `catalog/feed-countries.csv` (EUR for FR, BE, LU, DE, NL, IT, ES, PT, IE, AT).
- Price basis: CNFCPP refunds in-company training by an external trainer up to 20% of the monthly SMIG 48 h per hour (group of 4+): 0.2 × 554.736 = 110.947 TND in 2026. Abroad: Cloud/DevOps trainers 600-1,100 EUR/day in France. Raise with the SMIG each January.
- Unverified: whether WhatsApp shows the country-feed price and the English language feed (the DevOps test will tell).

### Done 2026-10-05/06: all 39 programmes generated and reviewed (on `redesign`)
- `catalog/items.json` now holds all 39 items (code + 5 outcomes EN/FR, written from each programme's phases and validated labs only). Codes: AWS-AIF, AWS-CLF, AWS-SEC, AWS-SOA, AWS-DEA, AWS-SRVLS, AWS-SAA, AZ-104, AZ-400, BLOCKCHAIN, CCNA-1/2/3, CLASSIC-AI, CYBER-IT, SPARK-KAFKA, DEVSECOPS, DOCKER-K8S, PROXMOX, CKA, EX294, LINUX-BASH, LINUX-NETSVC, LLM-AGENTS, ML-DL, AWS-MLA, NETSEC, NET-CLOUD, NLP, PY-DATA, PY-FUND, RHCSA-1/2/RT, SOC-CBROPS, SYS-DESIGN, TECH-WRITING, ZERO-TRUST.
- `scripts/catalog.py` changes: an in-page fit step (`FIT`) tightens only cards that would run into the bottom margin (row padding, narrower number/hours columns, smaller row text, then heading margin/size, then outcome spacing); cards that already fit render exactly as before (DevOps unchanged). `glue()` keeps "(RHEL 10)"-style groups and French " :" on one line; cover titles never split inside parentheses or before punctuation; cover title minimum size 58 px (was 72) so CCNA 3 stays on two lines; hyphenated words in outcomes never break (t-SNE).
- Brand block (logo + name) is pinned at the same height on every card (`position:absolute; bottom:80px`; logo rows 940-989 px on all 234 images, user's request 2026-10-05). On page 2 a title that wraps puts "Programme" on its last line (and shrinks to 50 px at most to stay on two lines); only FR CCNA 2 keeps three lines. If a card cannot fit, `FIT` paints a white bar in the bottom margin and the script prints OVERFLOW.
- Crowded courses get a compact brand (logo 52 px, smaller name) on all 6 cards, both languages (user's idea 2026-10-05); `"compact": true` in items.json forces it (user's list 2026-10-06: aws-solutions-architect, azure-administrator, ccna-1, devsecops, cka, linux-automation-ansible). Brand 70 px from the bottom (was 80, user 2026-10-06): `render()` reads a marker that `FIT` paints below the card (window 1090 px, image cropped to 1080) when it had to tighten; if any card of a course was tight, the whole course is rendered again with `small=True`. 11 compact: devops-engineering, azure-devops-engineer, ccna-2, classical-ai, machine-learning-deep-learning, ml-engineer-aws, network-security, rhcsa-part-1/2/rapid-track, soc-analyst. The script prints the list ("compact brand").
- Review: every image read as EN+FR contact sheets; no OVERFLOW. Minor single-word wraps left as is (e.g. FR "HSRP", "le vrai").
- Next: the user reviews the images (`catalog/img/`), then merge to `main` on their word and do the Commerce Manager setup (step 4 below).

### Original plan (done)
1. For each slug below, add an entry to `catalog/items.json`: `code` (short, upper case, e.g. `AWS-SAA`; the id becomes `<code>-<hours>`) and 5 outcomes EN + FR written from that programme's JSON (phase intros, labs, Outcome fact). Concrete skills with the real tools, no hype, same shape as DevOps: ["Verb + object", "with tools / details"]. Never invent tools that are not in the programme.
2. Run the script in batches (e.g. 5 slugs), read every image (all 3, both languages), fix any OVERFLOW or bad wrap, then commit and push to `redesign`.
3. Watch-outs: long titles (ccna-2 49 chars, ccna-3 53, rhcsa-part-1/2 45-46, enterprise-virtualization 43, nlp 41): check the cover title and the page-2 heading; classical-ai has 7 phases, rhcsa-part-1 and soc-analyst 6 (page 2 may overflow: tighten rows for long lists in `CSS`/`pages()` rather than cutting content). `is_project()` marks any phase whose name contains "project"/"projet" as P: check aws-serverless-projects. Programmes without certifications drop the "Prepares…" line automatically.
4. When all 39 are done: ask the user to merge to `main`, then guide the Commerce Manager setup: Catalogue → Data sources → Data feed → Scheduled, `https://mohamedazizbenhaha.netlify.app/catalog/feed-fr.csv` daily; add `feed-en.csv` as a language feed and `feed-countries.csv` as a country feed; connect the catalogue to the WhatsApp Business account.

Slugs (hours | phases), all done: aws-ai-practitioner-genai 33|4 · aws-cloud-practitioner 33|4 · aws-cloud-security 33|4 · aws-cloudops-engineer 33|4 · aws-data-engineering 27|4 · aws-serverless-projects 18|3 · aws-solutions-architect 36|5 · azure-administrator 42|5 · azure-devops-engineer 45|5 · blockchain-for-business 12|3 · ccna-1-introduction-networks 39|5 · ccna-2-switching-routing-wireless 42|5 · ccna-3-enterprise-networking 42|5 · classical-ai 90|7 · cybersecurity-it-teams 27|4 · data-engineering-spark-kafka 33|4 · devsecops 57|5 · docker-kubernetes 57|4 · enterprise-virtualization 36|4 · kubernetes-administration-cka 36|5 · linux-automation-ansible 42|5 · linux-bash-scripting 39|4 · linux-network-services 36|4 · llms-ai-agents 27|4 · machine-learning-deep-learning 75|5 · ml-engineer-aws 45|5 · network-security 51|5 · networking-cloud-devops 18|3 · nlp-text-to-transformers 27|4 · python-data-science 21|3 · python-fundamentals 27|4 · rhcsa-part-1 42|6 · rhcsa-part-2 42|5 · rhcsa-rapid-track 48|5 · soc-analyst 57|6 · system-design-fundamentals 21|4 · technical-academic-writing 18|3 · zero-trust-cloud-security 15|3.

## Mobile pass (next session): what to check
Test at 375 px and 390 px (Browser pane `resize_window` mobile preset; reload after switching), EN and FR, no sideways scroll anywhere. Known or likely issues:
- Training filter bar scrolls sideways; the selected button can sit off-screen (known since 2026-10-05).
- Career tracks tags in the 1,000+ hours box (`#tracks`) and their modal (`#progDlg`, track + course lists, back link); the About bento is one column on mobile.
- Projects: Life OS typed-sentence card, the three canvas cards (`#lifeCore` Create Life, `#thesisArt`, `#phdArt`): their drawings are sized for ~380 px wide cards, check the labels and the 14 s story still fit; the three "hl-3" cards stack to 1 column; subgroup "minis" grids.
- Publications `#pubs`: 1 column under 640 px, first 3 + Show more; the cover text (title in the JPG) must stay readable when the card is ~340 px wide.
- Experience tabs height, motto (`fitMotto`), hero name (`fitName`), nav burger below 1180 px, contact modal and programme modals (one fixed box, no sideways scroll).
- The user reads on a Samsung phone (Chrome) with "reduce motion" ON: animations stay on by design. "Desktop site" mode renders ~980 px.
- Workflow: edit, `python scripts/run_gates.py`, `node --check main.js`, check in the Browser pane, push to `redesign`, send the review URL; `main` only on the user's word.

## Next session: start here
- **Projects + Publications parts closed 2026-10-05** and merged to `main`. Next: the mobile pass above, then ask the user which part comes after.
- Done 2026-10-05, all on `redesign` (not on `main`):
  - Career tracks (1,000+ hours box): clickable tags, `TRACKS` in `main.js`, totals AI 150 / DevSecOps 140 / RHCE 130 / AWS 120 / Kubernetes 100.
  - Projects rebuilt (names, layout and facts in `content.md` > Projects): Life OS + Create Life; Thesis ecosystem + GreenWaterGuard + The Thesis Club; subprojects grouped by family. Only YouTube links out. Supervised student projects never appear here (see memory).
  - Project art on canvas, from the user's picks (options artifact https://claude.ai/artifact/DnUMoFg6oihmz3T8bpBdfA): Life OS typed sentence, Create Life "whole system", Thesis ecosystem journey, GreenWaterGuard water -> fuel cell -> ESP32 -> cloud. Shared `artLoop` in `main.js` runs only on screen; motion stays on under reduce-motion.
  - "Free courses" section removed (nav too, `.course*` CSS deleted; the course images in `res/` are unused now). New `#publications` "Research, in print." (FR « La recherche, publiée. »): cards 3 per row, first 3 shown + Show more. Covers `res/pubs/*.jpg` made in the course-slide style by a PIL script (Unsplash photos, title only, gold + black half circles); the script lives in the old session scratchpad, so rebuild from `content.md` notes if a cover changes. Titles: Electronics review (published, DOI link), Hydroinformatics paper (under review, title shortened to "Auditing a Wastewater Anomaly Detection Benchmark Before Model Selection" by the user's word), two papers in preparation (working titles).
- Open: update the Hydroinformatics status when a decision arrives; the user may send own lab photos for the covers (reactor).
- **Projects section rebuilt 2026-10-05** (user's layout; facts and names in `content.md` > Projects): row 1 Life OS (big) + Create Life (my_baby); row 2 Thesis ecosystem + GreenWaterGuard + The Thesis Club (YouTube); "Subprojects" grouped by family (`.subgrp`): LifeFit / LifeNotes / LifeWallet · ThesisVault / ThesisMatcher / ThesisLens / ThesisPilot · gateway firmware / MFC reactor. Air-Canvas and the supervised budgeting app removed for good. Offered alternative not built: a filter bar over the subprojects (like Training).
- Project art (2026-10-05, user's picks from the options artifact https://claude.ai/artifact/DnUMoFg6oihmz3T8bpBdfA): Life OS = typed sentence -> module action chips (`LIFE` in `main.js`); Create Life = canvas "whole system" (gold core LLaMA, voice ring that refuses a stranger and accepts the owner, knowledge sparks fill a gauge, shockwave = code rewrite + version up, three locks = core principles, log lines); Thesis ecosystem = canvas journey Matcher -> Pilot -> Lens -> Vault building a thesis (pages, cover, cap). Canvases use `artLoop` (runs only on screen). No GitHub links in Projects: only The Thesis Club (YouTube) links out.
- **The training part and its follow-ups are closed** (2026-10-05, last commit 3458b5f on `redesign`, pushed, tree clean). Ask the user which part to fix next.
- Done 2026-10-05 (user's word): retired 130 h .docx deleted; content checks verified on vendor pages and applied (EN+FR, docs + PDFs rebuilt): EX294 = "Red Hat Certified Advanced System Administrator in Ansible", with RHCSA earns RHCE in Ansible, official course AU294 on RHEL 10 / AAP 2.6 (matches our labs); Security Hub CSPM correct (renamed June 2025), now used everywhere; Bedrock Knowledge Bases on S3 Vectors correct (GA Dec 2025); Quick Suite renamed **Amazon Quick** (2026): "Amazon Quick (formerly Quick Suite)"; Security Onion standalone minimum 4 cores / 24 GB / 200 GB disk (disk added).
- QR: regenerated for production at the 2026-10-05 merge (done). If the .vcf or the domain changes: same look (49-module QR, dots r .42, round eyes, LinkedIn photo `res/contact-photo.jpg` centred, error level H, border 4), URL https://mohamedazizbenhaha.netlify.app/res/mohamed-aziz-ben-haha.vcf, decode-test with zxing-cpp.
- Phone view: the user wants it as a separate pass after the desktop parts are finished (known: training filter bar scrolls sideways, selected button can sit off-screen).
- Logo: `res/logo.svg` (traced from the 118 px PNG) is used in the nav, footer and the Word/PDF programmes. Favicon: `favicon.ico` + `res/icon-192.png` + `res/apple-touch-icon.png` (gold logo on black, 2026-10-05).
- Programme pipeline after any JSON change: `build_programmes.py` → `export_pdfs.py` (Word, ~5 min for all) → `programme_index.py` → `programme_site.py`. Logo and cover tiles are embedded as SVG in the .docx (Word otherwise resamples PNGs to ~200 ppi in the PDF).

## Done (2026-10-05, later): catalogue is on the website (branch `redesign`)
- Training section = filter bar (5 buttons, like the Experience bar): Infrastructure (courses 1-11) · Cloud & DevOps (12-23) · Data & AI (24-34) · Security (35-38) · Academic (39). It filters the **rows** (hours · title · outcome · View programme), first 3 + Show more (hidden when 3 or fewer). Click a row → `#progDlg` modal: hours, outcome, audience, prerequisites, certifications, phases + buffer, **Preview (PDF)** in the page language, Book, Customise. **No Word download on the site** (user, 2026-10-05). The user rejected the Experience-style side list for training: rows + modal only.
- Data: `programmes.js` (`PROGS`), generated by `python scripts/programme_site.py` from `programmes/*.json`; tab ranges in its `GROUPS`.
- 1,000+ hours box: label "Career tracks" / « Parcours métiers ». Tags are buttons (`TRACKS` in `main.js`) opening `#progDlg` with the track courses (each opens its programme, with a back link). Totals rounded up on the user's word (AI 150, DevSecOps 140, RHCE 130, AWS 120, Kubernetes 100); the gap to the course sum shows as "Track project & review" (2, 4, 0, 0, 7 h).
- All modals (contact + programme) share one fixed box (`height:min(820px,100% - 24px)`), content scrolls inside, long titles wrap; never horizontal scroll.

## Earlier (2026-10-05): programmes done → integrate them in the website
- **Read `W:\trainings-catalog\HANDOFF.md` first** (top section: state + suggested prompt for the website integration).
- All 39 catalogue courses built EN + FR (78 .docx in `res/programmes/`, 78 PDF previews in `res/programmes/pdf/`); table with preview links: `programmes/INDEX.md`. Ethical Hacking was removed from the catalogue for good (user, 2026-10-05).
- Scripts: `build_programmes.py` (refuses wrong hours) → `export_pdfs.py` (Word → PDF) → `programme_index.py`. Documents state hours only, never sessions.
- Next: replace the retired 130 h programme in the Training section (`PROGS` in `main.js`) with the new catalogue. Discuss designs first.

## Earlier (2026-10-04, evening): training catalogue → Word programmes
- **Read `W:\trainings-catalog\HANDOFF.md` first.** 39-course catalogue with syllabi confirmed (`W:\trainings-catalog\SYLLABUS.md`); pilot DevOps Engineering built EN + FR; next = cold read of the plan in a new session, fixes, then a new session for the other 38 courses.
- Generator now supports `"lang": "fr"` and `"buffer"`. 130 h programme retired (source renamed `_retired-...`).

## Earlier (2026-10-04): fixing the content, trainings first
- **The training-programme Word template is confirmed by the user** (black Nabeul-tile cover, white + gold pages). Use it for every programme document; do not redesign it unless asked. How it works: `programmes/README.md`. New programme = copy `programmes/_example.json`, fill, `python scripts/build_programmes.py <slug>`, set `doc:` in `PROGS` (`main.js`).
- The user edits the .docx in Word and says so → run `scripts/sync_programmes.py`, fold look changes into the constants, rebuild with `--force`, render page 1 through Word (export to PDF) to check.
- Next step agreed with the user: **discuss the trainings content** (start with the 130 h programme's issues listed under Round notes below), then the other programmes' documents. Discuss before applying (user's rule).

## Workflow each round
1. Edit. Find code with Grep, read by line range.
2. `python scripts/run_gates.py` (secrets + broken links) and `node --check main.js`.
3. Check once in the Browser pane: `preview_start resume` (:8770), desktop 1440 and mobile 375. One batched round, fix, at most one more look.
4. Commit and `git push origin redesign` without asking, then send the user the live URL.

## Skills (project `.claude/skills/`)
Use only where they earn their tokens:
- `redesign-skill`: audit-then-fix pass on the existing page. Good for item-by-item fixes.
- `web-design-guidelines`: final accessibility/UX audit, `file:line` output. Run once before merge.
- `improve-animations` (audit + plan) / `review-animations` (manual): one motion pass. The page has a lot of motion (network canvas, orbit, marquee, rotator, reveals, counters).
- `impeccable`: use its `detect`/`audit`/`polish` commands only. Do not run its concept-seed or mockup rounds: the user rejected the sketches and the visual world is settled (black + gold #d4a024, Bricolage Grotesque + Manrope).
- `design-taste-frontend`: reference only.
- Rejected 2026-10-01: awesome-design-skills styles (generic tokens that fight our palette), image-to-code (needs image generation), playwright-cli (Browser pane already does this).

## Done 2026-10-01 (tasks 1-7 + guidelines pass, all on `redesign`, not on `main`)
1. About bento is a 12-column grid: rows 1-2 = I build (6, 2 rows) · I teach · I research · 1,000+ hours · I mentor projects (3 each); row 3 = 8 certifications · 9 universities & training centres · Languages (4+4+4). Tablet: 6+6, mobile: 1 column with the two counters side by side. The Écully ↔ Tunis card is gone: location is in the hero status line and the footer.
2. Experience box: `sizeTabs()` in `main.js` renders every group and entry off-screen in the current language and sets `.tabs` `min-height` to the tallest (list + panel when stacked on mobile). Re-runs on resize (debounced), language switch and after fonts load.
3. Education timeline: items centred under evenly spaced dots, column gap 48px, text max 30ch. Mobile keeps the left vertical line.
4. Certifications: no years. Issuer kept for Linux Foundation, Red Hat, Microsoft, Cisco; LPI and AWS cards show the title only.
5. Courses toggle is the original `.read` design (uppercase, 4px tracking, 60px side lines, inline-SVG double chevron rotating 0.3s), gold on hover.
6. Closing band `#contact` (one line + Hire me + both resumes + socials) and a real footer (brand, location, languages, section links, back to top, last updated 10/2026, ©). Update the "last updated" date in `index.html` when content changes.
7. ANETI entry is "ISAM Formation · for ANETI" (FR "pour l'ANETI"); both logos stay in the strip; content.md updated.
- web-design-guidelines pass: skip link, reduced motion now stops marquee/orbit/network canvas/rotator, no `transition:all`, width/height on edu and course images (`img{height:auto}` globally), rotator no longer an aria-live region.

## Round 2 (2026-10-01, the user's feedback)
- Closing band + big footer **removed** (the user hated them: "filling a blank"). Old one-line footer is back. Ideas for a real, working ending are proposed to the user; build only the one they pick.
- About last row is now 25% · 25% · 50%: certifications box lists the 8 codes, institutions box lists the 9 names, languages show three columns (name, level, bar) on wide screens.
- Logo strip stopped because the guidelines pass froze every animation under prefers-reduced-motion (the user's phone has it on). The strip is exempt now (90s loop) and only pauses on hover for real mouse devices. Under reduced motion the typing rotator, network canvas and orbit still stand still: ask the user if they want those back.
- Contact QR now encodes the URL of the .vcf (version 5, was 13) so phones open the file and offer "Create new contact"; `netlify.toml` serves `.vcf` as `text/vcard`. It points at the production domain, so it works after merge; test now with the deploy-preview .vcf URL. A phone that already holds the same number (the user's own) may still offer to merge.

## Round 3 (2026-10-02)
- 1,000+ hours box: "Longest programmes" tags (AI 150 h, DevSecOps 120 h, DevOps 100 h, AWS 100 h) at the top.
- Hero rotator: "build AI systems & cloud infrastructure"; third role is now "design high-availability platforms".
- Footer = logo + © only.
- New `#training` section (nav "Training"/"Formations"): six real programmes as rows (hours · title/outcome/stack · delivered for · Request it mailto). Open: hours for "DevOps from zero" and "Linux & networking".
- Motto block before the footer; wording is a draft the user may replace.
- Nav collapses to the burger below 1180px now (7 links); Hire me button still shows down to 1020px.

## Round 4 (2026-10-02)
- Animations back as before the guidelines pass (caret blink, network canvas, orbit, rotator run even with reduce-motion on; the user's phone has it on and wants motion). Only reveals, name intro, floating badges and two project art loops stop under reduce-motion, as originally.
- "Popular programs" (FR "Programmes phares") label in the 1,000+ hours box.
- Training rows are rendered from `PROGS` in `main.js` (like `EXP`). Click a row → `#progDlg` modal: hours, description, facts, phases (if any), tags, **Download (Word)** if `doc` is set, **Customise** = mailto in a new tab with subject + template body. Only the 130 h AI/ML/AWS programme has a Word file (`res/programmes/AI-ML-AWS-Cloud-130h.docx`, the user's test file, now public). Others say "Detailed syllabus on request" until the user sends their .docx.
- **Programme Word files are generated** (white + gold template, 2026-10-04): data in `programmes/<slug>.json`, look in `STYLES` of `scripts/build_programmes.py`, output `res/programmes/<file>`. Every block uses a named Word style ("Prog …", Heading 1/2, "Prog Table"). Page 1 is a black cover (user picked "C-wall" of 7 options, then: only 3 tile rows at the top, fading out): editable by hand in Word: black page = locked image in the first-page header; tile band (TILES, COVER_ROWS, TILE_COLS; PyMuPDF) = unlocked picture "Cover tiles" behind the text; author block (logo + name + site, never a footer-style line) = floating table at AUTHOR_Y. Sync reports moved/resized pictures and floating tables in cm; copy them into those constants. Pages 2+: logo in the footer, not the header (user's edit). Cover shows one big gold hours figure (sum of phases, or "hours" in the JSON); never sessions/week or hours/session (user: irrelevant). Subtitle without "Path B (v2)".
  The user edits the .docx in Word; then `python scripts/sync_programmes.py` writes text edits back to the JSON and prints style / hand-formatting / header changes (compared against a Word-resaved rebuild, so only real edits show; needs Word). Fold look changes into `STYLES`, then `build_programmes.py --force`. The build refuses to overwrite a docx edited since its last build (`programmes/.built.json`).
  Content issues spotted in the 130 h file, to discuss: phase 7 chapters = 19.5 h vs 18 h; two "Project 5" in the original (now auto-numbered → 7, portfolio lists 6); Key facts repeat page 1; "Notes" are trainer-facing (AWS costs, where to cut).
- Motto is a full-width photo band (`res/desk.jpg` = the original site's desk photo), then the footer: logo · © … All rights reserved · Legal notice / Privacy / Terms of use (one `#legalDlg`, EN+FR).
- All sections share `--wrap: 1280px`; the Experience panel is a full-height card.
- **QR now points at the deploy-preview .vcf** because production still runs the old site (404). **Before/at merge to main: regenerate `res/contact-qr.svg` with the production URL** (segno, error='m', scale=10, border=3, dark #07070a, light #f3efe6).

## Round 5 (2026-10-02)
- Nav: brand "Mohamed Aziz BEN HAHA" (exact casing, the user's word), Contact link removed, gold button "Contact me" / "Me contacter", nav max-width 1180px (aligned with sections).
- Motto (the user merged options 3+4): "Build it. Automate it. Then teach what runs in production." / « Le construire. L'automatiser. Puis enseigner ce qui tourne en production. » Signature in Mrs Saint Delafield (Google Fonts), like the LinkedIn banner. Photo band no longer `fixed` (zoomed out), lighter overlay.
- Footer: logo + "© 2026 Mohamed Aziz Ben Haha. All rights reserved." left, the hero contact buttons right. Legal notice / Privacy / Terms and their dialog removed on the user's word.
- Training: first 5 programmes, then the same Show more / Show less as courses (shared `MORE` list in `main.js`).
- QR restyled like the phone's contact QR (dots, round eyes, LinkedIn photo `res/contact-photo.jpg` in the centre, error level H, decoded OK with zxing-cpp). The phone's own QR embeds the vCard with BDAY: not published. `.vcf` now has FN "Mohamed Aziz BEN HAHA" and the photo (CRLF kept via `.gitattributes`). Regenerating the QR for production: same recipe, URL https://mohamedazizbenhaha.netlify.app/res/mohamed-aziz-ben-haha.vcf.

## Round 6 (2026-10-02)
- Footer: more space between logo and copyright.
- Motto: `fitMotto()` sizes each line so both start and end at the same edges (blockquote max 980px); re-runs on fonts ready, resize, language. Signature smaller, right-aligned, gold dash before it.
- Programme modal: "Rhythm" fact removed; buttons **Book** (booking template) · **Customise** (customisation template) · Download (Word) if a doc exists. Both mails open in a new tab with subject + body.
- Every plain contact mailto (hero, modal "Email me", footer) gets a default subject ("Contact from your website" / « Prise de contact depuis votre site »), set by `setMailSubjects()`.
- Portrait: no tilt, no hover effect, 10px corners.

## Round 7 (2026-10-02)
- New hero portrait (the user's choice): AI portrait generated from their recent photos (they are 28; older photos were from age 24). "AI" watermark painted out, cropped 4:5, 880×1100 (`res/portrait.jpg`). Source: `Downloads/2026-10-02_02-02-51_Lumina.png`. QR centre and contact-card photo still use the LinkedIn photo.

## Round 8 (2026-10-02)
- Name written "Mohamed Aziz BEN HAHA" everywhere on the page (hero h1, title/meta, alt texts, signature, footer ©), the user's word: case sensitive.
- Signature = `res/signature.svg`: "Mohamed Aziz ben Haha" (this exact casing, the user's word, signature only) in Pantai Bali (DYSA Studio, dafont, personal use; the user's choice for a personal resume) converted to vector outlines with fontTools, so no font file is published. Regenerate from `Downloads/pantai_bali.zip`.

## Deviations from the recommendations
- Hero status keeps availability: "Based in Écully, France · working with Tunisia · open to missions & training" (the green "available" dot would be meaningless with location only). Wraps to two lines on a 375px phone.
- Mentor card got its own icon (`#i-team`) since it lost the counters.
- Education: chose the "centre under dots" option (symmetric at 1440 and 1024).

## Still open (ask the user only when the task needs it)
- Freelance projects for Industry (client type, what, stack, year); old site claimed "15+ CI/CD pipelines on freelance projects".
- More detail per teaching role; other supervised PFE projects.
- What "replace" meant at the end of the user's message on 2026-10-01 (it was cut off).
- Guidelines items not done (low value or need the user): logo-strip images have no width/height attributes (CSS fixes their height, no visible shift); the marquee has no pause control (it stops under reduced motion).
- Merge `redesign` → `main` (production) needs the user's word. Then switch the QR to the production URL (see Round 4).
- Word files for the training programmes: done 2026-10-05 (all 39 courses).
- Phone "Desktop site" mode renders ~980px; the nav collapses below 1020px. If the user wants the full nav there, lower that breakpoint.
- Main CV PDF says "500+ heures"; the site says 1,000+. The user should update the PDF.
- Old Gmail app password: revoked by the user 2026-10-05 (done).
