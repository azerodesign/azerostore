import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedContainer from '../components/AnimatedContainer';
import GlassmorphCard from '../components/GlassmorphCard';
import './Settings.css';

const Settings = () => {
    const [language, setLanguage] = useState('ID');
    const [currency, setCurrency] = useState('IDR');
    const [showSecret, setShowSecret] = useState(false);

    const toggleSecret = () => setShowSecret(!showSecret);

    return (
        <div className="settings-page">
            <AnimatedContainer className="settings-header">
                <h1>Settings</h1>
                <p>Atur preferensi aplikasi kamu</p>
            </AnimatedContainer>

            <div className="settings-grid">
                {/* General Settings */}
                <section>
                    <h2 className="section-title">Umum</h2>
                    <GlassmorphCard className="settings-card" hover={false}>
                        <div className="setting-item">
                            <div className="setting-info">
                                <span className="setting-icon">🌐</span>
                                <div>
                                    <h3>Bahasa</h3>
                                    <p>Pilih bahasa aplikasi</p>
                                </div>
                            </div>
                            <div className="setting-control">
                                <button
                                    className={`toggle-btn ${language === 'ID' ? 'active' : ''}`}
                                    onClick={() => setLanguage('ID')}
                                >ID</button>
                                <button
                                    className={`toggle-btn ${language === 'EN' ? 'active' : ''}`}
                                    onClick={() => setLanguage('EN')}
                                >EN</button>
                            </div>
                        </div>

                        <div className="setting-line"></div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <span className="setting-icon">💰</span>
                                <div>
                                    <h3>Mata Uang</h3>
                                    <p>Tampilan harga produk</p>
                                </div>
                            </div>
                            <select
                                className="setting-select"
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                            >
                                <option value="IDR">IDR (Rp)</option>
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                            </select>
                        </div>
                    </GlassmorphCard>
                </section>

                {/* Secret Feature */}
                <section>
                    <h2 className="section-title">Fitur Spesial</h2>
                    <GlassmorphCard
                        className={`settings-card secret-card ${showSecret ? 'unlocked' : ''}`}
                        onClick={toggleSecret}
                    >
                        <div className="secret-header">
                            <div className="setting-info">
                                <span className="setting-icon">👑</span>
                                <div>
                                    <h3>Secret Feature</h3>
                                    <p>Langganan Premium Azero</p>
                                </div>
                            </div>
                            <motion.div
                                className="arrow-icon"
                                animate={{ rotate: showSecret ? 180 : 0 }}
                            >
                                ▼
                            </motion.div>
                        </div>

                        <AnimatePresence>
                            {showSecret && (
                                <motion.div
                                    className="secret-content"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                >
                                    <div className="secret-menu-list">
                                        <div className="secret-menu-item" onClick={(e) => e.stopPropagation()}>
                                            <span className="secret-menu-icon">🤖</span>
                                            <div className="secret-menu-info">
                                                <h4>AI Tools <span className="coming-soon-badge">(Coming Soon)</span></h4>
                                                <p>Akses berbagai tools AI premium</p>
                                            </div>
                                            <span className="secret-menu-arrow">→</span>
                                        </div>
                                        <div className="secret-menu-item" onClick={(e) => e.stopPropagation()}>
                                            <span className="secret-menu-icon">📦</span>
                                            <div className="secret-menu-info">
                                                <h4>Checker Stock <span className="coming-soon-badge">(Coming Soon)</span></h4>
                                                <p>Cek ketersediaan stok produk</p>
                                            </div>
                                            <span className="secret-menu-arrow">→</span>
                                        </div>
                                        <div className="secret-menu-item" onClick={(e) => e.stopPropagation()}>
                                            <span className="secret-menu-icon">🧠</span>
                                            <div className="secret-menu-info">
                                                <h4>AzoAI <span className="coming-soon-badge">(Coming Soon)</span></h4>
                                                <p>Asisten AI pribadi Azerostore</p>
                                            </div>
                                            <span className="secret-menu-arrow">→</span>
                                        </div>
                                        <div className="secret-menu-item" onClick={(e) => e.stopPropagation()}>
                                            <span className="secret-menu-icon">🎛️</span>
                                            <div className="secret-menu-info">
                                                <h4>AzeroPanel <span className="coming-soon-badge">(Coming Soon)</span></h4>
                                                <p>Dashboard kontrol premium</p>
                                            </div>
                                            <span className="secret-menu-arrow">→</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </GlassmorphCard>
                </section>

                <section>
                    <p className="app-version">Versi Aplikasi 2.0.1 (Blue Edition)</p>
                    <button
                        onClick={async () => {
                            const { migrateData } = await import('../utils/migrateData');
                            const result = await migrateData();
                            alert(result.success ? 'Migration Success!' : 'Migration Failed');
                        }}
                        style={{ marginTop: '20px', padding: '10px', background: '#333', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', opacity: 0.5 }}
                    >
                        Migrate Data to Supabase
                    </button>
                </section>
            </div>
        </div>
    );
};

export default Settings;
