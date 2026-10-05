/* Content lives in content.md; this file holds the French copy, the experience data and the interactions. */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const store = { get: k => { try { return localStorage.getItem(k) } catch { return null } }, set: (k, v) => { try { localStorage.setItem(k, v) } catch {} } };

/* ---------- copy ---------- */
const FR = {
  'nav.about': 'Profil', 'nav.exp': 'Expérience', 'nav.proj': 'Projets', 'nav.certs': 'Certifications', 'nav.train': 'Formations', 'nav.pubs': 'Publications', 'nav.hire': 'Me contacter',
  'hero.status': 'Ouvert aux missions et formations · France et Tunisie',
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
  'p2.tag': 'Biosurveillance autonome et intelligente de la qualité de l’eau',
  'p2.p': 'Des piles à combustible microbiennes utilisées comme capteurs vivants, un boîtier d’acquisition IoT, et du machine learning embarqué pour lire la qualité de l’eau en temps réel. Projet franco-tunisien (PHC Utique 2025–2027) entre Innov’COM, Sup’Com, et le laboratoire Ampère, École Centrale de Lyon.',
  'f.all': 'Tout', 'f.ai': 'IA', 'f.iot': 'IoT & recherche', 'f.app': 'Applications', 'f.ops': 'Cloud & DevOps',
  'm1.h': 'Firmware de passerelle qualité de l’eau', 'm1.p': 'Firmware ESP32 qui lit des sondes pH, ORP, conductivité, oxygène dissous et température via Modbus RTU et deux ADC, et publie en JSON sur MQTT. Configuration sur le terrain via une application web Wi-Fi captive.',
  'm2.h': 'Réacteur MFC flottant', 'm2.p': 'CAO paramétrique générée par code pour une unité capteur flottante à pile à combustible microbienne : trois prototypes, vérifications de flottabilité, plateaux d’impression pour imprimante Bambu et suite de tests automatisée.',
  'proj.more': 'Sous-projets',
  'p4.tag': 'Du langage naturel en entrée, des actions validées en sortie',
  'p4.p': 'Mon système d’exploitation personnel, chaque jour sur mon téléphone. Parti d’un carnet de musculation, il ne cesse de grandir : entraînement, notes, tâches, rappels, calendrier, courses, et bientôt l’argent. Tapez ou dictez une phrase : une IA la transforme en actions validées, annulables en un geste. Chaque module est une application à part ; elles partagent une clé de synchronisation et lisent les données des autres, sans jamais les modifier.',
  'p6.tag': 'Une IA personnelle qui s’améliore elle-même',
  'p6.p': 'Une architecture ouverte pour une IA personnelle : un modèle LLaMA local, une reconnaissance vocale qui ne fait confiance qu’à la voix de son propriétaire, une boucle d’auto-évolution qui évalue et met à jour son propre code modifiable, et des principes fondamentaux qu’elle ne peut jamais réécrire. Chaque service tourne dans Docker, chaque changement est journalisé.',
  'p1.h': 'Écosystème Thesis', 'p1.tag': 'Des outils pour tout le parcours doctoral, du sujet à la soutenance',
  'p1.p': 'Quatre outils reliés pour les doctorants et les encadrants : trouver un sujet et un encadrant, publier sa thèse, interroger ses propres sources et mener la recherche elle-même. Des microservices déployés sur Kubernetes avec Helm.',
  'p3.tag': 'Chaîne YouTube et podcast sur la recherche',
  'p3.p': '« The Researcher’s Path: From Idea to Thesis » : des épisodes et des shorts qui accompagnent le chercheur de la première idée à la soutenance, du choix du sujet et de la problématique à la méthodologie, la rédaction et l’analyse.',
  'm3.p': 'Mon carnet d’entraînement, utilisé à chaque séance : programme, saisie, graphiques de progression, coach IA et synchronisation cloud. Il fournit aussi sa liste d’aliments aux courses de Life OS.',
  'm4.p': 'Les notes de Life OS, écrites et modifiées depuis la même barre IA en une phrase que les tâches et les rappels.',
  'm6.p': 'En cours · suivi des dépenses et du budget, le prochain module de Life OS, sur la même synchronisation et la même barre d’actions IA.',
  'm5.p': 'La bibliothèque des thèses, avec une page pour chaque chercheur : manuscrit, articles, présentation, images, vidéos et l’équipe derrière chaque thèse. Open source.',
  'm7.p': 'Les encadrants proposent des sujets de thèse ; les étudiants postulent ou proposent le leur. Chaque candidature est suivie, de « en attente » à « acceptée ».',
  'm8.p': 'Une application Windows gratuite pour les étudiants : indiquez un dossier, posez vos questions, obtenez des réponses qui citent vos propres fichiers, page et passage, vérifiées phrase par phrase. Modèles locaux, cloud en option.',
  'm9.p': 'Le système de recherche sur lequel je mène ma thèse : un espace par article avec synchronisation de la bibliographie, notes de concepts, audit des citations et relecture critique, un cahier de laboratoire aux données non modifiables, et le rapport annuel.', 'p5.tag': 'Des sondes industrielles vers MQTT, configurées depuis un téléphone',
  'edu.now': '2024 → aujourd’hui',
  'ct.mail': 'M’écrire', 'ct.scan': 'Scannez pour m’ajouter à vos contacts', 'ct.vcf': 'Ajouter aux contacts',
  'cert.t1': 'Certifié,', 'cert.t2': 'pas seulement curieux.',
  'edu.h': 'Formation', 'edu.phd': 'Doctorat, Machine Learning (cotutelle)', 'edu.eng': 'Diplôme d’ingénieur, Cloud Computing &amp; DevOps', 'edu.med': 'Médecine',
  'pub.t1': 'La recherche,', 'pub.t2': 'publiée.', 'pub.s1': 'Publié', 'pub.s2': 'En évaluation', 'pub.s3': 'En préparation',
  'pub.p3': 'Biocapteurs à piles à combustible microbiennes et apprentissage automatique pour la surveillance de la qualité de l’eau',
  'pub.p4': 'Un réacteur ouvert à pile à combustible microbienne imprimé en 3D, pour l’unité de laboratoire et l’unité flottante',
  'pub.wt': 'Titre provisoire · thèse GreenWaterGuard',
  'c1': 'Introduction à l’intelligence artificielle', 'c2': 'Atelier Big Data', 'c3': 'Rédaction académique', 'c4': 'Gestion d’infrastructure cloud', 'c5': 'Virtualisation',
  'ct.t1': 'Travaillons', 'ct.t2': 'ensemble.',
  'ct.p': 'Missions en France ou en Tunisie, sur site ou à distance : Cloud et DevOps, projets IA/ML, formation d’équipes, recherche. Dites-moi ce que vous construisez, je réponds en français, en anglais ou en arabe.',
  'foot.say': 'Un métier entre les mains met à l’abri du besoin.',
  'ct.copy': 'Copier l’e-mail', 'ct.fr': 'France', 'foot.top': 'Haut de page ↑',
  'skip': 'Aller au contenu',
  'stat.longest': 'Parcours métiers',
  'tr.intro': 'Des programmes que je conçois et dispense pour des universités, des entreprises et des programmes publics pour l’emploi. Ouvrez une formation pour voir son plan et consulter le programme complet, ou demander une version adaptée à votre équipe : sur site en France ou en Tunisie, ou à distance.',
  'foot.rights': 'Tous droits réservés.',
  'tr.t1': 'Programmes de formation,', 'tr.t2': 'prêts à lancer.',
  'tr.infra': 'Infrastructure', 'tr.cloud': 'Cloud et DevOps', 'tr.data': 'Data et IA', 'tr.sec': 'Sécurité', 'tr.acad': 'Académique',
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

/* ---------- training programmes: catalogue data PROGS in programmes.js (generated), labels here ---------- */
const PUI = {
  en: { kicker: 'Training programme', struct: 'Programme structure', open: 'View programme', pdf: 'Preview (PDF)', book: 'Book', cust: 'Customise',
        aud: 'Audience', pre: 'Prerequisites', cert: 'Certification', buf: 'Buffer', bufF: 'Catch-up, revision, extra lab time', opt: 'optional', subj: 'Custom training request: ',
        bsubj: 'Booking request: ',
        bbody: t => `Hello Aziz,\n\nWe would like to book the "${t}" programme as described on your website.\n\nOrganisation:\nNumber of participants:\nFormat (on-site France / on-site Tunisia / remote):\nPreferred start date:\nContact person and phone:\n\nBest regards,\n`,
        body: t => `Hello Aziz,\n\nWe are interested in the "${t}" programme, adapted to our team.\n\nOrganisation:\nNumber of participants:\nCurrent level (beginner / intermediate / advanced):\nFormat (on-site France / on-site Tunisia / remote):\nTarget length and dates:\nTopics to add or remove:\n\nBest regards,\n` },
  fr: { kicker: 'Programme de formation', struct: 'Structure du programme', open: 'Voir le programme', pdf: 'Aperçu (PDF)', book: 'Réserver', cust: 'Personnaliser',
        aud: 'Public', pre: 'Prérequis', cert: 'Certification', buf: 'Réserve', bufF: 'Rattrapage, révision, TP supplémentaires', opt: 'optionnel', subj: 'Demande de formation sur mesure : ',
        bsubj: 'Demande de réservation : ',
        bbody: t => `Bonjour Aziz,\n\nNous souhaitons réserver le programme « ${t} » tel que décrit sur votre site.\n\nOrganisation :\nNombre de participants :\nFormat (sur site France / sur site Tunisie / à distance) :\nDate de début souhaitée :\nPersonne à contacter et téléphone :\n\nCordialement,\n`,
        body: t => `Bonjour Aziz,\n\nNous sommes intéressés par le programme « ${t} », adapté à notre équipe.\n\nOrganisation :\nNombre de participants :\nNiveau actuel (débutant / intermédiaire / avancé) :\nFormat (sur site France / sur site Tunisie / à distance) :\nDurée et dates souhaitées :\nSujets à ajouter ou retirer :\n\nCordialement,\n` }
};
let pgroup = 'infra';
const hrsHTML = c => `<b class="hrs">${c.h}<small>h</small></b>`;
function renderProgs() {
  const items = PROGS[pgroup];
  $('#progs').innerHTML = items.map((c, i) => `<li><button type="button" class="prog" data-p="${i}" aria-haspopup="dialog">${hrsHTML(c)}<span class="prog-txt"><b class="prog-h">${pick(c.title)}</b><span class="prog-p">${pick(c.sub)}</span></span><span class="prog-go">${PUI[lang].open}<svg><use href="#i-arrow"/></svg></span></button></li>`).join('');
  $('#moreProgs').parentElement.hidden = items.length <= 3;
}
$$('#training .seg button').forEach(b => b.addEventListener('click', () => {
  $$('#training .seg button').forEach(x => x.setAttribute('aria-pressed', x === b)); pgroup = b.dataset.group; renderProgs();
}));
const progDlg = $('#progDlg');
const COURSE = {}; Object.values(PROGS).flat().forEach(c => COURSE[c.n] = c);
const mailTo = (s, b, t) => `mailto:mohamedaziz.benhaha@gmail.com?subject=${encodeURIComponent(s + t)}&body=${encodeURIComponent(b(t))}`;
const pmActions = (u, t, pdf) => `<div class="pm-actions">${pdf ? `<a class="btn btn-gold" href="${pdf}" target="_blank" rel="noopener"><svg><use href="#i-ext"/></svg><span>${u.pdf}</span></a>` : ''}<a class="btn ${pdf ? 'btn-ghost' : 'btn-gold'}" href="${mailTo(u.bsubj, u.bbody, t)}" target="_blank" rel="noopener"><svg><use href="#i-mail"/></svg><span>${u.book}</span></a><a class="btn btn-ghost" href="${mailTo(u.subj, u.body, t)}" target="_blank" rel="noopener"><svg><use href="#i-arrow"/></svg><span>${u.cust}</span></a></div>`;
function showDlg(key) { progDlg.dataset.k = key; if (!progDlg.open) progDlg.showModal(); progDlg.scrollTop = 0; $('.pm-in', progDlg).scrollTop = 0 }
function openProg(n, back) {
  const c = COURSE[n], u = PUI[lang], t = pick(c.title);
  const facts = [[u.aud, pick(c.aud)], [u.pre, pick(c.pre)], ...(c.cert ? [[u.cert, pick(c.cert).join('<br>')]] : [])];
  $('#progBody').innerHTML = `${back != null ? `<button type="button" class="pm-back" data-t="${back}"><svg><use href="#i-arrow"/></svg>${pick(TRACKS[back].t)}</button>` : ''}<header class="pm-head">${hrsHTML(c)}<div><p class="pm-kicker">${u.kicker}${c.opt ? ` · +${c.opt} h ${u.opt}` : ''}</p><h2 id="pTitle">${t}</h2></div></header>
    <p class="pm-lede">${pick(c.sub)}</p>
    <dl class="pm-facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
    <h3 class="pm-sub">${u.struct}</h3>
    <ol class="pm-phases">${c.ph.map(([n, fo, h, o]) => `<li><b>${pick(n)}${o ? ` <em>(${u.opt})</em>` : ''}</b><span>${pick(fo)}</span><i>${h} h</i></li>`).join('')}${c.buf ? `<li class="buf"><b>${u.buf}</b><span>${u.bufF}</span><i>${c.buf} h</i></li>` : ''}</ol>
    ${pmActions(u, t, `res/programmes/pdf/${c.file[lang]}.pdf`)}`;
  showDlg('c' + n + (back != null ? ':' + back : ''));
}
/* Career tracks (About, 1,000+ hours box): course numbers from PROGS; h is rounded up, the gap is a track project & review block */
const TRACKS = [
  { tag: { en: 'AI', fr: 'IA' }, h: 150, c: [27, 28, 29, 30], t: { en: 'AI: from Python to LLM agents', fr: 'IA : de Python aux agents LLM' }, s: { en: 'Programming, data, machine and deep learning, then LLM applications and agents.', fr: 'Programmation, données, machine et deep learning, puis applications LLM et agents.' } },
  { tag: 'DevSecOps', h: 140, c: [14, 15], t: { en: 'DevSecOps engineer', fr: 'Ingénieur DevSecOps' }, s: { en: 'Build the delivery pipeline, then secure every stage of it.', fr: 'Construire la chaîne de livraison, puis sécuriser chacune de ses étapes.' } },
  { tag: 'RHCE', h: 130, c: [2, 3, 5], t: { en: 'Red Hat Certified Engineer (RHCE)', fr: 'Red Hat Certified Engineer (RHCE)' }, s: { en: 'RHCSA in two parts, then automation with Ansible: RHCSA + EX294 earn the RHCE.', fr: 'Le RHCSA en deux parties, puis l’automatisation avec Ansible : RHCSA + EX294 donnent le RHCE.' } },
  { tag: 'AWS', h: 120, c: [16, 17, 19, 20], t: { en: 'AWS cloud engineer', fr: 'Ingénieur cloud AWS' }, s: { en: 'From cloud basics to architecture and operations, finished with hands-on portfolio projects.', fr: 'Des bases du cloud à l’architecture et à l’exploitation, avec des projets pratiques pour finir.' } },
  { tag: 'Kubernetes', h: 100, c: [12, 13], t: { en: 'Kubernetes administrator (CKA)', fr: 'Administrateur Kubernetes (CKA)' }, s: { en: 'Containers and Kubernetes from scratch, then cluster administration for the CKA.', fr: 'Conteneurs et Kubernetes depuis zéro, puis administration de clusters pour le CKA.' } }
];
const TUI = {
  en: { kicker: 'Career track', courses: 'Courses in this track', rest: 'Track project & review', restF: 'One project across the courses, final review' },
  fr: { kicker: 'Parcours métier', courses: 'Cours du parcours', rest: 'Projet et bilan du parcours', restF: 'Un projet transversal aux cours, bilan final' }
};
function renderTracks() { $('#tracks').innerHTML = TRACKS.map((k, i) => `<li><button type="button" data-t="${i}" aria-haspopup="dialog">${pick(k.tag)} · ${k.h} h</button></li>`).join('') }
function openTrack(i) {
  const k = TRACKS[i], u = PUI[lang], v = TUI[lang], t = pick(k.t), rest = k.h - k.c.reduce((a, n) => a + COURSE[n].h, 0);
  $('#progBody').innerHTML = `<header class="pm-head">${hrsHTML(k)}<div><p class="pm-kicker">${v.kicker}</p><h2 id="pTitle">${t}</h2></div></header>
    <p class="pm-lede">${pick(k.s)}</p>
    <h3 class="pm-sub">${v.courses}</h3>
    <ol class="pm-phases pm-courses">${k.c.map(n => { const c = COURSE[n]; return `<li><button type="button" data-n="${n}"><b>${pick(c.title)}</b><span>${pick(c.sub)}</span><i>${c.h} h</i><svg><use href="#i-arrow"/></svg></button></li>` }).join('')}${rest ? `<li class="buf"><b>${v.rest}</b><span>${v.restF}</span><i>${rest} h</i></li>` : ''}</ol>
    ${pmActions(u, t)}`;
  showDlg('t' + i);
}
$('#tracks').addEventListener('click', e => { const b = e.target.closest('[data-t]'); if (b) openTrack(+b.dataset.t) });
$('#progBody').addEventListener('click', e => { const b = e.target.closest('[data-n],[data-t]'); if (b) b.dataset.t ? openTrack(+b.dataset.t) : openProg(+b.dataset.n, +progDlg.dataset.k.slice(1)) });
const reopenDlg = () => { const k = progDlg.dataset.k; if (!progDlg.open || !k) return; const [a, b] = k.slice(1).split(':'); k[0] === 't' ? openTrack(+a) : openProg(+a, b == null ? null : +b) };
$('#progs').addEventListener('click', e => { const b = e.target.closest('[data-p]'); if (b) openProg(PROGS[pgroup][+b.dataset.p].n, null) });

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

/* ---------- hero name: both lines share the same width ---------- */
function fitName() {
  const [a, b] = $$('.name .nl'), box = $('.hero-text');
  const m = $('.rotator').cloneNode();
  m.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;min-height:0';
  m.innerHTML = 'I <span class="rot">' + ROLES.en[0] + '</span>';
  box.append(m);
  const W = Math.min(m.getBoundingClientRect().width * .96, box.clientWidth);
  m.remove();
  a.style.fontSize = b.style.fontSize = '100px';
  for (let k = 0; k < 3; k++) a.style.fontSize = Math.min(parseFloat(a.style.fontSize) * W / a.getBoundingClientRect().width, 112) + 'px';
  b.style.fontSize = a.style.fontSize;
  for (let k = 0; k < 3; k++) b.style.fontSize = parseFloat(b.style.fontSize) * a.getBoundingClientRect().width / b.getBoundingClientRect().width + 'px';
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
  TABS.forEach(t => t.render()); sizeTabs(); renderProgs(); renderTracks(); reopenDlg(); setMailSubjects(); fitMotto(); restartRotator(); $$('.count.done').forEach(el => el.textContent = fmt(+el.dataset.to) + (el.dataset.suffix || '')); setMoreLabel();
}
$('#lang').addEventListener('click', () => { lang = lang === 'en' ? 'fr' : 'en'; store.set('lang', lang); applyLang() });

/* ---------- experience tabs (group buttons, entry list, panel) ---------- */
/* Each box is locked to its tallest content (every group and entry, current language) so the next section never moves. */
function tabbed(sec, data, itemHTML, panelHTML) {
  const box = $('.tabs', sec), list = $('.tab-list', sec), panel = $('.tab-panel', sec);
  let group = $('.seg [aria-selected=true]', sec).dataset.group, idx = 0;
  const listHTML = items => items.map((e, i) => `<button role="tab" aria-selected="${i === idx}" data-i="${i}">${itemHTML(e)}</button>`).join('');
  function size() {
    const probe = (el, w) => { const c = el.cloneNode(false); c.style.cssText = `position:absolute;left:-9999px;top:0;visibility:hidden;animation:none;width:${w}px`; box.append(c); return c };
    const pl = probe(list, list.offsetWidth), pp = probe(panel, panel.offsetWidth);
    const stacked = getComputedStyle(box).gridTemplateColumns.split(' ').length < 2;
    let h = 0;
    Object.values(data).forEach(items => {
      pl.innerHTML = listHTML(items);
      items.forEach(e => { pp.innerHTML = panelHTML(e); h = Math.max(h, stacked ? pl.offsetHeight + pp.offsetHeight : Math.max(pl.offsetHeight, pp.offsetHeight)) });
    });
    pl.remove(); pp.remove();
    box.style.minHeight = (stacked ? h + parseFloat(getComputedStyle(box).rowGap) : h) + 'px';
  }
  function render() {
    const items = data[group];
    if (idx >= items.length) idx = 0;
    list.innerHTML = listHTML(items);
    panel.innerHTML = panelHTML(items[idx]);
    panel.style.animation = 'none'; panel.offsetHeight; panel.style.animation = '';
    const b = list.children[idx];
    if (b) { list.style.setProperty('--ty', b.offsetTop + 'px'); list.style.setProperty('--th', b.offsetHeight + 'px') }
  }
  list.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { idx = +b.dataset.i; render() } });
  list.addEventListener('keydown', e => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    e.preventDefault(); const n = data[group].length;
    idx = (idx + (e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : n - 1)) % n; render(); list.children[idx].focus();
  });
  $$('.seg button', sec).forEach(b => b.addEventListener('click', () => {
    $$('.seg button', sec).forEach(x => x.setAttribute('aria-selected', x === b)); group = b.dataset.group; idx = 0; list.scrollLeft = 0; render();
  }));
  return { render, size };
}
const TABS = [
  tabbed($('#experience'), EXP, e => `${pick(e[0])}<small>${pick(e[2]).split(' · ')[0]}</small>`,
    ([org, role, dates, pts, stack]) => `<h3>${pick(role)} <span>@ ${pick(org)}</span></h3><p class="meta">${pick(dates)}</p><ul class="pts">${pick(pts).map(p => `<li>${p}</li>`).join('')}</ul><ul class="chips">${stack.map(s => `<li>${s}</li>`).join('')}</ul>`)
];
const sizeTabs = () => TABS.forEach(t => t.size());
let rsz; addEventListener('resize', () => { clearTimeout(rsz); rsz = setTimeout(() => { TABS.forEach(t => t.render()); sizeTabs(); fitMotto(); fitName() }, 150) });

