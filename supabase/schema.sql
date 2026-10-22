-- ============================================================
-- AKOY 360 — Supabase Schema + RLS + Storage Buckets
-- ============================================================
-- Run this entire file in the Supabase SQL Editor.
--
-- Auth model:
--   • Admin  → a real Supabase auth user (signs in via AdminLogin.tsx)
--   • Public → anonymous/unauthenticated visitors (no sign-in needed)
--
-- RLS philosophy (per table):
--   divisions      — PUBLIC read  | ADMIN write/update/delete
--   testimonials   — PUBLIC read (published only) | ADMIN full
--   site_settings  — PUBLIC read  | ADMIN write/update/delete
--   inquiries      — PUBLIC insert (contact form) | ADMIN full read/update/delete
--   subscribers    — PUBLIC insert (newsletter form) | NO public read | ADMIN full
-- ============================================================


-- ============================================================
-- HELPER: Check if the requesting user is an authenticated admin
-- ============================================================
-- We rely on Supabase Auth's auth.uid() being non-null for admins.
-- Because there is only one role (admin), any authenticated user is an admin.
-- If you later want to restrict to specific admin emails, replace the function body.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT auth.uid() IS NOT NULL;
$$;


-- ============================================================
-- TABLE: divisions
-- Editable content for each of the 6 AKOY 360 business divisions.
-- Admins can fully manage; public can read (used on the public site).
-- ============================================================

CREATE TABLE IF NOT EXISTS public.divisions (
  id              TEXT PRIMARY KEY,                    -- e.g. "properties", "construction"
  name            TEXT NOT NULL,
  short_name      TEXT NOT NULL,
  tagline         TEXT NOT NULL,
  headline        TEXT NOT NULL,
  description     TEXT NOT NULL,
  bullet_points   TEXT[]  NOT NULL DEFAULT '{}',
  image           TEXT    NOT NULL DEFAULT '',         -- hero image URL (storage or external)
  gallery_images  TEXT[]  NOT NULL DEFAULT '{}',       -- array of image/video URLs
  stat_value      TEXT    NOT NULL DEFAULT '',
  stat_label      TEXT    NOT NULL DEFAULT '',
  metric_primary  TEXT    NOT NULL DEFAULT '',
  metric_secondary TEXT   NOT NULL DEFAULT '',
  icon_name       TEXT    NOT NULL DEFAULT '',
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.divisions ENABLE ROW LEVEL SECURITY;

-- Public can read all divisions (needed for the public-facing website)
CREATE POLICY "divisions_public_read"
  ON public.divisions
  FOR SELECT
  USING (true);

-- Only authenticated admin can insert
CREATE POLICY "divisions_admin_insert"
  ON public.divisions
  FOR INSERT
  WITH CHECK (public.is_admin());

-- Only authenticated admin can update
CREATE POLICY "divisions_admin_update"
  ON public.divisions
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Only authenticated admin can delete
CREATE POLICY "divisions_admin_delete"
  ON public.divisions
  FOR DELETE
  USING (public.is_admin());


-- ============================================================
-- TABLE: testimonials
-- Client testimonials. Published ones are visible publicly;
-- drafts are only visible to the admin.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.testimonials (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT        NOT NULL,
  title       TEXT        NOT NULL,
  location    TEXT        NOT NULL,
  division    TEXT        NOT NULL,
  rating      INTEGER     DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  quote       TEXT        NOT NULL,
  initials    TEXT        NOT NULL,
  published   BOOLEAN     DEFAULT TRUE,
  sort_order  INTEGER     DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Public can only read published testimonials
CREATE POLICY "testimonials_public_read_published"
  ON public.testimonials
  FOR SELECT
  USING (published = TRUE);

-- Admin can read ALL testimonials (including drafts)
CREATE POLICY "testimonials_admin_read_all"
  ON public.testimonials
  FOR SELECT
  USING (public.is_admin());

-- Only admin can insert
CREATE POLICY "testimonials_admin_insert"
  ON public.testimonials
  FOR INSERT
  WITH CHECK (public.is_admin());

-- Only admin can update (toggle publish, edit content, reorder)
CREATE POLICY "testimonials_admin_update"
  ON public.testimonials
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Only admin can delete
CREATE POLICY "testimonials_admin_delete"
  ON public.testimonials
  FOR DELETE
  USING (public.is_admin());


-- ============================================================
-- TABLE: site_settings
-- Key-value store for contact info, social links, etc.
-- Public can read (so the public site can display phone/email/socials).
-- Only admin can write.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.site_settings (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  key         TEXT        UNIQUE NOT NULL,
  value       TEXT        NOT NULL,
  label       TEXT        NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read all site settings (phone, email, socials shown on public pages)
CREATE POLICY "site_settings_public_read"
  ON public.site_settings
  FOR SELECT
  USING (true);

-- Only admin can insert new settings
CREATE POLICY "site_settings_admin_insert"
  ON public.site_settings
  FOR INSERT
  WITH CHECK (public.is_admin());

-- Only admin can update settings
CREATE POLICY "site_settings_admin_update"
  ON public.site_settings
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Only admin can delete settings
CREATE POLICY "site_settings_admin_delete"
  ON public.site_settings
  FOR DELETE
  USING (public.is_admin());

-- Auto-update updated_at on change
CREATE OR REPLACE FUNCTION public.touch_site_settings_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.touch_site_settings_updated_at();


-- ============================================================
-- TABLE: inquiries
-- Contact form submissions from the public-facing website.
-- Public can INSERT (submit the form) but CANNOT read.
-- Only admin can read, update status, and delete.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.inquiries (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name   TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  phone       TEXT        NOT NULL,
  country     TEXT        NOT NULL DEFAULT 'Nigeria',
  division    TEXT        NOT NULL,
  message     TEXT        NOT NULL,
  status      TEXT        NOT NULL DEFAULT 'unread'
                CHECK (status IN ('unread', 'read', 'responded')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Public can submit inquiries (contact form) — no auth needed
CREATE POLICY "inquiries_public_insert"
  ON public.inquiries
  FOR INSERT
  WITH CHECK (true);

-- Only admin can read all inquiries (private contact details)
CREATE POLICY "inquiries_admin_read"
  ON public.inquiries
  FOR SELECT
  USING (public.is_admin());

-- Only admin can update status (unread → read → responded)
CREATE POLICY "inquiries_admin_update"
  ON public.inquiries
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Only admin can delete inquiries
CREATE POLICY "inquiries_admin_delete"
  ON public.inquiries
  FOR DELETE
  USING (public.is_admin());


-- ============================================================
-- TABLE: subscribers
-- Newsletter subscriber emails.
-- Public can INSERT (subscribe) but CANNOT read — this is private data.
-- Only admin can read, and delete.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.subscribers (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  email       TEXT        UNIQUE NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Public can subscribe (insert their email) — no auth needed
CREATE POLICY "subscribers_public_insert"
  ON public.subscribers
  FOR INSERT
  WITH CHECK (true);

-- Only admin can view the subscriber list
CREATE POLICY "subscribers_admin_read"
  ON public.subscribers
  FOR SELECT
  USING (public.is_admin());

-- Only admin can delete a subscriber
CREATE POLICY "subscribers_admin_delete"
  ON public.subscribers
  FOR DELETE
  USING (public.is_admin());

-- (No public UPDATE — subscribers cannot update their own records without auth)


-- ============================================================
-- STORAGE BUCKETS
-- ============================================================
-- Run these in the Supabase SQL Editor (uses the storage schema).
-- All buckets are PUBLIC (anyone can read/view the files).
-- Only authenticated admins can upload, update, or delete files.
-- ============================================================

-- Bucket 1: division-heroes
-- Stores the main hero/banner image for each division.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'division-heroes',
  'division-heroes',
  TRUE,
  10485760,   -- 10 MB limit per file
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO NOTHING;

-- Bucket 2: division-gallery
-- Stores gallery images AND videos for each division.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'division-gallery',
  'division-gallery',
  TRUE,
  104857600,  -- 100 MB limit per file (to accommodate videos)
  ARRAY[
    'image/jpeg', 'image/png', 'image/webp', 'image/gif',
    'video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'
  ]
)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- STORAGE RLS POLICIES
-- ============================================================

-- ── division-heroes ──────────────────────────────────────────

-- Public: anyone can view/download hero images (bucket is public but policy is explicit)
CREATE POLICY "division_heroes_public_read"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'division-heroes');

-- Admin only: upload new hero images
CREATE POLICY "division_heroes_admin_insert"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'division-heroes' AND public.is_admin());

-- Admin only: replace/overwrite hero images
CREATE POLICY "division_heroes_admin_update"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'division-heroes' AND public.is_admin());

-- Admin only: delete hero images
CREATE POLICY "division_heroes_admin_delete"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'division-heroes' AND public.is_admin());


-- ── division-gallery ─────────────────────────────────────────

-- Public: anyone can view/stream gallery media
CREATE POLICY "division_gallery_public_read"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'division-gallery');

