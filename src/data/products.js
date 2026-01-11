import { productIcons, categoryIcons } from './productIcons';

export const products = [
    // APK PREMIUM
    { id: 'prem-01', name: 'YouTube Premium', category: 'Apk Premium', price: 5000, isPremium: true, icon: productIcons['prem-01'] },
    { id: 'prem-02', name: 'Spotify Premium', category: 'Apk Premium', price: 10000, isPremium: true, icon: productIcons['prem-02'] },
    { id: 'prem-03', name: 'Netflix', category: 'Apk Premium', price: 25000, isPremium: true, icon: productIcons['prem-03'] },
    { id: 'prem-04', name: 'Disney+', category: 'Apk Premium', price: 20000, isPremium: true, icon: productIcons['prem-04'] },

    { id: 'prem-07', name: 'Apple Music', category: 'Apk Premium', price: 12000, isPremium: true, icon: productIcons['prem-07'] },

    { id: 'prem-09', name: 'Viu Premium', category: 'Apk Premium', price: 15000, isPremium: true, icon: productIcons['prem-09'] },
    { id: 'prem-10', name: 'Vidio Premium', category: 'Apk Premium', price: 20000, isPremium: true, icon: productIcons['prem-10'] },
    { id: 'prem-11', name: 'WeTV VIP', category: 'Apk Premium', price: 18000, isPremium: true, icon: productIcons['prem-11'] },
    { id: 'prem-12', name: 'iQIYI VIP', category: 'Apk Premium', price: 15000, isPremium: true, icon: productIcons['prem-12'] },

    { id: 'prem-14', name: 'Wink Premium', category: 'Apk Premium', price: 15000, isPremium: true, icon: productIcons['prem-14'] },
    { id: 'prem-15', name: 'Zoom Pro', category: 'Apk Premium', price: 20000, isPremium: true, icon: productIcons['prem-15'] },
    { id: 'prem-16', name: 'Fizzo Premium', category: 'Apk Premium', price: 10000, isPremium: true, icon: productIcons['prem-16'] },
    { id: 'prem-17', name: 'Bstation VIP', category: 'Apk Premium', price: 15000, isPremium: true, icon: productIcons['prem-17'] },
    { id: 'prem-18', name: 'Dramabox VIP', category: 'Apk Premium', price: 12000, isPremium: true, icon: productIcons['prem-18'] },
    { id: 'prem-19', name: 'Loklok Premium', category: 'Apk Premium', price: 15000, isPremium: true, icon: productIcons['prem-19'] },

    { id: 'prem-21', name: 'Get Contact Premium', category: 'Apk Premium', price: 10000, isPremium: true, icon: productIcons['prem-21'] },


    // EDITING
    { id: 'app-01', name: 'Alight Motion Pro', category: 'Editing', price: 15000, isPremium: true, icon: productIcons['app-01'] },
    { id: 'app-02', name: 'CapCut Pro', category: 'Editing', price: 10000, isPremium: true, icon: productIcons['app-02'] },
    { id: 'app-03', name: 'Canva Pro', category: 'Editing', price: 5000, isPremium: true, icon: productIcons['app-03'] },
    { id: 'app-04', name: 'Remini Pro', category: 'Editing', price: 10000, isPremium: true, icon: productIcons['app-04'] },
    { id: 'app-05', name: 'Lightroom Premium', category: 'Editing', price: 12000, isPremium: true, icon: productIcons['app-05'] },
    { id: 'app-06', name: 'Picsart Premium', category: 'Editing', price: 10000, isPremium: true, icon: productIcons['app-06'] },
    { id: 'app-07', name: 'Wink Premium', category: 'Editing', price: 15000, isPremium: true, icon: productIcons['app-07'] },
    { id: 'app-08', name: 'VSCO Premium', category: 'Editing', price: 12000, isPremium: true, icon: productIcons['app-08'] },
    { id: 'app-09', name: 'Envato Elements', category: 'Editing', price: 25000, isPremium: true, icon: productIcons['app-09'] },

    // AI TOOLS
    { id: 'ai-01', name: 'ChatGPT Plus', category: 'AI Tools', price: 30000, isPremium: true, icon: productIcons['ai-01'] },
    { id: 'ai-02', name: 'Gemini Advanced', category: 'AI Tools', price: 25000, isPremium: true, icon: productIcons['ai-02'] },
    { id: 'ai-03', name: 'Midjourney', category: 'AI Tools', price: 50000, isPremium: true, icon: productIcons['ai-03'] },
    { id: 'ai-04', name: 'Perplexity AI Pro', category: 'AI Tools', price: 35000, isPremium: true, icon: productIcons['ai-04'] },
    { id: 'ai-05', name: 'Blackbox AI Pro', category: 'AI Tools', price: 30000, isPremium: true, icon: productIcons['ai-05'] },

    // SOFTWARE
    { id: 'soft-01', name: 'After Effects', category: 'Software', price: 50000, isPremium: true, icon: productIcons['soft-01'] },
    { id: 'soft-02', name: 'Premiere Pro', category: 'Software', price: 50000, isPremium: true, icon: productIcons['soft-02'] },
    { id: 'soft-03', name: 'Cinema 4D', category: 'Software', price: 75000, isPremium: true, icon: productIcons['soft-03'] },
    { id: 'soft-04', name: 'Office 365', category: 'Software', price: 20000, isPremium: true, icon: productIcons['soft-04'] },

    // STOCK VIDEO
    { id: 'vid-01', name: 'Transisi Pack', category: 'Video', price: 15000, isPremium: false, icon: productIcons['vid-01'] },
    { id: 'vid-02', name: 'Mentahan Meme', category: 'Video', price: 10000, isPremium: false, icon: productIcons['vid-02'] },
    { id: 'vid-03', name: 'Video Efek', category: 'Video', price: 12000, isPremium: false, icon: productIcons['vid-03'] },
    { id: 'vid-04', name: 'CC Pack', category: 'Video', price: 10000, isPremium: false, icon: productIcons['vid-04'] },
    { id: 'vid-05', name: 'Template Video Animasi', category: 'Video', price: 20000, isPremium: false, icon: productIcons['vid-05'] },

    // JASA DESIGN
    { id: 'des-01', name: 'Logo Design', category: 'Design', price: 50000, isPremium: true, icon: productIcons['des-01'] },
    { id: 'des-02', name: 'Banner Toko', category: 'Design', price: 25000, isPremium: true, icon: productIcons['des-02'] },

    // E-BOOK
    { id: 'book-01', name: 'Jago React', category: 'Ebook', price: 50000, isPremium: false, icon: productIcons['book-01'] },
    { id: 'book-02', name: 'Mastering UI/UX', category: 'Ebook', price: 45000, isPremium: false, icon: productIcons['book-02'] },

    // GIFT & SKIN (Moved to Topup)
    { id: 'gift-01', name: 'Gift The Forge', category: 'Topup', price: 25000, isPremium: true, icon: productIcons['gift-01'] },
    { id: 'gift-02', name: 'Gift Emote', category: 'Topup', price: 15000, isPremium: true, icon: productIcons['gift-02'] },
    { id: 'gift-03', name: 'Gift Shop', category: 'Topup', price: 20000, isPremium: true, icon: productIcons['gift-03'] },
    { id: 'gift-04', name: 'Fish It', category: 'Topup', price: 10000, isPremium: true, icon: productIcons['gift-04'] },
    { id: 'gift-06', name: 'Skin Granger', category: 'Topup', price: 50000, isPremium: true, icon: productIcons['gift-06'] },
    { id: 'gift-07', name: 'Skin Luoyi', category: 'Topup', price: 45000, isPremium: true, icon: productIcons['gift-07'] },
    { id: 'gift-08', name: 'Starlight', category: 'Topup', price: 35000, isPremium: true, icon: productIcons['gift-08'] },
    { id: 'gift-09', name: 'Squad Verif', category: 'Topup', price: 20000, isPremium: true, icon: productIcons['gift-09'] },
    { id: 'gift-10', name: 'Jokgen', category: 'Topup', price: 15000, isPremium: true, icon: productIcons['gift-10'] },
    { id: 'gift-11', name: 'Skin Rod Limited', category: 'Topup', price: 75000, isPremium: true, icon: productIcons['gift-11'] },

    // ASSETS
    { id: 'ast-01', name: '3D Icons Pack', category: 'Assets', price: 25000, isPremium: true, icon: productIcons['ast-01'] },
    { id: 'ast-02', name: 'UI Kit Mobile', category: 'Assets', price: 50000, isPremium: true, icon: productIcons['ast-02'] },
    { id: 'ast-03', name: 'Font Bundle', category: 'Assets', price: 30000, isPremium: true, icon: productIcons['ast-03'] },
    { id: 'ast-04', name: 'Mockup Bundle', category: 'Assets', price: 35000, isPremium: true, icon: productIcons['ast-04'] },

    // TOPUP GAME
    { id: 'game-01', name: 'Mobile Legends', category: 'Topup', price: 15400, isPremium: false, icon: productIcons['game-01'] },
    { id: 'game-02', name: 'Free Fire', category: 'Topup', price: 5000, isPremium: false, icon: productIcons['game-02'] },
    { id: 'game-03', name: 'PUBG Mobile', category: 'Topup', price: 10000, isPremium: false, icon: productIcons['game-03'] },
    { id: 'game-04', name: 'Genshin Impact', category: 'Topup', price: 60000, isPremium: true, icon: productIcons['game-04'] },
    { id: 'game-05', name: 'Roblox Robux', category: 'Topup', price: 10000, isPremium: false, icon: productIcons['game-05'] },
];

