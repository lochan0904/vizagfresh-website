import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

function Navbar() {
  const { itemCount } = useCart();
  const navigate = useNavigate();

  return (
    <header className="site-header">
      <nav className="site-nav">
        <NavLink to="/" className="logo">
          <span role="img" aria-label="leaf">🍋</span> VizagFresh
        </NavLink>
        <ul className="nav-links">
          <li><NavLink to="/menu">Menu</NavLink></li>
          <li><NavLink to="/about">Our Story</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
        <div className="nav-cta">
          <button className="cart-pill" onClick={() => navigate('/cart')} aria-label="View cart">
            🛒 Cart
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
