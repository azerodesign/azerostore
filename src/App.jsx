import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AllProducts from './pages/AllProducts';
import ProductMenu from './pages/ProductMenu';
import Payment from './pages/Payment';
import Settings from './pages/Settings';
import AzeroPanel from './pages/AzeroPanel/AzeroPanel';
import './index.css';

const MainLayout = () => (
  <>
    <Navbar />
    <BottomNav />
    <Outlet />
  </>
);

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes with Navbar/BottomNav */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<ProductMenu />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/category/:slug" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Admin Panel (Standalone) */}
          <Route path="/azeropanel" element={<AzeroPanel />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
