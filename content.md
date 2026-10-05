# Resume content: the single source for the site

Built 2026-10-01 from `W:\myphd\administrative\cv - Mohamed Aziz BEN HAHA (1).pdf` (main CV, FR)
and `CNFCPP Mohamed Aziz ben Haha.pdf` (official trainer form, edited 2025-10-07; dates only).
The site shows what is here, in English and French (toggle). Deploy: push to main (Netlify linked to GitHub). Edit this file first, then the page. `[?]` = open point, not published until resolved.
Public repo: no ID number, birth date or home address, ever.

## Identity
- **Mohamed Aziz Ben Haha**
- Cloud & DevOps Engineer, specialising in AI · Professional and university trainer · PhD candidate (ML for embedded systems and IoT)
- Email: mohamedaziz.benhaha@gmail.com
- Phone: +216 25 713 413 (WhatsApp) · +33 6 05 72 05 98 (both public)
- Location: Écully, Rhône, France
- LinkedIn: linkedin.com/in/mohamed-aziz-ben-haha · Channel: The_Thesis_Club · bento.me/mohamed-aziz-ben-haha

## Profile
- Cloud & DevOps engineer (CKA, AWS Solutions Architect, AWS SysOps).
- PhD candidate in AI applied to embedded systems and IoT.
- Production infrastructure (Ooredoo, freelance), DevSecOps automation, AI solutions (RAG, computer vision, predictive models).
- Certified trainer: 500+ hours of Cloud, DevOps and AI training delivered to companies.

## Education
| Degree | School | Dates |
|---|---|---|
| PhD (Machine Learning), cotutelle | Sup'Com (Univ. Carthage, Innov'COM) · École Centrale de Lyon (Ampère) | 2024 – present |
| Engineering degree, Cloud Computing & DevOps | ESPRIT | 09/2018 – 11/2023 |
| Medicine | Faculté de Médecine de Tunis | 09/2016 – 07/2019 |

PhD topic: an autonomous, intelligent environmental biomonitoring platform (IoT–Cloud architecture and embedded AI),
inside the GreenWaterGuard project (microbial fuel cell sensors for real-time water quality, PHC Utique 2025–2027).

## Experience
### Industry
- **Infrastructure & DevOps Consultant**, IPACT Consult · 04/2025 – 10/2025 · La Marsa
  - Rebuilt server infrastructure and system configuration for two startups with no DevOps process.
  - Replaced fragmented individual practices with one unified deployment pipeline.
  - Designed end-to-end server architecture to support team growth.
  - Linux · Ansible · Docker · Nginx · Git · Jenkins · Grafana · Prometheus · Azure
- **DevOps Engineer**, PASS Consulting Group · 07/2024 – 02/2025 · Remote
  - Hired as a JEE developer, promoted to DevOps after building CI/CD pipelines (Jenkins, Docker, SonarQube, JUnit, Git) validated by the German client team.
  - Designed and deployed automated deployment pipelines, consistent across environments.
  - Documented development phases for future maintenance; automated repetitive tasks.
  - JEE · Jenkins · Docker · Grafana · SonarQube · JUnit · Git · K8s · Ansible
- **Cloud & DevOps Intern**, Ooredoo Tunisie · 02/2023 – 09/2023 · Lac 2, Tunis
  - Built operational monitoring dashboards for daily platform supervision.
  - Architecture plans for high availability, failover and backup of critical systems.
  - Built a contingency-plan automation tool that contains incidents when no engineer is on site.
  - ViPR SRM · vROps · HAProxy · NFS · Virtualisation · Jenkins · Ansible · Docker · Terraform · Kubernetes · Grafana · Prometheus · Selenium · JMeter · Spring Boot · Neo4j

### Teaching
- **Cloud, DevOps & AI Trainer**, ISAM Formation, for ANETI (Bureau Emploi et Travail Indépendant) · 08/2025 – 01/2026 · La Goulette (the user, 2026-10-01: the ANETI trainings were delivered through ISAM Formation)
  - End-to-end AI programme (150 h): pairs of learners from zero to models trained on real data, defended before a jury. One team's stock-market decision-support model was picked up by BNA for further development.
  - Azure DevSecOps (120 h) · Azure DevOps (100 h) · AWS Cloud (100 h, Cloud Practitioner / Developer / Solutions Architect prep)
