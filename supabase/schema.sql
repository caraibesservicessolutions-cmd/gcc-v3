-- GOLDEN CIRCLE V3 - Supabase schema draft
-- Apply first in a Supabase test project.
-- Auth source of truth: auth.users.

create extension if not exists "pgcrypto";

-- LOOKUPS
create table if not exists public.member_status (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  label text not null,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

insert into public.member_status (key, label, description, sort_order) values
  ('gc_list', 'GC List', 'Accès membre annuel', 10),
  ('vip_gc_list', 'VIP GC List', 'Accès VIP GC List', 20),
  ('ambassador', 'Ambassadrice', 'Statut validé par Golden Circle', 30),
  ('suspended', 'Suspendu', 'Accès suspendu', 90)
on conflict (key) do nothing;

create table if not exists public.partner_tiers (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  label text not null,
  active_offer_limit integer,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

insert into public.partner_tiers (key, label, active_offer_limit, description, sort_order) values
  ('discovery', 'Partenaire Découverte', 1, '1 offre active', 10),
  ('active', 'Partenaire Actif', 3, '3 offres actives', 20),
  ('premium', 'Partenaire Premium', 7, '7 offres actives', 30),
  ('signature', 'Partenaire Signature', null, 'Quota étendu ou validation personnalisée Golden Circle', 40)
on conflict (key) do nothing;

create table if not exists public.offer_status (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  label text not null,
  sort_order integer not null default 0
);

insert into public.offer_status (key, label, sort_order) values
  ('draft', 'Brouillon', 10),
  ('submitted', 'En validation', 20),
  ('active', 'Active', 30),
  ('expired', 'Expirée', 40),
  ('refused', 'Refusée', 50),
  ('archived', 'Archivée', 60)
on conflict (key) do nothing;

create table if not exists public.offer_categories (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  label text not null,
  sort_order integer not null default 0
);

insert into public.offer_categories (key, label, sort_order) values
  ('gc_deals', 'GC Deals', 10),
  ('golden_hour', 'Golden Hour', 20),
  ('event_access', 'Accès événement', 30),
  ('vip_privilege', 'Privilège VIP', 40),
  ('recommendation', 'Recommandation', 50),
  ('mini_map', 'Mini Map', 60)
on conflict (key) do nothing;

create table if not exists public.offer_visibility (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  label text not null,
  description text
);

insert into public.offer_visibility (key, label, description) values
  ('public', 'Publique', 'Visible sur surfaces publiques validées'),
  ('members_only', 'Membres uniquement', 'Visible aux membres connectés'),
  ('vip_only', 'VIP uniquement', 'Visible uniquement aux VIP GC List'),
  ('admin_only', 'Admin uniquement', 'Visible uniquement dans Golden Circle OS')
on conflict (key) do nothing;

-- PROFILES
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('member', 'partner', 'admin')),
  full_name text,
  email text,
  phone text,
  instagram text,
  locale text not null default 'fr',
  avatar_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.member_profiles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid unique not null references public.profiles(id) on delete cascade,
  member_status_id uuid references public.member_status(id),
  zone text,
  birthdate date,
  interests text[] not null default '{}',
  onboarding_completed_at timestamptz,
  membership_started_at timestamptz,
  membership_expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.partner_profiles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid unique not null references public.profiles(id) on delete cascade,
  partner_tier_id uuid references public.partner_tiers(id),
  business_name text not null,
  business_sector text,
  contact_name text,
  contact_email text,
  contact_phone text,
  instagram text,
  website text,
  address text,
  city text,
  island text,
  is_validated boolean not null default false,
  validated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- OFFERS
create table if not exists public.offers (
  id uuid primary key default gen_random_uuid(),
  partner_profile_id uuid not null references public.partner_profiles(id) on delete cascade,
  status_id uuid references public.offer_status(id),
  category_id uuid references public.offer_categories(id),
  visibility_id uuid references public.offer_visibility(id),
  title text not null,
  short_description text,
  access_conditions text,
  required_member_status_key text,
  starts_at timestamptz,
  ends_at timestamptz,
  is_golden_hour boolean not null default false,
  show_on_mini_map boolean not null default false,
  submitted_at timestamptz,
  approved_at timestamptz,
  refused_at timestamptz,
  refusal_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.offer_quota (
  id uuid primary key default gen_random_uuid(),
  offer_id uuid unique not null references public.offers(id) on delete cascade,
  total_quota integer,
  used_quota integer not null default 0,
  reserved_quota integer not null default 0,
  per_member_limit integer default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint quota_non_negative check (
    coalesce(total_quota, 0) >= 0 and used_quota >= 0 and reserved_quota >= 0
  )
);

-- EVENTS
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  partner_profile_id uuid references public.partner_profiles(id) on delete set null,
  title text not null,
  venue text,
  address text,
  city text,
  island text,
  event_format text,
  starts_at timestamptz,
  ends_at timestamptz,
  advantage text,
  dress_rule text not null default 'Tenue adaptée à l’événement.',
  status text not null default 'draft' check (status in ('draft', 'submitted', 'active', 'expired', 'refused', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.event_access_rules (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  required_member_status_key text,
  group_size integer,
  latest_arrival_at timestamptz,
  quota integer,
  repost_required boolean not null default false,
  notes text,
  created_at timestamptz not null default now()
);

-- GOLDEN HOUR AND MINI MAP
create table if not exists public.golden_hours (
  id uuid primary key default gen_random_uuid(),
  offer_id uuid references public.offers(id) on delete cascade,
  partner_profile_id uuid references public.partner_profiles(id) on delete cascade,
  title text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'draft' check (status in ('draft', 'submitted', 'active', 'expired', 'refused', 'archived')),
  created_at timestamptz not null default now(),
  constraint golden_hour_duration check (ends_at > starts_at and ends_at <= starts_at + interval '24 hours')
);

create table if not exists public.mini_map_locations (
  id uuid primary key default gen_random_uuid(),
  partner_profile_id uuid references public.partner_profiles(id) on delete set null,
  offer_id uuid references public.offers(id) on delete set null,
  name text not null,
  category text not null,
  address text,
  city text,
  island text,
  latitude numeric(10, 7),
  longitude numeric(10, 7),
  visibility_key text not null default 'members_only',
  status text not null default 'draft' check (status in ('draft', 'submitted', 'active', 'hidden', 'refused')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- SUBMISSIONS / VALIDATIONS
create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  submitted_by uuid references public.profiles(id) on delete set null,
  target_table text not null,
  target_id uuid not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'refused', 'cancelled')),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.validations (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid references public.submissions(id) on delete cascade,
  validated_by uuid references public.profiles(id) on delete set null,
  decision text not null check (decision in ('approved', 'refused', 'changes_requested')),
  comment text,
  created_at timestamptz not null default now()
);

-- NOTIFICATIONS / SUBSCRIPTIONS / PAYMENTS
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade,
  audience_role text check (audience_role in ('member', 'partner', 'admin')),
  title text not null,
  body text,
  channel text not null default 'in_app' check (channel in ('in_app', 'email', 'whatsapp', 'sms')),
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  subscription_type text not null check (subscription_type in ('gc_list', 'vip_gc_list', 'partner_tier')),
  status text not null default 'pending' check (status in ('pending', 'active', 'past_due', 'cancelled', 'expired')),
  stripe_customer_id text,
  stripe_subscription_id text,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  subscription_id uuid references public.subscriptions(id) on delete set null,
  amount_cents integer not null check (amount_cents >= 0),
  currency text not null default 'eur',
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'refunded', 'cancelled')),
  provider text not null default 'stripe',
  provider_payment_id text,
  raw_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- AUDIT LOGS
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_profile_id uuid references public.profiles(id) on delete set null,
  action text not null,
  target_table text,
  target_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

-- UPDATED_AT HELPER
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger set_member_profiles_updated_at before update on public.member_profiles for each row execute function public.set_updated_at();
create trigger set_partner_profiles_updated_at before update on public.partner_profiles for each row execute function public.set_updated_at();
create trigger set_offers_updated_at before update on public.offers for each row execute function public.set_updated_at();
create trigger set_offer_quota_updated_at before update on public.offer_quota for each row execute function public.set_updated_at();
create trigger set_events_updated_at before update on public.events for each row execute function public.set_updated_at();
create trigger set_mini_map_locations_updated_at before update on public.mini_map_locations for each row execute function public.set_updated_at();
create trigger set_submissions_updated_at before update on public.submissions for each row execute function public.set_updated_at();
create trigger set_subscriptions_updated_at before update on public.subscriptions for each row execute function public.set_updated_at();

-- RLS HELPERS
create or replace function public.current_profile_role()
returns text
language sql
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.is_gc_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin' and is_active = true);
$$;

create or replace function public.current_partner_profile_id()
returns uuid
language sql
security definer
set search_path = public
as $$
  select id from public.partner_profiles where profile_id = auth.uid();
$$;

-- ENABLE RLS
alter table public.profiles enable row level security;
alter table public.member_profiles enable row level security;
alter table public.partner_profiles enable row level security;
alter table public.offers enable row level security;
alter table public.offer_quota enable row level security;
alter table public.events enable row level security;
alter table public.event_access_rules enable row level security;
alter table public.golden_hours enable row level security;
alter table public.mini_map_locations enable row level security;
alter table public.submissions enable row level security;
alter table public.validations enable row level security;
alter table public.notifications enable row level security;
alter table public.subscriptions enable row level security;
alter table public.payments enable row level security;
alter table public.audit_logs enable row level security;

-- LOOKUP TABLES READABLE
alter table public.member_status enable row level security;
alter table public.partner_tiers enable row level security;
alter table public.offer_status enable row level security;
alter table public.offer_categories enable row level security;
alter table public.offer_visibility enable row level security;

create policy "lookup read member_status" on public.member_status for select using (true);
create policy "lookup read partner_tiers" on public.partner_tiers for select using (true);
create policy "lookup read offer_status" on public.offer_status for select using (true);
create policy "lookup read offer_categories" on public.offer_categories for select using (true);
create policy "lookup read offer_visibility" on public.offer_visibility for select using (true);

-- PROFILE POLICIES
create policy "profile read own or admin" on public.profiles
for select using (id = auth.uid() or public.is_gc_admin());

create policy "profile update own limited or admin" on public.profiles
for update using (id = auth.uid() or public.is_gc_admin())
with check (id = auth.uid() or public.is_gc_admin());

-- MEMBER POLICIES
create policy "member reads own or admin" on public.member_profiles
for select using (profile_id = auth.uid() or public.is_gc_admin());

create policy "member updates own or admin" on public.member_profiles
for update using (profile_id = auth.uid() or public.is_gc_admin())
with check (profile_id = auth.uid() or public.is_gc_admin());

-- PARTNER POLICIES
create policy "partner reads own or admin" on public.partner_profiles
for select using (profile_id = auth.uid() or public.is_gc_admin());

create policy "partner updates own or admin" on public.partner_profiles
for update using (profile_id = auth.uid() or public.is_gc_admin())
with check (profile_id = auth.uid() or public.is_gc_admin());

-- OFFERS / QUOTAS / EVENTS
create policy "partner reads own offers or admin" on public.offers
for select using (partner_profile_id = public.current_partner_profile_id() or public.is_gc_admin());

create policy "partner creates own offers" on public.offers
for insert with check (partner_profile_id = public.current_partner_profile_id() or public.is_gc_admin());

create policy "partner updates own draft offers or admin" on public.offers
for update using (partner_profile_id = public.current_partner_profile_id() or public.is_gc_admin())
with check (partner_profile_id = public.current_partner_profile_id() or public.is_gc_admin());

create policy "partner reads own quota or admin" on public.offer_quota
for select using (
  exists(select 1 from public.offers o where o.id = offer_id and o.partner_profile_id = public.current_partner_profile_id())
  or public.is_gc_admin()
);

create policy "partner reads own events or admin" on public.events
for select using (partner_profile_id = public.current_partner_profile_id() or public.is_gc_admin());

create policy "partner creates own events" on public.events
for insert with check (partner_profile_id = public.current_partner_profile_id() or public.is_gc_admin());

create policy "event rules visible by owner or admin" on public.event_access_rules
for select using (
  exists(select 1 from public.events e where e.id = event_id and e.partner_profile_id = public.current_partner_profile_id())
  or public.is_gc_admin()
);

-- MINI MAP / GOLDEN HOUR
create policy "partner reads own golden hours or admin" on public.golden_hours
for select using (partner_profile_id = public.current_partner_profile_id() or public.is_gc_admin());

create policy "mini map controlled visibility" on public.mini_map_locations
for select using (
  status = 'active'
  or partner_profile_id = public.current_partner_profile_id()
  or public.is_gc_admin()
);

-- SUBMISSIONS / VALIDATIONS
create policy "submitter reads own submissions or admin" on public.submissions
for select using (submitted_by = auth.uid() or public.is_gc_admin());

create policy "authenticated can create submissions" on public.submissions
for insert with check (submitted_by = auth.uid() or public.is_gc_admin());

create policy "validations admin read write" on public.validations
for all using (public.is_gc_admin()) with check (public.is_gc_admin());

-- NOTIFICATIONS / SUBSCRIPTIONS / PAYMENTS
create policy "notifications own or admin" on public.notifications
for select using (profile_id = auth.uid() or public.is_gc_admin());

create policy "subscriptions own or admin" on public.subscriptions
for select using (profile_id = auth.uid() or public.is_gc_admin());

create policy "payments own or admin" on public.payments
for select using (profile_id = auth.uid() or public.is_gc_admin());

-- AUDIT LOGS ADMIN ONLY
grant select, insert on public.audit_logs to authenticated;
create policy "audit logs admin only" on public.audit_logs
for select using (public.is_gc_admin());

create policy "audit insert admin or service" on public.audit_logs
for insert with check (public.is_gc_admin());
