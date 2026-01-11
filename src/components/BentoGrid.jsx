import './BentoGrid.css';

const BentoGrid = ({ children, className = '' }) => {
    return (
        <div className={`bentogrid ${className}`}>
            {children}
        </div>
    );
};

export default BentoGrid;
