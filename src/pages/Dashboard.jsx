import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BottomSheet from '../components/BottomSheet';
import { ArrowUpRight, ShoppingCart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BentoGrid from '../components/BentoGrid';
import GlassmorphCard from '../components/GlassmorphCard';
import BannerCard from '../components/BannerCard';
import AnimatedContainer from '../components/AnimatedContainer';
import { categories, products } from '../data/products';
import ProductIcon from '../components/ProductIcon';
import Testimonials from '../components/Testimonials';
import { supabase } from '../lib/supabaseClient';
import './Dashboard.css';

// Helper Component for Animated Icons
const CategoryIconSlider = ({ icons, alt }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!icons || icons.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % icons.length);
        }, 2500); // 2.5 seconds per slide for smoother viewing

        return () => clearInterval(interval);
    }, [icons]);

    return (
        <AnimatePresence mode="wait">
            <motion.img
                key={currentIndex}
                src={icons[currentIndex]}
                alt={`${alt} icon`}
                initial={{ opacity: 0, x: "-50%", y: "-40%" }}
                animate={{ opacity: 1, x: "-50%", y: "-50%" }}
                exit={{ opacity: 0, x: "-50%", y: "-60%" }}
                transition={{ duration: 0.4 }}
                style={{
                    width: '60%',
                    height: '60%',
                    objectFit: 'contain',
                    position: 'absolute',
                    top: '50%',
                    left: '50%'
                }}
            />
        </AnimatePresence>
    );
};

