import { motion } from 'framer-motion';
import { User, MessageCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Testimonials.css';

const testimonials = [
    {
        id: 1,
        name: 'Ahmad Rizky',
        role: 'Content Creator',
        rating: 5,
        text: 'Pelayanan super cepat! Baru order langsung aktif dalam 5 menit. Recommended banget!',
    },
    {
        id: 2,
        name: 'Siti Nurhaliza',
        role: 'Graphic Designer',
        rating: 5,
        text: 'Sudah langganan Spotify & Netflix di sini. Harga murah, akun aman, admin ramah!',
    },
    {
        id: 3,
        name: 'Budi Santoso',
        role: 'Freelancer',
        rating: 5,
        text: 'Canva Pro nya works perfect! Sangat membantu untuk pekerjaan design saya.',
    },
    {
        id: 4,
        name: 'Dewi Lestari',
        role: 'Student',
        rating: 5,
        text: 'Harga paling murah dibanding toko lain. Kualitas tetap terjaga. Thank you!',
    },
    {
        id: 5,
        name: 'Fajar Pratama',
        role: 'Video Editor',
        rating: 5,
        text: 'Adobe Premiere Pro nya lancar, ga ada kendala. Proses aktivasi cepat sekali!',
    },
    {
        id: 6,
        name: 'Rina Wati',
        role: 'Entrepreneur',
        rating: 5,
        text: 'Already 6 months using their service. Never had any issue. Highly recommended!',
    },
];

const TestimonialCard = ({ testimonial }) => (
    <div className="testimonial-card">
        <div className="testimonial-header">
            <div className="testimonial-avatar">
                <User size={18} strokeWidth={2} />
            </div>
            <div className="testimonial-info">
                <h4 className="testimonial-name">{testimonial.name}</h4>
                <span className="testimonial-role">{testimonial.role}</span>
            </div>
        </div>

        <div className="testimonial-rating">
            {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="star">⭐</span>
            ))}
        </div>

        <p className="testimonial-text">"{testimonial.text}"</p>
    </div>
);

const Testimonials = () => {
    const navigate = useNavigate();
    // Double the testimonials for seamless infinite scroll
    const duplicatedTestimonials = [...testimonials, ...testimonials];

    return (
        <section className="testimonials-section">
            <div className="testimonials-header">
                <motion.h2
                    className="testimonials-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Apa Kata Mereka?
                </motion.h2>
                <motion.p
                    className="testimonials-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    Testimoni dari pelanggan setia kami
                </motion.p>
            </div>

            <div className="testimonials-scroll-container">
                <div className="testimonials-track">
                    {duplicatedTestimonials.map((testimonial, index) => (
                        <TestimonialCard
                            key={`${testimonial.id}-${index}`}
                            testimonial={testimonial}
                        />
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <motion.div
                className="testimonials-cta"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
                <p className="cta-text">Tertarik bergabung dengan ribuan pelanggan puas kami?</p>
                <div className="cta-buttons">
                    <motion.button
                        className="cta-btn primary"
                        onClick={() => navigate('/all-products')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Lihat Produk
                        <ArrowRight size={18} />
                    </motion.button>
                    <motion.a
                        href="https://wa.me/6281234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cta-btn secondary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <MessageCircle size={18} />
                        Hubungi Admin
                    </motion.a>
                </div>
            </motion.div>
        </section>
    );
};

export default Testimonials;
