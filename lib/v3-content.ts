
type CTA = {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "ghost";
};

type Card = {
  eyebrow: string;
  title: string;
  text: string;
  items?: string[];
};

type V3PageData = {
  eyebrow: string;
  title: string;
  text: string;
  ctas: CTA[];
  cards: Card[];
  notice?: string;
};

export const publicNotice =
  "Les privilèges ne sont ni automatiques ni garantis. Ils dépendent des partenaires, des événements, des quotas, des disponibilités et des conditions Golden Circle.";

export const brandRules = [
  "Un simple groupe WhatsApp",
  "Une carte de réduction",
  "Un annuaire de bons plans",
  "Une marketplace ouverte",
  "Un organisateur de soirées uniquement",
  "Un SaaS générique"
];

export const accessSteps = [
  { title: "Qualification", text: "Le membre ou le partenaire entre dans un cadre clair, avec rôle, niveau et conditions." },
  { title: "Validation", text: "Golden Circle valide les offres, événements, quotas et accès avant diffusion." },
  { title: "Accès", text: "La diffusion reste contrôlée, contextualisée et alignée avec la valeur de la marque." }
];

export const gcList = [
  "GC List — 18 EUR",
  "VIP GC List — 49,90 EUR",
  "Ambassadrice — statut sur validation Golden Circle",
  "Accès selon conditions, quotas et événements"
];

export const partnerTiers = [
  { name: "Partenaire Découverte", quota: "1 offre active" },
  { name: "Partenaire Actif", quota: "3 offres actives" },
  { name: "Partenaire Premium", quota: "7 offres actives" },
  { name: "Partenaire Signature", quota: "quota étendu ou validation personnalisée" }
];

export const memberPage: V3PageData = {
  eyebrow: "Membres",
  title: "GC List — accès membre contrôlé.",
  text: "La GC List donne accès à une sélection de privilèges, expériences et opportunités selon conditions Golden Circle.",
  ctas: [
    { label: "Connexion", href: "/connexion", variant: "primary" as const },
    { label: "Mini Map", href: "/mini-map", variant: "secondary" as const }
  ],
  cards: [
    { eyebrow: "Statuts", title: "Niveaux membres", text: "Chaque niveau ouvre des possibilités différentes, sans automatisme.", items: gcList },
    { eyebrow: "Règle", title: "Privilèges non automatiques", text: publicNotice },
    { eyebrow: "Expérience", title: "Ce que l'espace membre prépare", text: "Privilèges, événements, Golden Hour, Mini Map, statut, notifications et historique personnel." },
    { eyebrow: "Sécurité", title: "Auth Supabase future", text: "Le membre ne verra que ses propres données via RLS." }
  ],
  notice: publicNotice
};

export const partnerPage: V3PageData = {
  eyebrow: "Partenaires",
  title: "Proposer moins, mais mieux.",
  text: "Un partenaire Golden Circle ne publie pas librement. Il soumet des offres à validation pour protéger la valeur perçue.",
  ctas: [
    { label: "Espace partenaire", href: "/espace-partenaire", variant: "primary" as const },
    { label: "Connexion", href: "/connexion", variant: "secondary" as const }
  ],
  cards: [
    { eyebrow: "Paliers", title: "Quotas actifs", text: "Les brouillons et offres en validation ne comptent pas dans le quota actif.", items: partnerTiers.map((tier) => `${tier.name} — ${tier.quota}`) },
    { eyebrow: "Workflow", title: "Brouillon → validation → activation", text: "Golden Circle valide ou refuse chaque activation avant diffusion." },
    { eyebrow: "Offres", title: "Champs d'offre V3", text: "Titre, catégorie, type, conditions, quota, dates, niveau requis, visibilité, statut, Mini Map et Golden Hour." },
    { eyebrow: "Sécurité", title: "RLS partenaire", text: "Un partenaire ne voit que ses offres, événements, quotas et statistiques." }
  ],
  notice: "Un événement ou une offre non listée doit voir ses conditions définies avant diffusion."
};