- **Cloud Computing Lecturer**, MUST University · 09/2025 – 08/2026 (from the CNFCPP form)
- **Lecturer, Linux & CCNA**, Sup'Com · 02/2025 – 05/2025
- **Lecturer, Artificial Intelligence**, ENSTAB · 01/2025 – 05/2025
- **Spring Boot & Angular Trainer**, TTC Recrutement · 03/2024 – 06/2024
- **Cloud & DevOps Trainer**, Clevory Training / TED University (ispTED) · 10/2023 – 07/2024 · Tunis
- **DevOps Trainer**, GoMyCode · 01/2023 – 01/2024

### Final-year project supervision (PFE)
- Security incident response automation for Institut Pasteur de Tunis: threat detection, autonomous predefined playbooks, corrective recommendations, remediation guides.
- Plant disease detection from leaf photos (computer vision), now becoming a startup with support from the Ministry of Agriculture.
- Stock management app for a veterinary practice with automatic supplier contact on stock-out (deployed).

## Projects (site layout decided by the user, 2026-10-05)
Row 1: **Life OS** (big) · **Create Life** (repo my_baby, public). Row 2: **Thesis ecosystem** · **GreenWaterGuard · PhD** · **The Thesis Club** (YouTube).
Subprojects, grouped by family. Names chosen by the user: LifeFit (was GymTracker), LifeNotes, LifeWallet; ThesisLens (was SIADGI), ThesisPilot (the PhD research system in W:\myphd\claude).
Dropped on the user's word: Air-Canvas; the AI behavioural budgeting app (a supervised PFE: it belongs to supervision only, never to Projects).
- **Life OS** (W:\My Systems\Life OS): PWA, tasks, reminders, notes, calendar, groceries; one typed or spoken sentence -> AI actions, validated, one-tap undo. Grew from the gym app. Modules are separate apps sharing one sync key, read-only links between them.
  - LifeFit (W:\My Systems\Gym APP, private repo gym-tracker): training log, progress charts, AI coach, cloud sync; feeds its food list to Life OS groceries.
  - LifeNotes: the Notes tab of Life OS.
  - LifeWallet: in progress, spending and budget tracking.
- **Create Life** (github.com/mohamedazizbenhaha/my_baby, public): architecture for a self-improving personal AI: local LLaMA, owner-only voice recognition, self-evolution loop on modifiable code, fixed core principles, Docker Compose, logging, Flask web UI. Wording kept plain on the site (no "immortal").
- **Thesis ecosystem** (W:\phd matcher): microservices on Kubernetes with Helm, Next.js, PostgreSQL, Prisma.
  - ThesisVault + ThesisVaultLibrary (public repos): the PhD library and one page per researcher (manuscript, articles, presentation, images, videos, research team).
  - ThesisMatcher (public repo): supervisors propose subjects, students apply or propose; application status tracking; NextAuth.
  - ThesisLens (ex SIADGI, private repo, no link): free Windows desktop app, point it at a folder, ask questions, answers cite your own files (page and passage), checked sentence by sentence; local models, cloud optional; text-to-SQL over DuckDB with Plotly charts. Python · FastAPI · React · TypeScript · Ollama · LiteLLM · LanceDB · DuckDB · docling · MCP. A simplified version is adapted by a PFE student I supervise (not shown under Projects).
  - ThesisPilot (private repo phd-system, no link): the PhD research system on Claude Code: one space per paper (literature sync via Zotero MCP, concept notes, knowledge graph, citation audit, cold read, peer-review pass), lab notebook with write-once checksummed data, CST report.
- **GreenWaterGuard · PhD**: see Experience/PhD. Subprojects: water-quality gateway firmware (ESP32, Modbus RTU, MQTT), floating MFC reactor (parametric CAD, 3D printing).
- **The Thesis Club** (youtube.com/@The_Thesis_Club): podcast series "The Researcher's Path: From Idea to Thesis" and shorts on research methods.

## Certifications
| Certificate | Issuer | Year |
|---|---|---|
| AWS Certified Solutions Architect – Associate | AWS | 2025 |
| AWS Certified SysOps Administrator – Associate | AWS | 2025 |
| Certified Kubernetes Administrator (CKA) | Linux Foundation | 2024 |
| LPI DevOps Tools Engineer | LPI | 2024 |
| AWS Certified Cloud Practitioner | AWS | 2024 |
| AZ-900 Azure Fundamentals | Microsoft | 2024 |
| CCNAv7 | Cisco | 2021 |

