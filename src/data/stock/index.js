/**
 * Stock Management - Main Index
 * 
 * To update stock, edit the individual files in each category folder:
 * - apk-premium/stockyt.js, stockspotify.js, etc.
 * - editing/stockalight.js, stockcapcut.js, etc.
 * - topup-game/stockml.js, stockff.js, etc.
 * 
 * Each file exports: { harian, bulanan, tahunan, lifetime } or similar
 */

import { apkPremiumStock, getApkPremiumStock, getApkPremiumPackageStock } from './apk-premium';
import { editingStock, getEditingStock, getEditingPackageStock } from './editing';
import { topupGameStock, getTopupGameStock, getTopupGamePackageStock } from './topup-game';

// Get full stock object for a product
export const getStock = (productId, category) => {
    const categoryLower = category?.toLowerCase() || '';

    if (categoryLower.includes('apk') || categoryLower.includes('premium')) {
        return getApkPremiumStock(productId);
    }
    if (categoryLower.includes('editing')) {
        return getEditingStock(productId);
    }
    if (categoryLower.includes('topup') || categoryLower.includes('game')) {
        return getTopupGameStock(productId);
    }

    return null;
};

// Get stock for a specific package type (e.g., 'bulanan', 'dm86')
export const getPackageStock = (productId, category, packageType) => {
    const categoryLower = category?.toLowerCase() || '';

    if (categoryLower.includes('apk') || categoryLower.includes('premium')) {
        return getApkPremiumPackageStock(productId, packageType);
    }
    if (categoryLower.includes('editing')) {
        return getEditingPackageStock(productId, packageType);
    }
    if (categoryLower.includes('topup') || categoryLower.includes('game')) {
        return getTopupGamePackageStock(productId, packageType);
    }

    return 'unlimited';
};

// Check if specific package is in stock
export const isPackageInStock = (productId, category, packageType) => {
    const stock = getPackageStock(productId, category, packageType);
    return stock === 'unlimited' || stock > 0;
};

// Check if ENTIRE product is out of stock (all packages empty)
export const isProductOutOfStock = (productId, category) => {
    const stock = getStock(productId, category);

    if (!stock) return false; // Default to available if no stock config found

    if (typeof stock === 'object') {
        const values = Object.values(stock);
        // If ANY package has stock (unlimited or > 0), then product is available
        const hasStock = values.some(val => val === 'unlimited' || val > 0);
        return !hasStock;
    }

    return stock !== 'unlimited' && stock <= 0;
};

// Export all stocks for debugging/admin
export { apkPremiumStock, editingStock, topupGameStock };
