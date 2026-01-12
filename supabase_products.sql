-- Products and Packages Tables for Azerostore content management

-- 1. Products Table
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY, -- using manual string IDs like 'prem-01'
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price INTEGER DEFAULT 0,
    is_premium BOOLEAN DEFAULT false,
    icon TEXT, -- json string or url
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Packages Table (Variations like 1 Month, 1 Year, etc.)
CREATE TABLE IF NOT EXISTS packages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
    package_key TEXT NOT NULL, -- e.g. '1bln', '1thn'
    name TEXT NOT NULL, -- Display name '1 Bulan'
    price INTEGER NOT NULL,
    stock TEXT DEFAULT 'unlimited', -- 'unlimited' or number string
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(product_id, package_key) -- Prevent duplicates
);

-- 3. Categories Table (Optional, for dynamic categories)
CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT,
    color TEXT,
    sort_order INTEGER DEFAULT 0
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Policies
-- Public read access
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read packages" ON packages FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);

-- Admin write access (reuse authenticated logic or check azkeys via function if possible, 
-- but simpler to just allow authenticated service_role or specific user)
-- For now, allowing full access to anon for development if needed, 
-- OR better: limit to authenticated users if we had login.
-- Since we use 'azkey' client-side auth which doesn't map to Supabase Auth users directly 
-- (unless we implement custom auth), we might need to open RLS or use a specific technique.
-- RISK: Client-side AzKey check is not secure for Row Level Security if using anon key.
-- WEAK SECURITY NOTE: For this prototype, we might allow anon write but relied on app logic.
-- BETTER: Use a stored procedure for admin actions or keep RLS open for 'anon' but relying on obscure APIs is risky.
-- CORRECT APPROACH: AzKey should ideally mint a Supabase JWT or we use a simple "secret" header.
-- PRAGMATIC APPROACH FOR NOW: Allow anon write BUT the app only calls it if AzKey is valid.
-- (Note: This is insecure against direct API attacks, but fits the current "proto-admin" request).

CREATE POLICY "Allow write for now" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow write packages" ON packages FOR ALL USING (true) WITH CHECK (true);