// Packages have been moved to src/data/packages/

// Updated Categories with Single Primary Color (Blue variations)
export const categories = [
    { id: 'cat-1', name: 'Aplikasi Premium', icon: categoryIcons['cat-1'], count: '50+', color: '#0066FF' }, // Primary Blue
    { id: 'cat-2', name: 'Editing Tools', icon: categoryIcons['cat-2'], count: '25+', color: '#3B82F6' }, // Light Blue
    { id: 'cat-3', name: 'AI Tools', icon: categoryIcons['cat-3'], count: '10+', color: '#0EA5E9' }, // Sky Blue
    { id: 'cat-4', name: 'Software', icon: categoryIcons['cat-4'], count: '30+', color: '#60A5FA' }, // Soft Blue
    { id: 'cat-5', name: 'Video & Audio', icon: categoryIcons['cat-5'], count: '15K+', color: '#2563EB' }, // Royal Blue
    { id: 'cat-6', name: 'Jasa Design', icon: categoryIcons['cat-6'], count: 'Custom', color: '#1D4ED8' }, // Dark Blue
    { id: 'cat-7', name: 'E-book & Kursus', icon: categoryIcons['cat-7'], count: '500+', color: '#93C5FD' }, // Pale Blue
    { id: 'cat-8', name: 'Paket Member', icon: categoryIcons['cat-8'], count: '3 Paket', color: '#1E40AF' }, // Navy Blue
    { id: 'cat-9', name: 'Topup Game', icon: categoryIcons['cat-9'], count: '4 Games', color: '#8B5CF6' }, // Violet
];


