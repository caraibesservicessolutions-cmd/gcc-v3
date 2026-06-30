export const locales = ["fr", "en", "es", "pt", "ht"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && locales.includes(value as Locale);
}

export const routesV3 = [
  "/",
  "/gc-list",
  "/partenaires",
  "/events",
  "/mini-map",
  "/connexion",
  "/espace-membre",
  "/espace-partenaire",
  "/admin",
  "/legal"
] as const;

export const routeLabels: Record<(typeof routesV3)[number], string> = {
  "/": "Accueil",
  "/gc-list": "GC List",
  "/partenaires": "Partenaires",
  "/events": "Événements",
  "/mini-map": "Mini Map",
  "/connexion": "Connexion",
  "/espace-membre": "Espace membre",
  "/espace-partenaire": "Espace partenaire",
  "/admin": "Golden Circle OS",
  "/legal": "Mentions légales"
};
