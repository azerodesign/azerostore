import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, ArrowLeft } from 'lucide-react';
import AnimatedContainer from '../components/AnimatedContainer';
import GlassmorphCard from '../components/GlassmorphCard';
import PackageModal from '../components/PackageModal';
import Testimonials from '../components/Testimonials';
import { products } from '../data/products';
import ProductIcon from '../components/ProductIcon';
import './Dashboard.css'; // Reusing Dashboard styles

const AllProducts = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOrderClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    useEffect(() => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery]);

    const getBadgeType = (id) => {
        const popularIds = ['prem-02', 'prem-03', 'app-02'];
        const bestSellerIds = ['prem-01', 'app-01'];
        const newIds = ['ai-01', 'ai-02'];

        if (bestSellerIds.includes(id)) return 'best-seller';
        if (popularIds.includes(id)) return 'popular';
        if (newIds.includes(id)) return 'new';
        return null;
    };

    const getBadgeLabel = (type) => {
        switch (type) {
            case 'best-seller': return 'BEST SELLER';
            case 'popular': return 'POPULER';
            case 'new': return 'NEW';
            default: return '';
        }
    };

    return (
        <div className="dashboard">
            {/* Header */}
            <AnimatedContainer className="dashboard-header">
                <button
                    className="back-btn"
                    onClick={() => navigate(-1)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'none',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer',
                        marginBottom: '16px',
                        fontSize: '16px',
                        fontWeight: '600'
                    }}
                >
                    <ArrowLeft size={20} />
                    Kembali
                </button>
                <div className="header-content">
                    <div className="header-text">
                        <h1>Semua Produk</h1>
                        <p>Temukan semua produk digital yang tersedia</p>
                    </div>
                </div>
            </AnimatedContainer>

            {/* Search Bar */}
            <AnimatedContainer delay={0.1} className="search-section">
                <div className="search-bar">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Cari produk apa saja..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </AnimatedContainer>

            {/* Products Grid */}
            <AnimatedContainer delay={0.2}>
                <div className="products-grid">
                    {filteredProducts.map((product, index) => {
                        const badgeType = getBadgeType(product.id);
                        return (
                            <GlassmorphCard
                                key={product.id}
                                delay={index * 0.05}
                                className="product-card-wrapper"
                                hover={false}
                            >
                                <div className="product-card-large">
                                    {badgeType && (
                                        <div className={`card-badge ${badgeType}`}>
                                            {getBadgeLabel(badgeType)}
                                        </div>
                                    )}

                                    <div className="product-icon-large">
                                        <ProductIcon icon={product.icon} alt={product.name} />
                                    </div>

                                    <div className="product-info-wrapper">
                                        <h3 className="product-name">{product.name}</h3>
                                        <p className="product-label-start">Mulai dari</p>
                                        <span className="product-price-large">
                                            {product.price === 0 ? 'Gratis' : `Rp ${product.price.toLocaleString('id-ID')}`}
                                        </span>
                                    </div>

                                    <button
                                        className="btn-order-compact icon-mode"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOrderClick(product);
                                        }}
                                    >
                                        <ShoppingCart size={18} strokeWidth={2.5} />
                                    </button>
                                </div>
                            </GlassmorphCard>
                        );
                    })}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="no-results">
                        <p>Produk tidak ditemukan.</p>
                    </div>
                )}
            </AnimatedContainer>

            <PackageModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={selectedProduct}
            />

            {/* Testimonials */}
            <Testimonials />
        </div>
    );
};

export default AllProducts;