-- Admin only: upload gallery media
CREATE POLICY "division_gallery_admin_insert"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'division-gallery' AND public.is_admin());

-- Admin only: replace gallery media
CREATE POLICY "division_gallery_admin_update"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'division-gallery' AND public.is_admin());

-- Admin only: delete gallery media
CREATE POLICY "division_gallery_admin_delete"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'division-gallery' AND public.is_admin());


-- ============================================================
-- SEED: Default site_settings rows
-- Matches the DEFAULT_SETTINGS in src/admin/data/siteConfig.ts
-- Safe to re-run — uses ON CONFLICT DO UPDATE to keep existing values.
-- ============================================================

INSERT INTO public.site_settings (key, label, value) VALUES
  ('phone_primary',    'Primary Phone',             '+234 (0) 800 360 AKOY'),
  ('phone_whatsapp',   'WhatsApp Number',            '2348123456789'),
  ('email_general',    'General Email',              'contact@akoy360.com'),
  ('email_diaspora',   'Diaspora Email',             'diaspora@akoy360.com'),
  ('office_hours',     'Office Hours',               'Mon - Sat, 8:00 AM - 6:00 PM (WAT)'),
  ('address_hq',       'HQ Address',                 'Victoria Island / Ikoyi Commercial Corridor, Lagos, Nigeria'),
  ('address_london',   'London Desk Address',         'London, United Kingdom'),
  ('address_houston',  'Houston Desk Address',        'Houston, Texas, USA'),
  ('social_twitter',   'Twitter / X URL',             'https://twitter.com/akoy360'),
  ('social_instagram', 'Instagram URL',               'https://instagram.com/akoy360'),
  ('social_linkedin',  'LinkedIn URL',                'https://linkedin.com/company/akoy360'),
  ('whatsapp_message', 'Default WhatsApp Message',    'Hello AKOY 360, I would like to learn more about your services.')
ON CONFLICT (key) DO UPDATE
  SET label = EXCLUDED.label;   -- update label only; preserve any custom value the admin set

