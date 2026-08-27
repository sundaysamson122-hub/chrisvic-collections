'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'message' | 'cart' | 'me' | 'settings' | 'addresses' | 'add_address'
  const [cart, setCart] = useState([]);

  // Address State
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

  // Form State
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
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const toggleSelectAll = () => {
    const allSelected = cart.every((item) => item.selected);
    setCart((prev) => prev.map((item) => ({ ...item, selected: !allSelected })));
  };

  const totalPrice = cart
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const selectedItems = cart.filter((item) => item.selected);
    if (selectedItems.length === 0) return;

    let message = 'Hello Chrisvic Collections, I would like to place an order for:\n\n';
    selectedItems.forEach((item) => {
      message += `• ${item.title} (x${item.quantity}) - ₦${(item.price * item.quantity).toLocaleString()}\n`;
    });
    message += `\nTotal Amount: ₦${totalPrice.toLocaleString()}`;

    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!newAddress.street || !newAddress.name || !newAddress.phone) return;

    const entry = {
      id: Date.now(),
      region: newAddress.region,
      street: newAddress.street,
      name: newAddress.name,
      phone: newAddress.phone,
      isDefault: newAddress.isDefault,
    };

    if (newAddress.isDefault) {
      setAddresses((prev) => prev.map((addr) => ({ ...addr, isDefault: false })));
    }

    setAddresses((prev) => [...prev, entry]);
    setNewAddress({ region: 'Lagos State, Nigeria', street: '', name: '', phone: '', zipCode: '', isDefault: false });
    setActiveTab('addresses');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f4', color: '#333', fontFamily: 'sans-serif', paddingBottom: ['settings', 'addresses', 'add_address'].includes(activeTab) ? '20px' : '120px' }}>

      {/* ==================== HOME TAB ==================== */}
      {activeTab === 'home' && (
        <>
          <div style={{ display: 'flex', gap: '1.5rem', padding: '0.8rem 1rem 0.4rem', fontWeight: 'bold', fontSize: '1.1rem', backgroundColor: '#fff' }}>
            <span style={{ borderBottom: '3px solid #ff4d00', color: '#000', paddingBottom: '2px' }}>Rec.</span>
            <span style={{ color: '#666' }}>Factory</span>
            <span style={{ color: '#666' }}>Industrial</span>
          </div>

          <div style={{ padding: '0.5rem 1rem 1rem', backgroundColor: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f0f0f0', border: '2px solid #ff4d00', borderRadius: '25px', padding: '0.3rem 0.5rem 0.3rem 1rem' }}>
              <input type="text" placeholder="Search Chrisvic Collections..." style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.9rem' }} />
              <button style={{ backgroundColor: '#ff4d00', color: '#fff', border: 'none', borderRadius: '20px', padding: '0.4rem 1.2rem', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer' }}>GO</button>
            </div>
          </div>

          <div style={{ padding: '0 0.5rem' }}>
            <h3 style={{ fontSize: '1rem', margin: '0.5rem 0', paddingLeft: '0.2rem' }}>Recommended Products</h3>

            {loading ? (
              <p style={{ textAlign: 'center', color: '#888', padding: '2rem 0' }}>Loading store catalog...</p>
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
                        onClick={() => addToCart(item)}
                        style={{ marginTop: '0.5rem', width: '100%', backgroundColor: '#ff4d00', color: '#fff', border: 'none', borderRadius: '5px', padding: '0.4rem', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}
                      >
                        + Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* ==================== CART TAB ==================== */}
      {activeTab === 'cart' && (
        <div>
          <div style={{ backgroundColor: '#fff', padding: '0.8rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>Cart</span>
              <span onClick={() => setActiveTab('addresses')} style={{ fontSize: '0.8rem', color: '#666', cursor: 'pointer' }}>📍 Ikorodu, Lagos... &gt;</span>
            </div>
            <div style={{ color: '#333', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer' }}>Manage</div>
          </div>

          <div style={{ backgroundColor: '#fff', display: 'flex', gap: '1.5rem', padding: '0.5rem 1rem', borderBottom: '1px solid #eee', fontSize: '0.9rem', color: '#555' }}>
            <span style={{ fontWeight: 'bold', color: '#000', borderBottom: '2px solid #ff4d00', paddingBottom: '2px' }}>In Stock {cart.length}</span>
            <span>Dropshipping</span>
            <span>Regulars List</span>
          </div>

          <div style={{ padding: '0.5rem' }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#888' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🛒</div>
                <p>Your cart is empty.</p>
                <button onClick={() => setActiveTab('home')} style={{ backgroundColor: '#ff4d00', color: '#fff', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '20px', fontWeight: 'bold', marginTop: '0.5rem', cursor: 'pointer' }}>Shop Now</button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '0.8rem', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem', fontSize: '0.85rem', fontWeight: 'bold' }}>
                    <input type="checkbox" checked={item.selected} onChange={() => toggleSelect(item.id)} style={{ accentColor: '#ff4d00', width: '18px', height: '18px' }} />
                    <span>🏪 Chrisvic Store Official &gt;</span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.8rem' }}>
                    <img src={item.image_url} alt={item.title} style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#222' }}>{item.title}</div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
                        <span style={{ color: '#ff4d00', fontWeight: 'bold', fontSize: '1rem' }}>₦{Number(item.price).toLocaleString()}</span>
                        
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px' }}>
                          <button onClick={() => updateQuantity(item.id, -1)} style={{ border: 'none', background: '#f5f5f5', padding: '0.2rem 0.6rem', cursor: 'pointer' }}>-</button>
                          <span style={{ padding: '0 0.6rem', fontSize: '0.85rem' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} style={{ border: 'none', background: '#f5f5f5', padding: '0.2rem 0.6rem', cursor: 'pointer' }}>+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div style={{ position: 'fixed', bottom: '60px', left: 0, right: 0, backgroundColor: '#fff', borderTop: '1px solid #eee', padding: '0.8rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 999 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={cart.length > 0 && cart.every((i) => i.selected)} onChange={toggleSelectAll} style={{ accentColor: '#ff4d00', width: '18px', height: '18px' }} />
                Select All
              </label>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.85rem', color: '#555' }}>Total: </span>
                  <span style={{ color: '#ff4d00', fontWeight: 'bold', fontSize: '1.1rem' }}>₦{totalPrice.toLocaleString()}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  style={{ backgroundColor: '#ff4d00', color: '#fff', border: 'none', borderRadius: '25px', padding: '0.6rem 1.5rem', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer' }}
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================== ME TAB ==================== */}
      {activeTab === 'me' && (
        <div style={{ padding: '0.8rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0.5rem 0.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#ffebd9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🐮</div>
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Chrisvic_Customer</span>
            </div>
            <div onClick={() => setActiveTab('settings')} style={{ fontSize: '1.4rem', cursor: 'pointer', color: '#555' }}>⚙️</div>
          </div>

          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1rem', marginBottom: '0.8rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>My Orders</span>
              <span style={{ color: '#888', fontSize: '0.85rem' }}>All &gt;</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center', fontSize: '0.75rem', color: '#444' }}>
              <div><div style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>💳</div>To Pay</div>
              <div><div style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>📦</div>To Ship</div>
              <div><div style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>🚚</div>To Receive</div>
              <div><div style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>💬</div>To Review</div>
              <div><div style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>🔄</div>Refund</div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== BUYER SETTINGS PAGE ==================== */}
      {activeTab === 'settings' && (
        <div style={{ backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
          <div style={{ backgroundColor: '#fff', padding: '0.8rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', position: 'sticky', top: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span onClick={() => setActiveTab('me')} style={{ fontSize: '1.4rem', cursor: 'pointer', fontWeight: 'bold' }}>⟨</span>
              <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Buyer settings</span>
            </div>
            <span style={{ fontSize: '1.2rem', color: '#666', cursor: 'pointer' }}>•••</span>
          </div>

          <div style={{ backgroundColor: '#fff', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.9rem 1rem', borderBottom: '1px solid #f0f0f0', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ color: '#777' }}>🔄</span>
                <span>Account Switch</span>
              </div>
              <div style={{ color: '#888', fontSize: '0.85rem' }}>&gt;</div>
            </div>

            <div onClick={() => setActiveTab('addresses')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.9rem 1rem', borderBottom: '1px solid #f0f0f0', fontSize: '0.9rem', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ color: '#777' }}>📍</span>
                <span style={{ fontWeight: 'bold', color: '#ff4d00' }}>Address Management</span>
              </div>
              <div style={{ color: '#888', fontSize: '0.85rem' }}>&gt;</div>
            </div>

            {[
              { label: 'Account & Security', icon: '🔒' },
              { label: 'Payment Settings', icon: '💳' },
              { label: 'Country/Region', detail: 'Global', icon: '🌐' },
              { label: 'Language', detail: 'English', icon: '🌐' },
              { label: 'Currency', detail: 'NGN:₦', icon: '₦' },
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.9rem 1rem', borderBottom: '1px solid #f0f0f0', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: '#777' }}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                <div style={{ color: '#888', fontSize: '0.85rem' }}>
                  {item.detail && <span style={{ marginRight: '0.5rem' }}>{item.detail}</span>}
                  &gt;
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== ADDRESS LIST SCREEN ==================== */}
      {activeTab === 'addresses' && (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ padding: '0.8rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span onClick={() => setActiveTab('settings')} style={{ fontSize: '1.4rem', cursor: 'pointer', fontWeight: 'bold' }}>⟨</span>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Address</span>
              </div>
              <span style={{ color: '#ff4d00', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer' }}>⚙ Manage</span>
            </div>

            <div style={{ padding: '1rem' }}>
              {addresses.map((item) => (
                <div key={item.id} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '1rem', marginBottom: '1rem' }}>
                  <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '0.3rem' }}>{item.region}</div>
                  <div style={{ fontWeight: 'bold', fontSize: '0.95rem', color: '#111', marginBottom: '0.4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{item.street}</span>
                    <span style={{ color: '#888', fontSize: '1rem', cursor: 'pointer' }}>✏️</span>
                  </div>
                  <div style={{ color: '#555', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>{item.name} {item.phone}</span>
                    {item.isDefault && (
                      <span style={{ backgroundColor: '#ffebe6', color: '#ff4d00', fontSize: '0.65rem', padding: '0.1rem 0.3rem', borderRadius: '3px', border: '1px solid #ff4d00' }}>
                        Default
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: '1rem', position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#fff' }}>
            <button
              onClick={() => setActiveTab('add_address')}
              style={{ width: '100%', backgroundColor: '#ff4d00', color: '#fff', border: 'none', borderRadius: '25px', padding: '0.8rem', fontWeight: 'bold', fontSize: '1rem', 
