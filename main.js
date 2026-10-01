/* Content lives in content.md; this file holds the French copy, the experience data and the interactions. */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const store = { get: k => { try { return localStorage.getItem(k) } catch { return null } }, set: (k, v) => { try { localStorage.setItem(k, v) } catch {} } };

/* ---------- copy ---------- */
const FR = {
  'nav.about': 'Profil', 'nav.exp': 'Expérience', 'nav.proj': 'Projets', 'nav.certs': 'Certifications', 'nav.train': 'Formations', 'nav.courses': 'Cours gratuits', 'nav.hire': 'Me contacter',
  'hero.status': 'Basé à Écully, France · en lien avec la Tunisie · ouvert aux missions et formations',
  'hero.pre': 'Je',
  'hero.lede': 'Ingénieur Cloud &amp; DevOps (CKA, AWS Solutions Architect &amp; SysOps) et praticien IA/ML, formateur avec <b>plus de 1 000 heures</b> dispensées en universités et en entreprises, et doctorant en machine learning pour l’IoT embarqué à <b>Sup’Com × École Centrale de Lyon</b>.',
  'hero.cta': 'Travaillons ensemble', 'hero.cv': 'Télécharger le CV', 'hero.cv2': 'CV formateur (CNFCPP)',
  'logos.title': 'Enseigné, construit et étudié avec',
  'about.t1': 'Ingénieur. Chercheur.', 'about.t2': 'Formateur.',
  'about.eng.h': 'Je construis',
  'about.eng.p': 'Des systèmes d’IA et l’infrastructure qui les fait tourner. Des pipelines RAG qui répondent à partir de vos propres documents avec des citations vérifiées, des modèles de machine learning entraînés sur données réelles et déployés dans le cloud ou sur site, et toute l’automatisation autour : CI/CD, infrastructure as code, supervision, haute disponibilité. En production chez Ooredoo, PASS et IPACT.',
  'about.teach.h': 'J’enseigne',
  'about.teach.p': 'Le Cloud, le DevOps et l’IA, de bout en bout. Les apprenants partent de zéro jusqu’à un modèle d’IA/ML fonctionnel déployé sur une infrastructure cloud ou en local, avec les services d’IA managés du cloud ou des modèles qu’ils construisent eux-mêmes.',
  'about.mentor.h': 'J’encadre des projets', 'about.mentor.p': 'Projets de fin d’études (PFE) et de fin d’année d’élèves ingénieurs et de masters, à l’université ou en entreprise : du sujet et de l’architecture jusqu’à la soutenance.',
  'about.res.h': 'Je fais de la recherche',
  'about.res.p': 'Doctorat en machine learning pour l’IoT embarqué : une plateforme autonome qui surveille la qualité de l’eau en temps réel.',
  'stat.hours': 'heures de formation dispensées', 'stat.certs': 'certifications', 'stat.schools': 'universités et centres de formation',
  'about.lang.h': 'Langues', 'lang.ar': 'Arabe', 'lang.en': 'Anglais', 'lang.fr': 'Français', 'lang.native': 'Langue maternelle',
  'exp.t1': 'Là où j’ai', 'exp.t2': 'livré et enseigné.', 'exp.ind': 'Industrie', 'exp.uni': 'Universités', 'exp.pro': 'Formation professionnelle', 'exp.pfe': 'Encadrement',
  'proj.t1': 'Ce que je', 'proj.t2': 'construis.',
  'p1.tag': 'Questions-réponses sur vos documents, en local, avec citations vérifiées',
  'p1.p': 'Une application de bureau Windows gratuite : indiquez un dossier, posez vos questions, obtenez des réponses qui citent vos propres fichiers, page et passage, vérifiées phrase par phrase. Tout tourne sur votre ordinateur avec des modèles locaux ; le cloud est facultatif. Inclut le text-to-SQL sur tableurs avec graphiques automatiques. Une version simplifiée est reprise par un étudiant de PFE que j’encadre.',
  'p2.tag': 'Biosurveillance autonome et intelligente de la qualité de l’eau',
  'p2.p': 'Des piles à combustible microbiennes utilisées comme capteurs vivants, un boîtier d’acquisition IoT, et du machine learning embarqué pour lire la qualité de l’eau en temps réel. Projet franco-tunisien (PHC Utique 2025–2027) entre Innov’COM, Sup’Com, et le laboratoire Ampère, École Centrale de Lyon.',
  'p3.h': 'Application de budget comportemental par IA', 'p3.tag': 'En cours · issue d’un PFE que j’ai encadré',
  'p3.p': 'Un agent d’assistance financière avec mémoire long terme, un moteur hybride règles + LLM pour les plans de budget et d’épargne, la saisie vocale avec extraction d’entités, et la détection des dépenses impulsives.',
  'f.all': 'Tout', 'f.ai': 'IA', 'f.iot': 'IoT & recherche', 'f.app': 'Applications', 'f.ops': 'Cloud & DevOps',
  'm1.h': 'Firmware de passerelle qualité de l’eau', 'm1.p': 'Firmware ESP32 qui lit des sondes pH, ORP, conductivité, oxygène dissous et température via Modbus RTU et deux ADC, et publie en JSON sur MQTT. Configuration sur le terrain via une application web Wi-Fi captive.',
  'm2.h': 'Réacteur MFC flottant', 'm2.p': 'CAO paramétrique générée par code pour une unité capteur flottante à pile à combustible microbienne : trois prototypes, vérifications de flottabilité, plateaux d’impression pour imprimante Bambu et suite de tests automatisée.',
  'm3.p': 'Une application de suivi d’entraînement que j’utilise chaque jour sur mon téléphone : programme, saisie, graphiques de progression, coach IA et synchronisation cloud via fonctions serverless.',
  'm4.p': 'Tâches, rappels, notes, calendrier et courses dans une seule application. Tapez ou dictez une phrase : une IA la transforme en actions validées, annulables en un geste.',
  'm5.p': 'Une plateforme statique simple pour que les chercheurs partagent leurs travaux avec le monde. Open source.',
  'c.prog': 'Avancement du cours',
  'proj.more': 'Autres projets', 'p4.tag': 'Du langage naturel en entrée, des actions validées en sortie', 'p5.tag': 'Des sondes industrielles vers MQTT, configurées depuis un téléphone',
  'a4.q': '« Acheter du lait et appeler la banque demain à 10 h »', 'm6.p': 'Dessiner dans l’air avec les mains : le suivi de la main en temps réel transforme une webcam en toile.',
  'edu.now': '2024 → aujourd’hui',
  'ct.mail': 'M’écrire', 'ct.scan': 'Scannez pour m’ajouter à vos contacts', 'ct.vcf': 'Ajouter aux contacts',
  'cert.t1': 'Certifié,', 'cert.t2': 'pas seulement curieux.',
  'edu.h': 'Formation', 'edu.phd': 'Doctorat, Machine Learning (cotutelle)', 'edu.eng': 'Diplôme d’ingénieur, Cloud Computing &amp; DevOps', 'edu.med': 'Médecine',
  'course.t1': 'Cours gratuits,', 'course.t2': 'ouverts à tous.',
  'c1': 'Introduction à l’intelligence artificielle', 'c2': 'Atelier Big Data', 'c3': 'Rédaction académique', 'c4': 'Gestion d’infrastructure cloud', 'c5': 'Virtualisation',
  'ct.t1': 'Travaillons', 'ct.t2': 'ensemble.',
  'ct.p': 'Missions Cloud et DevOps, projets IA/ML, formation de vos équipes ou collaboration de recherche. Choisissez le canal qui vous convient.',
  'ct.copy': 'Copier l’e-mail', 'ct.fr': 'France', 'foot.top': 'Haut de page ↑',
  'skip': 'Aller au contenu',
  'stat.longest': 'Programmes phares',
  'tr.intro': 'Des programmes que je conçois et dispense pour des universités, des entreprises et des programmes publics pour l’emploi. Ouvrez-en un pour voir son contenu, le télécharger, ou demander une version adaptée à votre équipe : sur site en France ou en Tunisie, ou à distance.',
  'foot.rights': 'Tous droits réservés.',
  'tr.t1': 'Programmes de formation,', 'tr.t2': 'prêts à lancer.',
  'motto.1': 'Le construire. L’automatiser.', 'motto.2': 'Puis enseigner ce qui tourne en production.'
};
const ROLES = {
  en: ['build AI systems & cloud infrastructure', 'train and deploy ML models', 'design high-availability platforms', 'automate everything, CI/CD to IaC', 'teach Cloud, DevOps & AI'],
  fr: ['construis des systèmes d’IA et des infrastructures cloud', 'entraîne et déploie des modèles de ML', 'conçois des plateformes haute disponibilité', 'automatise tout, de la CI/CD à l’IaC', 'enseigne le Cloud, le DevOps et l’IA']
};
const UI = { en: { subj: 'Contact from your website', copied: 'Email copied', more: 'Show more', less: 'Show less' }, fr: { subj: 'Prise de contact depuis votre site', copied: 'E-mail copié', more: 'Voir plus', less: 'Voir moins' } };

