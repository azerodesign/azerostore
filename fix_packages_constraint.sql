-- Run this in Supabase SQL Editor to allow package data migration
ALTER TABLE packages ADD CONSTRAINT packages_product_key_unique UNIQUE (product_id, package_key);