/* ---------- Life OS card: a sentence types itself, then becomes actions for the right module ---------- */
const LIFE = {
  en: [['Buy milk and call the bank tomorrow at 10', [['Groceries', 'milk'], ['Reminder', 'call the bank · 10:00']]],
       ['Leg day done: squats 3×8 at 100 kg', [['LifeFit', 'squats 3×8 · 100 kg']]],
       ['Spent 12 € on lunch', [['LifeWallet', '−12 € · food']]],
       ['Idea for chapter 3: compare both sensors', [['LifeNotes', 'chapter 3 idea'], ['Task', 'compare sensors']]]],
  fr: [['Acheter du lait et appeler la banque demain à 10 h', [['Courses', 'lait'], ['Rappel', 'appeler la banque · 10:00']]],
       ['Séance jambes finie : squats 3×8 à 100 kg', [['LifeFit', 'squats 3×8 · 100 kg']]],
       ['Dépensé 12 € pour le déjeuner', [['LifeWallet', '−12 € · repas']]],
       ['Idée pour le chapitre 3 : comparer les deux capteurs', [['LifeNotes', 'idée chapitre 3'], ['Tâche', 'comparer les capteurs']]]]
};
(async () => {
  const box = $('#lifeArt'), typed = $('.typed', box), acts = $('.acts', box), wait = ms => new Promise(r => setTimeout(r, ms));
  for (let k = 0; ; k++) {
    const [t, a] = LIFE[lang][k % LIFE.en.length];
    acts.innerHTML = ''; typed.textContent = '';
    for (const ch of t) { typed.textContent += ch; await wait(45) }
    await wait(350);
    for (const [m, v] of a) { acts.insertAdjacentHTML('beforeend', `<b><i>+ ${m}</i>${v}</b>`); await wait(300) }
    await wait(2200);
  }
})();