/* Each entry: [org, role{en,fr}, dates, points{en[],fr[]}, stack] */
const EXP = {
  ind: [
    ['IPACT Consult', { en: 'Infrastructure & DevOps Consultant', fr: 'Consultant Infrastructure & DevOps' }, '04/2025 – 10/2025 · La Marsa',
      { en: ['Rebuilt the server infrastructure and system configuration of two startups that had no DevOps process.', 'Replaced fragmented individual practices with one unified deployment pipeline.', 'Designed the end-to-end server architecture to support the growth of their tech teams.'],
        fr: ['Refondu l’infrastructure serveur et les configurations système de deux startups sans processus DevOps.', 'Standardisé les workflows de déploiement : un pipeline unifié à la place de pratiques individuelles fragmentées.', 'Conçu l’architecture serveur de bout en bout pour soutenir la croissance des équipes techniques.'] },
      ['Linux', 'Ansible', 'Docker', 'Nginx', 'Git', 'Jenkins', 'Grafana', 'Prometheus', 'Azure']],
    ['PASS Consulting Group', { en: 'DevOps Engineer', fr: 'Ingénieur DevOps' }, '07/2024 – 02/2025 · Remote',
      { en: ['Hired as a JEE developer, promoted to DevOps after building CI/CD pipelines validated by the German client team.', 'Designed and deployed automated deployment pipelines, consistent across every environment.', 'Documented development phases for future maintenance and automated repetitive team tasks.'],
        fr: ['Recruté comme développeur JEE, promu DevOps après la mise en place de pipelines CI/CD validés par l’équipe cliente allemande.', 'Conçu et déployé des pipelines de déploiement automatisés, cohérents sur tous les environnements.', 'Documenté les phases de développement et automatisé les tâches répétitives de l’équipe.'] },
      ['JEE', 'Jenkins', 'Docker', 'SonarQube', 'JUnit', 'Grafana', 'K8s', 'Ansible', 'Git']],
    ['Ooredoo Tunisie', { en: 'Cloud & DevOps Intern', fr: 'Stagiaire Cloud & DevOps' }, '02/2023 – 09/2023 · Lac 2, Tunis',
      { en: ['Built the operational monitoring dashboards used for daily platform supervision.', 'Drew architecture plans for high availability, failover and backup of critical systems.', 'Built a contingency-plan automation tool that contains incidents when no engineer is on site.'],
        fr: ['Conçu et déployé les tableaux de bord de supervision opérationnelle de la plateforme.', 'Créé des plans d’architecture pour la haute disponibilité, le failover et la sauvegarde des systèmes critiques.', 'Développé un outil d’automatisation des plans de contingence qui contient les incidents sans ingénieur sur site.'] },
      ['ViPR SRM', 'vROps', 'HAProxy', 'Terraform', 'Kubernetes', 'Ansible', 'Jenkins', 'Prometheus', 'JMeter']]
  ],
  uni: [
    ['MUST University', { en: 'Cloud Computing Lecturer', fr: 'Enseignant Cloud Computing' }, '09/2025 – 08/2026 · Tunis',
      { en: ['Teaching cloud computing to university students.'], fr: ['Enseignement du cloud computing en cycle universitaire.'] }, ['Cloud Computing', 'AWS', 'Azure']],
    ["Sup'Com", { en: 'Lecturer, Linux & CCNA', fr: 'Enseignant vacataire, Linux & CCNA' }, '02/2025 – 05/2025 · Ariana',
      { en: ['Linux system administration and CCNA networking courses.'], fr: ['Cours d’administration système Linux et de réseaux CCNA.'] }, ['Linux', 'CCNA', 'Networking']],
    ['ENSTAB', { en: 'Lecturer, Artificial Intelligence', fr: 'Enseignant, Intelligence Artificielle' }, '01/2025 – 05/2025 · Borj Cédria',
      { en: ['AI courses: algorithms, machine learning and practical applications.', 'Supervised final-year projects.'], fr: ['Cours d’IA : algorithmes, machine learning et applications pratiques.', 'Encadrement de projets de fin d’études.'] }, ['AI', 'Machine Learning', 'Python']],
    ['TED University (ispTED)', { en: 'Cloud Computing Lecturer', fr: 'Enseignant Cloud Computing' }, '10/2023 – 07/2024 · Tunis',
      { en: ['Designed and taught Master’s-level courses on cloud computing and virtualization (VMware, Docker, Kubernetes).', 'Prepared students for AWS Cloud Practitioner, Developer and Solutions Architect.', 'Supervised end-of-studies internship projects.'],
        fr: ['Conçu et enseigné des cours de niveau master en cloud computing et virtualisation (VMware, Docker, Kubernetes).', 'Préparation des étudiants aux certifications AWS Cloud Practitioner, Developer et Solutions Architect.', 'Encadrement de projets de fin d’études.'] },
      ['AWS', 'Kubernetes', 'VMware', 'Docker']]
  ],
  pro: [
    [{ en: 'ISAM Formation · for ANETI', fr: 'ISAM Formation · pour l’ANETI' }, { en: 'Cloud, DevOps & AI Trainer', fr: 'Formateur Cloud, DevOps & IA' }, '08/2025 – 01/2026 · La Goulette',
      { en: ['End-to-end AI programme (150 h): pairs of learners from zero to models trained on real data, defended before a jury.', 'One team’s stock-market decision-support model was picked up by BNA for further development.', 'Azure DevSecOps (120 h), Azure DevOps (100 h), AWS Cloud (100 h) with certification prep.'],
        fr: ['Programme IA de bout en bout (150 h) : des binômes partis de zéro jusqu’à des modèles entraînés sur données réelles, soutenus devant jury.', 'Le modèle d’aide à la décision boursière d’un binôme a été repéré par la BNA pour un développement ultérieur.', 'Azure DevSecOps (120 h), Azure DevOps (100 h), Cloud AWS (100 h) avec préparation aux certifications.'] },
      ['Machine Learning', 'Azure DevSecOps', 'Azure DevOps', 'AWS']],
    ['Clevory Training', { en: 'Cloud & DevOps Trainer', fr: 'Formateur Cloud & DevOps' }, '10/2023 – 07/2024 · El Charguia, Tunis',
      { en: ['Upskilled professionals from several companies in Cloud Computing and DevOps.', 'Certification-focused programmes mixing labs and theory, preparing participants for international exams.'],
        fr: ['Montée en compétences de professionnels de plusieurs entreprises en Cloud Computing et DevOps.', 'Programmes orientés certification, mêlant labs et théorie, pour préparer les participants aux examens internationaux.'] },
      ['AWS', 'Kubernetes', 'DevOps', 'VMware']],
    ['TTC Recrutement', { en: 'Spring Boot & Angular Trainer', fr: 'Formateur Spring Boot & Angular' }, '03/2024 – 06/2024',
      { en: ['Took learners with little or no programming background to working Spring Boot & Angular developers, through a real-world final project run in Scrum.'], fr: ['Mené des apprenants sans bases solides en programmation jusqu’au niveau développeur Spring Boot & Angular, via un projet final réaliste mené en Scrum.'] },
      ['Spring Boot', 'Angular', 'SQL', 'Scrum']],
    ['GoMyCode', { en: 'DevOps Trainer', fr: 'Formateur DevOps' }, '01/2023 – 01/2024',
      { en: ['Turned learners with no DevOps experience into practitioners through project-based learning.', 'Full curriculum: CI/CD (Jenkins, Git), Nexus, SonarQube, Docker, Terraform, Ansible, Kubernetes, AWS.'],
        fr: ['Formé des apprenants sans expérience DevOps jusqu’à la pratique, par projets.', 'Cursus complet : CI/CD (Jenkins, Git), Nexus, SonarQube, Docker, Terraform, Ansible, Kubernetes, AWS.'] },
      ['Jenkins', 'Terraform', 'Ansible', 'Kubernetes', 'AWS']]
  ],
  pfe: [
    ['Institut Pasteur de Tunis', { en: 'Security incident response automation', fr: 'Automatisation de la réponse aux incidents de sécurité' }, { en: 'Final-year project, supervised', fr: 'Projet de fin d’études encadré' },
      { en: ['Threat detection, autonomous execution of predefined response playbooks, corrective recommendations and generated remediation guides.'], fr: ['Détection des menaces, application autonome de scénarios de réponse prédéfinis, recommandations correctives et guides de remédiation générés.'] }, ['DevSecOps', 'Automation', 'AI']],
    [{ en: 'Plant disease detection', fr: 'Détection de maladies des plantes' }, { en: 'Computer vision on leaf photos', fr: 'Vision par ordinateur sur photos de feuilles' }, { en: 'Final-year project, supervised', fr: 'Projet de fin d’études encadré' },
      { en: ['Now becoming a startup, with support from the Ministry of Agriculture.'], fr: ['En cours de transformation en startup avec l’accompagnement du Ministère de l’Agriculture.'] }, ['Computer Vision', 'Deep Learning']],
    [{ en: 'Veterinary stock management', fr: 'Gestion de stock vétérinaire' }, { en: 'Stock app with supplier automation', fr: 'Application de stock avec automatisation fournisseurs' }, { en: 'Final-year project, supervised · deployed', fr: 'Projet de fin d’études encadré · déployé' },
      { en: ['Automatically contacts suppliers when an item runs out. Deployed in a veterinary practice.'], fr: ['Contacte automatiquement les fournisseurs en cas de rupture. Déployée dans un établissement vétérinaire.'] }, ['Web app', 'Automation']]
  ]
};

