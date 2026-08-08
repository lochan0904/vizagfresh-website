import { useEffect } from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';

function OrderConfirmation() {
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    if (state?.whatsapp_link) {
      // Give the confirmation UI a beat to render before handing off to WhatsApp.
      const t = setTimeout(() => window.open(state.whatsapp_link, '_blank', 'noopener'), 600);
      return () => clearTimeout(t);
    }
  }, [state]);

  if (!state?.order) return <Navigate to="/menu" replace />;

  return (
    <section className="section">
      <div className="wrap">
        <div className="order-confirm">
          <span style={{ fontSize: 40 }}>✅</span>
          <h2 className="section-title" style={{ marginTop: 10 }}>Order Received</h2>
          <div className="order-code">{state.order.order_code}</div>
          <p style={{ color: 'var(--gray)', marginBottom: 24 }}>
            We've opened WhatsApp with your order details. Send the message to confirm — we'll reply to
            arrange payment (cash/UPI) and delivery time.
          </p>
          <a href={state.whatsapp_link} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-block" style={{ marginBottom: 12 }}>
            💬 Open WhatsApp Again
          </a>
          <Link to="/menu" className="btn btn-outline btn-block">Back to Menu</Link>
        </div>
      </div>
    </section>
  );
}

export default OrderConfirmation;