/* ---------- project art on canvas: runs only while on screen ---------- */
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), lerp = (a, b, t) => a + (b - a) * t, easeOut = t => 1 - Math.pow(1 - t, 3);
function artLoop(c, draw) {
  const x = c.getContext('2d'); let W = 0, H = 0, on = false, t = 0, last = 0;
  const fit = () => { const r = c.getBoundingClientRect(), d = devicePixelRatio || 1; W = r.width; H = r.height; c.width = W * d; c.height = H * d; x.setTransform(d, 0, 0, d, 0, 0) };
  const frame = now => { if (!on) return; const dt = Math.min(.05, (now - last) / 1000); last = now; t += dt; x.clearRect(0, 0, W, H); draw(x, W, H, t, dt); requestAnimationFrame(frame) };
  new IntersectionObserver(([e]) => { const was = on; on = e.isIntersecting; if (on && !was) { fit(); last = performance.now(); requestAnimationFrame(frame) } }).observe(c);
  addEventListener('resize', fit);
}

/* Create Life: the whole system. Gold core = local LLaMA; voice ring = voice ID (a stranger bounces off, the owner gets in);
   sparks = knowledge filling the gauge; full gauge = shockwave + code rewrite (version up); three locks = core principles; log lines. 14 s story. */
(() => {
  const T = 14, FN = ['listen()', 'respond()', 'learn()', 'evaluate()', 'remember()'], GOLD = '#d4a024', GOLD2 = '#f2c45a';
  let sparks = [], fill = .35, waves = [], nextSpark = 0, flare = 0, ver = 12, logs = [], said = {}, cyc = -1, now = 0;
  const log = s => { logs.push({ s, t: now }); if (logs.length > 3) logs.shift() };
  const core = (x, cx, cy, r, glow) => {
    const g = x.createRadialGradient(cx, cy, 1, cx, cy, r * 2.2);
    g.addColorStop(0, '#fff6d8'); g.addColorStop(.25, GOLD2); g.addColorStop(.55, `rgba(212,160,36,${Math.min(1, .35 * glow)})`); g.addColorStop(1, 'rgba(212,160,36,0)');
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r * 2.2, 0, 7); x.fill();
  };
  const ring = (x, cx, cy, r0, amp, t, alpha) => {
    x.lineCap = 'round'; x.lineWidth = 2;
    for (let i = 0; i < 64; i++) {
      const a = i / 64 * Math.PI * 2, v = Math.abs(Math.sin(i * .7 + t * 3) * Math.sin(i * .23 - t * 1.7)), len = 3 + v * amp;
      x.strokeStyle = `rgba(242,196,90,${clamp(alpha * (.3 + .7 * v))})`;
      x.beginPath(); x.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0); x.lineTo(cx + Math.cos(a) * (r0 + len), cy + Math.sin(a) * (r0 + len)); x.stroke();
    }
  };
  const lock = (x, px, py, s) => {
    x.strokeStyle = GOLD2; x.lineWidth = 1.4; x.beginPath(); x.arc(px, py - s * .35, s * .38, Math.PI, 0); x.stroke();
    x.fillStyle = GOLD; x.fillRect(px - s * .55, py - s * .35, s * 1.1, s * .85);
  };
  artLoop($('#lifeCore'), (x, W, H, t, dt) => {
    now = t;
    const cx = W * .5, cy = H * .5, base = 26, p = t % T, k = Math.floor(t / T);
    if (k !== cyc) { cyc = k; said = {} }
    const once = (key, cond, fn) => { if (cond && !said[key]) { said[key] = 1; fn() } };
    const stranger = clamp((p - 1) / 2.5), owner = clamp((p - 5) / 3);
    const voice = (prog, rgb, bounce) => {
      if (prog <= 0 || prog >= 1) return;
      const sx = W - 6, sy = H - 6, len0 = Math.hypot(cx - sx, cy - sy), ux = (cx - sx) / len0, uy = (cy - sy) / len0;
      const reach = len0 - base - 12, head = bounce ? (prog < .6 ? lerp(0, reach, prog / .6) : lerp(reach, reach * .55, (prog - .6) / .4)) : lerp(0, reach + 4, prog);
      const a = bounce && prog > .6 ? 1 - (prog - .6) / .4 : 1, x0 = Math.max(0, head - 150);
      x.beginPath();
      for (let d = x0; d <= head; d += 2) {
        const o = Math.sin(d * .11 - t * 10) * Math.sin(d * .03 + t) * 20 * clamp((d - (head - 150)) / 60);
        const px = sx + ux * d - uy * o, py = sy + uy * d + ux * o;
        d === x0 ? x.moveTo(px, py) : x.lineTo(px, py);
      }
      x.strokeStyle = `rgba(${rgb},${a})`; x.lineWidth = 2; x.stroke();
    };
    voice(stranger, '120,118,112', true);
    voice(owner, '243,239,230', false);
    once('s', stranger > .6, () => log('[voice] unknown speaker ✗ ignored'));
    once('o', owner > .97, () => { log('[voice] owner verified ✓'); flare = 1 });
    const block = stranger > .55 && stranger < .8 ? 1 - Math.abs((stranger - .675) / .125) : 0, listening = owner > .5 && owner < 1 ? 1 : 0;
    if (t > nextSpark) {
      const a = -Math.PI / 2 + (Math.random() - .5) * Math.PI * 1.1, d = W * .45;
      sparks.push({ x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d, v: 60 + Math.random() * 40, sw: (Math.random() - .5) * 1.2 });
      nextSpark = t + .4 + Math.random() * .4;
    }
    flare = Math.max(0, flare - dt * 2);
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i], dx = cx - s.x, dy = cy - s.y, d = Math.hypot(dx, dy);
      if (d < base + 6) { sparks.splice(i, 1); fill += .07; flare = Math.max(flare, .7); if (Math.random() < .35) log('[learn] new source absorbed'); continue }
      const sp = s.v * (1 + 110 / (d + 20)) * dt;
      s.x += (dx / d) * sp + (-dy / d) * s.sw * sp; s.y += (dy / d) * sp + (dx / d) * s.sw * sp;
      x.fillStyle = 'rgba(243,239,230,.9)'; x.shadowColor = GOLD2; x.shadowBlur = 8; x.beginPath(); x.arc(s.x, s.y, 1.7, 0, 7); x.fill(); x.shadowBlur = 0;
    }
    if (fill >= 1) { fill = 0; ver++; waves.push({ t }); log(`[evolve] v${ver}: ${FN[ver % FN.length]} rewritten`); setTimeout(() => log('[core] principles intact 🔒'), 900) }
    for (let i = waves.length - 1; i >= 0; i--) {
      const a = t - waves[i].t; if (a > 1.6) { waves.splice(i, 1); continue }
      x.strokeStyle = `rgba(242,196,90,${.8 * (1 - a / 1.6)})`; x.lineWidth = 2.5 * (1 - a / 1.6) + .5; x.beginPath(); x.arc(cx, cy, base + a * 200, 0, 7); x.stroke();
    }
    if (block > 0) { x.strokeStyle = `rgba(200,80,70,${.7 * block})`; x.lineWidth = 2; x.beginPath(); const ba = Math.atan2(H - 6 - cy, W - 6 - cx); x.arc(cx, cy, base + 30, ba - .65, ba + .65); x.stroke() }
    x.strokeStyle = 'rgba(212,160,36,.18)'; x.lineWidth = 2; x.beginPath(); x.arc(cx, cy, base + 34, 0, 7); x.stroke();
    x.strokeStyle = GOLD2; x.beginPath(); x.arc(cx, cy, base + 34, -Math.PI / 2, -Math.PI / 2 + fill * Math.PI * 2); x.stroke();
    ring(x, cx, cy, base, 6 + 16 * Math.max(flare, listening * .9) + 4 * fill, t, .45 + .55 * Math.max(flare, listening, fill * .6));
    core(x, cx, cy, 9 + fill * 3 + flare * 2, 1 + flare);
    x.strokeStyle = 'rgba(212,160,36,.12)'; x.lineWidth = 1; x.setLineDash([2, 5]); x.beginPath(); x.arc(cx, cy, base + 50, 0, 7); x.stroke(); x.setLineDash([]);
    for (let i = 0; i < 3; i++) { const a = t * .25 + i * Math.PI * 2 / 3; lock(x, cx + Math.cos(a) * (base + 50), cy + Math.sin(a) * (base + 50) + 2, 8) }
    x.font = '600 10.5px ui-monospace, Consolas, monospace'; x.textAlign = 'right'; x.fillStyle = '#9d978a';
    x.fillText('version ', W - 14 - x.measureText('v' + ver).width, 22); x.fillStyle = GOLD2; x.fillText('v' + ver, W - 14, 22);
    x.textAlign = 'left';
    if (stranger > .5 && stranger < 1) { x.fillStyle = `rgba(200,110,100,${1 - clamp((stranger - .85) / .15)})`; x.fillText('unknown ✗', 14, 22) }
    else if (owner > .3 && p < 9) { x.fillStyle = `rgba(243,239,230,${1 - clamp((p - 8.4) / .6)})`; x.fillText('owner ✓', 14, 22) }
    x.textAlign = 'left'; logs.forEach((l, i) => { const age = t - l.t; x.fillStyle = `rgba(157,151,138,${clamp(age / .3) * (1 - clamp((age - 5) / 1))})`; x.fillText(l.s, 14, H - 14 - (logs.length - 1 - i) * 14) });
  });
})();

