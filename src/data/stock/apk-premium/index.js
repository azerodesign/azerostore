// APK Premium Stock Index
// Import individual stock files
import { stock as stockYt } from './stockyt';
import { stock as stockSpotify } from './stockspotify';
import { stock as stockNetflix } from './stocknetflix';
import { stock as stockDisney } from './stockdisney';

// Map product IDs to their stock object
export const apkPremiumStock = {
    'prem-01': stockYt,       // YouTube Premium
    'prem-02': stockSpotify,  // Spotify Premium
    'prem-03': stockNetflix,  // Netflix
    'prem-04': stockDisney,   // Disney+
    // Add more as needed
};

// Get full stock object for a product
export const getApkPremiumStock = (productId) => {
    return apkPremiumStock[productId] || null;
};

// Get stock for specific package (e.g., 'bulanan')
export const getApkPremiumPackageStock = (productId, packageType) => {
    const productStock = apkPremiumStock[productId];
    if (!productStock) return 'unlimited';
    return productStock[packageType] ?? 'unlimited';
};
