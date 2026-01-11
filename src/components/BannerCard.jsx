import { motion } from 'framer-motion';
import './BannerCard.css';

const BannerCard = ({
    title,
    description,
    buttonText,
    onButtonClick,
    icon
}) => {
    return (
        <motion.div
            className="bannercard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="bannercard-gradient" />
            <div className="bannercard-content">
                <div className="bannercard-text">
                    <h2 className="bannercard-title">{title}</h2>
                    <p className="bannercard-description">{description}</p>
                    <motion.button
                        className="bannercard-btn"
                        onClick={onButtonClick}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {buttonText}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.button>
                </div>
                {icon && <div className="bannercard-icon">{icon}</div>}
            </div>
            <div className="bannercard-particles">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="particle"
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 3,
                            delay: i * 0.5,
                            repeat: Infinity
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default BannerCard;
