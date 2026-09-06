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

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const [isLocked, setIsLocked] = useState(false);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'catalog' | 'orders' | 'customers'>('dashboard');

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
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
  }, []);

  const saveProducts = (newProds: Product[]) => {
    setProducts(newProds);
    localStorage.setItem('adodo_admin_products', JSON.stringify(newProds));
  };

  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('WOMEN');
  const [newStock, setNewStock] = useState('20');
  const [newImage, setNewImage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;
    if (passwordInput === '197711') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Access denied.');
      setIsLocked(true);
      setTimeout(() => setIsLocked(false), 3000);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPrice) return;
    const newProd: Product = {
      id: Date.now().toString(),
      name: newName,
      price: newPrice.startsWith('₦') ? newPrice : `₦${newPrice}`,
      category: newCategory.toUpperCase(),
      stock: parseInt(newStock) || 10,
      image: newImage || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400'
    };
    saveProducts([newProd, ...products]);
    setNewName('');
    setNewPrice('');
    setNewImage('');
    setShowAddModal(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remove "${name}" from store?`)) {
      saveProducts(products.filter(p => p.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a080c', color: '#fff', fontFamily: 'sans-serif', padding: '20px' }}>
        <form onSubmit={handleLogin} style={{ background: '#141018', border: '1px solid #2a2030', borderRadius: '20px', padding: '30px', width: '100%', maxWidth: '360px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>Owner Portal</h2>
          <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '20px' }}>Enter password 197711 to manage store.</p>
          <input 
            type="password" 
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Owner Password"
            style={{ width: '100%', padding: '12px', background: '#1c1524', border: '1px solid #3b2d45', color: '#fff', borderRadius: '8px', marginBottom: '12px' }}
          />
          {error && <p style={{ color: '#ef4444', fontSize: '12px', marginBottom: '12px' }}>{error}</p>}
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#f59e0b', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Unlock Portal</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a080c', color: '#fff', fontFamily: 'sans-serif', paddingBottom: '80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: '1px solid #1f1726' }}>
        <h2 style={{ fontSize: '16px', margin: 0 }}>ADODO Admin Command Center</h2>
        <button onClick={() => setIsAuthenticated(false)} style={{ background: '#1c1524', border: '1px solid #3b2d45', color: '#fff', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>Lock</button>
      </div>

      <div style={{ maxWidth: '800px', margin: '20px auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '20px' }}>Catalog Management ({products.length} Products)</h1>
          <button onClick={() => setShowAddModal(true)} style={{ background: '#059669', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>+ Add New Product</button>
        </div>

        {showAddModal && (
          <div style={{ background: '#141018', border: '1px solid #3b2d45', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>Upload Product to Store</h3>
            <form onSubmit={handleAddProduct}>
              <input type="text" placeholder="Product Name (e.g., Luxury Silk Dress)" value={newName} onChange={e => setNewName(e.target.value)} style={{ width: '100%', padding: '10px', background: '#1c1524', border: '1px solid #3b2d45', color: '#fff', borderRadius: '8px', marginBottom: '10px' }} required />
              <input type="text" placeholder="Price (e.g., ₦25,000)" value={newPrice} onChange={e => setNewPrice(e.target.value)} style={{ width: '100%', padding: '10px', background: '#1c1524', border: '1px solid #3b2d45', color: '#fff', borderRadius: '8px', marginBottom: '10px' }} required />
              <select value={newCategory} onChange={e => setNewCategory(e.target.value)} style={{ width: '100%', padding: '10px', background: '#1c1524', border: '1px solid #3b2d45', color: '#fff', borderRadius: '8px', marginBottom: '10px' }}>
                <option value="WOMEN">WOMEN</option>
                <option value="BEAUTY">BEAUTY</option>
                <option value="JEWELRY">JEWELRY</option>
                <option value="ACCESSORIES">ACCESSORIES</option>
                <option value="HOME">HOME</option>
              </select>
              <input type="number" placeholder="Stock Units Left" value={newStock} onChange={e => setNewStock(e.target.value)} style={{ width: '100%', padding: '10px', background: '#1c1524', border: '1px solid #3b2d45', color: '#fff', borderRadius: '8px', marginBottom: '10px' }} required />
              <input type="text" placeholder="Photo Image URL (Paste link to image)" value={newImage} onChange={e => setNewImage(e.target.value)} style={{ width: '100%', padding: '10px', background: '#1c1524', border: '1px solid #3b2d45', color: '#fff', borderRadius: '8px', marginBottom: '15px' }} />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={{ background: '#059669', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Publish to Main Store</button>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ background: '#33273d', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {products.map(p => (
            <div key={p.id} style={{ background: '#141018', border: '1px solid #221929', padding: '14px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={p.image} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }} />
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0 0 4px 0' }}>{p.name}</h4>
                  <p style={{ fontSize: '13px', color: '#f59e0b', margin: '0 0 4px 0', fontWeight: 'bold' }}>{p.price}</p>
                  <span style={{ fontSize: '10px', background: '#221929', color: '#a78bfa', padding: '2px 6px', borderRadius: '4px' }}>{p.category}</span>
                  <span style={{ fontSize: '12px', color: '#9ca3af', marginLeft: '8px' }}>Stock: {p.stock} left</span>
                </div>
              </div>
              <button onClick={() => handleDelete(p.id, p.name)} style={{ background: 'transparent', border: 'none', color: '#ef4444', fontSize: '18px', cursor: 'pointer' }}>🗑️</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