/* ---------- training programmes: rows + modal ---------- */
/* hrs: number or null · doc: Word file in res/programmes or null · phases: [name{en,fr}, focus{en,fr}, hours] */
const PROGS = [
  { hrs: 150, title: { en: 'End-to-end AI & Machine Learning', fr: 'IA & Machine Learning de bout en bout' },
    p: { en: 'From zero to a model trained on real data, built in pairs and defended before a jury.', fr: 'De zéro à un modèle entraîné sur données réelles, construit en binôme et soutenu devant un jury.' },
    tags: ['Python', 'Machine Learning', 'Data preparation', 'Evaluation'] },
  { hrs: 130, doc: 'res/programmes/AI-ML-AWS-Cloud-130h.docx', title: { en: 'AI, Machine Learning & AWS Cloud', fr: 'IA, Machine Learning & Cloud AWS' },
    p: { en: 'Machine learning taught by paradigm, with the maths introduced exactly when an algorithm needs it, then carried onto AWS: SageMaker, data engineering and production GenAI. Six portfolio projects on GitHub.',
         fr: 'Le machine learning enseigné par paradigme, avec les maths introduites au moment précis où un algorithme en a besoin, puis porté sur AWS : SageMaker, data engineering et GenAI en production. Six projets de portfolio sur GitHub.' },
    facts: [[{ en: 'Audience', fr: 'Public' }, { en: 'IT professionals; basic Python required', fr: 'Professionnels de l’IT ; bases de Python requises' }],
            [{ en: 'Certifications', fr: 'Certifications' }, 'AWS AIF-C01 · CLF-C02 · DEA-C01']],
    phases: [
      [{ en: 'Python & data science stack', fr: 'Python & outils de data science' }, { en: 'NumPy, Pandas, Matplotlib, Jupyter', fr: 'NumPy, Pandas, Matplotlib, Jupyter' }, 12],
      [{ en: 'Supervised learning', fr: 'Apprentissage supervisé' }, { en: 'Regression, classification, trees, ensembles, with linear algebra, calculus and statistics', fr: 'Régression, classification, arbres, ensembles, avec algèbre linéaire, calcul et statistiques' }, 24],
      [{ en: 'Unsupervised learning', fr: 'Apprentissage non supervisé' }, { en: 'Clustering, dimensionality reduction, anomaly detection', fr: 'Clustering, réduction de dimension, détection d’anomalies' }, 12],
      [{ en: 'Reinforcement learning', fr: 'Apprentissage par renforcement' }, { en: 'MDP, Q-learning, policy gradients, actor-critic', fr: 'MDP, Q-learning, policy gradients, actor-critic' }, 9],
      [{ en: 'Neural networks & deep learning', fr: 'Réseaux de neurones & deep learning' }, { en: 'ANNs from scratch, CNNs, RNNs, Transformers, LLMs', fr: 'Réseaux from scratch, CNN, RNN, Transformers, LLM' }, 21],
      [{ en: 'AWS foundations & AI Practitioner', fr: 'Fondamentaux AWS & AI Practitioner' }, { en: 'Core AWS, SageMaker, Bedrock, AIF-C01 and CLF-C02 prep', fr: 'AWS essentiel, SageMaker, Bedrock, préparation AIF-C01 et CLF-C02' }, 21],
      [{ en: 'AWS data engineering', fr: 'Data engineering sur AWS' }, { en: 'Glue, Redshift, Kinesis, Athena, Step Functions, DEA-C01 prep', fr: 'Glue, Redshift, Kinesis, Athena, Step Functions, préparation DEA-C01' }, 18],
      [{ en: 'AWS GenAI & MLOps', fr: 'GenAI & MLOps sur AWS' }, { en: 'Bedrock, RAG agents, SageMaker pipelines, production deployment', fr: 'Bedrock, agents RAG, pipelines SageMaker, mise en production' }, 13]],
    tags: ['Python', 'scikit-learn', 'Deep Learning', 'SageMaker', 'Bedrock', 'AWS'] },
  { hrs: 120, title: { en: 'Azure DevSecOps', fr: 'Azure DevSecOps' },
    p: { en: 'Build delivery pipelines on Azure with security checks inside every stage, from commit to deployment.', fr: 'Construire des pipelines de livraison sur Azure avec des contrôles de sécurité à chaque étape, du commit au déploiement.' },
    tags: ['Azure', 'DevSecOps', 'CI/CD', 'Security'] },
  { hrs: 100, title: { en: 'Azure DevOps', fr: 'Azure DevOps' },
    p: { en: 'The full Azure DevOps chain, hands-on: boards, repos, pipelines and artifacts.', fr: 'Toute la chaîne Azure DevOps, en pratique : boards, repos, pipelines et artifacts.' },
    tags: ['Azure DevOps', 'Pipelines', 'Git'] },
  { hrs: 100, title: { en: 'AWS Cloud & certification', fr: 'Cloud AWS & certification' },
    p: { en: 'Core AWS services in practice, with preparation for Cloud Practitioner, Developer and Solutions Architect.', fr: 'Les services AWS essentiels en pratique, avec la préparation aux certifications Cloud Practitioner, Developer et Solutions Architect.' },
    tags: ['AWS', 'EC2 · S3 · VPC', 'IAM', 'Certification prep'] },
  { hrs: null, title: { en: 'DevOps from zero', fr: 'DevOps de zéro' },
    p: { en: 'Project-based: CI/CD with Jenkins and Git, Nexus, SonarQube, Docker, Terraform, Ansible, Kubernetes and AWS.', fr: 'Par projets : CI/CD avec Jenkins et Git, Nexus, SonarQube, Docker, Terraform, Ansible, Kubernetes et AWS.' },
    tags: ['Jenkins', 'Docker', 'Terraform', 'Ansible', 'Kubernetes'] },
  { hrs: null, title: { en: 'Linux & networking', fr: 'Linux & réseaux' },
    p: { en: 'Linux system administration and CCNA networking, for engineering students and IT teams.', fr: 'Administration système Linux et réseaux CCNA, pour élèves ingénieurs et équipes IT.' },
    tags: ['Linux', 'CCNA', 'Networking'] }
];
const PUI = {
  en: { open: 'View programme', custom: 'Length on request', kicker: 'Training programme', struct: 'Programme structure', dl: 'Download (Word)', book: 'Book', cust: 'Customise', none: 'Detailed syllabus on request.',
        format: 'Format', formatV: 'On-site in France or Tunisia, or remote', subj: 'Custom training request: ',
        bsubj: 'Booking request: ',
        bbody: t => `Hello Aziz,\n\nWe would like to book the "${t}" programme as described on your website.\n\nOrganisation:\nNumber of participants:\nFormat (on-site France / on-site Tunisia / remote):\nPreferred start date:\nContact person and phone:\n\nBest regards,\n`,
        body: t => `Hello Aziz,\n\nWe are interested in the "${t}" programme, adapted to our team.\n\nOrganisation:\nNumber of participants:\nCurrent level (beginner / intermediate / advanced):\nFormat (on-site France / on-site Tunisia / remote):\nTarget length and dates:\nTopics to add or remove:\n\nBest regards,\n` },
  fr: { open: 'Voir le programme', custom: 'Durée sur demande', kicker: 'Programme de formation', struct: 'Structure du programme', dl: 'Télécharger (Word)', book: 'Réserver', cust: 'Personnaliser', none: 'Programme détaillé sur demande.',
        format: 'Format', formatV: 'Sur site en France ou en Tunisie, ou à distance', subj: 'Demande de formation sur mesure : ',
        bsubj: 'Demande de réservation : ',
        bbody: t => `Bonjour Aziz,\n\nNous souhaitons réserver le programme « ${t} » tel que décrit sur votre site.\n\nOrganisation :\nNombre de participants :\nFormat (sur site France / sur site Tunisie / à distance) :\nDate de début souhaitée :\nPersonne à contacter et téléphone :\n\nCordialement,\n`,
        body: t => `Bonjour Aziz,\n\nNous sommes intéressés par le programme « ${t} », adapté à notre équipe.\n\nOrganisation :\nNombre de participants :\nNiveau actuel (débutant / intermédiaire / avancé) :\nFormat (sur site France / sur site Tunisie / à distance) :\nDurée et dates souhaitées :\nSujets à ajouter ou retirer :\n\nCordialement,\n` }
};
const hrsHTML = h => h ? `<b class="hrs">${h}<small>h</small></b>` : `<b class="hrs na">${PUI[lang].custom}</b>`;
function renderProgs() {
  $('#progs').innerHTML = PROGS.map((g, i) => `<li><button type="button" class="prog" data-p="${i}" aria-haspopup="dialog">${hrsHTML(g.hrs)}<span class="prog-txt"><b class="prog-h">${pick(g.title)}</b><span class="prog-p">${pick(g.p)}</span><span class="tags">${g.tags.map(t => `<i>${t}</i>`).join('')}</span></span><span class="prog-go">${PUI[lang].open}<svg><use href="#i-arrow"/></svg></span></button></li>`).join('');
}
const progDlg = $('#progDlg');
function openProg(i) {
  const g = PROGS[i], u = PUI[lang], t = pick(g.title);
  const facts = [...(g.facts || []), [{ en: u.format, fr: u.format }, u.formatV]];
  const mail = (s, b) => `mailto:mohamedaziz.benhaha@gmail.com?subject=${encodeURIComponent(s + t)}&body=${encodeURIComponent(b(t))}`;
  $('#progBody').innerHTML = `<header class="pm-head">${hrsHTML(g.hrs)}<div><p class="pm-kicker">${u.kicker}</p><h2 id="pTitle">${t}</h2></div></header>
    <p class="pm-lede">${pick(g.p)}</p>
    <dl class="pm-facts">${facts.map(([k, v]) => `<div><dt>${pick(k)}</dt><dd>${pick(v)}</dd></div>`).join('')}</dl>
    ${g.phases ? `<h3 class="pm-sub">${u.struct}</h3><ol class="pm-phases">${g.phases.map(([n, f, h]) => `<li><b>${pick(n)}</b><span>${pick(f)}</span><i>${h} h</i></li>`).join('')}</ol>` : ''}
    <ul class="tags">${g.tags.map(t => `<li>${t}</li>`).join('')}</ul>
    <div class="pm-actions"><a class="btn btn-gold" href="${mail(u.bsubj, u.bbody)}" target="_blank" rel="noopener"><svg><use href="#i-mail"/></svg><span>${u.book}</span></a><a class="btn btn-ghost" href="${mail(u.subj, u.body)}" target="_blank" rel="noopener"><svg><use href="#i-arrow"/></svg><span>${u.cust}</span></a>${g.doc ? `<a class="btn btn-ghost" href="${g.doc}" download><svg><use href="#i-down"/></svg><span>${u.dl}</span></a>` : `<p class="pm-note">${u.none}</p>`}</div>`;
  progDlg.dataset.p = i;
  if (!progDlg.open) progDlg.showModal();
  progDlg.scrollTop = 0;
}
$('#progs').addEventListener('click', e => { const b = e.target.closest('[data-p]'); if (b) openProg(+b.dataset.p) });

