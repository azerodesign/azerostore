import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import ProductIcon from './ProductIcon';
import { supabase } from '../lib/supabaseClient';

const PackageModal = ({ isOpen, onClose, product }) => {
    const navigate = useNavigate();
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPackages = async () => {
            if (!product) return;
            setLoading(true);

            // Fetch active packages from Supabase
            const { data, error } = await supabase
                .from('packages')
                .select('*')
                .eq('product_id', product.id)
                .eq('is_active', true)
                .order('price', { ascending: true }); // Sort by price

            if (error) {
                console.error('Error fetching packages:', error);
                setPackages([]);
                setLoading(false);
                return;
            }

            if (data) {
                const formattedPackages = data.map(pkg => {
                    const key = pkg.package_key;
                    // Derive period/popular from key (logic preserved)
                    let period = '';
                    let isPopular = false;

                    if (key) {
                        if (key.includes('bln') || key === '1bln') { period = '30 Hari'; if (key === 'bulanan') isPopular = true; }
                        else if (key.includes('seminggu')) period = '7 Hari';
                        else if (key.includes('harian')) period = '1 Hari';
                        else if (key.includes('tahunan')) period = '365 Hari';
                        else if (key.includes('lifetime')) period = 'Selamanya';
                        // Fallback logic for period based on DB name if needed
                    }

                    // Stock Logic
                    const stockCount = pkg.stock === 'unlimited' ? 'unlimited' : parseInt(pkg.stock);
                    const isOutOfStock = stockCount !== 'unlimited' && stockCount <= 0;

                    return {
                        id: key,
                        name: pkg.name,
                        price: parseFloat(pkg.price),
                        period: period || 'Digital Asset',
                        popular: isPopular,
                        stock: stockCount,
                        isOutOfStock
                    };
                });
                setPackages(formattedPackages);
            }
            setLoading(false);
        };

        if (isOpen) {
            fetchPackages();
        }
    }, [isOpen, product]);

    const handleOrder = (pkg) => {
        if (pkg.isOutOfStock) return;
        const productName = product?.name || 'Product';
        // navigate with query params
        navigate(`/payment?package=${pkg.id}&name=${encodeURIComponent(pkg.name)}&price=${pkg.price}&product=${encodeURIComponent(productName)}`);
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        className="package-modal"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={modalVariants}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <button className="modal-close" onClick={onClose}>
                                    <X size={20} />
                                </button>

                                <div className="header-main">
                                    <div className="modal-product-icon">
                                        <ProductIcon icon={product?.icon || '📱'} alt={product?.name} />
                                    </div>
                                    <div className="modal-title-section">
                                        <h2>{product?.name || 'Product Selection'}</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="section-label">PILIH PAKET LAYANAN</div>

                            <div className="package-list">
                                {packages.length > 0 ? (
                                    packages.map((pkg) => (
                                        <div
                                            key={pkg.id}
                                            className={`package-card ${pkg.isOutOfStock ? 'out-of-stock' : ''}`}
                                            onClick={() => handleOrder(pkg)}
                                            style={{ opacity: pkg.isOutOfStock ? 0.6 : 1, cursor: pkg.isOutOfStock ? 'not-allowed' : 'pointer' }}
                                        >
                                            <div className="pkg-info">
                                                {pkg.popular && <span className="pkg-saving-badge">POPULAR</span>}
                                                <h3>{pkg.name}</h3>
                                                <div className="pkg-price">
                                                    Rp {pkg.price.toLocaleString()}
                                                </div>
                                                <div className="pkg-features">
                                                    <div className="pkg-feature">
                                                        <CheckCircle2 size={12} color="#22c55e" /> {pkg.period || 'Digital Asset'}
                                                    </div>
                                                    {pkg.stock !== 'unlimited' && (
                                                        <div className="pkg-feature" style={{ color: pkg.isOutOfStock ? '#ef4444' : '#666' }}>
                                                            {pkg.isOutOfStock ? <XCircle size={12} /> : <CheckCircle2 size={12} />}
                                                            {pkg.isOutOfStock ? 'Stok Habis' : `Stok: ${pkg.stock}`}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                className="btn-order-pkg"
                                                disabled={pkg.isOutOfStock}
                                                style={{ background: pkg.isOutOfStock ? '#ccc' : '' }}
                                            >
                                                {pkg.isOutOfStock ? 'HABIS' : 'ORDER'}
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                                        Belum ada paket tersedia untuk produk ini.
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default PackageModal;

