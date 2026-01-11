import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AllProducts from './pages/AllProducts';
import ProductMenu from './pages/ProductMenu';
import Payment from './pages/Payment';
import Settings from './pages/Settings';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <BottomNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductMenu />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/payment" element={<Payment />} />
          {/* Category Routes */}
          <Route path="/category/:slug" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
