import { harga as hargaMl } from './hargaml';
import { harga as hargaFf } from './hargaff';
import { harga as hargaPubg } from './hargapubg';
import { hargaRoblox } from './hargaroblox';

export const topupGameHarga = {
    'game-01': hargaMl,   // Mobile Legends
    'game-02': hargaFf,   // Free Fire
    'game-03': hargaPubg, // PUBG Mobile
    'game-05': hargaRoblox, // Roblox
};

// Get full price object for a product
export const getTopupGameHarga = (productId) => {
    return topupGameHarga[productId] || null;
};

// Get price for specific package (e.g., 'dm86')
export const getTopupGamePackageHarga = (productId, packageType) => {
    const productHarga = topupGameHarga[productId];
    if (!productHarga) return null;
    return productHarga[packageType] ?? null;
};
