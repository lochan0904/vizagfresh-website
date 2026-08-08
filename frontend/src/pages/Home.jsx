import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">🍋 Opening in Visakhapatnam</span>
            <h1>Pure. Fresh. <span>Healthy.</span></h1>
            <p className="lead">
              Visakhapatnam's first organized, FSSAI-certified cold-press juice bar — 100% natural,
              preservative-free juices made fresh daily from locally sourced fruits &amp; vegetables.
            </p>
            <div className="hero-badges">
              <span className="hero-badge">🔬 FSSAI Lab-Tested</span>
              <span className="hero-badge">🌱 No Preservatives</span>
              <span className="hero-badge">🥭 Rythu Bazaar Sourced</span>
              <span className="hero-badge">❄️ Cold-Pressed Daily</span>
            </div>
            <div className="hero-cta">
              <Link to="/menu" className="btn btn-primary">View Our Menu</Link>
              <Link to="/about" className="btn btn-outline">Our Story</Link>
            </div>
            <p className="fine-note">No online payment here — place your order and confirm it on WhatsApp.</p>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <div className="emoji-row">🍉🥬🍊</div>
              <h4 style={{ color: 'var(--green-dark)' }}>Pressed Fresh This Morning</h4>
              <p style={{ fontSize: 13, color: 'var(--gray)', margin: '6px 0 12px' }}>
                Every bottle cold-pressed within hours of your order — never sitting on a shelf.
              </p>
              <span className="eyebrow" style={{ marginBottom: 0 }}>Best-before: 72 hours</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="trust-strip">
            <div className="trust-item"><div className="ico">🔬</div><h4>FSSAI Certified</h4><p>Daily &amp; weekly lab testing</p></div>
            <div className="trust-item"><div className="ico">🥕</div><h4>Farm-to-Bottle</h4><p>Sourced daily, locally</p></div>
            <div className="trust-item"><div className="ico">🧊</div><h4>Cold-Press Only</h4><p>No heat, no oxidation</p></div>
            <div className="trust-item"><div className="ico">💬</div><h4>Order on WhatsApp</h4><p>No cards, no accounts</p></div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap center" style={{ maxWidth: 640 }}>
          <span className="eyebrow">How It Works</span>
          <h2 className="section-title">Order Without a Payment Gateway</h2>
          <p className="section-sub center">
            Build your order on this site, then send it straight to us on WhatsApp to confirm and pay —
            cash or UPI at pickup/delivery. No card details ever touch this website.
          </p>
          <Link to="/menu" className="btn btn-primary">Start an Order</Link>
        </div>
      </section>
    </>
  );
}

export default Home;
