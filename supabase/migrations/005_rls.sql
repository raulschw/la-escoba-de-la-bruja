alter table public.profiles enable row level security;
alter table public.tarotist_profiles enable row level security;
alter table public.tarotist_verifications enable row level security;

create policy "profiles_select_public"
on public.profiles for select
using (deleted_at is null);

create policy "profiles_update_own"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "tarotist_profiles_select_public"
on public.tarotist_profiles for select
using (true);

create policy "tarotist_profiles_insert_own"
on public.tarotist_profiles for insert
with check (auth.uid() = user_id);

create policy "tarotist_profiles_update_own"
on public.tarotist_profiles for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "tarotist_verifications_select_own_or_admin"
on public.tarotist_verifications for select
using (
  auth.uid() = tarotist_id
  or exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin' and deleted_at is null
  )
);

create policy "tarotist_verifications_insert_own"
on public.tarotist_verifications for insert
with check (auth.uid() = tarotist_id);

create policy "tarotist_verifications_admin_update"
on public.tarotist_verifications for update
using (
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin' and deleted_at is null
  )
);
