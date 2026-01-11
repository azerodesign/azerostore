-- RUN THIS TO FIX "Row Level Security" ERROR

-- Allow public to insert/update data (required for migration script)
CREATE POLICY "Allow public insert products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update products" ON products FOR UPDATE USING (true);

CREATE POLICY "Allow public insert packages" ON packages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update packages" ON packages FOR UPDATE USING (true);
