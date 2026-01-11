import { stock as stockMl } from './stockml';
import { stock as stockFf } from './stockff';
import { stock as stockPubg } from './stockpubg';
import { stockRoblox } from './stockroblox';

export const topupGameStock = {
    'game-01': stockMl,   // Mobile Legends
    'game-02': stockFf,   // Free Fire
    'game-03': stockPubg, // PUBG Mobile
    'game-05': stockRoblox, // Roblox
};

// Get full stock object for a product
export const getTopupGameStock = (productId) => {
    return topupGameStock[productId] || null;
};

// Get stock for specific package (e.g., 'dm86')
export const getTopupGamePackageStock = (productId, packageType) => {
    const productStock = topupGameStock[productId];
    if (!productStock) return 'unlimited';
    return productStock[packageType] ?? 'unlimited';
};
