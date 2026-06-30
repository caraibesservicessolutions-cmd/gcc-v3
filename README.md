# GOLDEN CIRCLE Caraïbes V3

Golden Circle Caraïbes est une infrastructure privée d'accès aux privilèges, expériences, offres partenaires et opportunités lifestyle en Caraïbe.

Slogan : **L'Accès aux Privilèges.**

## Positionnement V3

Golden Circle n'est pas :

- un simple groupe WhatsApp ;
- une carte de réduction ;
- un annuaire de bons plans ;
- une marketplace ouverte ;
- un organisateur de soirées uniquement ;
- un SaaS générique.

Golden Circle qualifie les partenaires, valide les offres, contrôle les quotas et distribue les accès selon les conditions Golden Circle.

## Stack

- Next.js 16.
- TypeScript.
- Tailwind CSS.
- React 19.
- Supabase-ready.
- Vercel-ready.

## Routes V3

- `/` : entrée simple avec redirection vers `/fr`.
- `/fr` : accueil V3.
- `/fr/gc-list` : accès membre.
- `/fr/partenaires` : paliers, quotas et offres partenaires.
- `/fr/events` : événements sous validation Golden Circle.
- `/fr/mini-map` : Mini Map en déploiement progressif.
- `/fr/connexion` : séparation membre / partenaire / admin.
- `/fr/espace-membre` : espace privé membre en déploiement progressif.
- `/fr/espace-partenaire` : espace privé partenaire en déploiement progressif.
- `/fr/admin` : Golden Circle OS non public.
- `/fr/legal` : mentions légales à compléter.

Les routes existent aussi pour `en`, `es`, `pt` et `ht`, avec le français comme langue principale.

## Membres

Statuts prévus :

- GC List : 18 EUR.
- VIP GC List : 49,90 EUR.
- Ambassadrice : statut sur validation Golden Circle.

Mention obligatoire :

> Les privilèges ne sont ni automatiques ni garantis. Ils dépendent des partenaires, des événements, des quotas, des disponibilités et des conditions Golden Circle.

## Partenaires

Paliers prévus :

- Partenaire Découverte : 1 offre active.
- Partenaire Actif : 3 offres actives.
- Partenaire Premium : 7 offres actives.
- Partenaire Signature : quota étendu ou validation personnalisée Golden Circle.

Les brouillons et offres en validation ne comptent pas dans le quota actif.

## Offres partenaires

Chaque offre prévoit : titre, catégorie, type, description courte, conditions d'accès, quota, date de début, date de fin, niveau requis, visibilité, statut, affichage Mini Map et affichage Golden Hour.

Workflow :

1. Le partenaire crée l'offre.
2. L'offre reste en brouillon.
3. Le partenaire soumet l'offre à Golden Circle.
4. Golden Circle valide ou refuse.
5. L'offre active devient visible selon son niveau, son quota et sa visibilité.

## Événements

Règle officielle : **tenue adaptée à l'événement.**

Chaque événement prévoit : lieu, date, format, partenaire, avantage éventuel, conditions d'accès, heure limite, quota, statut, niveau requis et validation Golden Circle.

## Mini Map

Route : `/fr/mini-map`.

Mention : **Mini Map — en déploiement progressif.**

Catégories prévues : restaurants, mode, bien-être, santé, beauté, événements, expériences, services, partenaires actifs, partenaires en approche.

## Authentification Supabase-ready

La V3 prépare Supabase Auth avec séparation stricte :

- membre ;
- partenaire ;
- admin Golden Circle.

Il n'y a plus d'ancien compte manuel, plus d'authentification locale, plus de carte virtuelle comme axe produit principal et plus de route héritée conservée.

## Supabase

Fichiers fournis :

- `lib/supabase/client.ts` : client navigateur avec `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- `lib/supabase/admin.ts` : structure serveur documentée pour `SUPABASE_SERVICE_ROLE_KEY`.
- `supabase/schema.sql` : brouillon SQL complet.
- `SUPABASE_SCHEMA_DRAFT.md` : documentation lisible du schéma.

Sécurité obligatoire :

- RLS obligatoire sur les tables sensibles.
- Un membre ne voit que ses données.
- Un partenaire ne voit que ses offres, événements et statistiques.
- L'admin Golden Circle peut valider les offres et partenaires.
- `SUPABASE_SERVICE_ROLE_KEY` ne doit jamais être exposée côté client.

## Variables Vercel

À configurer dans Vercel :

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_GC_LIST_PRICE_ID=
NEXT_PUBLIC_STRIPE_VIP_GC_LIST_PRICE_ID=
NEXT_PUBLIC_QR_SCANNER_PROVIDER=
ACCESS_TOKEN_SALT=
```

La base minimale demandée est :

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Commandes

```bash
pnpm install
pnpm typecheck
pnpm build
```

## Déploiement GitHub + Vercel

1. Créer un nouveau repo GitHub propre.
2. Uploader directement le contenu du ZIP à la racine du repo.
3. Connecter le repo à Vercel.
4. Ajouter les variables d'environnement.
5. Laisser Vercel détecter Next.js.
6. Déployer.
7. Connecter Supabase ensuite via le schéma fourni.

## Note ZIP

Le ZIP doit être extrait avec `app/`, `components/`, `lib/`, `public/`, `package.json`, `pnpm-lock.yaml` directement à la racine. Il ne contient pas de dossier parent imbriqué.
