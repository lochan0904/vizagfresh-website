import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext.jsx';
import { api } from '../../api/client.js';

const schema = yup.object({
  email: yup.string().trim().email('Enter a valid email.').required('Enter your email.'),
  password: yup.string().min(6, 'Password must be at least 6 characters.').required('Enter your password.'),
});

function AdminLogin() {
  const { isAuthenticated, login } = useAdminAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const onSubmit = async ({ email, password }) => {
    setServerError('');
    setSubmitting(true);
    try {
      const { token, admin } = await api.adminLogin(email, password);
      login(token, admin);
      navigate('/admin');
    } catch (err) {
      setServerError(err.message || 'Login failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-shell">
      <div className="admin-login-box">
        <h2 className="section-title" style={{ marginBottom: 6 }}>Admin Login</h2>
        <p style={{ color: 'var(--gray)', marginBottom: 20, fontSize: 14 }}>
          Sign in to view and manage VizagFresh orders.
        </p>

        {serverError && <div className="banner-error">{serverError}</div>}

        <form className="form-grid" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" {...register('email')} placeholder="admin@vizagfresh.in" />
            {errors.email && <div className="field-error">{errors.email.message}</div>}
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" {...register('password')} placeholder="••••••••" />
            {errors.password && <div className="field-error">{errors.password.message}</div>}
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? 'Signing In…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