/* GreenWaterGuard: water -> fuel cell -> ESP32 -> cloud; readings travel as packets, the on-device model answers. 12 s: clean, pollution, clears */
(() => {
  const RED = '#e0675a', GOLD = '#d4a024', GOLD2 = '#f2c45a', WATER = '#8fd3ff', OK = '#5ef0a0', smooth = v => v * v * (3 - 2 * v);
  const L = { en: ['water', 'fuel cell', 'ESP32', 'cloud', 'water OK', 'pollution detected', 'on-device model'],
              fr: ['eau', 'pile microbienne', 'ESP32', 'cloud', 'eau conforme', 'pollution détectée', 'modèle embarqué'] };
  let P = 0;
  const R = [['pH', () => (7.2 - P * .6).toFixed(1)], ['EC', () => (1.4 + P * .9).toFixed(1) + ' mS'], ['DO', () => (6.8 - P * 3.1).toFixed(1) + ' mg/L'], ['T', () => '18.4 °C'], ['MFC', () => Math.round(470 - P * 330) + ' mV']];
  const mono = s => `600 ${s}px ui-monospace, Consolas, monospace`;
  artLoop($('#phdArt'), (x, W, H, t) => {
    const p = t % 12, l = L[lang];
    P = smooth(clamp((p - 4) / 1.2)) * (1 - smooth(clamp((p - 8) / 1.5)));
    const bad = P > .5, cy = H * .5, N = [W * .09, W * .33, W * .6, W * .87];
    x.setLineDash([3, 5]); x.strokeStyle = '#3a3427'; x.lineWidth = 1.5; x.beginPath(); x.moveTo(N[0], cy); x.lineTo(N[3], cy); x.stroke(); x.setLineDash([]);
    N.forEach((nx, i) => {
      x.fillStyle = '#121219'; x.strokeStyle = i ? GOLD : WATER; x.lineWidth = 1.5;
      x.beginPath(); x.arc(nx, cy, 17, 0, 7); x.fill(); x.stroke();
      x.save(); x.translate(nx, cy);
      if (i === 0) { x.fillStyle = bad ? '#b08455' : WATER; x.beginPath(); x.moveTo(0, -9); x.bezierCurveTo(7, 0, 7, 8, 0, 8); x.bezierCurveTo(-7, 8, -7, 0, 0, -9); x.fill() }
      if (i === 1) { x.fillStyle = GOLD2; for (let k = 0; k < 6; k++) { x.beginPath(); x.arc(-7 + k * 2.8, 2 + Math.sin(k + t * 3), 1.6, 0, 7); x.fill() } x.fillStyle = '#3a3a46'; x.fillRect(-9, 5, 18, 3) }
      if (i === 2) { x.strokeStyle = GOLD2; x.lineWidth = 1.3; x.strokeRect(-7, -7, 14, 14); for (let k = -4; k <= 4; k += 4) { x.beginPath(); x.moveTo(k, -7); x.lineTo(k, -10); x.moveTo(k, 7); x.lineTo(k, 10); x.stroke() } }
      if (i === 3) { x.strokeStyle = GOLD2; x.lineWidth = 1.4; x.beginPath(); x.arc(-4, 2, 5, Math.PI * .5, Math.PI * 1.5); x.arc(1, -2, 6, Math.PI, 0); x.arc(6, 2, 4, -Math.PI * .5, Math.PI * .5); x.closePath(); x.stroke() }
      x.restore();
      x.font = mono(9); x.textAlign = 'center'; x.fillStyle = '#9d978a'; x.fillText(l[i], nx, cy + 30);
    });
    for (let i = 0; i < 4; i++) { const q = (t * .6 + i / 4) % 1; x.fillStyle = bad ? 'rgba(176,132,85,.9)' : 'rgba(143,211,255,.9)'; x.beginPath(); x.arc(lerp(N[0] + 18, N[1] - 18, q), cy, 2, 0, 7); x.fill() }
    R.forEach(([k, f], i) => {
      const q = (t * .22 + i / R.length) % 1, px = lerp(N[1], N[3], q), hot = bad && (k === 'MFC' || k === 'DO');
      x.font = mono(9.5); const s = `${k} ${f()}`, w = x.measureText(s).width + 10, py = cy - 26 - (i % 2) * 16;
      x.globalAlpha = clamp(q / .08) * clamp((1 - q) / .08);
      x.fillStyle = 'rgba(18,18,25,.92)'; x.strokeStyle = hot ? RED : '#4a3e26'; x.lineWidth = 1;
      x.beginPath(); x.roundRect(px - w / 2, py - 10, w, 14, 7); x.fill(); x.stroke();
      x.fillStyle = hot ? RED : GOLD2; x.textAlign = 'center'; x.fillText(s, px, py + 1);
      x.globalAlpha = 1;
    });
    x.font = '700 11px Manrope, sans-serif'; x.textAlign = 'right'; x.fillStyle = bad ? RED : OK; x.fillText(bad ? l[5] : l[4], W - 12, H - 12);
    x.textAlign = 'left'; x.font = mono(9); x.fillStyle = '#9d978a'; x.fillText(l[6], 12, H - 12);
  });
})();