/* ---------- dialogs: close button, backdrop click ---------- */
$$('.modal').forEach(d => {
  $$('[data-close]', d).forEach(b => b.addEventListener('click', () => d.close()));
  d.addEventListener('click', e => { if (e.target === d) d.close() });
});

/* ---------- contact mailto links get a default subject ---------- */
const MAIL = 'mailto:mohamedaziz.benhaha@gmail.com';
function setMailSubjects() { $$(`a[href^="${MAIL}"]:not(.pm-actions a)`).forEach(a => a.href = `${MAIL}?subject=${encodeURIComponent(UI[lang].subj)}`) }

/* ---------- motto: both lines start and end at the same edges ---------- */
function fitMotto() {
  const q = $('.motto blockquote'), W = q.clientWidth;
  $$('.motto .ml').forEach(l => {
    l.style.fontSize = '100px';
    for (let k = 0; k < 3; k++) l.style.fontSize = Math.min(parseFloat(l.style.fontSize) * W / l.getBoundingClientRect().width, 140) + 'px';
  });
}

/* ---------- language ---------- */
let lang = store.get('lang') || ((navigator.language || '').startsWith('fr') ? 'fr' : 'en');
const EN = {};
$$('[data-i18n]').forEach(el => { EN[el.dataset.i18n] = el.innerHTML });
const pick = v => (v && typeof v === 'object' && !Array.isArray(v)) ? v[lang] : v;

