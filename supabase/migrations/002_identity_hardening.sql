create table if not exists public.consent_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  consent_type text not null check (consent_type in ('terms', 'privacy', 'age')),
  consented boolean not null,
  created_at timestamptz not null default now()
);

alter table public.consent_logs enable row level security;
create policy "consent_logs_select_own_or_admin" on public.consent_logs for select
using (auth.uid() = user_id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin' and p.deleted_at is null));

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare requested_role text;
begin
  requested_role := case when new.raw_user_meta_data ->> 'requested_role' = 'tarotist' then 'tarotist' else 'client' end;
  insert into public.profiles (id, role, full_name, avatar_url, consent_terms, consent_privacy, consent_age)
  values (
    new.id,
    requested_role,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url',
    coalesce((new.raw_user_meta_data ->> 'consent_terms')::boolean, false),
    coalesce((new.raw_user_meta_data ->> 'consent_privacy')::boolean, false),
    coalesce((new.raw_user_meta_data ->> 'consent_age')::boolean, false)
  )
  on conflict (id) do nothing;

  if requested_role = 'tarotist' then
    insert into public.tarotist_profiles (user_id) values (new.id) on conflict (user_id) do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
