"""
Write cv/cv-en.html from cv/cv-fr.html (same layout, English text).

    python scripts/cv_en.py && python scripts/build_cv.py

Every French string must be found: after editing the French CV, update the pair here
(the script stops and names the strings it could not find).
"""
import pathlib, re

root = pathlib.Path(__file__).resolve().parent.parent / "cv"
s = (root / "cv-fr.html").read_text(encoding="utf-8")
T = [
    ('<html lang="fr">', '<html lang="en">'),
    ('<title>CV Mohamed Aziz BEN HAHA</title>', '<title>Resume Mohamed Aziz BEN HAHA</title>'),
    ('Ingénieur Cloud &amp; DevOps — Spécialisation Intelligence Artificielle<br>Formateur Professionnel et Universitaire',
     'Cloud &amp; DevOps Engineer — Artificial Intelligence Specialization<br>Professional and University Trainer'),
    ('<h2>PROFIL</h2>', '<h2>PROFILE</h2>'),
    ("- Ingénieur Cloud et DevOps (CKA, AWS Solutions Architect, AWS SysOps)",
     "- Cloud and DevOps Engineer (CKA, AWS Solutions Architect, AWS SysOps)"),
    ("- Doctorant en IA appliquée aux systèmes embarqués et à l'IoT",
     "- PhD candidate in AI applied to embedded systems and IoT"),
    ("- Expérience en infrastructure de production (Ooredoo, freelance), automatisation DevSecOps, et développement de solutions IA (RAG, computer vision, modèles prédictifs)",
     "- Experience in production infrastructure (Ooredoo, freelance), DevSecOps automation, and AI solution development (RAG, computer vision, predictive models)"),
    ('- Formateur certifié ayant délivré plus de <span class="nw">1 000</span> heures de formation Cloud, DevOps et IA auprès d\'entreprises',
     '- Certified trainer with <span class="nw">1,000+</span> hours of Cloud, DevOps and AI training delivered to companies'),
    ('<h2>EXPÉRIENCE</h2>', '<h2>EXPERIENCE</h2>'),
    ('Formateur Cloud, DevOps &amp; Intelligence Artificielle', 'Cloud, DevOps &amp; Artificial Intelligence Trainer'),
    ('ANETI - Bureau Emploi et Travail Indépendant', 'ANETI - Employment and Self-Employment Office'),
    ("<b>Programme IA de bout en bout (150h)</b> : formation de binômes d'apprenants de zéro jusqu'à la conception de modèles entraînés sur des jeux de données réels, avec soutenance devant jury. Un projet d'un binôme (modèle prédictif d'aide à la décision boursière) a été repéré par la BNA pour un développement ultérieur.",
     "<b>End-to-end AI programme (150h)</b>: trained learner pairs from zero to designing models trained on real datasets, defended before a jury. One pair's project (a predictive model for stock-market decision support) was picked up by BNA bank for further development."),
    ("<b>Cloud AWS (100h)</b> : préparation aux certifications Cloud Practitioner, Developer, Solutions Architect",
     "<b>AWS Cloud (100h)</b>: preparation for the Cloud Practitioner, Developer and Solutions Architect certifications"),
    ("Refondu intégralement l'infrastructure serveur et les configurations système de deux startups ne disposant d'aucun processus DevOps structuré.",
     "Rebuilt the entire server infrastructure and system configuration of two startups that had no structured DevOps process."),
    ("Standardisé les workflows de déploiement, remplaçant des pratiques individuelles fragmentées par un pipeline unifié.",
     "Standardized deployment workflows, replacing fragmented individual practices with a single unified pipeline."),
    ("Conçu l'architecture serveur de bout en bout pour soutenir la croissance des équipes techniques.",
     "Designed the end-to-end server architecture to support the growth of the engineering teams."),
    ('<h3>Ingénieur DevOps</h3>', '<h3>DevOps Engineer</h3>'),
    ("Recruté initialement comme développeur JEE, promu vers une fonction DevOps après la mise en place de pipelines CI/CD (Jenkins, Docker, SonarQube, JUnit, Git) validés par l'équipe cliente allemande.",
     "Hired as a JEE developer, promoted to a DevOps role after building CI/CD pipelines (Jenkins, Docker, SonarQube, JUnit, Git) approved by the German client team."),
    ("Conçu et déployé des pipelines de déploiement automatisés, garantissant des mises à jour logicielles cohérentes sur l'ensemble des environnements.",
     "Designed and deployed automated deployment pipelines, ensuring consistent software updates across all environments."),
    ("Documenté les phases de développement pour faciliter la maintenance future.",
     "Documented the development phases to ease future maintenance."),
    ("Automatisé des tâches répétitives, augmentant la productivité de l'équipe.",
     "Automated repetitive tasks, increasing team productivity."),
    ('<h3>Formateur Cloud et DevOps</h3>', '<h3>Cloud and DevOps Trainer</h3>'),
    ('<h3>Stagiaire Cloud &amp; DevOps</h3>', '<h3>Cloud &amp; DevOps Intern</h3>'),
    ('Ooredoo Tunisie', 'Ooredoo Tunisia'),
    ('NFS · Virtualisation ·', 'NFS · Virtualization ·'),
    ("Conçu et déployé des tableaux de bord de supervision opérationnelle pour le monitoring quotidien de la plateforme.",
     "Designed and deployed operational monitoring dashboards for daily platform supervision."),
    ("Créé des plans d'architecture garantissant la haute disponibilité, le failover et la sauvegarde des systèmes critiques.",
     "Created architecture plans ensuring high availability, failover and backup of critical systems."),
    ("Développé un outil d'automatisation de plans de contingence pour contenir les incidents en l'absence d'un ingénieur sur site.",
     "Built a contingency-plan automation tool to contain incidents when no engineer is on site."),
    ("<h2>ENCADREMENT DE PROJETS DE FIN D'ÉTUDES (PFE)</h2>", "<h2>FINAL-YEAR PROJECT SUPERVISION</h2>"),
    ("Outil intelligent d'automatisation de la réponse aux incidents de sécurité pour l'Institut Pasteur de Tunis : détection des menaces, application autonome de scénarios de réponse prédéfinis, recommandation de mesures correctives et génération de guides détaillés de remédiation.",
     "Intelligent security incident response automation tool for Institut Pasteur de Tunis: threat detection, autonomous execution of predefined response playbooks, corrective-action recommendations and detailed remediation guides."),
    ("Outil de détection de maladies des plantes par vision par ordinateur, à partir de photographies de feuilles - projet actuellement en phase de transformation en startup avec l'accompagnement du Ministère de l'Agriculture.",
     "Computer-vision plant disease detection from leaf photographs - currently being turned into a startup with support from the Ministry of Agriculture."),
    ("Développé une application de gestion de stock incluant un module d'automatisation contactant directement les fournisseurs en cas de rupture, pour un établissement vétérinaire - projet déployé.",
     "Inventory management application with an automation module that contacts suppliers directly when stock runs out, for a veterinary practice - deployed."),
    ('<h2>PROJETS</h2>', '<h2>PROJECTS</h2>'),
    ("SIADGI — Système Intelligent d'Analyse Documentaire et de Génération d'Insights",
     "SIADGI — Intelligent Document Analysis and Insight Generation System"),
    ("Système RAG interrogeant en langage naturel des corpus documentaires hétérogènes (PDF, DOCX, XLSX, CSV), avec réponses citées et vérifiables.",
     "RAG system answering natural-language questions over heterogeneous document collections (PDF, DOCX, XLSX, CSV), with cited, verifiable answers."),
    ("Pipeline Text-to-SQL vers des requêtes DuckDB validées, avec génération automatique de graphiques interactifs Plotly.",
     "Text-to-SQL pipeline producing validated DuckDB queries, with automatic interactive Plotly charts."),
    ("RAGAS Faithfulness ≥ 0,82 sur 50 questions de test, latence end-to-end &lt; 6 secondes (95e percentile), architecture zéro coût.",
     "RAGAS Faithfulness ≥ 0.82 on a 50-question test set, end-to-end latency &lt; 6 seconds (95th percentile), zero-cost architecture."),
    ("Application de gestion budgétaire comportementale par IA — en cours", "AI-powered behavioral budgeting app — in progress"),
    ("Agent conversationnel d'assistance financière personnalisée, avec mémoire long terme (historique transactionnel et contexte conversationnel).",
     "Conversational agent for personalized financial assistance, with long-term memory (transaction history and conversation context)."),
    ("Système hybride « Rule-Based + LLM » : contraintes financières explicites et raisonnement des modèles de langage.",
     "Hybrid Rule-Based + LLM system: explicit financial constraints combined with language-model reasoning."),
    ("Pipeline multimodal : saisie vocale, extraction d'entités financières et classification automatique des transactions.",
     "Multimodal pipeline: voice input, financial entity extraction and automatic transaction classification."),
    ('<h2>ÉTUDES</h2>', '<h2>EDUCATION</h2>'),
    ('<h3>Thèse de Doctorat (Machine Learning)</h3>', '<h3>PhD (Machine Learning)</h3>'),
    ('11/2024 - Présent', '11/2024 - Present'),
    ('<h3>Ingénieur Cloud Computing et DevOps</h3>', '<h3>Engineering Degree, Cloud Computing and DevOps</h3>'),
    ('<h3>Médecine</h3>', '<h3>Medicine</h3>'),
    ('FMT - Faculté De Médecine De Tunis', 'FMT - Faculty of Medicine of Tunis'),
    ('<h2>LANGUES</h2>', '<h2>LANGUAGES</h2>'),
    ('<div>Arabe <span class="yr">· Native</span></div>', '<div>Arabic <span class="yr">· Native</span></div>'),
    ('<div>Anglais <span class="yr">· Avancé - IELTS 7.5</span></div>', '<div>English <span class="yr">· Advanced - IELTS 7.5</span></div>'),
    ('<div>Français <span class="yr">· Avancé - DALF C1</span></div>', '<div>French <span class="yr">· Advanced - DALF C1</span></div>'),
]
missing = [a[:70] for a, _ in T if a not in s]
assert not missing, missing
for a, b in T:
    s = s.replace(a, b)
(root / "cv-en.html").write_text(s, encoding="utf-8")
body = re.sub(r"(?s)<svg.*?</svg>|<script.*?</script>", "", s)
print("accented words left:", sorted(set(re.findall(r"\w*[éèàùçêôÉ]\w*", body))))
