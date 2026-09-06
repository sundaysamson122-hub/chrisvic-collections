'use client';

import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  stock: number;
  image: string;
}

export default function StoreFront() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('adodo_admin_products');
      if (saved) {
        setProducts(JSON.parse(saved));
      } else {
        const initial: Product[] = [
          { id: '1', name: 'Rosewater Glow Set', price: '₦15,000', category: 'BEAUTY', stock: 35, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400' },
          { id: '2', name: 'Gold Bloom Drop Earrings', price: '₦8,500', category: 'JEWELRY', stock: 41, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400' },
        ];
        setProducts(initial);
        localStorage.setItem('adodo_admin_products', JSON.stringify(initial));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#0a080c', color: '#f3e8ff', fontFamily: 'sans-serif', padding: '20px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #1f1726', paddingBottom: '16px' }}>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: 0 }}>ADODO COLLECTIONS</h1>
            <p style={{ fontSize: '11px', color: '#a78bfa', margin: '2px 0 0 0', letterSpacing: '1px' }}>LUXURY STOREFRONT</p>
          </div>
          <a href="/admin" style={{ background: '#f59e0b', color: '#000', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', textDecoration: 'none' }}>Admin Portal 👑</a>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '20px' }}>
          <input 
            type="text" 
            placeholder="Search the collection..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', background: '#141018', border: '1px solid #2a2030', color: '#fff', borderRadius: '12px', fontSize: '14px', outline: 'none' }}
          />
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '24px' }}>
          {['ALL', 'WOMEN', 'BEAUTY', 'JEWELRY', 'ACCESSORIES', 'HOME'].map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{ background: selectedCategory === cat ? '#f59e0b' : '#141018', color: selectedCategory === cat ? '#000' : '#d1d5db', border: '1px solid #2a2030', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              {cat}
            </button>
          ))}
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginBottom: '16px' }}>Complete Collection</h2>

        {/* Product Grid */}
        {loading ? (
          <p style={{ textAlign: 'center', color: '#9ca3af', padding: '40px' }}>Loading collection...</p>
        ) : filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', background: '#141018', border: '1px solid #221929', padding: '40px', borderRadius: '16px' }}>
            <h3 style={{ fontSize: '16px', color: '#fff', marginBottom: '6px' }}>No products found.</h3>
            <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Try adjusting your search or add items via the admin portal.</p>
            <a href="/admin" style={{ color: '#f59e0b', fontWeight: 'bold', textDecoration: 'none', fontSize: '13px' }}>Go to Admin Portal →</a>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
            {filteredProducts.map(product => (
              <div key={product.id} style={{ background: '#141018', border: '1px solid #221929', borderRadius: '14px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '180px', width: '100%', background: '#1c1524', position: 'relative' }}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400';
                    }}
                  />
                  <span style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', color: '#a78bfa', fontSize: '9px', padding: '3px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
                    {product.category}
                  </span>
                </div>
                <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0', lineHeight: '1.3' }}>{product.name}</h3>
                    <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#f59e0b', margin: '0 0 8px 0' }}>{product.price}</p>
                  </div>
                  <div style={{ borderTop: '1px solid #1f1726', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: '#9ca3af' }}>Stock: {product.stock}</span>
                    <button 
                      onClick={() => alert(`Order placed for ${product.name}!`)}
                      style={{ background: '#f59e0b', color: '#000', border: 'none', padding: '5px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
