import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';

function RequireAdmin({ children }) {
  const { isAuthenticated } = useAdminAuth();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return children;
}

export default RequireAdmin;
