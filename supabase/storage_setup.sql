-- ──────────────────────────────────────────────────────────────────────────────
-- Storage Buckets + Policies for Gallery Uploads
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ──────────────────────────────────────────────────────────────────────────────

-- 1. Create the two storage buckets (public = anyone can READ, only authed can WRITE)

INSERT INTO storage.buckets (id, name, public)
VALUES ('division-heroes', 'division-heroes', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('division-gallery', 'division-gallery', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Public READ policies (so images load on the website without auth)

CREATE POLICY "public_read_division_heroes"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'division-heroes');

CREATE POLICY "public_read_division_gallery"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'division-gallery');

-- 3. Authenticated INSERT policies (admin must be logged in to upload)

CREATE POLICY "auth_insert_division_heroes"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'division-heroes');

CREATE POLICY "auth_insert_division_gallery"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'division-gallery');

-- 4. Authenticated UPDATE policies (needed for hero image upsert/overwrite)

CREATE POLICY "auth_update_division_heroes"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'division-heroes');

CREATE POLICY "auth_update_division_gallery"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'division-gallery');

-- 5. Authenticated DELETE policies (admin can remove files)

CREATE POLICY "auth_delete_division_heroes"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'division-heroes');

CREATE POLICY "auth_delete_division_gallery"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'division-gallery');

-- 6. Add gallery_image_names column (for naming each uploaded image)
--    Safe to run multiple times — IF NOT EXISTS prevents duplicate errors.

ALTER TABLE public.divisions
  ADD COLUMN IF NOT EXISTS gallery_image_names text[] DEFAULT '{}'::text[];

-- ──────────────────────────────────────────────────────────────────────────────
-- 7. Seed the divisions table (if empty) so the admin Gallery has rows to edit.
--    The admin Gallery fetches from this table — without rows it shows mock data.
--    Adjust the values to match your real divisions.
-- ──────────────────────────────────────────────────────────────────────────────

INSERT INTO public.divisions (id, name, short_name, tagline, headline, description, bullet_points, image, gallery_images, stat_value, stat_label, metric_primary, metric_secondary, icon_name)
VALUES
  ('properties',         'AKOY 360 Properties',          'Properties',          'Prime Real Estate & Developments',      'Premium Residential & Commercial Property Assets', 'Delivering landmark residential developments, commercial hubs, high-yield acquisitions, and full-cycle property management tailored for discerning local and global investors.', ARRAY['Luxury Residential & Waterfront Developments','Commercial Property Acquisition & Leasing','Diaspora Property Search & Title Verification','Airbnb-Ready Investment Properties & Rental Management'], '', ARRAY[]::text[], '₦45B+', 'Portfolio Managed', '180+ Luxury Units', '100% Verified Titles', 'Building2'),
  ('construction',       'AKOY 360 Construction',        'Construction',        'Engineering & Turnkey Projects',         'From Architecture to Handover — We Build It All', 'We provide the complete construction package: architecture and design, structural engineering, civil works, project management, interior finishing, furnishing, and optional Airbnb setup.', ARRAY['Architecture, Design & 3D Modeling','Structural Engineering & Civil Works','Site Supervision & Quality Assurance Audits','Interior Finishing, Furnishing & Airbnb Setup'], '', ARRAY[]::text[], '99.4%', 'On-Time Completion', '45+ Active Sites', 'ISO Certified Standards', 'HardHat'),
  ('travel',             'AKOY 360 Travel',              'Travel & Tourism',    'Corporate & Leisure Mobility',          'Bespoke Corporate Flight Services & Global Tourism Concierge', 'Curating seamless travel itineraries, corporate ticketing, private charters, visa advisory, and bespoke diaspora homecoming experiences with VIP protocol.', ARRAY['Executive Flight Ticketing & Corporate Travel Desk','Private Aircraft & Luxury Yacht Charter Coordination','Global Visa Consultation & Fast-Track Protocol','Curated Diaspora Cultural & Investment Expeditions'], '', ARRAY[]::text[], '140+', 'Global Destinations', '24/7 Concierge', '99.8% Client Satisfaction', 'Plane'),
  ('logistics',          'AKOY 360 Logistics',           'Logistics & Shipping', 'Cargo, Freight & Supply Chain',         'Multi-Modal Freight, Maritime Cargo & Door-to-Door Delivery', 'Connecting continents with reliable air cargo, sea freight, customs clearance, and last-mile logistics networks engineered for high efficiency and secure custody.', ARRAY['International Air Cargo & Sea Freight Consolidation','Door-to-Door Courier & Cross-Border Delivery','Customs Clearance, Port Handling & Compliance','Cold Chain & High-Value Secure Escort Solutions'], '', ARRAY[]::text[], '250K+', 'Tons Delivered', '48-72h Express Air', 'Real-Time GPS Tracking', 'Ship'),
  ('business-services',  'AKOY 360 Business Services',   'Business & Procurement','Procurement, Agency & Consulting',      'Institutional Procurement & Strategic Management Consulting', 'Empowering enterprises, government agencies, and growing startups with global vendor procurement, contract representation, regulatory advisory, and operational optimization.', ARRAY['Industrial & Corporate Equipment Procurement','Contract Agency & Government Tender Support','Business Structuring, Compliance & Advisory','Supply Chain Optimization & Vendor Vetting'], '', ARRAY[]::text[], '₦12B+', 'Procurement Facilitated', '120+ Corporate Clients', 'Tier-1 Vendor Network', 'Briefcase'),
  ('diaspora',           'AKOY 360 Diaspora Services',   'Diaspora Gateway',    'Trusted Nigerian-Global Bridge',        'The Verified Link Between Nigerians Abroad and Opportunities at Home', 'Eliminating the anxiety of remote execution. We serve as your trusted on-ground fiduciary for land acquisition, building oversight, vehicle shipping, family support, and verified ventures.', ARRAY['Direct Milestone Escrow & Transparent Camera Telemetry','Family & Elder Care Concierge Protocols','Direct Government & Banking Document Processing','Returnee Relocation & Re-integration Management'], '', ARRAY[]::text[], '3,200+', 'Diaspora Families Served', 'Zero Remote Fraud', 'UK, US, Canada & EU Desks', 'Globe2')
ON CONFLICT (id) DO NOTHING;
