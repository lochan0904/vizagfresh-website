import { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'vizagfresh_cart_v1';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore storage errors (e.g. private browsing) */
    }
  }, [items]);

  const addItem = useCallback((product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product_id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product_id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        { product_id: product.id, name: product.name, price: Number(product.price), quantity },
      ];
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.product_id !== productId)
        : prev.map((i) => (i.product_id === productId ? { ...i, quantity } : i))
    );
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.product_id !== productId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);
  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const value = { items, addItem, updateQuantity, removeItem, clearCart, subtotal, itemCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
