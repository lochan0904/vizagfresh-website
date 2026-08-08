import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { api, ApiClientError } from '../api/client.js';

const schema = yup.object({
  customer_name: yup.string().trim().min(2, 'Enter your full name.').max(120).required('Enter your full name.'),
  customer_phone: yup
    .string()
    .trim()
    .matches(/^[0-9+][0-9 ]{7,15}$/, 'Enter a valid phone number.')
    .required('Enter a phone number.'),
  delivery_address: yup
    .string()
    .trim()
    .min(6, 'Enter a delivery address.')
    .max(500)
    .required('Enter a delivery address.'),
  notes: yup.string().trim().max(300, 'Notes must be under 300 characters.'),
});

function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  if (items.length === 0) {
    return (
      <section className="section">
        <div className="wrap empty-state">
          <h2 className="section-title">Nothing to check out yet</h2>
          <p className="section-sub center">Your cart is empty.</p>
          <Link to="/menu" className="btn btn-primary">Browse the Menu</Link>
        </div>
      </section>
    );
  }

  const onSubmit = async (values) => {
    setServerError('');
    setSubmitting(true);
    try {
      const payload = {
        ...values,
        items: items.map((i) => ({ product_id: i.product_id, quantity: i.quantity })),
      };
      const result = await api.createOrder(payload);
      clearCart();
      navigate('/order-confirmation', { state: result });
    } catch (err) {
      if (err instanceof ApiClientError && err.fields) {
        Object.entries(err.fields).forEach(([field, message]) => {
          if (['customer_name', 'customer_phone', 'delivery_address', 'notes'].includes(field)) {
            setError(field, { message });
          }
        });
      }
      setServerError(err.message || 'Something went wrong placing your order.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section">
      <div className="wrap">
        <h2 className="section-title">Checkout</h2>
        <p className="section-sub">
          We don't take payment here. Submit your details and we'll open WhatsApp with your order ready to send.
        </p>

        {serverError && <div className="banner-error">{serverError}</div>}

        <form className="form-grid" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-field">
            <label htmlFor="customer_name">Full Name</label>
            <input id="customer_name" {...register('customer_name')} placeholder="Your name" />
            {errors.customer_name && <div className="field-error">{errors.customer_name.message}</div>}
          </div>

          <div className="form-field">
            <label htmlFor="customer_phone">Phone Number</label>
            <input id="customer_phone" {...register('customer_phone')} placeholder="e.g. 9876543210" />
            {errors.customer_phone && <div className="field-error">{errors.customer_phone.message}</div>}
          </div>

          <div className="form-field">
            <label htmlFor="delivery_address">Delivery Address</label>
            <textarea id="delivery_address" rows={3} {...register('delivery_address')} placeholder="Flat/House no., street, area, landmark" />
            {errors.delivery_address && <div className="field-error">{errors.delivery_address.message}</div>}
          </div>

          <div className="form-field">
            <label htmlFor="notes">Notes (optional)</label>
            <textarea id="notes" rows={2} {...register('notes')} placeholder="E.g. less ice, preferred delivery time" />
            {errors.notes && <div className="field-error">{errors.notes.message}</div>}
          </div>

          <div className="cart-summary" style={{ justifyContent: 'space-between' }}>
            <span className="total">Subtotal: ₹{subtotal.toFixed(0)}</span>
            <button type="submit" className="btn btn-whatsapp" disabled={submitting}>
              {submitting ? 'Placing Order…' : '💬 Place Order via WhatsApp'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Checkout;
