import { motion } from 'framer-motion';

const AnimatedContainer = ({
    children,
    delay = 0,
    direction = 'up',
    className = ''
}) => {
    const directions = {
        up: { y: 30 },
        down: { y: -30 },
        left: { x: 30 },
        right: { x: -30 }
    };

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, ...directions[direction] }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedContainer;
