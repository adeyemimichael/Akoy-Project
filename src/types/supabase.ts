// Supabase database types for AKOY 360 admin panel
// These mirror the tables that need to exist in your Supabase project.
//
// SQL to create these tables (run in Supabase SQL editor):
//
// -- Inquiries (contact form submissions)
// CREATE TABLE inquiries (
//   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   full_name TEXT NOT NULL,
//   email TEXT NOT NULL,
//   phone TEXT NOT NULL,
//   country TEXT DEFAULT 'Nigeria',
//   division TEXT NOT NULL,
//   message TEXT NOT NULL,
//   status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'responded')),
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );
//
// -- Testimonials
// CREATE TABLE testimonials (
//   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   name TEXT NOT NULL,
//   title TEXT NOT NULL,
//   location TEXT NOT NULL,
//   division TEXT NOT NULL,
//   rating INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
//   quote TEXT NOT NULL,
//   initials TEXT NOT NULL,
//   published BOOLEAN DEFAULT TRUE,
//   sort_order INTEGER DEFAULT 0,
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );
//
// -- Newsletter subscribers
// CREATE TABLE subscribers (
//   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   email TEXT UNIQUE NOT NULL,
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );
//
// -- Site settings (key-value store)
// CREATE TABLE site_settings (
//   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   key TEXT UNIQUE NOT NULL,
//   value TEXT NOT NULL,
//   label TEXT NOT NULL,
//   updated_at TIMESTAMPTZ DEFAULT NOW()
// );
//
// -- Divisions (editable content)
// CREATE TABLE divisions (
//   id TEXT PRIMARY KEY,
//   name TEXT NOT NULL,
//   short_name TEXT NOT NULL,
//   tagline TEXT NOT NULL,
//   headline TEXT NOT NULL,
//   description TEXT NOT NULL,
//   bullet_points TEXT[] NOT NULL,
//   image TEXT NOT NULL,
//   gallery_images TEXT[] NOT NULL,
//   stat_value TEXT NOT NULL,
//   stat_label TEXT NOT NULL,
//   metric_primary TEXT NOT NULL,
//   metric_secondary TEXT NOT NULL,
//   icon_name TEXT NOT NULL,
//   updated_at TIMESTAMPTZ DEFAULT NOW()
// );
//
// -- RLS Policies: Only authenticated users (admins) can SELECT/INSERT/UPDATE/DELETE
// ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
// ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
// ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
// ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
// ALTER TABLE divisions ENABLE ROW LEVEL SECURITY;
//
// CREATE POLICY "Admin only" ON inquiries FOR ALL USING (auth.role() = 'authenticated');
// CREATE POLICY "Admin only" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
// CREATE POLICY "Admin only" ON subscribers FOR ALL USING (auth.role() = 'authenticated');
// CREATE POLICY "Admin only" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
// CREATE POLICY "Admin only" ON divisions FOR ALL USING (auth.role() = 'authenticated');
//
// Public INSERT for inquiries and subscribers (from the public-facing forms):
// CREATE POLICY "Public insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);
// CREATE POLICY "Public insert subscribers" ON subscribers FOR INSERT WITH CHECK (true);

export interface Inquiry {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  division: string;
  message: string;
  status: 'unread' | 'read' | 'responded';
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  location: string;
  division: string;
  rating: number;
  quote: string;
  initials: string;
  published: boolean;
  sort_order: number;
  created_at: string;
}

export interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  label: string;
  updated_at: string;
}

export interface Division {
  id: string;
  name: string;
  short_name: string;
  tagline: string;
  headline: string;
  description: string;
  bullet_points: string[];
  image: string;
  gallery_images: string[];
  stat_value: string;
  stat_label: string;
  metric_primary: string;
  metric_secondary: string;
  icon_name: string;
  updated_at: string;
}
