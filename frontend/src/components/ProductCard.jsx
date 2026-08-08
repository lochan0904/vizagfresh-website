import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';

function ProductCard({ product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="juice-card">
      <div className="juice-top" />
      <div className="juice-body">
        <div className="juice-emoji">{product.image_emoji}</div>
        <h3>{product.name}</h3>
        <p className="ingredients">{product.ingredients}</p>
        <div className="juice-foot">
          <span className="juice-price">₹{Number(product.price).toFixed(0)}</span>
          {product.benefit_tag && <span className="juice-benefit">{product.benefit_tag}</span>}
        </div>
        <div className="qty-stepper" style={{ marginBottom: 12 }}>
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
          <span>{qty}</span>
          <button type="button" onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Increase quantity">+</button>
        </div>
        <button type="button" className="btn btn-primary btn-block btn-sm" onClick={handleAdd}>
          {added ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
