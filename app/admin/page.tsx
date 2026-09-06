'use client';

import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
}

interface Customer {
  name: string;
  email: string;
}

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const [isLocked, setIsLocked] = useState(false);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'catalog' | 'orders' | 'customers'>('dashboard');

  // Catalog State matching video
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Rosewater Glow Set', category: 'BEAUTY', stock: 35 },
    { id: '2', name: 'Gold Bloom Drop Earrings', category: 'JEWELRY', stock: 41 },
    { id: '3', name: 'Cloud Knit Ko--ord Set', category: 'WOMEN', stock: 18 },
    { id: '4', name: 'Satin Bow Mini Dress', category: 'WOMEN', stock: 24 },
    { id: '5', name: 'Everyday Canvas Tote', category: 'ACCESSORIES', stock: 29 },
    { id: '6', name: 'Ripple Glass Table Lamp', category: 'HOME', stock: 12 },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('WOMEN');
  const [newStock, setNewStock] = useState('20');

  // Customers & Orders Mock State
  const [customers] = useState<Customer[]>([
    { name: 'Sunday Samson', email: 'sundaysamson122@gmail.com' }
  ]);
  const [orders] = useState([]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;

    if (passwordInput === '197711') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('The Owner Portal password is incorrect or access is temporarily locked.');
      setIsLocked(true);
      setTimeout(() => setIsLocked(false), 3000);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    const newProd: Product = {
      id: Date.now().toString(),
      name: newName,
      category: newCategory.toUpperCase(),
      stock: parseInt(newStock) || 10
    };
    setProducts([newProd, ...products]);
    setNewName('');
    setShowAddModal(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remove "${name}" from the premium catalog?`)) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a080c', color: '#f3e8ff', fontFamily: 'sans-serif', padding: '20px' }}>
        <div style={{ background: '#141018', border: '1px solid #2a2030', borderRadius: '20px', padding: '36px 28px', width: '100%', maxWidth: '380px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
          <div style={{ width: '50px', height: '50px', background: '#221929', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #3d2d47' }}>
            <span style={{ fontSize: '20px' }}>👑</span>
          </div>
          <p style={{ fontSize: '11px', letterSpacing: '2px', color: '#a78bfa', marginBottom: '4px', fontWeight: 600 }}>ADODO COLLECTIONS</p>
          <h1 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>Owner Portal</h1>
          <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '24px', lineHeight: '1.4' }}>
            Enter the private management password to access products, customer accounts, and all store orders.
          </p>

          <form onSubmit={handleLogin}>
            <div style={{ textAlign: 'left', marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', color: '#d1d5db', display: 'block', marginBottom: '8px' }}>Owner password</label>
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••"
                style={{ width: '100%', padding: '14px 16px', background: '#1c1524', border: '1px solid #3b2d45', color: '#fff', borderRadius: '12px', fontSize: '16px', outline: 'none', letterSpacing: '2px' }}
              />
            </div>

            {error && (
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#fca5a5', padding: '10px 12px', borderRadius: '8px', fontSize: '12px', marginBottom: '16px', textAlign: 'left' }}>
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLocked}
              style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#000', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', marginBottom: '16px', opacity: isLocked ? 0.6 : 1 }}
            >
              Unlock Owner Portal →
            </button>
          </form>

          <a href="/" style={{ color: '#9ca3af', fontSize: '13px', textDecoration: 'none' }}>‹ Return to Store</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a080c', color: '#f3e8ff', fontFamily: 'sans-serif', paddingBottom: '80px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #1f1726' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: '#221929', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #3d2d47' }}>👑</div>
          <div>
            <h2 style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', margin: 0 }}>ADODO</h2>
            <p style={{ fontSize: '10px', color: '#a78bfa', margin: 0, letterSpacing: '1px' }}>COLLECTIONS</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={() => setIsAuthenticated(false)} style={{ background: '#1c1524', border: '1px solid #3b2d45', color: '#d1d5db', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>Lock</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ maxWidth: '800px', margin: '24px auto', padding: '0 16px' }}>
        <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#9ca3af', marginBottom: '4px' }}>COMMAND CENTER</p>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginBottom: '24px' }}>
          {activeTab === 'dashboard' && 'Dashboard Overview'}
          {activeTab === 'catalog' && 'Catalog Management'}
          {activeTab === 'orders' && 'Order Fulfillment'}
          {activeTab === 'customers' && 'Customer Accounts'}
        </h1>

        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              <div style={{ background: '#141018', border: '1px solid #221929', padding: '20px', borderRadius: '14px' }}>
                <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '8px' }}>CATALOG SIZE</p>
                <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{products.length}</h3>
              </div>
              <div style={{ background: '#141018', border: '1px solid #221929', padding: '20px', borderRadius: '14px' }}>
                <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '8px' }}>TOTAL VOLUME</p>
                <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{orders.length}</h3>
              </div>
              <div style={{ background: '#141018', border: '1px solid #221929', padding: '20px', borderRadius: '14px' }}>
                <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '8px' }}>ACTION REQUIRED</p>
                <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: 0 }}>0</h3>
              </div>
              <div style={{ background: '#141018', border: '1px solid #221929', padding: '20px', borderRadius: '14px' }}>
                <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '8px' }}>GROSS REVENUE</p>
                <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: 0 }}>₦0</h3>
              </div>
            </div>

            <div style={{ background: '#141018', border: '1px solid #221929', padding: '20px', borderRadius: '14px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#fff', marginBottom: '12px' }}>Recent Acquisitions</h3>
              <p style={{ color: '#71717a', fontSize: '13px', textAlign: 'center', padding: '20px 0' }}>No transaction activity recorded.</p>
            </div>
          </div>
        )}

        {/* TAB 2: CATALOG */}
        {activeTab === 'catalog' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>Catalog</h2>
              <button 
                onClick={() => setShowAddModal(true)}
                style={{ background: '#f59e0b', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}
              >
                + Add
              </button>
            </div>

            {showAddModal && (
              <div style={{ background: '#141018', border: '1px solid #3b2d45', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', color: '#fff' }}>Add New Product</h3>
                <form onSubmit={handleAddProduct}>
                  <input 
                    type="text" 
                    placeholder="Product Name" 
                    value={newName} 
                    onChange={e => setNewName(e.target.value)} 
                    style={{ width: '100%', padding: '10px', background: '#1c1524', border: '1px solid #3b2d45', color: '#fff', borderRadius: '8px', marginBottom: '10px', fontSize: '14px' }}
                    required
                  />
                  <select 
                    value={newCategory} 
                    onChange={e => setNewCategory(e.target.value)}
                    style={{ width: '100%', padding: '10px', background: '#1c1524', border: '1px solid #3b2d45', color: '#fff', borderRadius: '8px', marginBottom: '10px', fontSize: '14px' }}
                  >
                    <option value="WOMEN">WOMEN</option>
                    <option value="BEAUTY">BEAUTY</option>
                    <option value="JEWELRY">JEWELRY</option>
                    <option value="ACCESSORIES">ACCESSORIES</option>
                    <option value="HOME">HOME</option>
                  </select>
                  <input 
                    type="number" 
                    placeholder="Stock Units" 
                    value={newStock} 
                    onChange={e => setNewStock(e.target.value)} 
                    style={{ width: '100%', padding: '10px', background: '#1c1524', border: '1px solid #3b2d45', color: '#fff', borderRadius: '8px', marginBottom: '12px', fontSize: '14px' }}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="submit" style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Save Product</button>
                    <button type="button" onClick={() => setShowAddModal(false)} style={{ background: '#33273d', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
                  </div>
                </form>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {products.map(p => (
                <div key={p.id} style={{ background: '#141018', border: '1px solid #221929', padding: '14px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0' }}>{p.name}</h4>
                    <span style={{ fontSize: '10px', background: '#221929', color: '#a78bfa', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>{p.category}</span>
                    <span style={{ fontSize: '12px', color: '#9ca3af', marginLeft: '10px' }}>Stock: {p.stock} units</span>
                  </div>
                  <button 
                    onClick={() => handleDelete(p.id, p.name)}
                    style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '16px', padding: '8px' }}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS */}
        {activeTab === 'orders' && (
          <div style={{ background: '#141018', border: '1px solid #221929', padding: '40px 20px', borderRadius: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📦</div>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', marginBottom: '6px' }}>Queue is empty.</h3>
            <p style={{ color: '#71717a', fontSize: '13px' }}>Customer orders will appear here in real time as they checkout.</p>
          </div>
        )}

        {/* TAB 4: CUSTOMERS */}
        {activeTab === 'customers' && (
          <div>
            <div style={{ background: '#141018', border: '1px solid #221929', padding: '16px', borderRadius: '14px', marginBottom: '16px' }}>
              <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>ACCOUNT REGISTRY</p>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>{customers.length} registered customers</h3>
            </div>
            {customers.map((c, idx) => (
              <div key={idx} style={{ background: '#141018', border: '1px solid #221929', padding: '14px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', background: '#221929', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa', fontWeight: 'bold' }}>
                  {c.name.charAt(0)}
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', margin: '0 0 2px 0' }}>{c.name}</h4>
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>{c.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#110d16', borderTop: '1px solid #221929', display: 'flex', justifyContent: 'space-around', padding: '12px 0', zIndex: 100 }}>
        <button onClick={() => setActiveTab('dashboard')} style={{ background: 'transparent', border: 'none', color: activeTab === 'dashboard' ? '#f59e0b' : '#9ca3af', cursor: 'pointer', textAlign: 'center', fontSize: '11px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '18px' }}>📊</span> Dashboard
        </button>
        <button onClick={() => setActiveTab('catalog')} style={{ background: 'transparent', border: 'none', color: activeTab === 'catalog' ? '#f59e0b' : '#9ca3af', cursor: 'pointer', textAlign: 'center', fontSize: '11px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '18px' }}>🏷️</span> Catalog
        </button>
        <button onClick={() => setActiveTab('orders')} style={{ background: 'transparent', border: 'none', color: activeTab === 'orders' ? '#f59e0b' : '#9ca3af', cursor: 'pointer', textAlign: 'center', fontSize: '11px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '18px' }}>📦</span> Orders
        </button>
        <button onClick={() => setActiveTab('customers')} style={{ background: 'transparent', border: 'none', color: activeTab === 'customers' ? '#f59e0b' : '#9ca3af', cursor: 'pointer', textAlign: 'center', fontSize: '11px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '18px' }}>👥</span> Customers
        </button>
      </div>
    </div>
  );
      }
                       