/* Thesis ecosystem: a dot travels the four tools; the stops add pages, ThesisVault adds the cover and the cap */
(() => {
  const D = 'M42 58 C 72 26, 102 26, 132 58 S 192 90, 222 58 S 282 26, 312 58', NS = 'http://www.w3.org/2000/svg';
  const path = document.createElementNS(NS, 'path'); path.setAttribute('d', D);
  const P2 = new Path2D(D), total = path.getTotalLength();
  const STOPS = [[42, 'ThesisMatcher', { en: 'subject', fr: 'sujet' }], [132, 'ThesisPilot', { en: 'research', fr: 'recherche' }], [222, 'ThesisLens', { en: 'sources', fr: 'sources' }], [312, 'ThesisVault', { en: 'publish', fr: 'publication' }]];
  const T = 9, TRAVEL = 6, at = i => TRAVEL * i / 3;
  const PAGES = [[0, 0], [1, 0], [1, .25], [1, .5], [2, 0], [2, .25]];
  const SX = 392, SY = 132, PW = 62, PH = 7, GAP = 8.5, GOLD = '#d4a024', GOLD2 = '#f2c45a';
  artLoop($('#thesisArt'), (x, W, H, t) => {
    const s = Math.min(W / 440, H / 150), tt = t % T, fade = 1 - clamp((tt - (T - .5)) / .5);
    x.save(); x.translate((W - 440 * s) / 2, (H - 150 * s) / 2); x.scale(s, s);
    x.setLineDash([5, 6]); x.strokeStyle = '#3a3427'; x.lineWidth = 2; x.stroke(P2); x.setLineDash([]);
    STOPS.forEach(([sx, n, sub], i) => {
      const lit = tt >= at(i) - .05;
      x.beginPath(); x.arc(sx, 58, 10, 0, 7); x.fillStyle = '#0b0b10'; x.fill(); x.lineWidth = 2; x.strokeStyle = lit ? GOLD : '#3a3427'; x.stroke();
      if (lit) { x.beginPath(); x.arc(sx, 58, 4, 0, 7); x.fillStyle = GOLD; x.fill() }
      x.textAlign = 'center'; x.font = '700 11px Manrope, sans-serif'; x.fillStyle = '#f3efe6'; x.fillText(n, sx, 96);
      x.font = '600 10px Manrope, sans-serif'; x.fillStyle = '#9d978a'; x.fillText(pick(sub), sx, 111);
    });
    if (tt < TRAVEL + .3) { const p = path.getPointAtLength(total * clamp(tt / TRAVEL)); x.fillStyle = GOLD2; x.shadowColor = GOLD; x.shadowBlur = 12; x.beginPath(); x.arc(p.x, p.y, 6, 0, 7); x.fill(); x.shadowBlur = 0 }
    x.globalAlpha = fade;
    x.fillStyle = 'rgba(212,160,36,.25)'; x.fillRect(SX - 42, SY + 1, 84, 1);
    PAGES.forEach(([si, d], j) => {
      const st = at(si) + d; if (tt < st) return;
      const q = easeOut(clamp((tt - st) / .7)), px = lerp(STOPS[si][0], SX, q), py = lerp(58, SY - PH - j * GAP, q) - Math.sin(q * Math.PI) * 40, w = PW * (.4 + .6 * q);
      x.save(); x.translate(px, py); x.rotate((1 - q) * -.5); x.fillStyle = '#e9e3d6'; x.fillRect(-w / 2, 0, w, PH); x.restore();
    });
    const top = SY - 11 - PAGES.length * GAP, cv = easeOut(clamp((tt - at(3) - .1) / .6)), cp = easeOut(clamp((tt - at(3) - .7) / .6));
    if (cv > 0) {
      const y = lerp(top - 70, top, cv);
      x.fillStyle = GOLD; x.fillRect(SX - PW / 2 - 3, y, PW + 6, 11);
      x.font = '800 8px "Bricolage Grotesque", sans-serif'; x.fillStyle = '#120d02'; x.textAlign = 'center'; x.fillText(lang === 'fr' ? 'THÈSE' : 'THESIS', SX, y + 8.5);
    }
    if (cp > 0) {
      x.save(); x.translate(SX + 4, lerp(top - 70, top - 1, cp)); x.rotate(lerp(-.6, -.12, cp));
      x.fillStyle = '#1b1b23'; x.strokeStyle = GOLD; x.lineWidth = 1;
      x.beginPath(); x.moveTo(-26, -11); x.lineTo(0, -20); x.lineTo(26, -11); x.lineTo(0, -2); x.closePath(); x.fill(); x.stroke();
      x.fillRect(-13, -8, 26, 8); x.strokeRect(-13, -8, 26, 8);
      x.strokeStyle = GOLD2; x.beginPath(); x.moveTo(0, -12); x.lineTo(21, -9); x.lineTo(21, 4); x.stroke();
      x.restore();
    }
    x.restore();
  });
})();

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

