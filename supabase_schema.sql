-- Copy and paste this into your Supabase SQL Editor

-- 1. Create Products Table
CREATE TABLE products (
    id TEXT PRIMARY KEY, -- e.g., 'prem-01', 'game-05'
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC, -- Display price
    is_premium BOOLEAN DEFAULT FALSE,
    icon TEXT, -- URL or internal path
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Packages/Variations Table
CREATE TABLE packages (
    id SERIAL PRIMARY KEY,
    product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
    package_key TEXT NOT NULL, -- e.g., '1bln', 'rbx80'
    name TEXT NOT NULL, -- e.g., '1 Bulan', '80 Robux'
    price NUMERIC NOT NULL,
    stock TEXT DEFAULT 'unlimited', -- 'unlimited' or number (e.g., '5')
    is_active BOOLEAN DEFAULT TRUE
);

-- 3. Enable Public Read Access (Row Level Security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public products are viewable by everyone" 
ON products FOR SELECT USING (true);

CREATE POLICY "Public packages are viewable by everyone" 
ON packages FOR SELECT USING (true);