function applyLang() {
  document.documentElement.lang = lang;
  $$('[data-i18n]').forEach(el => { const k = el.dataset.i18n; el.innerHTML = (lang === 'fr' ? FR[k] : EN[k]) ?? EN[k] });
  const [en, fr] = $$('#lang span');
  en.classList.toggle('on', lang === 'en'); fr.classList.toggle('on', lang === 'fr');
  $('#lang').setAttribute('aria-label', lang === 'en' ? 'Passer en français' : 'Switch to English');
  renderTabs(); sizeTabs(); renderProgs(); if (progDlg.open) openProg(+progDlg.dataset.p); setMailSubjects(); fitMotto(); restartRotator(); $$('.count.done').forEach(el => el.textContent = fmt(+el.dataset.to) + (el.dataset.suffix || '')); setMoreLabel();
}
$('#lang').addEventListener('click', () => { lang = lang === 'en' ? 'fr' : 'en'; store.set('lang', lang); applyLang() });

/* ---------- experience tabs ---------- */
let group = 'ind', idx = 0;
const listHTML = items => items.map((e, i) => `<button role="tab" aria-selected="${i === idx}" data-i="${i}">${pick(e[0])}<small>${pick(e[2]).split(' · ')[0]}</small></button>`).join('');
const panelHTML = ([org, role, dates, pts, stack]) => `<h3>${pick(role)} <span>@ ${pick(org)}</span></h3><p class="meta">${pick(dates)}</p><ul class="pts">${pick(pts).map(p => `<li>${p}</li>`).join('')}</ul><ul class="chips">${stack.map(s => `<li>${s}</li>`).join('')}</ul>`;
/* Lock the box to its tallest content (every group and entry, current language) so the next section never moves. */
function sizeTabs() {
  const box = $('.tabs'), list = $('#tabList'), panel = $('#tabPanel');
  const probe = (el, w) => { const c = el.cloneNode(false); c.removeAttribute('id'); c.style.cssText = `position:absolute;left:-9999px;top:0;visibility:hidden;animation:none;width:${w}px`; box.append(c); return c };
  const pl = probe(list, list.offsetWidth), pp = probe(panel, panel.offsetWidth);
  const stacked = getComputedStyle(box).gridTemplateColumns.split(' ').length < 2;
  let h = 0;
  Object.values(EXP).forEach(items => {
    pl.innerHTML = listHTML(items);
    items.forEach(e => { pp.innerHTML = panelHTML(e); h = Math.max(h, stacked ? pl.offsetHeight + pp.offsetHeight : Math.max(pl.offsetHeight, pp.offsetHeight)) });
  });
  pl.remove(); pp.remove();
  box.style.minHeight = (stacked ? h + parseFloat(getComputedStyle(box).rowGap) : h) + 'px';
}
function renderTabs() {
  const list = $('#tabList'), items = EXP[group];
  if (idx >= items.length) idx = 0;
  list.innerHTML = listHTML(items);
  const panel = $('#tabPanel');
  panel.innerHTML = panelHTML(items[idx]);
  panel.style.animation = 'none'; panel.offsetHeight; panel.style.animation = '';
  const b = list.children[idx];
  if (b) { list.style.setProperty('--ty', b.offsetTop + 'px'); list.style.setProperty('--th', b.offsetHeight + 'px') }
}
$('#tabList').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { idx = +b.dataset.i; renderTabs() } });
$('#tabList').addEventListener('keydown', e => {
  if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
  e.preventDefault(); const n = EXP[group].length;
  idx = (idx + (e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : n - 1)) % n; renderTabs(); $('#tabList').children[idx].focus();
});
$$('.seg button').forEach(b => b.addEventListener('click', () => {
  $$('.seg button').forEach(x => x.setAttribute('aria-selected', x === b)); group = b.dataset.group; idx = 0; renderTabs();
}));
let rsz; addEventListener('resize', () => { clearTimeout(rsz); rsz = setTimeout(() => { renderTabs(); sizeTabs(); fitMotto() }, 150) });

