# Supabase Schema Draft — Golden Circle V3

Ce document décrit le schéma Supabase prévu pour Golden Circle V3. Le SQL exploitable se trouve dans `supabase/schema.sql`.

## Authentification

Supabase Auth est la source d'identité. Chaque utilisateur authentifié possède un profil applicatif dans `profiles`.

Rôles prévus :

- `member` : membre GC List, VIP GC List ou Ambassadrice.
- `partner` : partenaire avec palier et quotas.
- `admin` : admin Golden Circle.

## Tables prévues

- `profiles` : profil applicatif relié à `auth.users`.
- `member_profiles` : informations membre.
- `member_status` : statuts membre.
- `partner_profiles` : informations partenaire.
- `partner_tiers` : paliers partenaire et quotas.
- `offers` : offres partenaires.
- `offer_status` : statuts d'offre.
- `offer_categories` : catégories d'offre.
- `offer_visibility` : règles de visibilité.
- `offer_quota` : quotas d'offre.
- `events` : événements partenaires ou Golden Circle.
- `event_access_rules` : règles d'accès événement.
- `golden_hours` : activations flash inférieures à 24h.
- `mini_map_locations` : points Mini Map.
- `submissions` : soumissions à validation.
- `validations` : validations ou refus admin.
- `notifications` : notifications membre/partenaire/admin.
- `subscriptions` : abonnements membres ou partenaires.
- `payments` : paiements et historique Stripe futur.
- `audit_logs` : journaux admin et sécurité.

## Sécurité RLS

RLS est obligatoire sur les tables sensibles.

Principes :

- Un membre ne voit que ses propres données.
- Un partenaire ne voit que son profil, ses offres, événements, quotas et statistiques.
- L'admin Golden Circle peut lire et valider les partenaires, offres, événements et soumissions.
- Les tables publiques/lookup peuvent être lisibles par tous, mais leur écriture reste admin.
- `SUPABASE_SERVICE_ROLE_KEY` reste côté serveur uniquement.

## Statut du schéma

Brouillon volontairement large pour préparer la V3. À appliquer d'abord dans un projet Supabase de test avant production.