export const eventsPage: V3PageData = {
  eyebrow: "Événements",
  title: "Chaque événement a ses propres règles.",
  text: "Golden Circle raisonne par événement, jamais de façon générique.",
  ctas: [
    { label: "Connexion", href: "/connexion", variant: "primary" as const },
    { label: "GC List", href: "/gc-list", variant: "secondary" as const }
  ],
  cards: [
    { eyebrow: "Tenue", title: "Tenue adaptée à l'événement", text: "La tenue dépend du lieu, du format, du moment et des conditions partenaires." },
    { eyebrow: "Conditions", title: "Règles événement", text: "Lieu, date, format, partenaire, avantage, heure limite, quota, niveau requis et validation Golden Circle." },
    { eyebrow: "Accès", title: "Retard = avantage annulé", text: "Les horaires et conditions annoncés priment toujours." },
    { eyebrow: "Admin", title: "Validation avant diffusion", text: "Golden Circle se réserve le droit de refuser un accès ou un privilège." }
  ],
  notice: "Événement non listé = conditions à définir avant diffusion."
};

export const miniMapPage: V3PageData = {
  eyebrow: "Mini Map",
  title: "Mini Map — en déploiement progressif.",
  text: "La Mini Map préparera la lecture territoriale des partenaires actifs, en approche et des expériences sélectionnées.",
  ctas: [
    { label: "GC List", href: "/gc-list", variant: "primary" as const },
    { label: "Partenaires", href: "/partenaires", variant: "secondary" as const }
  ],
  cards: [
    { eyebrow: "Catégories", title: "Univers suivis", text: "Restaurants, mode, bien-être, santé, beauté, événements, expériences, services." },
    { eyebrow: "Statut", title: "Actifs ou en approche", text: "La carte ne doit pas devenir un annuaire ouvert. Elle restera filtrée et validée." },
    { eyebrow: "Visibilité", title: "Accès maîtrisé", text: "Certaines localisations pourront être publiques, membres uniquement ou VIP uniquement." },
    { eyebrow: "Supabase", title: "Données futures", text: "Les lieux seront portés par `mini_map_locations` avec validation admin." }
  ],
  notice: "La Mini Map reste progressive : peu de points, forte cohérence, pas de volume inutile."
};

export const loginPage: V3PageData = {
  eyebrow: "Connexion",
  title: "Trois accès. Trois rôles. Une séparation stricte.",
  text: "La V3 prépare Supabase Auth pour séparer membre, partenaire et admin Golden Circle.",
  ctas: [
    { label: "Espace membre", href: "/espace-membre", variant: "primary" as const },
    { label: "Espace partenaire", href: "/espace-partenaire", variant: "secondary" as const }
  ],
  cards: [
    { eyebrow: "Membre", title: "Accès membre", text: "Statut, privilèges, événements, Golden Hour, Mini Map et historique personnel." },
    { eyebrow: "Partenaire", title: "Accès partenaire", text: "Offres, événements, quotas, validations, statistiques et demandes d'upgrade." },
    { eyebrow: "Admin", title: "Golden Circle OS", text: "Validation des partenaires, offres, événements, paiements, notifications et audit logs." },
    { eyebrow: "Sécurité", title: "Pas d'auth locale", text: "Aucun ancien code manuel ni stockage navigateur n'est utilisé comme vraie authentification." }
  ],
  notice: "Supabase Auth doit être branché avant toute ouverture privée en production."
};

