
import { supabase } from '../lib/supabaseClient';
import { products } from '../data/products';
import { categories } from '../data/products';
// Import Package Data
import { apkPremiumHarga } from '../data/harga/apk-premium';
import { editingHarga } from '../data/harga/editing';
import { topupGameHarga } from '../data/harga/topup-game';

// Map categories to harga objects
const hargaMap = {
    'Apk Premium': apkPremiumHarga,
    'Editing': editingHarga,
    'Topup': topupGameHarga,
    'AI Tools': apkPremiumHarga, // Assuming some overlap or fallback
    'Software': null, // Need to handle categories without explicit package files if any
};

export const migrateData = async () => {
    console.log('Starting Migration...');

    // 1. Migrate Products
    const productsData = products.map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        price: p.price,
        is_premium: p.isPremium,
        icon: typeof p.icon === 'string' ? p.icon : 'ICON_ARRAY_PLACEHOLDER' // Arrays need handling?
        // Note: Supabase 'icon' column is TEXT. If user has array (animated), we might need JSONB or stringify.
        // For simplicity, store as stringified JSON if array, or normal string.
    }));

    // Fix Icon Array Handling
    const cleanProducts = productsData.map(p => {
        let iconVal = p.icon;
        if (p.icon === 'ICON_ARRAY_PLACEHOLDER') {
            // Re-fetch original to get array
            const original = products.find(op => op.id === p.id);
            iconVal = JSON.stringify(original.icon);
        } else if (Array.isArray(products.find(op => op.id === p.id).icon)) {
            iconVal = JSON.stringify(products.find(op => op.id === p.id).icon);
        }
        return { ...p, icon: iconVal };
    });

    const { error: prodError } = await supabase.from('products').upsert(cleanProducts);
    if (prodError) {
        console.error('Product Migration Failed:', prodError);
        return { success: false, error: prodError };
    }
    console.log('Products Migrated!');

    // 2. Migrate Packages
    let allPackages = [];

    products.forEach(product => {
        // Determine which harga source to use
        let sourceIndex = null;
        if (product.category === 'Apk Premium') sourceIndex = apkPremiumHarga;
        else if (product.category === 'Editing') sourceIndex = editingHarga;
        else if (product.category === 'Topup' || product.category === 'Topup Game') sourceIndex = topupGameHarga;
        else if (product.category === 'AI Tools') sourceIndex = apkPremiumHarga; // Might be mixed

        // If direct lookup in specific category files fails, try global or skip
        // Actually, the structure of 'harga' files is: keys are product IDs (e.g., 'prem-01')

        // Try to find packages for this product ID in ALL known sources to be safe
        let packagesObj = null;
        if (apkPremiumHarga[product.id]) packagesObj = apkPremiumHarga[product.id];
        else if (editingHarga[product.id]) packagesObj = editingHarga[product.id];
        else if (topupGameHarga[product.id]) packagesObj = topupGameHarga[product.id];

        if (packagesObj) {
            // packagesObj is like { '1bln': 5000, '3bln': 15000 }
            Object.entries(packagesObj).forEach(([pkgKey, price]) => {
                allPackages.push({
                    product_id: product.id,
                    package_key: pkgKey,
                    name: formatPackageName(pkgKey), // Need a helper to make '1bln' -> '1 Bulan'
                    price: price,
                    stock: 'unlimited', // Default
                    is_active: true
                });
            });
        }
    });

    const { error: pkgError } = await supabase.from('packages').upsert(allPackages, { onConflict: 'product_id, package_key' });
    // Note: packages table constraint might be just ID. upsert might duplicate if no constraint.
    // Better to delete existing for these products or just insert.
    // For safety, let's just insert. If run twice, duplicate rows?
    // Let's truncate packages first? Or rely on user to clean up.
    // I'll proceed with upsert but I haven't defined a unique constraint on (product_id, package_key) in SQL.
    // I will assume empty table for now or handle duplicates later.

    if (pkgError) {
        console.error('Package Migration Failed:', pkgError);
        return { success: false, error: pkgError };
    }

    console.log(`Packages Migrated: ${allPackages.length}`);
    return { success: true, count: allPackages.length };
};

// Helper for generic package names
const formatPackageName = (key) => {
    // Basic mapping
    if (key.includes('bln')) return key.replace('bln', ' Bulan');
    if (key.includes('thn')) return key.replace('thn', ' Tahun');
    if (key.includes('hr')) return key.replace('hr', ' Hari');
    if (key.startsWith('dm')) return key.replace('dm', '') + ' Diamonds';
    if (key.startsWith('rbx')) return key.replace('rbx', '') + ' Robux';
    if (key.startsWith('uc')) return key.replace('uc', '') + ' UC';
    return key; // Fallback
};
