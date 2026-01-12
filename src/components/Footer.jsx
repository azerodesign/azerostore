import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Brand Section */}
                <div className="footer-brand">
                    <h2 className="footer-logo">AZEROSTORE</h2>
                    <p className="footer-tagline">Marketplace Premium Digital 2.0</p>
                    <p className="footer-desc">
                        Temukan berbagai produk digital premium, aplikasi, game topup,
                        dan layanan digital terpercaya dengan harga terjangkau.
                    </p>
                </div>

                {/* Links Columns */}
                <div className="footer-links-group">
                    <div className="footer-column">
                        <h3>AZEROSTORE</h3>
                        <ul>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link to="/all-products">Semua Produk</Link></li>
                            <li><Link to="/settings">Settings</Link></li>
                            <li><a href="https://wa.me/6285183070684" target="_blank" rel="noopener noreferrer">Hubungi Kami</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3>APP PREMIUM</h3>
                        <ul>
                            <li><Link to="/category/apk-premium">Spotify Premium</Link></li>
                            <li><Link to="/category/apk-premium">Netflix VIP</Link></li>
                            <li><Link to="/category/apk-premium">YouTube Premium</Link></li>
                            <li><Link to="/category/apk-premium">Disney+ Hotstar</Link></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3>TOPUP GAME</h3>
                        <ul>
                            <li><Link to="/category/topup-game">Mobile Legends</Link></li>
                            <li><Link to="/category/topup-game">Free Fire</Link></li>
                            <li><Link to="/category/topup-game">PUBG Mobile</Link></li>
                            <li><Link to="/category/topup-game">Genshin Impact</Link></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3>LAYANAN</h3>
                        <ul>
                            <li><Link to="/category/editing-tools">Editing Tools</Link></li>
                            <li><Link to="/category/ai-tools">AI Tools</Link></li>
                            <li><Link to="/category/software">Software</Link></li>
                            <li><Link to="/category/assets">Design Assets</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <p className="footer-privacy">
                    Layanan terpercaya. Transaksi aman, produk original, dan garansi resmi dari Azerostore.
                </p>
                <div className="footer-bottom-links">
                    <a href="#">Privacy Policy</a>
                    <span>•</span>
                    <a href="#">Terms of Service</a>
                    <span>•</span>
                    <a href="#">Syarat & Ketentuan</a>
                </div>
                <div className="footer-bottom-bar">
                    <p>© 2025 Azerostore. All rights reserved.</p>
                    <p className="footer-slogan">Premium Digital Marketplace Indonesia</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
