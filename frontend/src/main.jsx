import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { AdminAuthProvider } from './context/AdminAuthContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <AdminAuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AdminAuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