## Languages
Arabic (native) · English (advanced, IELTS 7.5) · French (advanced, DALF C1)

## Free courses (from the current site; keep?)
Introduction to AI · Big Data workshop · Academic writing · Cloud infrastructure management · Virtualization

## Site decisions (2026-10-01)
- Experience tabs: Industry · Universities (MUST, Sup'Com, ENSTAB, TED University) · Professional training (ISAM Formation · for ANETI, Clevory, TTC, GoMyCode) · Supervision.
- Downloads: `res/CV-Mohamed-Aziz-Ben-Haha.pdf` (main CV, FR) and `res/CV-Formateur-CNFCPP.pdf` (trainer form for companies; ID number, birth date/place and address blacked out).
- More projects: superseded 2026-10-05 by the Projects layout above.
- Logo strip: Centrale Lyon, Sup'Com, MUST, ENSTAB, ESPRIT, TED, Clevory, ANETI, GoMyCode, ISAM Formation, TTC, Ooredoo, PASS, IPACT, Klabs (Klabs kept on the user's word, not in the CVs).
- Course progress: AI 40%, Big Data 95%, Academic Writing 100%, Cloud Infrastructure 100%, Virtualization 60%.
- Pending from the user: freelance projects (Industry), more detail per teaching role, other supervised projects.
- "9 universities & training centres" = MUST, Sup'Com, ENSTAB, TED, ISAM, ANETI, Clevory, TTC, GoMyCode (ISAM and ANETI both count). "8 certifications" = the table above.
- Certification years stay in the table above but are not shown on the site; the card shows the issuer only for Linux Foundation, Red Hat, Microsoft, Cisco.
- Location is in the hero status line ("Based in Écully, France · working with Tunisia · open to missions & training").
- Location is no longer in the footer: the closing band and big footer were removed on the user's word (2026-10-01, "filling a blank"). Page ends after Free courses with the one-line footer until the user picks a real feature.
- About last row: certifications (with the 8 codes) 25% · institutions (the 9 names) 25% · languages 50%.
- Contact QR encodes the URL of `res/mohamed-aziz-ben-haha.vcf` (production domain), not the vCard text.
- 2026-10-02: hero rotator starts with "build AI systems & cloud infrastructure" (not RAG; the user's word). Footer = logo + © only.
- Training programmes section (between Certifications and Free courses), only real programmes: End-to-end AI 150 h, Azure DevSecOps 120 h, Azure DevOps 100 h, AWS Cloud 100 h (ANETI via ISAM; AWS also TED, Clevory), DevOps from zero (GoMyCode, Clevory) and Linux & networking (Sup'Com) with "length on request". "Request it" = mailto with the programme in the subject. `[?]` hours for DevOps from zero and Linux & networking.
- Motto before the footer (drafted by Claude, the user to confirm or replace): "It isn't done until it runs, and someone else can run it too." / « Ce n'est fini que quand ça tourne, et que d'autres savent le faire tourner. »
- 2026-10-02: Training programmes now also include "AI, Machine Learning & AWS Cloud", 130 h, 8 phases (Python & data stack 12 h · supervised 24 h · unsupervised 12 h · RL 9 h · neural nets & DL 21 h · AWS foundations & AI Practitioner 21 h · AWS data engineering 18 h · AWS GenAI & MLOps 13 h), certifications AIF-C01 · CLF-C02 · DEA-C01, audience IT professionals with basic Python. Source: the user's `AI_ML_AWS_Curriculum_130h (2).docx` (was published as `res/programmes/AI-ML-AWS-Cloud-130h.docx`; retired, file deleted 2026-10-05, replaced by the 39-course catalogue).
- Footer legal text: publisher Mohamed Aziz Ben Haha, Écully (Rhône), France; host Netlify, Inc.; no cookies/analytics; Google Fonts; content © the user.
- Name casing everywhere on the site: "Mohamed Aziz BEN HAHA" (the user's word, case sensitive).
- Motto: "Build it. Automate it. Then teach what runs in production." (FR « Le construire. L'automatiser. Puis enseigner ce qui tourne en production. »). LinkedIn banner quote, not used yet: "Forget the applause, forget the spotlight. Change the world for the sake of the change itself. It's about the impact, not the credit."
- Contact photo: LinkedIn profile photo (res/contact-photo.jpg). Never publish the phone-generated contact QR: it contains the birthday.