/* ---------- Show more / Show less: programmes (first 3 of the filtered rows) and publications (first row) ---------- */
const MORE = [[$('#progs'), $('#moreProgs')], [$('#pubs'), $('#morePubs')]];
function setMoreLabel() { MORE.forEach(([g, b]) => { $('.more-label', b).textContent = UI[lang][g.classList.contains('open') ? 'less' : 'more'] }) }
MORE.forEach(([g, b]) => b.addEventListener('click', () => {
  const open = g.classList.toggle('open'); b.setAttribute('aria-expanded', open); setMoreLabel();
  if (open) $$('.reveal', g).forEach(c => c.classList.add('in'));
  if (!open) g.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
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

/* ---------- Tunisian motifs: big, faint, scattered behind the sections below the hero ---------- */
(function motifs() {
  /* Nabeul-style ceramic tiles, drawn as line art */
  const FR = '<rect x="3" y="3" width="94" height="94" rx="2"/><rect x="8" y="8" width="84" height="84" rx="1"/>';
  const CORNERS = '<path d="M23 3A20 20 0 0 1 3 23M77 3A20 20 0 0 0 97 23M3 77A20 20 0 0 1 23 97M97 77A20 20 0 0 1 77 97"/>';
  const sq = (r, rot) => `<rect x="${50 - r}" y="${50 - r}" width="${2 * r}" height="${2 * r}" transform="rotate(${rot} 50 50)"/>`;
  const petals = (n, cy, rx, ry, off = 0) => Array.from({ length: n }, (_, k) => `<ellipse cx="50" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${off + k * 360 / n} 50 50)"/>`).join('');
  const dia = (x, y, r) => `<path d="M${x} ${y - r}L${x + r} ${y}L${x} ${y + r}L${x - r} ${y}z"/><circle cx="${x}" cy="${y}" r="3"/>`;
  const ART = [
    FR + CORNERS + sq(27, 0) + sq(27, 45) + '<circle cx="50" cy="50" r="15"/>' + sq(8, 0) + sq(8, 45),
    FR + CORNERS + petals(4, 28, 9, 19) + petals(4, 32, 5, 12, 45) + '<circle cx="50" cy="50" r="6"/>',
    FR + [[25, 25], [75, 25], [25, 75], [75, 75], [50, 50]].map(([x, y]) => dia(x, y, 20)).join(''),
    FR + CORNERS + '<circle cx="50" cy="50" r="38"/><circle cx="50" cy="50" r="31"/><circle cx="50" cy="50" r="22"/>' + sq(14, 0) + sq(14, 45) + '<circle cx="50" cy="50" r="5"/>',
    FR + CORNERS + '<path d="M50 14C70 32 70 68 50 86 30 68 30 32 50 14z"/><path d="M14 50C32 30 68 30 86 50 68 70 32 70 14 50z"/>' + petals(4, 39, 4, 7, 45) + '<circle cx="50" cy="50" r="7"/><circle cx="50" cy="50" r="2"/>'
  ].map(g => ['0 0 100 100', g]);
  /* hand-placed layout: each tile is anchored to a page element so the overlaps hold on any screen.
     [design, size, x, y, rotation]; x and y are functions of the page geometry */
  const box = document.createElement('div'); box.className = 'motifs'; box.setAttribute('aria-hidden', 'true'); document.body.append(box);
  const pg = el => { const r = el.getBoundingClientRect(); return { l: r.left, r: r.right, t: r.top + scrollY, b: r.bottom + scrollY } };
  const T = sel => pg($(sel)).t, nth = (sel, i) => pg($$(sel)[i]);
  function place() {
    const top = $('.hero').offsetHeight, W = box.clientWidth || innerWidth, k = innerWidth < 700 ? .6 : 1;
    const proj = $$('#projects article'), tally = pg($('.tally')), card3 = pg($$('#publications .pub')[1]);
    const L = [
      [1, 303, W * .22, T('#about') + 28, 160],
      [0, 292, W * .86, T('#about') + 731, -41],
      [0, 265, W * .283, tally.b - 27, 14],
      [0, 323, W * .865, T('#experience') + 381, -174],
      [0, 344, -W * .04, T('#projects') + 269, -120],
      [2, 309, pg(proj[1]).r, pg(proj[1]).b + 9, -68],
      [1, 233, W * .011, T('#certs') + 103, -98],
      [1, 330, W, T('#training') + 189, 3],
      [1, 266, 0, T('#training') + 832, -122],
      [0, 364, W * .83, card3.t - .2 * 364 * k, -179],
      [4, 225, W * .43, T('.motto') + .2 * 225 * k, 86]
    ];
    box.style.top = top + 'px'; box.innerHTML = '';
    for (const [a, s0, x, y, rot] of L) {
      const s = s0 * k, el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      el.setAttribute('viewBox', ART[a][0]); el.innerHTML = ART[a][1];
      el.style.cssText = `width:${s}px;height:${s}px;left:${(x - s / 2).toFixed(0)}px;top:${(y - top - s / 2).toFixed(0)}px;transform:rotate(${rot}deg)`;
      box.append(el);
    }
  }
  /* footer tray: the same tiles, quiet until hovered */
  const kh = '<g fill="currentColor" stroke="none" transform="translate(29 21) scale(.42)"><path fill-rule="evenodd" d="M50 0C30 0 20 22 17 40C14 56 12 66 0 75C3 82 10 85 19 87L18 112C18 122 24 126 34 128L35 137H65L66 128C76 126 82 122 82 112L81 87C90 85 97 82 100 75C88 66 86 56 83 40C80 22 70 0 50 0ZM50 47A15 15 0 1 0 50.01 47ZM50 51A11 11 0 1 1 49.99 51ZM50 57A5 5 0 1 0 50.01 57Z"/></g>';
  const tray = $('.tray');
  [...ART.map(a => a[1]), FR + kh].forEach(g => { const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); el.setAttribute('viewBox', '0 0 100 100'); el.innerHTML = g; tray.append(el) });
  place(); addEventListener('resize', place); document.fonts?.ready.then(place); addEventListener('load', place);
})();

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
    /* each dot links to its 5 nearest neighbours at most */
    const L = [], cnt = new Map();
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) { const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y); if (d < 130) L.push([d, pts[i], pts[j]]) }
    L.sort((x, y) => x[0] - y[0]);
    for (const [d, a, b] of L) {
      if ((cnt.get(a) || 0) >= 5 || (cnt.get(b) || 0) >= 5) continue;
      cnt.set(a, (cnt.get(a) || 0) + 1); cnt.set(b, (cnt.get(b) || 0) + 1);
      ctx.strokeStyle = `rgba(212,160,36,${(1 - d / 130) * .15})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
    for (const p of pts) {
      const d = Math.hypot(mouse.x - p.x, mouse.y - p.y);
      if (d < 180) { ctx.strokeStyle = `rgba(242,196,90,${(1 - d / 180) * .3})`; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke() }
      ctx.fillStyle = p.g ? 'rgba(242,196,90,.6)' : 'rgba(243,239,230,.3)';
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
fitName();
document.fonts?.ready.then(() => { sizeTabs(); fitMotto(); fitName() });
