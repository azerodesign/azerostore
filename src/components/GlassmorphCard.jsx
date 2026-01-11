import { motion } from 'framer-motion';
import './GlassmorphCard.css';

const GlassmorphCard = ({
    children,
    className = '',
    hover = true,
    delay = 0,
    onClick,
    ...props
}) => {
    return (
        <motion.div
            className={`glassmorphcard ${className}`}
            {...props}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: 'easeOut' }}
            whileHover={hover ? {
                scale: 1.02,
                boxShadow: '0 8px 40px rgba(0, 163, 255, 0.3)'
            } : {}}
            whileTap={onClick ? { scale: 0.98 } : {}}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
};

export default GlassmorphCard;