export const memberSpacePage: V3PageData = {
  eyebrow: "Espace membre",
  title: "Espace membre — structure V3 prête.",
  text: "Surface privée prévue pour le statut, les privilèges, les événements, la Golden Hour, la Mini Map et l'historique.",
  ctas: [
    { label: "Connexion", href: "/connexion", variant: "primary" as const },
    { label: "Events", href: "/events", variant: "secondary" as const }
  ],
  cards: [
    { eyebrow: "Statut", title: "GC List / VIP / Ambassadrice", text: "Le statut doit venir de Supabase, pas d'un stockage navigateur." },
    { eyebrow: "Historique", title: "Privilèges utilisés", text: "Futur suivi personnel : offres consultées, utilisées, événements, scans et paiements." },
    { eyebrow: "Notifications", title: "Diffusion ciblée", text: "Les notifications dépendront du rôle, niveau, zone et consentement." },
    { eyebrow: "RLS", title: "Données personnelles", text: "Un membre ne lit et modifie que ses propres données." }
  ],
  notice: publicNotice
};

export const partnerSpacePage: V3PageData = {
  eyebrow: "Espace partenaire",
  title: "Espace partenaire — offres sous contrôle.",
  text: "Surface privée prévue pour soumettre des offres, suivre les quotas, validations, Golden Hours, Mini Map et statistiques.",
  ctas: [
    { label: "Connexion", href: "/connexion", variant: "primary" as const },
    { label: "Partenaires", href: "/partenaires", variant: "secondary" as const }
  ],
  cards: [
    { eyebrow: "Offres", title: "Création d'offre", text: "Une offre démarre en brouillon puis passe en validation Golden Circle." },
    { eyebrow: "Quotas", title: "Quota par palier", text: "Le quota actif dépend du palier partenaire validé." },
    { eyebrow: "Golden Hour", title: "Activation flash", text: "Opportunités inférieures à 24h, contrôlées et limitées." },
    { eyebrow: "RLS", title: "Données partenaire", text: "Un partenaire ne voit que ses propres offres, événements et statistiques." }
  ],
  notice: "Aucune publication automatique. Golden Circle valide avant diffusion."
};

export const adminPage: V3PageData = {
  eyebrow: "Golden Circle OS",
  title: "Admin non public — validation et discipline.",
  text: "Le rôle admin Golden Circle valide les partenaires, les offres, les événements, les Golden Hours et les règles d'accès.",
  ctas: [
    { label: "Connexion", href: "/connexion", variant: "primary" as const },
    { label: "Supabase", href: "/legal", variant: "secondary" as const }
  ],
  cards: [
    { eyebrow: "Validation", title: "Partenaires et offres", text: "L'admin valide, refuse ou demande correction avant activation." },
    { eyebrow: "Audit", title: "Audit logs", text: "Toute action sensible doit être historisée dans `audit_logs`." },
    { eyebrow: "Sécurité", title: "Service role serveur uniquement", text: "La clé service role ne doit jamais passer côté client." },
    { eyebrow: "RLS", title: "Contrôle total admin", text: "L'admin peut valider les offres et partenaires avec policies dédiées." }
  ],
  notice: "Cette route n'est pas une preuve d'accès. Le vrai contrôle doit venir de Supabase Auth + RLS."
};

export const legalPage: V3PageData = {
  eyebrow: "Mentions légales",
  title: "Golden Circle est une offre pack commerciale de CSS.",
  text: "Base à compléter selon les informations juridiques finales avant production publique.",
  ctas: [
    { label: "Accueil", href: "/", variant: "primary" as const },
    { label: "Partenaires", href: "/partenaires", variant: "secondary" as const }
  ],
  cards: [
    { eyebrow: "Structure", title: "CSS — Caribbean Services Solutions", text: "SIRET : 901 908 582 000 17." },
    { eyebrow: "Offre", title: "Golden Circle", text: "Offre pack commerciale comprenant notamment GC List, GC Deals, Golden Hour et activations partenaires." },
    { eyebrow: "Sécurité", title: "Données et accès", text: "Les données sensibles doivent être protégées par Supabase Auth, RLS et audit logs." },
    { eyebrow: "Marque", title: "ADN visuel", text: "Bordeaux profond, doré satiné, blanc nacré. Peu de texte, beaucoup de respiration." }
  ],
  notice: "À relire avant mise en ligne finale avec les mentions légales complètes."
};
