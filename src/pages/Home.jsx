import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Sparkles, Zap, Shield, Clock, ArrowRight, Star } from 'lucide-react';
import AnimatedContainer from '../components/AnimatedContainer';
import GlassmorphCard from '../components/GlassmorphCard';
import BentoGrid from '../components/BentoGrid';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.scrollTo) {
            const element = document.getElementById(location.state.scrollTo);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
                window.history.replaceState({}, document.title);
            }
        }
    }, [location]);

    const services = [
        { icon: <Sparkles size={28} />, title: 'Aplikasi Premium', desc: 'Netflix, Spotify, YouTube Premium & lebih banyak lagi' },
        { icon: <Zap size={28} />, title: 'Aktivasi Instan', desc: 'Langsung aktif dalam hitungan menit setelah pembayaran' },
        { icon: <Shield size={28} />, title: 'Garansi Aman', desc: 'Garansi penuh selama masa aktif langganan Anda' },
        { icon: <Clock size={28} />, title: 'Support 24/7', desc: 'Tim support siap membantu kapanpun Anda butuhkan' },
    ];

    const featuredApps = [
        { name: 'Spotify', icon: 'https://files.catbox.moe/ow7hu1.png' },
        { name: 'Netflix', icon: 'https://files.catbox.moe/87j9ps.png' },
        { name: 'YouTube', icon: 'https://files.catbox.moe/5jmirv.png' },
        { name: 'Disney+', icon: 'https://files.catbox.moe/arxg3y.png' },
        { name: 'Canva', icon: 'https://files.catbox.moe/ipb4tv.png' },
        { name: 'ChatGPT', icon: 'https://files.catbox.moe/ve3tfl.png' },
    ];

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg">
                    <div className="orb orb-1" />
                    <div className="orb orb-2" />
                    <div className="orb orb-3" />
                    <div className="grid-overlay" />
                </div>

                <AnimatedContainer className="hero-content">
                    <motion.div
                        className="hero-badge"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Star size={14} fill="currentColor" />
                        <span>Trusted by 50,000+ Users</span>
                    </motion.div>

                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Kebutuhan Digitalmu<br />
                        <span className="gradient-text">ada di Sini!</span>
                    </motion.h1>

                    <motion.p
                        className="hero-desc"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Dapatkan akses ke aplikasi streaming, editing, AI tools, dan software premium dengan harga yang sangat terjangkau.
                    </motion.p>

                    <motion.div
                        className="hero-buttons"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <motion.button
                            className="btn-primary"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/dashboard')}
                        >
                            Jelajahi Produk
                            <ArrowRight size={20} />
                        </motion.button>
                        <motion.button
                            className="btn-secondary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
                        >
                            Hubungi Kami
                        </motion.button>
                    </motion.div>

                    <motion.div
                        className="hero-stats"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="stat">
                            <span className="stat-value">100K+</span>
                            <span className="stat-label">Transaksi</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat">
                            <span className="stat-value">50K+</span>
                            <span className="stat-label">Pengguna</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat">
                            <span className="stat-value">4.9★</span>
                            <span className="stat-label">Rating</span>
                        </div>
                    </motion.div>
                </AnimatedContainer>
            </section>

            {/* Featured Apps */}
            <section className="featured-apps">
                <motion.p
                    className="featured-label"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    Tersedia untuk berbagai platform populer
                </motion.p>
                <motion.div
                    className="apps-row"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {featuredApps.map((app, index) => (
                        <motion.div
                            key={app.name}
                            className="app-icon"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.1, y: -5 }}
                        >
                            <img src={app.icon} alt={app.name} />
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Why Choose Us */}
            <section className="services">
                <AnimatedContainer className="section-header">
                    <span className="section-tag">Kenapa Pilih Kami?</span>
                    <h2>Layanan Terbaik untuk Anda</h2>
                </AnimatedContainer>

                <BentoGrid>
                    {services.map((service, index) => (
                        <GlassmorphCard key={index} delay={index * 0.1}>
                            <div className="service-icon-wrapper">
                                {service.icon}
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.desc}</p>
                        </GlassmorphCard>
                    ))}
                </BentoGrid>
            </section>

            {/* Testimonials */}
            <Testimonials />

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;
