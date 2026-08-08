const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

class ApiClientError extends Error {
  constructor(message, status, fields) {
    super(message);
    this.status = status;
    this.fields = fields || {};
  }
}

async function request(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (networkErr) {
    throw new ApiClientError('Could not reach the server. Please check your connection and try again.', 0);
  }

  let payload = null;
  try {
    payload = await res.json();
  } catch (_) {
    // no JSON body (e.g. plain 500 from a proxy) — fall through with generic message
  }

  if (!res.ok) {
    const message = payload?.error?.message || 'Something went wrong. Please try again.';
    throw new ApiClientError(message, res.status, payload?.error?.fields);
  }

  return payload;
}

export const api = {
  getProducts: () => request('/products'),
  createOrder: (order) => request('/orders', { method: 'POST', body: order }),
  adminLogin: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
  adminMe: (token) => request('/auth/me', { token }),
  adminListOrders: (token, status) => request(`/orders${status ? `?status=${status}` : ''}`, { token }),
  adminUpdateOrderStatus: (token, id, status) =>
    request(`/orders/${id}/status`, { method: 'PATCH', body: { status }, token }),
};

export { ApiClientError };
