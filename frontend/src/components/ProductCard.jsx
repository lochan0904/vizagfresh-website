import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';

function decreaseQty(current) {
  const next = current - 1;
  return next < 1 ? 1 : next;
}

function increaseQty(current) {
  const next = current + 1;
  return next > 20 ? 20 : next;
}

function ProductCard({ product }) {
  const cart = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const name = product.name || '';
  const emoji = product.image_emoji || '🥤';
  const ingredients = product.ingredients || '';
  const benefitTag = product.benefit_tag || '';
  const priceNumber = Number(product.price);
  const priceLabel = Number.isFinite(priceNumber) ? priceNumber.toFixed(0) : '0';

  function handleDecrease() {
    setQty(function (current) {
      return decreaseQty(current);
    });
  }

  function handleIncrease() {
    setQty(function (current) {
      return increaseQty(current);
    });
  }

  function handleAdd() {
    if (cart && typeof cart.addItem === 'function') {
      cart.addItem(product, qty);
    }
    setAdded(true);
    setTimeout(function () {
      setAdded(false);
    }, 1500);
  }

  return (
    <div className="juice-card">
      <div className="juice-top"></div>
      <div className="juice-body">
        <div className="juice-emoji">{emoji}</div>
        <h3>{name}</h3>
        <p className="ingredients">{ingredients}</p>
        <div className="juice-foot">
          <span className="juice-price">{'₹'}{priceLabel}</span>
          {benefitTag ? <span className="juice-benefit">{benefitTag}</span> : null}
        </div>
        <div className="qty-stepper" style={{ marginBottom: 12 }}>
          <button type="button" onClick={handleDecrease} aria-label="Decrease quantity">
            -
          </button>
          <span>{qty}</span>
          <button type="button" onClick={handleIncrease} aria-label="Increase quantity">
            +
          </button>
        </div>
        <button type="button" className="btn btn-primary btn-block btn-sm" onClick={handleAdd}>
          {added ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;