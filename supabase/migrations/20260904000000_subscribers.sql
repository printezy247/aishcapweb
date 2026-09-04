-- Aish Capital: weekly-breakdown subscribers (Phase 1).
-- Double opt-in: rows are inserted unconfirmed by the anon key; a confirmation
-- email carries confirm_token; confirm_subscription(token) sets confirmed_at.

create extension if not exists pgcrypto;

create table if not exists public.subscribers (
  id             uuid primary key default gen_random_uuid(),
  email          text not null,
  locale         text not null check (locale in ('en', 'ms')),
  source         text,
  created_at     timestamptz not null default now(),
  confirmed_at   timestamptz,
  confirm_token  uuid not null default gen_random_uuid(),
  unsubscribed_at timestamptz
);

create unique index if not exists subscribers_email_key on public.subscribers (lower(email));

alter table public.subscribers enable row level security;

-- Anonymous visitors may insert one row. They may never read, update or delete.
drop policy if exists "anon can subscribe" on public.subscribers;
create policy "anon can subscribe"
  on public.subscribers for insert
  to anon
  with check (
    confirmed_at is null
    and unsubscribed_at is null
    and email ~* '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'
  );

-- The confirm_token must never be readable by the anon key.
revoke all on public.subscribers from anon;
grant insert (email, locale, source) on public.subscribers to anon;

-- Second half of double opt-in. SECURITY DEFINER so anon can call it without
-- any read access to the table. Returns true once per token.
create or replace function public.confirm_subscription(p_token uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  updated int;
begin
  update public.subscribers
     set confirmed_at = now()
   where confirm_token = p_token
     and confirmed_at is null
     and unsubscribed_at is null;
  get diagnostics updated = row_count;
  return updated = 1;
end;
$$;

revoke all on function public.confirm_subscription(uuid) from public;
grant execute on function public.confirm_subscription(uuid) to anon;

-- One-click unsubscribe, called from the link in every email.
create or replace function public.unsubscribe(p_token uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  updated int;
begin
  update public.subscribers
     set unsubscribed_at = now()
   where confirm_token = p_token
     and unsubscribed_at is null;
  get diagnostics updated = row_count;
  return updated = 1;
end;
$$;

revoke all on function public.unsubscribe(uuid) from public;
grant execute on function public.unsubscribe(uuid) to anon;

-- PDPA retention: unconfirmed addresses are removed after 30 days.
-- Schedule with pg_cron if available:  select cron.schedule('purge-unconfirmed', '0 3 * * *', $$select public.purge_unconfirmed()$$);
create or replace function public.purge_unconfirmed()
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.subscribers
   where confirmed_at is null
     and created_at < now() - interval '30 days';
$$;
