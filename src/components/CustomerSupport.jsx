import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CustomerSupport.css';

const CustomerSupport = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleWhatsApp = () => {
        window.open('https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20butuh%20bantuan', '_blank');
    };

    return (
        <div className="customer-support">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="support-bubble"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    >
                        <div className="support-header">
                            <div className="support-avatar-large">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4`} alt="Admin" />
                                <span className="online-indicator" />
                            </div>
                            <div className="support-info">
                                <h4>Admin Azero</h4>
                                <span>Online</span>
                            </div>
                            <button className="close-btn" onClick={toggleChat}>×</button>
                        </div>
                        <div className="support-body">
                            <p>Halo! 👋 Ada yang bisa kami bantu? Chat kami untuk konsultasi gratis!</p>
                        </div>
                        <button className="whatsapp-btn" onClick={handleWhatsApp}>
                            Chat via WhatsApp
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                className="support-toggle"
                onClick={toggleChat}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <div className="support-avatar-small">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4`} alt="Support" />
                </div>
                {!isOpen && <span className="notification-badge">1</span>}
            </motion.button>
        </div>
    );
};

export default CustomerSupport;
