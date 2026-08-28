'use client';

import React, { useState, useEffect } from 'react';

const INITIAL_PRODUCTS = [
  { id: 1, title: 'Luxury Italian Leather Handbag', priceNGN: 25500, minOrder: 'Min. Order: 2 pcs', tag: 'Hot Seller', image: '👜' },
  { id: 2, title: 'Designer Platform Sneakers', priceNGN: 18000, minOrder: 'Min. Order: 3 pairs', tag: 'Direct Factory', image: '👟' },
  { id: 3, title: 'Vintage Gold Plated Jewelry Set', priceNGN: 12500, minOrder: 'Min. Order: 5 sets', tag: 'Trending', image: '💍' },
  { id: 4, title: 'Premium Chronograph Wristwatch', priceNGN: 32000, minOrder: 'Min. Order: 1 pc', tag: 'Best Quality', image: '⌚' },
];

const CATEGORIES = [
  { name: 'Bags', icon: '👜' }, { name: 'Shoes', icon: '👠' },
  { name: 'Jewelry', icon: '💎' }, { name: 'Watches', icon: '⌚' },
  { name: 'Apparel', icon: '👗' }, { name: 'Perfumes', icon: '✨' },
];

const CURRENCIES = {
  NGN: { symbol: '₦', rate: 1, label: 'Naira (NGN)' },
  USD: { symbol: '$', rate: 0.00065, label: 'USD ($)' },
  CNY: { symbol: '¥', rate: 0.0047, label: 'Chinese Yuan (CNY)' },
  XOF: { symbol: 'CFA ', rate: 0.39, label: 'Togo CFA (XOF)' },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [userName, setUserName] = useState('Chrisvic Wholesale Buyer');
  const [profileImage, setProfileImage] = useState(null);
  const [currency, setCurrency] = useState('NGN');
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Address & Contact Information State
  const [address, setAddress] = useState({
    fullName: '',
    whatsappNumber: '',
    callNumber: '',
    email: '',
    street: '',
    cityState: '',
  });

  useEffect(() => {
    const savedName = localStorage.getItem('chrisvic_userName');
    const savedImage = localStorage.getItem('chrisvic_profileImage');
    const savedAddress = localStorage.getItem('chrisvic_addressDetails');
    
    if (savedName) setUserName(savedName);
    if (savedImage) setProfileImage(savedImage);
    if (savedAddress) {
      try {
        setAddress(JSON.parse(savedAddress));
      } catch (e) {
        console.error("Failed to parse saved address", e);
      }
    }
  }, []);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setUserName(newName);
    localStorage.setItem('chrisvic_userName', newName);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem('chrisvic_profileImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBuyerSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('chrisvic_addressDetails', JSON.stringify(address));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const formatPrice = (priceNGN) => {
    const curr = CURRENCIES[currency];
    const converted = (priceNGN * curr.rate).toLocaleString(undefined, { maximumFractionDigits: currency === 'USD' ? 2 : 0 });
    return `${curr.symbol}${converted}`;
  };

  const filteredProducts = INITIAL_PRODUCTS.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div style={styles.container}>
      {/* Top Header */}
      <header style={styles.header}>
        <div style={styles.headerTop}>
          <span style={styles.logoText}>CHRISVIC</span>
          <span style={styles.badge}>Wholesale Hub</span>
        </div>
        <div style={styles.searchBar}>
          <span style={{ fontSize: '16px', marginRight: '6px' }}>🔍</span>
          <input
            type="text"
            placeholder="Search factory prices, bags, shoes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </header>

      {/* Main Container */}
      <main style={styles.mainContent}>
        {activeTab === 'home' && (
          <div>
            <div style={styles.banner}>
              <h2 style={{ margin: '0 0 6px 0', fontSize: '18px' }}>⚡ Direct Supplier Deals</h2>
              <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>Order directly via WhatsApp or Email for volume discounts.</p>
            </div>
            <h3 style={styles.sectionHeader}>Top Categories</h3>
            <div style={styles.categoryGrid}>
              {CATEGORIES.map((cat, idx) => (
                <div key={idx} style={styles.categoryCard}>
                  <span style={{ fontSize: '28px' }}>{cat.icon}</span>
                  <span style={styles.categoryName}>{cat.name}</span>
                </div>
              ))}
            </div>
            <h3 style={styles.sectionHeader}>Recommended Products</h3>
            <div style={styles.productGrid}>
              {filteredProducts.map((p) => (
                <div key={p.id} style={styles.productCard}>
                  <div style={styles.productImagePlaceholder}>{p.image}</div>
                  <div style={styles.productDetails}>
                    <span style={styles.tag}>{p.tag}</span>
                    <h4 style={styles.productTitle}>{p.title}</h4>
                    <p style={styles.productPrice}>{formatPrice(p.priceNGN)}</p>
                    <p style={styles.productMoq}>{p.minOrder}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'message' && (
          <div style={styles.tabSection}>
            <h2 style={styles.heading}>Messages & Support</h2>
            <p style={styles.subtext}>Choose how you would like to reach customer support:</p>
            <div style={styles.contactContainer}>
              <a href="https://wa.me/2349033494813?text=Hello%20Chrisvic%20Collections" target="_blank" rel="noopener noreferrer" style={styles.whatsappBtn}>
                💬 WhatsApp (+234 903 349 4813)
              </a>
              <a href="mailto:chrisviccollection@gmail.com" style={styles.emailBtn}>
                ✉️ Email (chrisviccollection@gmail.com)
              </a>
            </div>
          </div>
        )}

        {activeTab === 'cart' && (
          <div style={styles.tabSection}>
            <h2 style={styles.heading}>Your Shopping Cart</h2>
            <p style={styles.subtext}>Your cart is currently empty.</p>
          </div>
        )}

        {activeTab === 'me' && (
          <div>
            {/* User Profile Card */}
            <div style={styles.userCard}>
              <label style={styles.avatarLabel} title="Click to upload profile picture">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" style={styles.avatarImage} />
                ) : (
                  <div style={styles.avatarPlaceholder}>👤</div>
                )}
                <span style={styles.uploadBadge}>📷</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
              </label>

              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  value={userName}
                  onChange={handleNameChange}
                  placeholder="Enter your name"
                  style={styles.nameInput}
                />
                <span style={styles.userBadge}>Verified Account</span>
              </div>
            </div>

            {/* Orders Status Grid */}
            <div style={styles.cardSection}>
              <h4 style={styles.cardTitle}>My Orders</h4>
              <div style={styles.orderGrid}>
                {['To Pay', 'To Ship', 'To Receive', 'To Review', 'Refund'].map((item, idx) => (
                  <div key={idx} style={styles.orderItem}>
                    <span style={styles.orderIcon}>{['💳', '📦', '🚚', '💬', '🔄'][idx]}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <h3 style={styles.sectionHeader}>Buyer Settings</h3>

            {saveSuccess && (
              <div style={styles.successBanner}>
                ✅ Buyer settings saved successfully!
              </div>
            )}

            {/* Buyer Settings Form with Validation */}
            <form onSubmit={handleSaveBuyerSettings}>
              {/* Address & Contact Details */}
              <div style={styles.cardSection}>
                <h4 style={styles.cardTitle}>📍 Address & Contact Information</h4>
                <p style={styles.requiredNotice}>* All fields in this section are compulsory</p>
                <div style={styles.formGroup}>
                  <input
                    type="text"
                    placeholder="Full Name *"
                    required
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    style={styles.input}
                  />
                  <input
                    type="tel"
                    placeholder="WhatsApp Phone Number *"
                    required
                    value={address.whatsappNumber}
                    onChange={(e) => setAddress({ ...address, whatsappNumber: e.target.value })}
                    style={styles.input}
                  />
                  <input
                    type="tel"
                    placeholder="Call Phone Number *"
                    required
                    value={address.callNumber}
                    onChange={(e) => setAddress({ ...address, callNumber: e.target.value })}
                    style={styles.input}
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    required
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Street Address *"
                    required
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="City & State *"
                    required
                    value={address.cityState}
                    onChange={(e) => setAddress({ ...address, cityState: e.target.value })}
                    style={styles.input}
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div style={styles.cardSection}>
                <h4 style={styles.cardTitle}>💳 Payment Options</h4>
                <p style={styles.fieldLabel}>Preferred Payment Method:</p>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} style={styles.select}>
                  <option value="Bank Transfer">Bank Transfer / EFT</option>
                  <option value="Debit Card">Debit / Credit Card (Paystack/Flutterwave)</option>
                  <option value="Cash on Delivery">Cash on Delivery (Lagos Only)</option>
                  <option value="USDT">Crypto / USDT</option>
                </select>
              </div>

              {/* Region & Preferences */}
              <div style={styles.cardSection}>
                <h4 style={styles.cardTitle}>🌐 Region & Preferences</h4>
                <div style={styles.fieldRow}>
                  <span style={styles.fieldLabel}>Country / Region:</span>
                  <input type="text" value="Nigeria 🇳🇬" readOnly style={{ ...styles.input, backgroundColor: '#f0f0f0' }} />
                </div>
                <div style={styles.fieldRow}>
                  <span style={styles.fieldLabel}>Currency Display:</span>
                  <select value={currency} onChange={(e) => setCurrency(e.target.value)} style={styles.select}>
                    {Object.entries(CURRENCIES).map(([k, item]) => (
                      <option key={k} value={k}>{item.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" style={styles.saveBtn}>
                💾 Save Buyer Details
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav style={styles.navBar}>
        {[
          { key: 'home', label: 'Home', icon: '🏠' },
          { key: 'message', label: 'Message', icon: '💬' },
          { key: 'cart', label: 'Cart', icon: '🛒' },
          { key: 'me', label: 'Me', icon: '👤' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{ ...styles.navItem, color: activeTab === tab.key ? '#ff4d00' : '#666' }}
          >
            <span style={styles.icon}>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'sans-serif', backgroundColor: '#f4f5f7' },
  header: { position: 'sticky', top: 0, zIndex: 100, backgroundColor: '#ff4d00', padding: '12px 16px', color: '#fff' },
  headerTop: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' },
  logoText: { fontSize: '18px', fontWeight: '900' },
  badge: { backgroundColor: '#fff', color: '#ff4d00', fontSize: '10px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '10px' },
  searchBar: { display: 'flex', alignItems: 'center', backgroundColor: '#fff', borderRadius: '20px', padding: '6px 12px' },
  searchInput: { border: 'none', outline: 'none', width: '100%', fontSize: '13px' },
  mainContent: { flex: 1, padding: '12px', paddingBottom: '80px' },
  banner: { backgroundColor: '#ff4d00', color: '#fff', borderRadius: '12px', padding: '16px', marginBottom: '16px' },
  sectionHeader: { fontSize: '16px', fontWeight: 'bold', color: '#222', margin: '16px 0 10px 0' },
  categoryGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' },
  categoryCard: { backgroundColor: '#fff', borderRadius: '10px', padding: '12px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  categoryName: { fontSize: '12px', marginTop: '6px', fontWeight: '600', color: '#444' },
  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' },
  productCard: { backgroundColor: '#fff', borderRadius: '10px', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  productImagePlaceholder: { height: '110px', backgroundColor: '#fff0e6', display: 'grid', placeItems: 'center', fontSize: '48px' },
  productDetails: { padding: '10px', display: 'flex', flexDirection: 'column', flex: 1 },
  tag: { backgroundColor: '#fff1ec', color: '#ff4d00', fontSize: '10px', fontWeight: 'bold', padding: '2px 5px', borderRadius: '4px', alignSelf: 'flex-start', marginBottom: '4px' },
  productTitle: { fontSize: '12px', fontWeight: '600', color: '#333', margin: '0 0 6px 0', lineHeight: '1.3', height: '32px', overflow: 'hidden' },
  productPrice: { fontSize: '15px', fontWeight: '800', color: '#ff4d00', margin: '0 0 2px 0' },
  productMoq: { fontSize: '10px', color: '#888', margin: 0 },
  userCard: { backgroundColor: '#fff', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' },
  avatarLabel: { position: 'relative', cursor: 'pointer', display: 'inline-block' },
  avatarImage: { width: '54px', height: '54px', borderRadius: '50%', objectFit: 'cover' },
  avatarPlaceholder: { width: '54px', height: '54px', backgroundColor: '#fff0e6', borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: '26px' },
  uploadBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#ff4d00', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', display: 'grid', placeItems: 'center', color: '#fff' },
  nameInput: { fontSize: '16px', fontWeight: 'bold', color: '#222', border: 'none', borderBottom: '1px dashed #ccc', outline: 'none', width: '100%', padding: '2px 0', marginBottom: '4px', backgroundColor: 'transparent' },
  userBadge: { backgroundColor: '#e6f7ff', color: '#1890ff', fontSize: '10px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '8px' },
  cardSection: { backgroundColor: '#fff', borderRadius: '12px', padding: '14px', marginBottom: '12px' },
  cardTitle: { fontSize: '14px', fontWeight: 'bold', color: '#222', margin: '0 0 6px 0' },
  requiredNotice: { fontSize: '11px', color: '#ff4d00', margin: '0 0 12px 0', fontWeight: '600' },
  orderGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', textAlign: 'center' },
  orderItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '10px', color: '#555' },
  orderIcon: { fontSize: '20px', marginBottom: '4px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  fieldRow: { marginBottom: '10px' },
  fieldLabel: { fontSize: '12px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '4px' },
  input: { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '13px', boxSizing: 'border-box' },
  select: { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '13px', backgroundColor: '#fff', boxSizing: 'border-box' },
  saveBtn: { width: '100%', backgroundColor: '#ff4d00', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', marginTop: '6px' },
  successBanner: { backgroundColor: '#d4edda', color: '#155724', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', marginBottom: '12px', textAlign: 'center' },
  tabSection: { display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '30px', textAlign: 'center' },
  heading: { fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#111' },
  subtext: { fontSize: '13px', color: '#666', marginBottom: '20px' },
  contactContainer: { display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '320px' },
  whatsappBtn: { display: 'block', padding: '14px 20px', backgroundColor: '#25D366', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', textAlign: 'center' },
  emailBtn: { display: 'block', padding: '14px 20px', backgroundColor: '#0070f3', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', textAlign: 'center' },
  navBar: { position: 'fixed', bottom: 0, left: 0, right: 0, height: '56px', backgroundColor: '#fff', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 100 },
  navItem: { background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '11px', fontWeight: '600', cursor: 'pointer' },
  icon: { fontSize: '18px', marginBottom: '2px' },
};
