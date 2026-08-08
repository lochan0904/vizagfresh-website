import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="logo" style={{ color: '#fff', marginBottom: 10 }}>🍋 VizagFresh</div>
            <p style={{ fontSize: 14, maxWidth: 260 }}>
              Visakhapatnam's first organized, FSSAI-certified cold-press juice bar.
            </p>
          </div>
          <div>
            <p style={{ marginBottom: 10 }}><Link to="/menu">Menu</Link></p>
            <p style={{ marginBottom: 10 }}><Link to="/about">Our Story</Link></p>
            <p><Link to="/contact">Contact</Link></p>
          </div>
          <div>
            <p style={{ marginBottom: 10 }}>hello@vizagfresh.in</p>
            <p style={{ marginBottom: 10 }}>Visakhapatnam, Andhra Pradesh</p>
            <p><Link to="/admin/login">Admin</Link></p>
          </div>
        </div>
        <div className="footer-bottom">© {new Date().getFullYear()} VizagFresh Cold Press Juice Center.</div>
      </div>
    </footer>
  );
}

export default Footer;
