/**
 * Harga (Price) Management - Main Index
 * 
 * To update prices, edit the individual files in each category folder:
 * - apk-premium/hargayt.js, hargaspotify.js, etc.
 * - editing/hargaalight.js, hargacapcut.js, etc.
 * - topup-game/hargaml.js, hargaff.js, etc.
 * 
 * Each file exports: { harian, bulanan, tahunan, lifetime } or similar
 */

import { apkPremiumHarga, getApkPremiumHarga, getApkPremiumPackageHarga } from './apk-premium';
import { editingHarga, getEditingHarga, getEditingPackageHarga } from './editing';
import { topupGameHarga, getTopupGameHarga, getTopupGamePackageHarga } from './topup-game';

// Get full price object for a product
export const getHarga = (productId, category) => {
    const categoryLower = category?.toLowerCase() || '';

    if (categoryLower.includes('apk') || categoryLower.includes('premium')) {
        return getApkPremiumHarga(productId);
    }
    if (categoryLower.includes('editing')) {
        return getEditingHarga(productId);
    }
    if (categoryLower.includes('topup') || categoryLower.includes('game')) {
        return getTopupGameHarga(productId);
    }

    return null;
};

// Get price for a specific package type (e.g., 'bulanan', 'dm86')
export const getPackageHarga = (productId, category, packageType) => {
    const categoryLower = category?.toLowerCase() || '';

    if (categoryLower.includes('apk') || categoryLower.includes('premium')) {
        return getApkPremiumPackageHarga(productId, packageType);
    }
    if (categoryLower.includes('editing')) {
        return getEditingPackageHarga(productId, packageType);
    }
    if (categoryLower.includes('topup') || categoryLower.includes('game')) {
        return getTopupGamePackageHarga(productId, packageType);
    }

    return null;
};

// Export all prices for debugging/admin
export { apkPremiumHarga, editingHarga, topupGameHarga };
