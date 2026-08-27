'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      region: 'Ikorodu, Lagos state, Nigeria',
      street: 'RVJ HOTEL Itele, Maya Ikorodu Lagos State Nigeria.',
      name: 'SLIM DADDY',
      phone: '+234-8168940939',
      isDefault: true,
    },
    {
      id: 2,
      region: 'Ikeja, Lagos state, Nigeria',
      street: '11 14th Unity Estate Maya Ikorodu Lagos',
      name: 'SUNDAY SAMSON ELUU',
      phone: '+234-8168940939',
      isDefault: false,
    },
  ]);

  const [newAddress, setNewAddress] = useState({
    region: 'Lagos State, Nigeria',
    street: '',
    name: '',
    phone: '',
    zipCode: '',
    isDefault: false,
  });

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*');
      if (!error && data) setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, selected: true }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const toggleSelect = (id) => {
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)));
  };

  const toggleSelectAll = () => {
    const allSelected = cart.every((item) => item.selected);
    setCart((prev) => prev.map((item) => ({ ...item, selected: !allSelected })));
  };

  const totalPrice = cart.filter((i) => i.selected).reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleCheckout = () => {
    const selected = cart.filter((i) => i.selected);
    if (selected.length === 0) return;
    let msg = 'Hello Chrisvic Collections, I would like to order:\n\n';
    selected.forEach((i) => { msg += `• ${i.title} (x${i.quantity}) - ₦${(i.price * i.quantity).toLocaleString()}\n`; });
    msg += `\nTotal: ₦${totalPrice.toLocaleString()}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!newAddress.street || !newAddress.name || !newAddress.phone) return;
    const entry = { id: Date.now(), ...newAddress };
    if (newAddress.isDefault) {
      setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: false })));
    }
    setAddresses((prev) => [...prev, entry]);
    setNewAddress({ region: 'Lagos State, Nigeria', street: '', name: '', phone: '', zipCode: '', isDefault: false });
    setActiveTab('addresses');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f4', color: '#333', fontFamily: 'sans-serif', paddingBottom: '100px' }}>
      
      {/* HOME TAB */}
      {activeTab === 'home' && (
        <div style={{ padding: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', padding: '0.5rem', fontWeight: 'bold', backgroundColor: '#fff' }}>
            <span style={{ borderBottom: '3px solid #ff4d00', color: '#000' }}>Rec.</span>
            <span style={{ color: '#666' }}>Factory</span>
          </div>
          <h3 style={{ fontSize: '1rem', margin: '0.8rem 0' }}>Recommended Products</h3>
          {loading ? <p>Loading...</p> : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {products.map((item) => (
                <div key={item.id} style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '0.5rem' }}>
                  <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginTop: '0.3rem' }}>{item.title}</div>
                  <div style={{ color: '#ff4d00', fontWeight: 'bold', margin: '0.2rem 0' }}>₦{Number(item.price).toLocaleString()}</div>
                  <button onClick={() => addToCart(item)} style={{ width: '100%', backgroundColor: '#ff4d00', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.3rem', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>+ Add to Cart</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CART TAB */}
      {activeTab === 'cart' && (
        <div style={{ padding: '0.5rem' }}>
          <div style={{ backgroundColor: '#fff', padding: '0.8rem', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
            <span>Cart</span>
            <span onClick={() => setActiveTab('addresses')} style={{ fontSize: '0.8rem', color: '#666', cursor: 'pointer' }}>📍 Manage Address &gt;</span>
          </div>
          {cart.length === 0 ? <p style={{ textAlign: 'center', padding: '2rem' }}>Your cart is empty.</p> : (
            cart.map((item) => (
              <div key={item.id} style={{ backgroundColor: '#fff', padding: '0.8rem', marginTop: '0.5rem', borderRadius: '8px', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <input type="checkbox" checked={item.selected} onChange={() => toggleSelect(item.id)} style={{ accentColor: '#ff4d00' }} />
                <img src={item.image_url} alt={item.title} style={{ width: '60px', height: '60px', borderRadius: '6px', objectFit: 'cover' }} />
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{item.title}</div>
                  <div style={{ color: '#ff4d00', fontWeight: 'bold' }}>₦{Number(item.price).toLocaleString()}</div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem' }}>
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
              </div>
            ))
          )}
          {cart.length > 0 && (
            <div style={{ position: 'fixed', bottom: '60px', left: 0, right: 0, backgroundColor: '#fff', padding: '0.8rem', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #ddd' }}>
              <label><input type="checkbox" checked={cart.every((i) => i.selected)} onChange={toggleSelectAll} /> Select All</label>
              <div>
                <span style={{ color: '#ff4d00', fontWeight: 'bold', marginRight: '0.8rem' }}>₦{totalPrice.toLocaleString()}</span>
                <button onClick={handleCheckout} style={{ backgroundColor: '#ff4d00', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 'bold' }}>Checkout</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ME TAB */}
      {activeTab === 'me' && (
        <div style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>👤 Chrisvic_Customer</h3>
            <span onClick={() => setActiveTab('settings')} style={{ fontSize: '1.5rem', cursor: 'pointer' }}>⚙️</span>
          </div>
        </div>
      )}

      {/* SETTINGS */}
      {activeTab === 'settings' && (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', padding: '1rem' }}>
          <span onClick={() => setActiveTab('me')} style={{ fontSize: '1.2rem', cursor: 'pointer' }}>⟨ Back</span>
          <h3 style={{ marginTop: '1rem' }}>Buyer Settings</h3>
          <div onClick={() => setActiveTab('addresses')} style={{ padding: '1rem 0', borderBottom: '1px solid #eee', color: '#ff4d00', fontWeight: 'bold', cursor: 'pointer' }}>
            📍 Address Management &gt;
          </div>
        </div>
      )}

      {/* ADDRESSES LIST */}
      {activeTab === 'addresses' && (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', padding: '1rem' }}>
          <span onClick={() => setActiveTab('settings')} style={{ fontSize: '1.2rem', cursor: 'pointer' }}>⟨ Back</span>
          <h3>Address Management</h3>
          {addresses.map((item) => (
            <div key={item.id} style={{ borderBottom: '1px solid #eee', padding: '0.8rem 0' }}>
              <div style={{ color: '#888', fontSize: '0.8rem' }}>{item.region}</div>
              <div style={{ fontWeight: 'bold', margin: '0.2rem 0' }}>{item.street}</div>
              <div style={{ fontSize: '0.85rem' }}>
                {item.name} {item.phone} {item.isDefault && <span style={{ color: '#ff4d00', border: '1px solid #ff4d00', padding: '0 4px', fontSize: '0.7rem' }}>默认</span>}
              </div>
            </div>
          ))}
          <button onClick={() => setActiveTab('add_address')} style={{ width: '100%', backgroundColor: '#ff4d00', color: '#fff', border: 'none', padding: '0.8rem', borderRadius: '25px', fontWeight: 'bold', marginTop: '1.5rem', cursor: 'pointer' }}>
            New Receiving Address
          </button>
        </div>
      )}

      {/* ADD ADDRESS FORM */}
      {activeTab === 'add_address' && (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', padding: '1rem' }}>
          <span onClick={() => setActiveTab('addresses')} style={{ fontSize: '1.2rem', cursor: 'pointer' }}>⟨ Back</span>
          <h3>New Receiving Address</h3>
          <form onSubmit={handleSaveAddress}>
            <div style={{ margin: '0.8rem 0' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Detailed Address</label>
              <input type="text" required placeholder="Detailed Address" value={newAddress.street} onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })} style={{ width: '100%', padding: '0.5rem', marginTop: '0.2rem' }} />
            </div>
            <div style={{ margin: '0.8rem 0' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Name</label>
              <input type="text" required placeholder="Name" value={newAddress.name} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} style={{ width: '100%', padding: '0.5rem', marginTop: '0.2rem' }} />
            </div>
            <div style={{ margin: '0.8rem 0' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Phone</label>
              <input type="text" required placeholder="Phone Number" value={newAddress.phone} onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })} style={{ width: '100%', padding: '0.5rem', marginTop: '0.2rem' }} />
            </div>
            <div style={{ margin: '0.8rem 0' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Zip Code</label>
              <input type="text" placeholder="Zip Code" value={newAddress.zipCode} onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })} style={{ width: '100%', padding: '0.5rem', marginTop: '0.2rem' }} />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '1rem 0' }}>
              <input type="checkbox" checked={newAddress.isDefault} onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })} />
              Set as default address
            </label>
            <button type="submit" style={{ width: '100%', backgroundColor: '#ff4d00', color: '#fff', border: 'none', padding: '0.8rem', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer' }}>
              Save
            </button>
          </form>
        </div>
      )}

      {/* BOTTOM NAV */}
      {!['settings', 'addresses', 'add_address'].includes(activeTab) && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '60px', backgroundColor: '#fff', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'space-around', alignItems: 'center', fontSize: '0.75rem' }}>
          <div onClick={() => setActiveTab('home')} style={{ color: activeTab === 'home' ? '#ff4d00' : '#666', cursor: 'pointer' }}>🏠 Home</div>
          <div onClick={() => setActiveTab('cart')} style={{ color: activeTab === 'cart' ? '#ff4d00' : '#666', cursor: 'pointer' }}>🛒 Cart ({cart.length})</div>
          <div onClick={() => setActiveTab('me')} style={{ color: activeTab === 'me' ? '#ff4d00' : '#666', cursor: 'pointer' }}>👤 Me</div>
        </div>
      )}

    </div>
  );
}
