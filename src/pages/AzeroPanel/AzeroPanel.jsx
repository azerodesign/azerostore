import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Lock, Key, Shield, AlertCircle, LayoutDashboard, Package,
    Settings, LogOut, ShoppingCart, DollarSign, Users, Crown
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import AnimatedContainer from '../../components/AnimatedContainer';
import GlassmorphCard from '../../components/GlassmorphCard';
import ServerStats from '../../components/ServerStats';
import { supabase } from '../../lib/supabaseClient';
import { migrateData } from '../../utils/migrateData';
import './AzeroPanel.css';


const AzKeyManager = ({ adminData }) => {
    const [keys, setKeys] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newKeyRole, setNewKeyRole] = useState('admin');
    const [newKeyDesc, setNewKeyDesc] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    // Fetch keys on mount
    useEffect(() => {
        fetchKeys();
    }, []);

    const fetchKeys = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('azkeys')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setKeys(data);
        setIsLoading(false);
    };

    const generateKey = () => {
        const prefix = newKeyRole === 'owner' ? 'AZERO-OWNER-' : 'AZERO-ADMIN-';
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        return prefix + random;
    };

    const handleCreateKey = async () => {
        if (!newKeyDesc) return alert('Masukkan deskripsi key');
        setIsCreating(true);

        const newKey = generateKey();
        const { error } = await supabase
            .from('azkeys')
            .insert([{
                key: newKey,
                role: newKeyRole,
                description: newKeyDesc,
                is_active: true
            }]);

        if (error) {
            alert('Gagal membuat key: ' + error.message);
        } else {
            setNewKeyDesc('');
            fetchKeys();
        }
        setIsCreating(false);
    };

    const handleDeleteKey = async (id) => {
        if (!window.confirm('Yakin ingin menghapus key ini?')) return;

        const { error } = await supabase
            .from('azkeys')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Gagal menghapus key');
        } else {
            fetchKeys();
        }
    };

    return (
        <div className="azkey-manager">
            <div className="manager-header">
                <h2>🔑 AzKey Manager</h2>
                <button className="refresh-btn" onClick={fetchKeys}>🔄 Refresh</button>
            </div>

            {/* Create New Key */}
            <GlassmorphCard className="create-key-card">
                <h3>Buat Key Baru</h3>
                <div className="create-key-form">
                    <select
                        value={newKeyRole}
                        onChange={(e) => setNewKeyRole(e.target.value)}
                        className="key-select"
                    >
                        <option value="admin">Admin</option>
                        <option value="owner">Owner</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Deskripsi (contoh: Admin Andi)"
                        value={newKeyDesc}
                        onChange={(e) => setNewKeyDesc(e.target.value)}
                        className="key-input"
                    />
                    <button
                        className="create-btn"
                        onClick={handleCreateKey}
                        disabled={isCreating}
                    >
                        {isCreating ? 'Membuat...' : 'Generate New Key'}
                    </button>
                </div>
            </GlassmorphCard>

            {/* Keys List */}
            <div className="keys-list">
                {isLoading ? (
                    <p className="loading-text">Memuat data keys...</p>
                ) : keys.length === 0 ? (
                    <p className="empty-text">Belum ada key yang dibuat.</p>
                ) : (
                    keys.map(key => (
                        <GlassmorphCard key={key.id} className="key-item-card">
                            <div className="key-info">
                                <div className="key-header">
                                    <span className={`role-badge ${key.role}`}>{key.role}</span>
                                    <span className={`status-badge ${key.is_active ? 'active' : 'inactive'}`}>
                                        {key.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <code className="key-code">{key.key}</code>
                                <p className="key-desc">{key.description}</p>
                                <span className="key-date">Dibuat: {new Date(key.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="key-actions">
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDeleteKey(key.id)}
                                >
                                    🗑️
                                </button>
                            </div>
                        </GlassmorphCard>
                    ))
                )}
            </div>
        </div>
    );
};

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMigrating, setIsMigrating] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [packages, setPackages] = useState([]);
    const [loadingPackages, setLoadingPackages] = useState(false);

    // CRUD States
    const [isEditingPkg, setIsEditingPkg] = useState(null); // package id
    const [editPkgForm, setEditPkgForm] = useState({});

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('name');

        if (data) setProducts(data);
        setIsLoading(false);
    };

    const handleMigrateData = async () => {
        setIsMigrating(true);
        const result = await migrateData();
        if (result.success) {
            alert('Sukses migrate data!');
            fetchProducts();
        } else {
            alert('Gagal migrate data: ' + result.error?.message);
        }
        setIsMigrating(false);
    };


    const fetchPackages = async (productId) => {
        setLoadingPackages(true);
        const { data } = await supabase
            .from('packages')
            .select('*')
            .eq('product_id', productId)
            .order('price');
        setPackages(data || []);
        setLoadingPackages(false);
    };

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
        fetchPackages(product.id);
    };

    const handleUpdatePackage = async () => {
        const { error } = await supabase
            .from('packages')
            .update({
                price: editPkgForm.price,
                stock: editPkgForm.stock,
                name: editPkgForm.name
            })
            .eq('id', isEditingPkg);

        if (error) alert('Error updating package');
        else {
            setIsEditingPkg(null);
            fetchPackages(selectedProduct.id);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="product-manager">
            {selectedProduct ? (
                // Product Detail View
                <div className="product-detail-view">
                    <button className="back-btn-small" onClick={() => setSelectedProduct(null)}>
                        ← Kembali ke List
                    </button>

                    <div className="product-header-card">
                        <div className="ph-info">
                            <h2>{selectedProduct.name}</h2>
                            <span className="ph-cat">{selectedProduct.category}</span>
                        </div>
                    </div>

                    <div className="packages-section">
                        <h3>📦 Paket / Varian</h3>

                        {loadingPackages ? (
                            <p>Loading packages...</p>
                        ) : packages.length === 0 ? (
                            <p className="empty-text">Belum ada paket.</p>
                        ) : (
                            <div className="packages-grid">
                                {packages.map(pkg => (
                                    <GlassmorphCard key={pkg.id} className="package-card">
                                        {isEditingPkg === pkg.id ? (
                                            <div className="pkg-edit-form">
                                                <input
                                                    value={editPkgForm.name}
                                                    onChange={e => setEditPkgForm({ ...editPkgForm, name: e.target.value })}
                                                    placeholder="Nama Paket"
                                                />
                                                <input
                                                    type="number"
                                                    value={editPkgForm.price}
                                                    onChange={e => setEditPkgForm({ ...editPkgForm, price: e.target.value })}
                                                    placeholder="Harga (Rp)"
                                                />
                                                <input
                                                    value={editPkgForm.stock}
                                                    onChange={e => setEditPkgForm({ ...editPkgForm, stock: e.target.value })}
                                                    placeholder="Stok (ex: unlimited, 10)"
                                                />
                                                <div className="pkg-actions">
                                                    <button className="save-btn" onClick={handleUpdatePackage}>💾 Save</button>
                                                    <button className="cancel-btn" onClick={() => setIsEditingPkg(null)}>Cancel</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="pkg-info">
                                                    <h4>{pkg.name}</h4>
                                                    <p className="pkg-key">Key: {pkg.package_key}</p>
                                                    <div className="pkg-stats">
                                                        <span className="pkg-price">Rp {pkg.price.toLocaleString()}</span>
                                                        <span className={`pkg-stock ${pkg.stock === 'unlimited' ? 'unlimited' : pkg.stock > 0 ? 'instock' : 'outstock'}`}>
                                                            {pkg.stock}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    className="edit-icon-btn"
                                                    onClick={() => {
                                                        setIsEditingPkg(pkg.id);
                                                        setEditPkgForm(pkg);
                                                    }}
                                                >
                                                    ✏️
                                                </button>
                                            </>
                                        )}
                                    </GlassmorphCard>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                // Product List View
                <>
                    <div className="manager-header">
                        <h2>📦 Product Manager</h2>
                        <input
                            className="search-input"
                            placeholder="Cari produk..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="products-list">
                        {isLoading ? (
                            <p>Loading products...</p>
                        ) : filteredProducts.length === 0 ? (
                            <div className="empty-state">
                                <p>Belum ada produk.</p>
                                <button className="migrate-btn" onClick={handleMigrateData} disabled={isMigrating}>
                                    {isMigrating ? 'Migrating...' : '📥 Migrate Local Data'}
                                </button>
                                <p className="empty-hint">Klik tombol di atas untuk import data dari file local (products.js)</p>
                            </div>
                        ) : (
                            filteredProducts.map(p => (
                                <GlassmorphCard
                                    key={p.id}
                                    className="product-item-card"
                                    onClick={() => handleSelectProduct(p)}
                                >
                                    <div className="prod-icon"><Package size={20} /></div>
                                    <div className="prod-info">
                                        <h4>{p.name}</h4>
                                        <span className="prod-cat">{p.category}</span>
                                    </div>
                                    <span className="arrow-right">→</span>
                                </GlassmorphCard>
                            ))
                        )}
                    </div>
                </>
            )}
        </div >
    );
};

const AzeroPanel = () => {
    const navigate = useNavigate();
    const [azkey, setAzkey] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [adminData, setAdminData] = useState(null);
    const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, azkeys, products, stats

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Check azkey in database
            const { data, error: dbError } = await supabase
                .from('azkeys')
                .select('*')
                .eq('key', azkey)
                .eq('is_active', true)
                .single();

            if (dbError || !data) {
                setError('AzKey tidak valid atau tidak aktif');
                setIsLoading(false);
                return;
            }

            // Success - save to local storage and show panel
            localStorage.setItem('azkey', azkey);
            setAdminData(data);
            setIsAuthenticated(true);
        } catch (err) {
            setError('Terjadi kesalahan. Coba lagi.');
        }

        setIsLoading(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('azkey');
        setIsAuthenticated(false);
        setAdminData(null);
        setAzkey('');
        setActiveTab('dashboard');
    };

    return (
        <div className="azeropanel-layout" data-theme="dark">
            {!isAuthenticated ? (
                // Simple Login Screen
                <div className="login-container">
                    <GlassmorphCard className="login-card" hover={false}>
                        <div className="login-header">
                            <div className="az-logo">A</div>
                            <h1>AzeroPanel</h1>
                            <p>Admin Dashboard</p>
                        </div>

                        <form onSubmit={handleSubmit} className="login-form">
                            <input
                                type="password"
                                value={azkey}
                                onChange={(e) => setAzkey(e.target.value)}
                                placeholder="Enter AzKey Authentication"
                                className="login-input"
                                autoFocus
                            />
                            <button type="submit" className="login-btn" disabled={isLoading}>
                                {isLoading ? 'Verifying...' : 'Login Access'}
                            </button>
                        </form>
                        {error && <div className="login-error">{error}</div>}
                    </GlassmorphCard>
                </div>
            ) : (
                // Dashboard Layout
                <div className="dashboard-container">
                    {/* Sidebar */}
                    <aside className="sidebar">
                        <div className="sidebar-brand">
                            <div className="brand-logo">A</div>
                            <span>AzeroStore</span>
                        </div>

                        <nav className="sidebar-nav">
                            <button
                                className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                                onClick={() => setActiveTab('dashboard')}
                            >
                                <LayoutDashboard size={20} />
                                <span>Dashboard</span>
                            </button>
                            <button
                                className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
                                onClick={() => setActiveTab('products')}
                            >
                                <Package size={20} />
                                <span>Products</span>
                            </button>
                            <button
                                className={`nav-item ${activeTab === 'azkeys' ? 'active' : ''}`}
                                onClick={() => setActiveTab('azkeys')}
                            >
                                <Key size={20} />
                                <span>AzKeys</span>
                            </button>
                            <button
                                className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                                onClick={() => setActiveTab('settings')}
                            >
                                <Settings size={20} />
                                <span>Settings</span>
                            </button>
                        </nav>

                        <div className="sidebar-footer">
                            <button className="nav-item logout" onClick={handleLogout}>
                                <LogOut size={20} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="main-content">
                        {/* Top Header */}
                        <header className="top-header">
                            <div className="header-left">
                                <h2 className="page-title">
                                    {activeTab === 'dashboard' && 'Dashboard Overview'}
                                    {activeTab === 'products' && 'Product Management'}
                                    {activeTab === 'azkeys' && 'AzKey Access Control'}
                                    {activeTab === 'settings' && 'System Settings'}
                                </h2>
                            </div>
                            <div className="header-right">
                                <div className="admin-profile">
                                    <div className="profile-icon">
                                        {adminData?.role === 'owner' ? <Crown size={18} color="#fbbf24" /> : <Shield size={18} color="#38bdf8" />}
                                    </div>
                                    <div className="profile-info">
                                        <span className="profile-name">{adminData?.role || 'Admin'}</span>
                                        <span className="profile-role">Online</span>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* Content Area */}
                        <div className="content-area">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="tab-content"
                                >
                                    {activeTab === 'dashboard' && (
                                        <div className="dashboard-grid">
                                            {/* Top Row: Main Stats & Server Stats */}
                                            <div className="dashboard-top-row">
                                                <div className="main-stats">
                                                    {/* Stats Cards Row */}
                                                    <div className="stats-row">
                                                        <div className="stat-card blue">
                                                            <div className="stat-icon"><Package /></div>
                                                            <div className="stat-value">124</div>
                                                            <div className="stat-label">Total Products</div>
                                                        </div>
                                                        <div className="stat-card green">
                                                            <div className="stat-icon"><ShoppingCart /></div>
                                                            <div className="stat-value">1,240</div>
                                                            <div className="stat-label">Total Orders</div>
                                                        </div>
                                                        <div className="stat-card purple">
                                                            <div className="stat-icon"><DollarSign /></div>
                                                            <div className="stat-value">Rp 15.4M</div>
                                                            <div className="stat-label">Revenue</div>
                                                        </div>
                                                        <div className="stat-card orange">
                                                            <div className="stat-icon"><Users /></div>
                                                            <div className="stat-value">8</div>
                                                            <div className="stat-label">Active Admins</div>
                                                        </div>
                                                    </div>

                                                    {/* Sales Analytics (Full Width) */}
                                                    <GlassmorphCard className="widget-card wide" hover={false} style={{ background: 'var(--card-bg)' }}>
                                                        <div className="widget-header">
                                                            <h3>📈 Sales Analytics</h3>
                                                            <div className="widget-actions">
                                                                <button className="widget-btn active">Weekly</button>
                                                                <button className="widget-btn">Monthly</button>
                                                            </div>
                                                        </div>
                                                        <div className="chart-placeholder" style={{ width: '100%', height: '300px' }}>
                                                            <ResponsiveContainer width="100%" height="100%">
                                                                <AreaChart data={[
                                                                    { name: 'Mon', value: 4000 },
                                                                    { name: 'Tue', value: 3000 },
                                                                    { name: 'Wed', value: 5000 },
                                                                    { name: 'Thu', value: 2780 },
                                                                    { name: 'Fri', value: 1890 },
                                                                    { name: 'Sat', value: 6390 },
                                                                    { name: 'Sun', value: 3490 },
                                                                ]}>
                                                                    <defs>
                                                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                                                                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                                                        </linearGradient>
                                                                    </defs>
                                                                    <Tooltip
                                                                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                                                        itemStyle={{ color: '#fff' }}
                                                                    />
                                                                    <Area type="monotone" dataKey="value" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorValue)" />
                                                                </AreaChart>
                                                            </ResponsiveContainer>
                                                        </div>
                                                    </GlassmorphCard>
                                                </div>

                                                {/* Right Column: Server Stats & Logos */}
                                                <div className="side-widgets">
                                                    <ServerStats />

                                                    {/* Recent Logs Compact */}
                                                    <GlassmorphCard className="widget-card compact" hover={false} style={{ background: 'var(--card-bg)' }}>
                                                        <div className="widget-header" style={{ marginBottom: '16px' }}>
                                                            <h3>📝 System Logs</h3>
                                                        </div>
                                                        <ul className="log-list">
                                                            <li className="log-item">
                                                                <span className="log-time">10:42</span>
                                                                <span className="log-text" style={{ color: 'white' }}>New order #10234 received</span>
                                                            </li>
                                                            <li className="log-item">
                                                                <span className="log-time">09:15</span>
                                                                <span className="log-text" style={{ color: 'white' }}>Product stock updated</span>
                                                            </li>
                                                            <li className="log-item">
                                                                <span className="log-time">08:00</span>
                                                                <span className="log-text system">Daily Database Backup</span>
                                                            </li>
                                                            <li className="log-item">
                                                                <span className="log-time">02:30</span>
                                                                <span className="log-text system">Server Maintenance</span>
                                                            </li>
                                                        </ul>
                                                    </GlassmorphCard>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'products' && <ProductManager />}
                                    {activeTab === 'azkeys' && <AzKeyManager adminData={adminData} />}
                                    {activeTab === 'settings' && (
                                        <div className="settings-content">
                                            <GlassmorphCard>
                                                <h3>System Settings</h3>
                                                <p>Konfigurasi website akan ditambahkan di sini.</p>
                                                <button onClick={() => navigate('/settings')} className="btn-secondary">
                                                    Back to Main Settings Page
                                                </button>
                                            </GlassmorphCard>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </main>
                </div>
            )}
        </div>
    );
};

export default AzeroPanel;
