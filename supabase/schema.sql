-- ============================================================
-- BROWN'S INTERIOR — SUPABASE DATABASE SCHEMA
-- Run this SQL inside your Supabase Dashboard -> SQL Editor
-- ============================================================

create extension if not exists "pgcrypto";

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  service_category text not null,
  sub_service text default '',
  location text default '',
  area_sqft integer default null,
  estimated_budget text default '',
  message text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'site_visit', 'quoted', 'won', 'archived')),
  admin_notes text default '',
  source text default 'website_contact_form',
  email_sent boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Keep updated_at current automatically
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_inquiries_updated_at on public.inquiries;
create trigger set_inquiries_updated_at
before update on public.inquiries
for each row execute function public.handle_updated_at();

-- Enable Row Level Security (RLS)
alter table public.inquiries enable row level security;

-- 1. Allow anyone on the public website to INSERT a new inquiry
drop policy if exists "Allow public insert on inquiries" on public.inquiries;
create policy "Allow public insert on inquiries"
  on public.inquiries
  for insert
  to anon, authenticated
  with check (true);

-- 2. Allow reading/updating/deleting inquiries from the Admin Dashboard
-- (Uses anon/authenticated key for quick setup; tighten to 'to authenticated' once Supabase Auth users are created)
drop policy if exists "Allow admin read on inquiries" on public.inquiries;
create policy "Allow admin read on inquiries"
  on public.inquiries
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Allow admin update on inquiries" on public.inquiries;
create policy "Allow admin update on inquiries"
  on public.inquiries
  for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "Allow admin delete on inquiries" on public.inquiries;
create policy "Allow admin delete on inquiries"
  on public.inquiries
  for delete
  to anon, authenticated
  using (true);

-- Enable Realtime so the separate Admin Website updates live when a form is submitted
alter publication supabase_realtime add table public.inquiries;
