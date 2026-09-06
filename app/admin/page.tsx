'use client';

import { useState } from 'react';

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === '197711') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Access denied.');
    }
  };

  const handleProductUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(`Product "${productName}" successfully added to store!`);
    setProductName('');
    setProductPrice('');
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f0f0f', color: '#fff', fontFamily: 'sans-serif' }}>
        <form onSubmit={handleLogin} style={{ background: '#1a1a1a', padding: '30px', borderRadius: '12px', width: '320px', border: '1px solid #333' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '20px', color: '#f3f4f6' }}>ADODO Owner Portal</h2>
          <input 
            type="password" 
            placeholder="Enter Admin Password" 
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '15px', background: '#262626', border: '1px solid #444', color: '#fff', borderRadius: '6px' }}
          />
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            Login
          </button>
          {error && <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '10px' }}>{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0f', color: '#fff', padding: '40px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>ADODO Collections Admin Dashboard</h1>
        
        <div style={{ background: '#1a1a1a', padding: '24px', borderRadius: '12px', marginBottom: '30px', border: '1px solid #333' }}>
          <h3 style={{ marginBottom: '15px', color: '#f3f4f6' }}>Upload New Product</h3>
          {successMsg && <p style={{ color: '#10b981', marginBottom: '15px' }}>{successMsg}</p>}
          <form onSubmit={handleProductUpload}>
            <input 
              type="text" 
              placeholder="Product Name" 
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#262626', border: '1px solid #444', color: '#fff', borderRadius: '6px' }}
              required
            />
            <input 
              type="text" 
              placeholder="Price (e.g., ₦15,000)" 
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#262626', border: '1px solid #444', color: '#fff', borderRadius: '6px' }}
              required
            />
            <button type="submit" style={{ padding: '10px 20px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
              Publish Product to Store
            </button>
          </form>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ background: '#1a1a1a', padding: '24px', borderRadius: '12px', border: '1px solid #333' }}>
            <h3 style={{ marginBottom: '15px', color: '#f3f4f6' }}>Customer Orders</h3>
            <p style={{ color: '#888', fontSize: '14px' }}>No orders recorded yet. Incoming orders will populate here automatically.</p>
          </div>
          <div style={{ background: '#1a1a1a', padding: '24px', borderRadius: '12px', border: '1px solid #333' }}>
            <h3 style={{ marginBottom: '15px', color: '#f3f4f6' }}>Registered Customer Accounts</h3>
            <p style={{ color: '#888', fontSize: '14px' }}>No registered customer records found yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
