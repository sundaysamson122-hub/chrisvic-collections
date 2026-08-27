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
    const message = `Hello Chrisvic Collections, I want to order: ${productName} (₦${price.toLocaleString()})`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f4', color: '#333', fontFamily: 'sans-serif', paddingBottom: '70px' }}>
      
      {/* Top Tabs */}
      <div style={{ display: 'flex', gap: '1.5rem', padding: '0.8rem 1rem 0.4rem', fontWeight: 'bold', fontSize: '1.1rem', backgroundColor: '#fff' }}>
        <span style={{ borderBottom: '3px solid #ff4d00', color: '#000', paddingBottom: '2px' }}>Rec.</span>
        <span style={{ color: '#666' }}>Factory</span>
        <span style={{ color: '#666' }}>Industrial</span>
      </div>

      {/* Search Bar */}
      <div style={{ padding: '0.5rem 1rem 1rem', backgroundColor: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f0f0f0', border: '2px solid #ff4d00', borderRadius: '25px', padding: '0.3rem 0.5rem 0.3rem 1rem' }}>
          <input type="text" placeholder="Search Chrisvic Collections..." style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.9rem' }} />
          <button style={{ backgroundColor: '#ff4d00', color: '#fff', border: 'none', borderRadius: '20px', padding: '0.4rem 1.2rem', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer' }}>GO</button>
        </div>
      </div>

      {/* Quick Category Icons */}
      <div style={{ display: 'flex', justifyContent: 'space-around', backgroundColor: '#fff', padding: '0.8rem 0', marginBottom: '0.5rem', textAlign: 'center', fontSize: '0.75rem', color: '#555' }}>
        <div><div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ffebe6', color: '#ff4d00', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.3rem', fontWeight: 'bold' }}>★</div>New Arrival</div>
        <div><div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#f0e6ff', color: '#7a00ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.3rem', fontWeight: 'bold' }}>🛍</div>Factory</div>
        <div><div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fff0e6', color: '#ff6600', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.3rem', fontWeight: 'bold' }}>📷</div>Photo Search</div>
        <div><div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e6f7ff', color: '#0099ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.3rem', fontWeight: 'bold' }}>🚚</div>Express</div>
      </div>

      {/* Promo Highlight Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', padding: '0 0.5rem 0.5rem' }}>
        <div style={{ backgroundColor: '#fff', padding: '0.8rem', borderRadius: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Selection</span>
            <span style={{ backgroundColor: '#ff4d00', color: '#fff', fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: '8px' }}>sale</span>
          </div>
          <div style={{ color: '#ff4d00', fontWeight: 'bold', fontSize: '0.9rem' }}>Hot Discount</div>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '0.8rem', borderRadius: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Super Deals</span>
            <span style={{ backgroundColor: '#ff0000', color: '#fff', fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: '8px' }}>Hot</span>
          </div>
          <div style={{ color: '#ff4d00', fontWeight: 'bold', fontSize: '0.9rem' }}>Exclusive Offer</div>
        </div>
      </div>

      {/* Main 2-Column Product Grid */}
      <div style={{ padding: '0 0.5rem' }}>
        <h3 style={{ fontSize: '1rem', margin: '0.5rem 0', paddingLeft: '0.2rem' }}>Recommended Products</h3>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#888', padding: '2rem 0' }}>Loading store catalog...</p>
        ) : products.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888', padding: '2rem 0' }}>No products found. Add items to your Supabase table!</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {products.map((item) => (
              <div key={item.id} style={{ backgroundColor: '#fff', borderRadius: '10px', overflow: 'hidden', border: '1px solid #eee' }}>
                <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                <div style={{ padding: '0.6rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 'bold', height: '2.4em', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {item.title}
                  </div>
                  <div style={{ color: '#ff4d00', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '0.3rem' }}>
                    ₦{Number(item.price).toLocaleString()}
                  </div>
                  <button
                    onClick={() => orderOnWhatsApp(item.title, item.price)}
                    style={{ marginTop: '0.5rem', width: '100%', backgroundColor: '#ff4d00', color: '#fff', border: 'none', borderRadius: '5px', padding: '0.4rem', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Buy via WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Sticky Navigation */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '60px', backgroundColor: '#fff', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'space-around', alignItems: 'center', fontSize: '0.75rem', color: '#666' }}>
        <div style={{ textAlign: 'center', color: '#ff4d00' }}>
          <div style={{ fontSize: '1.2rem' }}>🏠</div>
          <span>Home</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem' }}>💬</div>
          <span>Message</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem' }}>🛒</div>
          <span>Cart</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem' }}>👤</div>
          <span>Me</span>
        </div>
      </div>

    </div>
  );
        }
