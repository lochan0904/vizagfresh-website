import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

function Cart() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <section className="section">
        <div className="wrap empty-state">
          <h2 className="section-title">Your cart is empty</h2>
          <p className="section-sub center">Add a few fresh blends from the menu to get started.</p>
          <Link to="/menu" className="btn btn-primary">Browse the Menu</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="wrap">
        <h2 className="section-title">Your Cart</h2>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.product_id}>
                <td>{item.name}</td>
                <td>₹{item.price.toFixed(0)}</td>
                <td>
                  <div className="qty-stepper" style={{ justifyContent: 'flex-start' }}>
                    <button type="button" onClick={() => updateQuantity(item.product_id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.product_id, item.quantity + 1)}>+</button>
                  </div>
                </td>
                <td>₹{(item.price * item.quantity).toFixed(0)}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => removeItem(item.product_id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="cart-summary">
          <span className="total">Subtotal: ₹{subtotal.toFixed(0)}</span>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
        </div>
        <p className="fine-note" style={{ textAlign: 'right', marginTop: 10 }}>
          No payment is collected here — you'll confirm and pay via WhatsApp.
        </p>
      </div>
    </section>
  );
}

export default Cart;
