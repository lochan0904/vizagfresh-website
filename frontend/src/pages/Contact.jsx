function Contact() {
  return (
    <section className="section">
      <div className="wrap center" style={{ maxWidth: 640 }}>
        <span className="eyebrow">Get In Touch</span>
        <h2 className="section-title">We'd Love to Hear From You</h2>
        <p className="section-sub center">
          Questions about the menu, bulk/corporate orders, or when we're opening near you — reach us directly.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
          <a
            href="https://wa.me/919999999999?text=Hi%20VizagFresh%2C%20I%20have%20a%20question."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            💬 Message Us on WhatsApp
          </a>
          <a href="mailto:hello@vizagfresh.in" className="btn btn-outline">✉️ hello@vizagfresh.in</a>
          <p style={{ color: 'var(--gray)', marginTop: 10 }}>Visakhapatnam, Andhra Pradesh, India</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
