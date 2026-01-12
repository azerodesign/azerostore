import { motion } from 'framer-motion';

const AnimatedContainer = ({
    children,
    delay = 0,
    direction = 'up',
    className = ''
}) => {
    const directions = {
        up: { y: 10 },
        down: { y: -10 },
        left: { x: 10 },
        right: { x: -10 }
    };

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, ...directions[direction] }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
                duration: 0.3,
                delay,
                ease: 'easeOut'
            }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedContainer;
