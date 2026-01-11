// Editing Harga Index
import { harga as hargaAlight } from './hargaalight';
import { harga as hargaCapcut } from './hargacapcut';
import { harga as hargaCanva } from './hargacanva';

export const editingHarga = {
    'app-01': hargaAlight,   // Alight Motion Pro
    'app-02': hargaCapcut,   // CapCut Pro
    'app-03': hargaCanva,    // Canva Pro
};

// Get full price object for a product
export const getEditingHarga = (productId) => {
    return editingHarga[productId] || null;
};

// Get price for specific package (e.g., 'bulanan')
export const getEditingPackageHarga = (productId, packageType) => {
    const productHarga = editingHarga[productId];
    if (!productHarga) return null;
    return productHarga[packageType] ?? null;
};
