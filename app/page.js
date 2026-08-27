'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*');
      if (!error && data) setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const orderOnWhatsApp = (productName, price) => {
    const message = `Hello Chrisvic Collections, I would like to purchase: ${productName} (₦${price.toLocaleString()})`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0b0b0b', color: '#fff', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <header style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222' }}>
        <h1 style={{ color: '#d4af37', letterSpacing: '2px', margin: 0, fontSize: '1.5rem' }}>CHRISVIC COLLECTIONS</h1>
        <nav style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: '#ccc' }}>
          <span>Shop</span>
          <span>New Arrivals</span>
          <span>Contact</span>
        </nav>
      </header>

      {/* Hero Banner */}
      <section style={{ textAlign: 'center', padding: '4rem 1rem', background: 'linear-gradient(180deg, #141414 0%, #0b0b0b 100%)' }}>
        <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '0.5rem' }}>Elegance Defined</h2>
        <p style={{ color: '#aaa', fontSize: '1.1rem' }}>Discover high-end luxury fashion tailored for perfection.</p>
      </section>

      {/* Product Catalog Grid */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <h3 style={{ color: '#d4af37', borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '2rem' }}>Featured Catalog</h3>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#888' }}>Loading luxury collection...</p>
        ) : products.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>No products available yet. Add items in your Supabase dashboard!</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
            {products.map((item) => (
              <div key={item.id} style={{ background: '#141414', border: '1px solid #222', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '320px', objectFit: 'cover' }} />
                <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#fff' }}>{item.title}</h4>
                  <p style={{ color: '#888', fontSize: '0.85rem', flexGrow: 1 }}>{item.description}</p>
                  <div style={{ margin: '1rem 0 0.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1.2rem' }}>₦{Number(item.price).toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => orderOnWhatsApp(item.title, item.price)}
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: '#d4af37', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem' }}
                  >
                    Order on WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
      }
        
