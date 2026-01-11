import { isImageUrl } from '../data/productIcons';

const ProductIcon = ({ icon, alt = 'Product', className = '' }) => {
    if (isImageUrl(icon)) {
        return (
            <img
                src={icon}
                alt={alt}
                className={`product-icon-img ${className}`}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '12px'
                }}
            />
        );
    }

    // Fallback untuk emoji atau teks
    return <span className={className}>{icon}</span>;
};

export default ProductIcon;
