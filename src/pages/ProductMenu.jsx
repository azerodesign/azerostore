import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import GlassmorphCard from '../components/GlassmorphCard';
import AnimatedContainer from '../components/AnimatedContainer';
import PackageModal from '../components/PackageModal';
import { appPackages as packages } from '../data/packages/assetapp';
import './ProductMenu.css';

const ProductMenu = () => {
    const navigate = useNavigate();
    const [expandedId, setExpandedId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState('Azero Premium');

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleOrder = (pkg) => {
        setSelectedProduct(pkg.name);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="productmenu">
                <AnimatedContainer className="productmenu-header">
                    <motion.button
                        className="back-btn"
                        onClick={() => navigate(-1)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Kembali
                    </motion.button>
                </AnimatedContainer>

                <AnimatedContainer className="product-branding">
                    <div className="product-logo">
                        <svg viewBox="0 0 100 100" fill="none">
                            <defs>
                                <linearGradient id="prod-grad" x1="0" y1="0" x2="100" y2="100">
                                    <stop offset="0%" stopColor="#0066FF" />
                                    <stop offset="100%" stopColor="#00A3FF" />
                                </linearGradient>
                            </defs>
                            <rect width="100" height="100" rx="22" fill="url(#prod-grad)" />
                            <text x="50" y="65" fontFamily="sans-serif" fontWeight="700" fontSize="42" fill="white" textAnchor="middle">Az</text>
                        </svg>
                    </div>
                    <h1>Azero Premium</h1>
                    <p>Pilih paket yang sesuai dengan kebutuhan kamu</p>
                </AnimatedContainer>

                <div className="packages-list">
                    {packages.map((pkg, index) => (
                        <GlassmorphCard
                            key={pkg.id}
                            delay={index * 0.1}
                            className={`package-card ${expandedId === pkg.id ? 'expanded' : ''} ${pkg.popular ? 'popular' : ''}`}
                            hover={false}
                        >
                            <div className="package-header" onClick={() => toggleExpand(pkg.id)}>
                                <div className="package-info">
                                    <div className="package-name">
                                        {pkg.name}
                                        {pkg.popular && <span className="badge-popular">POPULAR</span>}
                                    </div>
                                    <div className="package-price">
                                        <span className="price-value">Rp {pkg.price.toLocaleString()}</span>
                                        <span className="price-period">/ {pkg.period}</span>
                                    </div>
                                </div>
                                <motion.div
                                    className="package-arrow"
                                    animate={{ rotate: expandedId === pkg.id ? 180 : 0 }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </motion.div>
                            </div>

                            <AnimatePresence>
                                {expandedId === pkg.id && (
                                    <motion.div
                                        className="package-body"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ul className="feature-list">
                                            {pkg.features.map((feature, i) => (
                                                <li key={i}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00A3FF" strokeWidth="2">
                                                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <motion.button
                                            className="order-btn"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleOrder(pkg)}
                                        >
                                            ORDER SEKARANG
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </GlassmorphCard>
                    ))}
                </div>
            </div>

            {/* Package Modal */}
            <PackageModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                productName={selectedProduct}
            />
        </>
    );
};

export default ProductMenu;

