// Editing Stock Index
import { stock as stockAlight } from './stockalight';
import { stock as stockCapcut } from './stockcapcut';
import { stock as stockCanva } from './stockcanva';

export const editingStock = {
    'app-01': stockAlight,   // Alight Motion Pro
    'app-02': stockCapcut,   // CapCut Pro
    'app-03': stockCanva,    // Canva Pro
};

// Get full stock object for a product
export const getEditingStock = (productId) => {
    return editingStock[productId] || null;
};

// Get stock for specific package (e.g., 'bulanan')
export const getEditingPackageStock = (productId, packageType) => {
    const productStock = editingStock[productId];
    if (!productStock) return 'unlimited';
    return productStock[packageType] ?? 'unlimited';
};