/* ---------- rotating roles ---------- */
let rotTimer;
function restartRotator() {
  clearTimeout(rotTimer);
  const el = $('#rot'), words = ROLES[lang];
  let w = 0, c = words[0].length, del = false;
  (function tick() {
    const word = words[w];
    c += del ? -1 : 1; el.textContent = word.slice(0, c);
    let t = del ? 28 : 55;
    if (!del && c === word.length) { del = true; t = 1800 }
    else if (del && c === 0) { del = false; w = (w + 1) % words.length; t = 300 }
    rotTimer = setTimeout(tick, t);
  })();
}

/* ---------- nav: solid on scroll, hide on scroll down, active link, burger ---------- */
const nav = $('#nav'), links = $('#links'), burger = $('#burger'), bar = $('.progress');
let lastY = 0;
addEventListener('scroll', () => {
  const y = scrollY;
  nav.classList.toggle('solid', y > 30);
  nav.classList.toggle('hide', y > lastY && y > 500 && !links.classList.contains('open'));
  lastY = y;
  bar.style.transform = `scaleX(${y / (document.documentElement.scrollHeight - innerHeight)})`;
}, { passive: true });
burger.addEventListener('click', () => { const o = links.classList.toggle('open'); burger.setAttribute('aria-expanded', o) });
links.addEventListener('click', e => { if (e.target.closest('a')) { links.classList.remove('open'); burger.setAttribute('aria-expanded', false) } });
const secObs = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) $$('.links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
$$('main section[id]').forEach(s => secObs.observe(s));

/* ---------- reveal + counters ---------- */
const revObs = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target; el.classList.add('in'); revObs.unobserve(el);
  el.querySelectorAll('.count').forEach(countUp);
}), { threshold: .15 });
$$('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 70 + 'ms'; revObs.observe(el) });
const fmt = n => n.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US');
function countUp(el) {
  const to = +el.dataset.to, suf = el.dataset.suffix || '', t0 = performance.now(), d = 1600;
  (function f(t) {
    const p = Math.min((t - t0) / d, 1);
    el.textContent = fmt(Math.round(to * (1 - Math.pow(1 - p, 4)))) + (p === 1 ? suf : '');
    if (p < 1) requestAnimationFrame(f); else el.classList.add('done');
  })(t0);
}

/* ---------- pointer effects (fine pointers only) ---------- */
if (matchMedia('(hover:hover) and (pointer:fine)').matches && !reduced) {
  const glow = $('.glow');
  addEventListener('pointermove', e => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px' }, { passive: true });
  $$('.spot').forEach(c => c.addEventListener('pointermove', e => {
    const r = c.getBoundingClientRect(); c.style.setProperty('--mx', e.clientX - r.left + 'px'); c.style.setProperty('--my', e.clientY - r.top + 'px');
  }));
  $$('.magnetic').forEach(b => {
    b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)` });
    b.addEventListener('pointerleave', () => b.style.transform = '');
  });
  $$('.tilt').forEach(c => {
    c.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; c.style.transform = `perspective(1200px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)` });
    c.addEventListener('pointerleave', () => c.style.transform = '');
  });
}

/* ---------- orbit chips ---------- */
$$('.orbit').forEach(o => {
  const s = [...o.children];
  s.forEach((el, i) => { const a = (i / s.length) * Math.PI * 2 - Math.PI / 2; el.style.left = 50 + 50 * Math.cos(a) + '%'; el.style.top = 50 + 50 * Math.sin(a) + '%' });
});

/* ---------- Show more / Show less: courses (first row) and programmes (top 5) ---------- */
const MORE = [[$('#courses-grid'), $('#moreCourses')], [$('#progs'), $('#moreProgs')]];
function setMoreLabel() { MORE.forEach(([g, b]) => { $('.more-label', b).textContent = UI[lang][g.classList.contains('open') ? 'less' : 'more'] }) }
MORE.forEach(([g, b]) => b.addEventListener('click', () => {
  const open = g.classList.toggle('open'); b.setAttribute('aria-expanded', open); setMoreLabel();
  if (open) $$('.course', g).forEach(c => c.classList.add('in'));
  else g.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
}));

/* ---------- contact modal (Hire me, Contact) ---------- */
const dlg = $('#contactDlg');
$$('[data-contact]').forEach(b => b.addEventListener('click', e => {
  e.preventDefault(); links.classList.remove('open'); burger.setAttribute('aria-expanded', false); dlg.showModal();
}));
if (location.hash === '#contact') dlg.showModal();

/* ---------- copy email ---------- */
const toast = $('#toast');
$('#copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText('mohamedaziz.benhaha@gmail.com') } catch { location.href = 'mailto:mohamedaziz.benhaha@gmail.com'; return }
  toast.textContent = UI[lang].copied; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 1800);
});
$('#year').textContent = new Date().getFullYear();

/* ---------- hero network: cloud/IoT nodes that reach for the pointer ---------- */
(function net() {
  const cv = $('#net'), ctx = cv.getContext('2d');
  let w, h, dpr, pts = [], mouse = { x: -9999, y: -9999 }, raf;
  function size() {
    dpr = Math.min(devicePixelRatio || 1, 2); w = cv.offsetWidth; h = cv.offsetHeight;
    cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(110, w * h / 14000));
    pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.6 + .6, g: Math.random() < .14 }));
  }
  function frame() {
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1;
      const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy);
      if (d < 180) { p.x += dx * .006; p.y += dy * .006 }
    }
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 130) { ctx.strokeStyle = `rgba(212,160,36,${(1 - d / 130) * .28})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke() }
    }
    for (const p of pts) {
      const d = Math.hypot(mouse.x - p.x, mouse.y - p.y);
      if (d < 180) { ctx.strokeStyle = `rgba(242,196,90,${(1 - d / 180) * .5})`; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke() }
      ctx.fillStyle = p.g ? '#f2c45a' : 'rgba(243,239,230,.55)';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.g ? p.r + 1 : p.r, 0, 7); ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  }
  size(); addEventListener('resize', size);
  const hero = $('.hero');
  hero.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top });
  hero.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999 });
  new IntersectionObserver(([e]) => { cancelAnimationFrame(raf); if (e.isIntersecting) frame() }).observe(hero);
})();

applyLang();
document.fonts?.ready.then(() => { sizeTabs(); fitMotto() });
