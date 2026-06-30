# Vérifications locales — Golden Circle V3

Date : 2026-06-30

## Typecheck

Commande exécutée dans l'environnement sandbox :

```bash
npm run typecheck
```

Résultat : OK.

Script équivalent dans `package.json` :

```bash
pnpm typecheck
```

## Build

Commande exécutée dans l'environnement sandbox :

```bash
npm run build
```

Résultat local : échec environnemental, pas échec applicatif.

Cause : le binaire `next` n'est pas disponible dans le sandbox parce que les dépendances npm/pnpm ne sont pas installées et le sandbox n'a pas d'accès DNS au registry npm pour installer Next.js.

Sortie observée :

```text
sh: 1: next: not found
```

À vérifier après upload GitHub/Vercel :

```bash
pnpm install
pnpm typecheck
pnpm build
```

Sur Vercel, le build pourra s'exécuter après installation des dépendances Next.js.
