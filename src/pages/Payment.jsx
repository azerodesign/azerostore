import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import GlassmorphCard from '../components/GlassmorphCard';
import AnimatedContainer from '../components/AnimatedContainer';
import './Payment.css';

const Payment = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [selectedMethod, setSelectedMethod] = useState(null);

    const packageName = searchParams.get('name') || 'Paket Premium';
    const packagePrice = parseInt(searchParams.get('price') || '0');
    const productName = searchParams.get('product') || '';

    const paymentMethods = [
        { id: 'qris', name: 'QRIS', icon: '📱', desc: 'Scan QR untuk bayar', detail: 'Scan QRIS di bawah ini a/n Azero Store' },
        { id: 'dana', name: 'Dana', icon: '💙', desc: 'Transfer via Dana', detail: '0851-8318-0486' },
        { id: 'gopay', name: 'GoPay', icon: '💚', desc: 'Transfer via GoPay', detail: '0851-8318-0486' },
    ];

    const handleConfirm = () => {
        if (!selectedMethod) return;
        const phoneNumber = "6285183180486"; // Updated admin number
        const message = `Halo Kak, Aku sudah bayar untuk order:\n\nProduk: ${productName}\nPaket: ${packageName}\nHarga: Rp ${packagePrice.toLocaleString()}\nMetode: ${selectedMethod.name}\n\nMohon diproses ya!`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="payment">
            <AnimatedContainer className="payment-header">
                <motion.button
                    className="back-btn"
                    onClick={() => navigate(-1)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Kembali
                </motion.button>
            </AnimatedContainer>

            <div className="payment-content-wrapper" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                <AnimatedContainer className="order-summary" delay={0.1}>
                    <GlassmorphCard hover={false}>
                        <div className="summary-content">
                            <h2>Ringkasan Pesanan</h2>
                            <div className="summary-item">
                                <span>Produk</span>
                                <span className="summary-value" style={{ fontWeight: 600 }}>{productName}</span>
                            </div>
                            <div className="summary-item">
                                <span>Paket</span>
                                <span className="summary-value">{packageName}</span>
                            </div>
                            <div className="summary-line"></div>
                            <div className="summary-item total">
                                <span>Total Tagihan</span>
                                <span className="summary-price">Rp {packagePrice.toLocaleString()}</span>
                            </div>
                        </div>
                    </GlassmorphCard>
                </AnimatedContainer>

                <AnimatedContainer className="payment-methods" delay={0.2}>
                    <h2 style={{ marginBottom: '16px' }}>Pilih Metode Pembayaran</h2>
                    <div className="payment-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                        {paymentMethods.map((method, index) => (
                            <GlassmorphCard
                                key={method.id}
                                delay={0.3 + index * 0.1}
                                onClick={() => setSelectedMethod(method)}
                                className={`payment-card ${selectedMethod?.id === method.id ? 'selected' : ''}`}
                                style={{
                                    border: selectedMethod?.id === method.id ? '2px solid #0066FF' : '1px solid rgba(255,255,255,0.1)',
                                    background: selectedMethod?.id === method.id ? 'rgba(0, 102, 255, 0.1)' : 'rgba(255,255,255,0.05)',
                                    cursor: 'pointer'
                                }}
                            >
                                <div className="method-icon" style={{ fontSize: '24px', marginBottom: '8px' }}>{method.icon}</div>
                                <div className="method-name" style={{ fontWeight: 600 }}>{method.name}</div>
                            </GlassmorphCard>
                        ))}
                    </div>
                </AnimatedContainer>

                {/* Payment Detail Section */}
                <AnimatePresence mode="wait">
                    {selectedMethod && (
                        <AnimatedContainer className="payment-detail" delay={0}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <GlassmorphCard hover={false} style={{ textAlign: 'center', padding: '30px' }}>
                                    <h3>Lakukan Pembayaran</h3>
                                    <p style={{ opacity: 0.7, marginBottom: '20px' }}>{selectedMethod.detail}</p>

                                    {selectedMethod.id === 'qris' ? (
                                        <div className="qris-container" style={{ margin: '20px auto', width: '300px', height: '300px', background: 'white', padding: '10px', borderRadius: '12px' }}>
                                            {/* Real QRIS Image */}
                                            <img
                                                src="https://i.postimg.cc/XqBdP4gV/6278200803671608775.jpg"
                                                alt="QRIS Code"
                                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="number-display" style={{
                                            background: 'rgba(0,0,0,0.2)',
                                            padding: '20px',
                                            borderRadius: '12px',
                                            fontSize: '24px',
                                            fontWeight: '800',
                                            letterSpacing: '1px',
                                            marginBottom: '20px',
                                            border: '1px dashed rgba(255,255,255,0.2)'
                                        }}>
                                            {selectedMethod.detail.split('(')[0]}
                                        </div>
                                    )}

                                    <button
                                        className="btn-confirm"
                                        onClick={handleConfirm}
                                        style={{
                                            background: '#22c55e',
                                            color: 'white',
                                            border: 'none',
                                            padding: '12px 30px',
                                            borderRadius: '30px',
                                            fontSize: '16px',
                                            fontWeight: '600',
                                            marginTop: '20px',
                                            cursor: 'pointer',
                                            boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)',
                                            width: '100%'
                                        }}
                                    >
                                        Konfirmasi Pembayaran (WA)
                                    </button>
                                </GlassmorphCard>
                            </motion.div>
                        </AnimatedContainer>
                    )}
                </AnimatePresence>

                <AnimatedContainer className="payment-info" delay={0.5}>
                    <GlassmorphCard hover={false}>
                        <div className="info-content">
                            <h3>📋 Instruksi</h3>
                            <ol style={{ paddingLeft: '20px', opacity: 0.8, lineHeight: '1.6' }}>
                                <li>Pilih metode pembayaran di atas.</li>
                                <li>Lakukan transfer atau scan QRIS sesuai nominal.</li>
                                <li>Klik tombol <strong>Konfirmasi Pembayaran</strong>.</li>
                                <li>Kirim bukti transfer ke WhatsApp admin.</li>
                            </ol>
                        </div>
                    </GlassmorphCard>
                </AnimatedContainer>
            </div>
        </div>
    );
};

export default Payment;