const Dashboard = () => {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stockMap, setStockMap] = useState({}); // Stores 'oos' status

    useEffect(() => {
        const fetchStockStatus = async () => {
            // Fetch all active packages to determine stock
            const { data, error } = await supabase
                .from('packages')
                .select('product_id, stock')
                .eq('is_active', true);

            if (data) {
                const status = {};
                const productPackages = {};

                // Group packages by product
                data.forEach(pkg => {
                    if (!productPackages[pkg.product_id]) productPackages[pkg.product_id] = [];
                    productPackages[pkg.product_id].push(pkg);
                });

                // Determine OOS status
                Object.keys(productPackages).forEach(pid => {
                    const pkgs = productPackages[pid];
                    // If ANY package is unlimited or > 0, it is NOT OOS.
                    const hasStock = pkgs.some(p => p.stock === 'unlimited' || parseInt(p.stock) > 0);
                    if (!hasStock) {
                        status[pid] = true; // Mark as OOS
                    }
                });
                setStockMap(status);
            }
        };

        fetchStockStatus();

        // Optional: Subscription for realtime updates could go here
    }, []);

    const handleOrderClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    // Helper to check stock
    const isOutOfStock = (productId) => {
        return !!stockMap[productId];
    };

    // Map slugs to display names and filter keywords
    // All categories linked to Blue Theme & new Products data
    const categoryMap = {
        'apk-premium': { name: 'Aplikasi Premium', filter: 'exclude-topup-assets-editing' }, // Show all except Topup, Assets, Editing
        'editing-tools': { name: 'Editing Tools', filter: 'Editing' },
        'ai-tools': { name: 'AI Tools', filter: 'AI Tools' },
        'software': { name: 'Software', filter: 'Software' },
        'video-audio': { name: 'Video & Audio', filter: 'Video' },
        'jasa-design': { name: 'Jasa Design', filter: 'Design' },
        'ebook-kursus': { name: 'E-book & Kursus', filter: 'Ebook' },
        'paket-member': { name: 'Paket Member', filter: 'Member' },
        'topup-game': { name: 'Topup Game', filter: 'Topup' },
        'assets': { name: 'Design Assets', filter: 'Assets' },
    };

    const currentCategory = slug ? categoryMap[slug] : null;

    // Filter products based on category
    // Special case: apk-premium shows all except Topup, Assets, and Editing
    const excludedCategories = ['Topup', 'Assets', 'Editing', 'Design', 'Video', 'Ebook'];
    const filteredProducts = currentCategory
        ? (currentCategory.filter === 'exclude-topup-assets-editing'
            ? products.filter(p => !excludedCategories.includes(p.category))
            : products.filter(p => p.category === currentCategory.filter || p.category.includes(currentCategory.filter)))
        : products;

    return (
        <div className="dashboard">
            {/* Banner - Only show on main dashboard */}
            {/* Banner */}
            {!slug && (
                <AnimatedContainer className="dashboard-banner">
                    <BannerCard
                        title="Unleash Your Potential"
                        description="Discover premium assets to elevate your creative projects."
                        buttonText="Exploring Now"
                        onButtonClick={() => navigate('/all-products')}
                        icon="🚀"
                    />
                </AnimatedContainer>
            )}

            {/* Category Header */}
            {slug && (
                <AnimatedContainer className="category-header">
                    <button className="back-link" onClick={() => navigate('/dashboard')}>
                        ← Kembali ke Dashboard
                    </button>
                    <h1>{currentCategory ? currentCategory.name : 'Kategori'}</h1>
                </AnimatedContainer>
            )}

            {/* Categories - Hide if in a specific category */}
            {!slug && (
                <section className="dashboard-section">
                    <h2 className="section-title">Kategori Populer</h2>
                    <div className="products-grid">
                        {categories.map((cat, index) => (
                            <GlassmorphCard
                                key={cat.id}
                                delay={index * 0.05}
                                onClick={() => {
                                    // Generate slug from category name
                                    const slugMap = {
                                        'Aplikasi Premium': 'apk-premium',
                                        'Editing Tools': 'editing-tools',
                                        'AI Tools': 'ai-tools',
                                        'Software': 'software',
                                        'Video & Audio': 'video-audio',
                                        'Jasa Design': 'jasa-design',
                                        'E-book & Kursus': 'ebook-kursus',
                                        'Paket Member': 'paket-member'
                                    };
                                    const slug = slugMap[cat.name] || 'apk-premium';
                                    navigate(`/category/${slug}`);
                                }}
                            >
                                <div className="category-card">
                                    <div className="category-icon" style={{
                                        background: `${cat.color}20`,
                                        overflow: 'hidden',
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {/* Animated Icon Logic */}
                                        {Array.isArray(cat.icon) ? (
                                            <CategoryIconSlider icons={cat.icon} alt={cat.name} />
                                        ) : (
                                            <img src={cat.icon} alt={cat.name} style={{ width: '60%', height: '60%', objectFit: 'contain' }} />
                                        )}
                                    </div>
                                    <div className="category-info">
                                        <h3>{cat.name}</h3>
                                        <span className="category-count">{cat.count}</span>
                                    </div>
                                </div>
                            </GlassmorphCard>
                        ))}
                    </div>
                </section>
            )}

            {/* Products */}
            <section className="dashboard-section">
                <h2 className="section-title">
                    {slug ? `Produk di ${currentCategory?.name}` : 'Rekomendasi Produk'}
                </h2>
                <div className="products-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                            <GlassmorphCard
                                key={product.id}
                                delay={index * 0.05}
                                className="product-card-wrapper"
                                onClick={() => handleOrderClick(product)}
                            >
                                <div className="product-card-large">
                                    {/* Badge Logic - Manual for demo to match image */}
                                    {(['prem-01', 'app-01', 'ai-03'].includes(product.id)) && <span className="card-badge popular">POPULER</span>}
                                    {(['app-02'].includes(product.id)) && <span className="card-badge best-seller">BEST SELLER</span>}
                                    {(['prem-03'].includes(product.id)) && <span className="card-badge new">NEW</span>}

                                    {/* Out of Stock Overlay */}
                                    {isOutOfStock(product.id) && (
                                        <div style={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: 'rgba(0,0,0,0.6)',
                                            zIndex: 20,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '20px',
                                            color: '#ef4444',
                                            fontWeight: '800'
                                        }}>
                                            <X size={48} strokeWidth={3} />
                                            <span style={{ fontSize: '14px', marginTop: '4px', textTransform: 'uppercase' }}>Stok Habis</span>
                                        </div>
                                    )}

                                    <div className="product-icon-large">
                                        <ProductIcon icon={product.icon} alt={product.name} />
                                    </div>
                                    <div className="product-info-wrapper">
                                        <h3 className="product-name">{product.name}</h3>
                                        <p className="product-label-start">MULAI DARI</p>
                                    </div>
                                    <div className="card-footer">
                                        <span className="product-price-large">
                                            {product.price === 0 ? 'Gratis' : `Rp ${product.price.toLocaleString('id-ID')}`}
                                        </span>
                                        <button
                                            className="btn-order-3d"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOrderClick(product);
                                            }}
                                        >
                                            ORDER
                                        </button>
                                    </div>
                                </div>
                            </GlassmorphCard>
                        ))
                    ) : (
                        <div className="empty-state">
                            <p>Produk belum tersedia di kategori ini.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Testimonials */}
            <Testimonials />

            <BottomSheet
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={selectedProduct}
            />
        </div>
    );
};

export default Dashboard;
