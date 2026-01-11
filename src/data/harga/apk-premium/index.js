// APK Premium Harga Index
import { harga as hargaYt } from './hargayt';
import { harga as hargaSpotify } from './hargaspotify';
import { harga as hargaNetflix } from './hargaNetflix';
import { harga as hargaDisney } from './hargadisney';

// Map product IDs to their price object
export const apkPremiumHarga = {
    'prem-01': hargaYt,       // YouTube Premium
    'prem-02': hargaSpotify,  // Spotify Premium
    'prem-03': hargaNetflix,  // Netflix
    'prem-04': hargaDisney,   // Disney+
};

// Get full price object for a product
export const getApkPremiumHarga = (productId) => {
    return apkPremiumHarga[productId] || null;
};

// Get price for specific package (e.g., 'bulanan')
export const getApkPremiumPackageHarga = (productId, packageType) => {
    const productHarga = apkPremiumHarga[productId];
    if (!productHarga) return null;
    return productHarga[packageType] ?? null;
};
