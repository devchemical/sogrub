
-- Create the products table
create table public.products (
  id uuid not null default gen_random_uuid(),
  title text not null,
  description text null,
  materials text null,
  price numeric not null,
  width numeric null,
  height numeric null,
  depth numeric null,
  image_url text null,
  created_at timestamp with time zone not null default now(),
  constraint products_pkey primary key (id)
);

-- Enable Row Level Security (RLS)
alter table public.products enable row level security;

-- Create policies
-- Allow public read access
create policy "Public products are viewable by everyone."
  on public.products for select
  using (true);

-- Allow authenticated users (admin) to insert/update/delete
-- For simplicity, we'll allow any authenticated user for now, but in production this should be restricted to admin role
create policy "Authenticated users can insert products."
  on public.products for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update products."
  on public.products for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete products."
  on public.products for delete
  using (auth.role() = 'authenticated');

-- Create storage bucket for product images
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true);

-- Storage policies for product images
create policy "Public can view product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Authenticated users can upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

create policy "Authenticated users can update product images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images');

create policy "Authenticated users can delete product images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');
