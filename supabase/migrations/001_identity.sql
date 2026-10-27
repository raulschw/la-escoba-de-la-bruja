create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'client' check (role in ('client', 'tarotist', 'admin')),
  full_name text,
  avatar_url text,
  bio text,
  phone text,
  country text,
  locale text not null default 'es',
  consent_terms boolean not null default false,
  consent_privacy boolean not null default false,
  consent_age boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.tarotist_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  specialties text[] not null default '{}',
  price_per_minute integer not null default 0 check (price_per_minute >= 0),
  experience_years integer not null default 0 check (experience_years >= 0),
  verified boolean not null default false,
  verified_at timestamptz,
  rating_avg numeric(2,1) not null default 0 check (rating_avg >= 0 and rating_avg <= 5),
  total_reviews integer not null default 0,
  total_consultations integer not null default 0,
  available boolean not null default false,
  languages text[] not null default array['es']::text[],
  bio_long text,
  video_intro_url text,
  commission_rate numeric(4,2) not null default 0.20 check (commission_rate >= 0 and commission_rate <= 1)
);

create table if not exists public.tarotist_verifications (
  id uuid primary key default gen_random_uuid(),
  tarotist_id uuid not null references public.profiles(id) on delete cascade,
  document_type text not null,
  document_url text,
  selfie_url text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewer_id uuid references public.profiles(id),
  reviewer_notes text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
