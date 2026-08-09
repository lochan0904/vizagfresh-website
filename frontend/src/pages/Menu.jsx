import { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { api } from '../api/client.js';

function Menu() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [category, setCategory] = useState('all');

  useEffect(() => {
    let cancelled = false;
    api
      .getProducts()
      .then((data) => {
        if (!cancelled) {
          const list = Array.isArray(data && data.products) ? data.products : [];
          setProducts(list);
          setStatus('ready');
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const seenSlugs = {};
    const list = [];
    for (let i = 0; i < products.length; i += 1) {
      const p = products[i];
      if (p && p.category_slug && !seenSlugs[p.category_slug]) {
        seenSlugs[p.category_slug] = true;
        list.push({ slug: p.category_slug, name: p.category_name });
      }
    }
    return list;
  }, [products]);

  const filtered =
    category === 'all' ? products : products.filter((p) => p && p.category_slug === category);

  return (
    <section className="section">
      <div className="wrap">
        <div className="center" style={{ maxWidth: 640, marginBottom: 8 }}>
          <span className="eyebrow">Our Menu</span>
          <h2 className="section-title">Signature Cold-Pressed Blends</h2>
          <p className="section-sub center">
            A short, focused menu so every bottle is fresh, consistent, and pressed the same morning you drink it.
          </p>
          <span className="hero-badge" style={{ display: 'inline-flex', marginBottom: 28 }}>
            🛵 Coming soon on Swiggy &amp; Zomato
          </span>
        </div>

        {status === 'error' && (
          <div className="banner-error">
            We couldn't load the menu right now. Please refresh the page in a moment.
          </div>
        )}

        {status === 'ready' && categories.length > 0 && (
          <div className="filter-row">
            <button
              type="button"
              className={`filter-chip ${category === 'all' ? 'active' : ''}`}
              onClick={() => setCategory('all')}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                type="button"
                className={`filter-chip ${category === c.slug ? 'active' : ''}`}
                onClick={() => setCategory(c.slug)}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}

        {status === 'loading' && <p style={{ color: 'var(--gray)' }}>Loading menu…</p>}

        {status === 'ready' && (
          <div className="menu-grid">
            {filtered
              .filter((product) => !!product)
              .map((product) => (
                <ProductCard key={product.id || product.slug} product={product} />
              ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Menu;