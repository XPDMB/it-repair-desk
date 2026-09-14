-- Run this file once in Supabase SQL Editor before deploying the secured frontend.
-- Create the first staff account in Authentication > Users, then add its UUID
-- to public.admin_users with the INSERT statement at the bottom of this file.

begin;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.tickets enable row level security;

drop policy if exists "admin can read own role" on public.admin_users;
create policy "admin can read own role"
on public.admin_users
for select
to authenticated
using (auth.uid() = user_id);

-- A public visitor may only create a brand-new pending ticket. Assignment,
-- repair notes, and completed status must be added by an authenticated admin.
drop policy if exists "public can create pending tickets" on public.tickets;
create policy "public can create pending tickets"
on public.tickets
for insert
to anon, authenticated
with check (
  status = 'pending'
  and priority in ('ปกติ', 'เร่งด่วน')
  and device_type in ('PC', 'Notebook', 'All in One', 'Printer', 'Network', 'Other')
  and coalesce(assignee, '') = ''
  and coalesce(repair_result, '') = ''
  and coalesce(after_photo, '') = ''
);

drop policy if exists "admins can read tickets" on public.tickets;
create policy "admins can read tickets"
on public.tickets
for select
to authenticated
using (
  exists (
    select 1 from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);

drop policy if exists "admins can update tickets" on public.tickets;
create policy "admins can update tickets"
on public.tickets
for update
to authenticated
using (
  exists (
    select 1 from public.admin_users
    where admin_users.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);

drop policy if exists "admins can delete tickets" on public.tickets;
create policy "admins can delete tickets"
on public.tickets
for delete
to authenticated
using (
  exists (
    select 1 from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);

revoke all on table public.admin_users from anon, authenticated;
grant select on table public.admin_users to authenticated;

revoke all on table public.tickets from anon, authenticated;
grant insert on table public.tickets to anon, authenticated;
grant select, update, delete on table public.tickets to authenticated;

commit;

-- After creating a staff user in Supabase Authentication, run this separately:
-- insert into public.admin_users (user_id) values ('STAFF_USER_UUID');
