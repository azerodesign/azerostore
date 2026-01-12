-- AzKeys Table for Admin Authentication
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS azkeys (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'admin', -- 'owner' or 'admin'
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_used_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
    ALTER TABLE azkeys ENABLE ROW LEVEL SECURITY;

-- Policy: Only service role can read azkeys (for verification)
-- No public access for security
CREATE POLICY "azkeys_read_policy" ON azkeys
    FOR SELECT
    USING (true);  -- Allow read for verification via anon key

-- Insert default owner key (CHANGE THIS!)
INSERT INTO azkeys (key, role, description) VALUES
    ('AZERO-OWNER-2025', 'owner', 'Default owner key - CHANGE THIS!'),
    ('AZERO-ADMIN-001', 'admin', 'Admin key 1');

-- Index for faster lookup
CREATE INDEX IF NOT EXISTS idx_azkeys_key ON azkeys(key);
CREATE INDEX IF NOT EXISTS idx_azkeys_active ON azkeys(is_active);
