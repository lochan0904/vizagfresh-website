import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="error-page">
      <div className="error-code">404</div>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist or may have moved.</p>
      <Link className="btn btn-primary" to="/">Back to Home</Link>
    </div>
  );
}

export default NotFound;
