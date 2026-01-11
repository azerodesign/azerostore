import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle2 } from 'lucide-react';
import { getPackagesByCategory } from '../data/packages';
import ProductIcon from './ProductIcon';
import './BottomSheet.css';

const BottomSheet = ({ isOpen, onClose, product }) => {
    const navigate = useNavigate();

    const isTopup = product?.category === 'Topup';
    const displayPackages = getPackagesByCategory(product?.category);

    const handleOrder = (pkg) => {
        const productName = product?.name || 'Azero Premium';
        navigate(`/payment?package=${pkg.id}&name=${encodeURIComponent(pkg.name)}&price=${pkg.price}&product=${encodeURIComponent(productName)}`);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="bottom-sheet-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Sheet */}
                    <motion.div
                        className="bottom-sheet-overlay"
                        style={{ pointerEvents: 'none', background: 'transparent', backdropFilter: 'none' }} // Overlay wrapper for positioning
                    >
                        <motion.div
                            className="bottom-sheet"
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()} // Prevent close on sheet click
                            style={{ pointerEvents: 'auto' }}
                        >
                            {/* Header Section */}
                            <div className="sheet-header-bg">
                                <button className="sheet-close" onClick={onClose}>
                                    <X size={18} />
                                </button>

                                <div className="sheet-product-icon">
                                    <ProductIcon icon={product?.icon || '📦'} alt={product?.name} />
                                </div>
                                <h2 className="sheet-product-title">{product?.name || 'Product'}</h2>

                                <div className="sheet-chips">
                                    <span className="sheet-chip">{isTopup ? 'GAME' : 'APP'}</span>
                                    <span className="sheet-chip">{isTopup ? 'INSTANT' : 'PREMIUM'}</span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="sheet-content">
                                {isTopup && (
                                    <div className="id-input-section" style={{ marginBottom: '16px' }}>
                                        <div className="sheet-label">MASUKKAN ID GAME</div>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <input
                                                type="text"
                                                placeholder="User ID"
                                                className="sheet-input"
                                                style={{
                                                    flex: 2,
                                                    padding: '12px',
                                                    borderRadius: '12px',
                                                    border: '1px solid #e2e8f0',
                                                    background: '#f8fafc',
                                                    fontSize: '0.9rem'
                                                }}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Zone ID"
                                                className="sheet-input"
                                                style={{
                                                    flex: 1,
                                                    padding: '12px',
                                                    borderRadius: '12px',
                                                    border: '1px solid #e2e8f0',
                                                    background: '#f8fafc',
                                                    fontSize: '0.9rem'
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="sheet-label">PILIH PAKET LAYANAN</div>

                                <div className="package-list">
                                    {displayPackages.map((pkg) => (
                                        <div key={pkg.id} className="sheet-pkg-card" onClick={() => handleOrder(pkg)}>
                                            <div className="pkg-details">
                                                <div className="pkg-name">{pkg.name}</div>
                                                <div className="pkg-price-wrapper">
                                                    <span className="pkg-price-main">Rp {pkg.price.toLocaleString()}</span>
                                                    {pkg.popular && <span className="sheet-label" style={{ color: '#22c55e', fontSize: '0.6rem', marginBottom: 0, marginLeft: '4px' }}>HEMAT</span>}
                                                </div>
                                                <div className="pkg-features-list">
                                                    {pkg.features.slice(0, 3).map((feat, idx) => (
                                                        <div key={idx} className="pkg-feature-item">
                                                            <CheckCircle2 size={10} color="#22c55e" /> {feat}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <button className="btn-3d-dark">
                                                ORDER
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default BottomSheet;
