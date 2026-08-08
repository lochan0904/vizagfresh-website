import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext.jsx';
import { api } from '../../api/client.js';

const STATUSES = ['new', 'contacted', 'confirmed', 'fulfilled', 'cancelled'];

function AdminDashboard() {
  const { token, admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('loading');
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(() => {
    setStatus('loading');
    api
      .adminListOrders(token, filter || undefined)
      .then((data) => {
        setOrders(data.orders);
        setStatus('ready');
      })
      .catch((err) => {
        setError(err.message);
        setStatus('error');
      });
  }, [token, filter]);

  useEffect(() => {
    load();
  }, [load]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.adminUpdateOrderStatus(token, id, newStatus);
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
    } catch (err) {
      alert(err.message || 'Could not update order status.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-shell">
      <div className="wrap">
        <div className="admin-bar">
          <div>
            <h2 className="section-title" style={{ marginBottom: 2 }}>Orders</h2>
            <p style={{ color: 'var(--gray)', fontSize: 13 }}>Signed in as {admin?.email || 'admin'}</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ padding: '10px 14px', borderRadius: 10, border: '1.5px solid #d9e3da' }}>
              <option value="">All statuses</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button type="button" className="btn btn-outline btn-sm" onClick={load}>Refresh</button>
            <button type="button" className="btn btn-danger btn-sm" onClick={handleLogout}>Log Out</button>
          </div>
        </div>

        {status === 'error' && <div className="banner-error">{error}</div>}
        {status === 'loading' && <p style={{ color: 'var(--gray)' }}>Loading orders…</p>}

        {status === 'ready' && orders.length === 0 && (
          <div className="empty-state">No orders yet.</div>
        )}

        {status === 'ready' && orders.length > 0 && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Subtotal</th>
                <th>Status</th>
                <th>Placed</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td><strong>{o.order_code}</strong></td>
                  <td>
                    {o.customer_name}<br />
                    <span style={{ color: 'var(--gray)', fontSize: 12.5 }}>{o.customer_phone}</span>
                    <br />
                    <span style={{ color: 'var(--gray)', fontSize: 12.5 }}>{o.delivery_address}</span>
                  </td>
                  <td>
                    {(o.items || []).map((i) => (
                      <div key={i.product_id} style={{ fontSize: 13 }}>{i.name} × {i.quantity}</div>
                    ))}
                  </td>
                  <td>₹{Number(o.subtotal).toFixed(0)}</td>
                  <td>
                    <select
                      className={`status-pill status-${o.status}`}
                      style={{ border: 'none' }}
                      value={o.status}
                      onChange={(e) => handleStatusChange(o.id, e.target.value)}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td style={{ fontSize: 12.5, color: 'var(--gray)' }}>
                    {new Date(o.created_at).toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
