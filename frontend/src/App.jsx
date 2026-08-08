import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import RequireAdmin from './components/RequireAdmin.jsx';

import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="page">{children}</main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<SiteLayout><Home /></SiteLayout>} />
        <Route path="/menu" element={<SiteLayout><Menu /></SiteLayout>} />
        <Route path="/cart" element={<SiteLayout><Cart /></SiteLayout>} />
        <Route path="/checkout" element={<SiteLayout><Checkout /></SiteLayout>} />
        <Route path="/order-confirmation" element={<SiteLayout><OrderConfirmation /></SiteLayout>} />
        <Route path="/about" element={<SiteLayout><About /></SiteLayout>} />
        <Route path="/contact" element={<SiteLayout><Contact /></SiteLayout>} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          }
        />

        <Route path="*" element={<SiteLayout><NotFound /></SiteLayout>} />
      </Routes>
    </>
  );
}

export default App;
