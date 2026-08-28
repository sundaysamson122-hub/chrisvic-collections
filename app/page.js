'use client';

import React, { useState } from 'react';

const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: 'Luxury Italian Leather Handbag - Wholesale Quality',
    priceNGN: 25500,
    minOrder: 'Min. Order: 2 pcs',
    tag: 'Hot Seller',
    image: '👜',
  },
  {
    id: 2,
    title: 'Designer Platform Sneakers - Unisex Streetwear',
    priceNGN: 18000,
    minOrder: 'Min. Order: 3 pairs',
    tag: 'Direct Factory',
    image: '👟',
  },
  {
    id: 3,
    title: 'Vintage Gold Plated Jewelry Set (Necklace + Earrings)',
    priceNGN: 12500,
    minOrder: 'Min. Order: 5 sets',
    tag: 'Trending',
    image: '💍',
  },
  {
    id: 4,
    title: 'Premium Chronograph Men’s Wristwatch',
    priceNGN: 32000,
    minOrder: 'Min. Order: 1 pc',
    tag: 'Best Quality',
    image: '⌚',
  },
];

const CATEGORIES = [
  { name: 'Bags', icon: '👜' },
  { name: 'Shoes', icon: '👠' },
  { name: 'Jewelry', icon: '💎' },
  { name: 'Watches', icon: '⌚' },
  { name: 'Apparel', icon: '👗' },
  { name: 'Perfumes', icon: '✨' },
];

// Currency Rates relative to NGN
const CURRENCIES = {
  NGN: { symbol: '₦', rate: 1, label: 'Naira (NGN)' },
  USD: { symbol: '$', rate: 0.00065, label: 'USD ($)' },
  CNY: { symbol: '¥', rate: 0.0047, label: 'Chinese Yuan (CNY)' },
  XOF: { symbol: 'CFA ', rate: 0.39, label: 'Togo CFA (XOF)' },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  // Settings State
  const [currency, setCurrency] = useState('NGN');
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    cityState: '',
  });

  const formatPrice = (priceNGN) => {
    const curr = CURRENCIES[currency];
    const converted = (priceNGN * curr.rate).toLocaleString(undefined, {
      maximumFractionDigits: currency === 'USD' ? 2 : 0,
    });
    return `${curr.symbol}${converted}`;
  };

  const filteredProducts = INITIAL_PRODUCTS.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Sticky Header */}
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

      {/* Main Content Area */}
      <main style={styles.mainContent}>
        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div>
            <div style={styles.banner}>
              <h2 style={{ margin: '0 0 6px 0', fontSize: '18px' }}>⚡ Direct Supplier Deals</h2>
              <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>
                Order directly via WhatsApp or Email for volume discounts.
              </p>
            </div>

            <h3 style={styles.sectionHeader}>Top Categories</h3>
            <div style={styles.categoryGrid}>
              {CATEGORIES.map((cat, index) => (
                <div key={index} style={styles.categoryCard}>
                  <span style={{ fontSize: '28px' }}>{cat.icon}</span>
                  <span style={styles.categoryName}>{cat.name}</span>
                </div>
              ))}
            </div>

            <h3 style={styles.sectionHeader}>Recommended Products</h3>
            <div style={styles.productGrid}>
              {filteredProducts.map((product) => (
                <div key={product.id} style={styles.productCard}>
                  <div style={styles.productImagePlaceholder}>{product.image}</div>
                  <div style={styles.productDetails}>
                    <span style={styles.tag}>{product.tag}</span>
                    <h4 style={styles.productTitle}>{product.title}</h4>
                    <p style={styles.productPrice}>{formatPrice(product.priceNGN)}</p>
                    <p style={styles.productMoq}>{product.minOrder}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'message' && (
          <div style={styles.tabSection}>
            <h2 style={styles.heading}>Messages & Support</h2>
            <p style={styles.subtext}>Choose how you would like to reach customer support:</p>
            <div style={styles.contactContainer}>
              <a
                href="https://wa.me/2349033494813?text=Hello%20Chrisvic%20Collections,%20I%20have%20an%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                style={styles.whatsappBtn}
              >
                💬 WhatsApp (+234 903 349 4813)
              </a>
              <a
                href="mailto:chrisviccollection@gmail.com?subject=Inquiry%20-%20Chrisvic%20Collections"
                style={styles.emailBtn}
              >
                ✉️ Email (chrisviccollection@gmail.com)
              </a>
            </div>
          </div>
        )}

        {/* CART TAB */}
        {activeTab === 'cart' && (
          <div style={styles.tabSection}>
            <h2 style={styles.heading}>Your Shopping Cart</h2>
            <p style={styles.subtext}>Your cart is currently empty.</p>
          </div>
        )}

        {/* ME TAB (1688 Style User Dashboard & Buyer Settings) */}
        {activeTab === 'me' && (
          <div>
            {/* Profile Header */}
            <div style={styles.userCard}>
              <div style={styles.avatar}>👤</div>
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>Chrisvic Wholesale Buyer</h3>
                <span style={styles.userBadge}>Verified Account</span>
              </div>
            </div>

            {/* My Orders Tracking Bar */}
            <div style={styles.cardSection}>
              <h4 style={styles.cardTitle}>My Orders</h4>
              <div style={styles.orderGrid}>
                <div style={styles.orderItem}>
                  <span style={styles.orderIcon}>💳</span>
                  <span>To Pay</span>
                </div>
                <div style={styles.orderItem}>
                  <span style={styles.orderIcon}>📦</span>
                  <span>To Ship</span>
                </div>
                <div style={styles.orderItem}>
                  <span style={styles.orderIcon}>🚚</span>
                  <span>To Receive</span>
                </div>
                <div style={styles.orderItem}>
                  <span style={styles.orderIcon}>💬</span>
                  <span>To Review</span>
                </div>
                <div style={styles.orderItem}>
                  <span style={styles.orderIcon}>🔄</span>
                  <span>Refund</span>
                </div>
              </div>
            </div>

            {/* Buyer Settings */}
            <h3 style={styles.sectionHeader}>Buyer Settings</h3>

            {/* Address Management */}
            <div style={styles.cardSection}>
              <h4 style={styles.cardTitle}>📍 Address Management</h4>
              <div style={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  style={styles.input}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  style={styles.input}
                />
                <input
                  type="text"
                  placeholder="Street Address"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  style={styles.input}
                />
                <input
                  type="text"
                  placeholder="City & State"
                  value={address.cityState}
                  onChange={(e) => setAddress({ ...address, cityState: e.target.value })}
                  style={styles.input}
                />
              </div>
            </div>

            {/* Payment Options */}
            <div style={styles.cardSection}>
              <h4 style={styles.cardTitle}>💳 Payment Options</h4>
              <p style={styles.fieldLabel}>Preferred Payment Method:</p>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={styles.select}
              >
                <option value="Bank Transfer">Bank Transfer / EFT</option>
                <option value="Debit Card">Debit / Credit Card (Paystack/Flutterwave)</option>
                <option value="Cash on Delivery">Cash on Delivery (Lagos Only)</option>
                <option value="USDT">Crypto / USDT</option>
              </select>
            </div>

            {/* Preferences (Country, Language, Currency) */}
            <div style={styles.cardSection}>
              <h4 style={styles.cardTitle}>🌐 Region & Preferences</h4>
              
              <div style={styles.fieldRow}>
                <span style={styles.fieldLabel}>Country / Region:</span>
                <input
                  type="text"
                  value="Nigeria 🇳🇬"
                  readOnly
                  style={{ ...styles.input, backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
                />
              </div>

              <div style={styles.fieldRow}>
                <span style={styles.fieldLabel}>Language:</span>
                <input
                  type="text"
                  value="English"
                  readOnly
                  style={{ ...styles.input, backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
                />
              </div>

              <div style={styles.fieldRow}>
                <span style={styles.fieldLabel}>Currency Display:</span>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  style={styles.select}
                >
                  {Object.entries(CURRENCIES).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Fixed Bottom Navigation Bar */}
      <nav style={styles.navBar}>
        <button
          onClick={() => setActiveTab('home')}
          style={{
            ...styles.navItem,
            color: activeTab === 'home' ? '#ff4d00' : '#666',
          }}
        >
          <span style={styles.icon}>🏠</span>
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('message')}
          style={{
            ...styles.navItem,
            color: activeTab === 'message' ? '#ff4d00' : '#666',
          }}
        >
          <span style={styles.icon}>💬</span>
          <span>Message</span>
        </button>

        <button
          onClick={() => setActiveTab('cart')}
          style={{
            ...styles.navItem,
            color: activeTab === 'cart' ? '#ff4d00' : '#666',
          }}
        >
          <span style={styles.icon}>🛒</span>
          <span>Cart</span>
        </button>

        <button
          onClick={() => setActiveTab('me')}
          style={{
            ...styles.navItem,
            color: activeTab === 'me' ? '#ff4d00' : '#666',
          }}
        >
          <span style={styles.icon}>👤</span>
          <span>Me</span>
        </button>
      </nav>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#f4f5f7',
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backgroundColor: '#ff4d00',
    padding: '12px 16px',
    color: '#ffffff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },
  headerTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
  },
  logoText: {
    fontSize: '18px',
    fontWeight: '900',
    letterSpacing: '0.5px',
  },
  badge: {
    backgroundColor: '#ffffff',
    color: '#ff4d00',
    fontSize: '10px',
    fontWeight: 'bold',
    padding: '2px 6px',
    borderRadius: '10px',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '6px 12px',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    width: '100%',
    fontSize: '13px',
    color: '#333',
  },
  mainContent: {
    flex: 1,
    padding: '12px',
    paddingBottom: '80px',
  },
  banner: {
    backgroundColor: '#ff4d00',
    color: '#ffffff',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '16px',
    boxShadow: '0 4px 12px rgba(255, 77, 0, 0.2)',
  },
  sectionHeader: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#222',
    margin: '16px 0 10px 0',
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    marginBottom: '16px',
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '12px 6px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  categoryName: {
    fontSize: '12px',
    marginTop: '6px',
    fontWeight: '600',
    color: '#444',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    display: 'flex',
    flexDirection: 'column',
  },
  productImagePlaceholder: {
    height: '110px',
    backgroundColor: '#fff0e6',
    display: 'grid',
    placeItems: 'center',
    fontSize: '48px',
  },
  productDetails: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  tag: {
    backgroundColor: '#fff1ec',
    color: '#ff4d00',
    fontSize: '10px',
    fontWeight: 'bold',
    padding: '2px 5px',
    borderRadius: '4px',
    alignSelf: 'flex-start',
    marginBottom: '4px',
  },
  productTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#333',
    margin: '0 0 6px 0',
    lineHeight: '1.3',
    height: '32px',
    overflow: 'hidden',
  },
  productPrice: {
    fontSize: '15px',
    fontWeight: '800',
    color: '#ff4d00',
    margin: '0 0 2px 0',
  },
  productMoq: {
    fontSize: '10px',
    color: '#888',
    margin: 0,
  },
  userCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
    marginBottom: '12px',
  },
  avatar: {
    width: '48px',
    height: '48px',
    backgroundColor: '#fff0e6',
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center',
    fontSize: '24px',
  },
  userBadge: {
    backgroundColor: '#e6f7ff',
    color: '#1890ff',
    fontSize: '10px',
    fontWeight: 'bold',
    padding: '2px 6px',
    borderRadius: '8px',
  },
  cardSection: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '14px',
    marginBottom: '12px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
  },
  cardTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#222',
    margin: '0 0 12px 0',
  },
  orderGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '8px',
    textAlign: 'center',
  },
  orderItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '10px',
    color: '#555',
  },
  orderIcon: {
    fontSize: '20px',
    marginBottom: '4px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  fieldRow: {
    marginBottom: '10px',
  },
  fieldLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#555',
    display: 'block',
    marginBottom: '4px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '13px',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '13px',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
  },
  tabSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '30px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#111',
  },
  subtext: {
    fontSize: '13px',
    color: '#666',
    marginBottom: '20px',
  },
  contactContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
    maxWidth: '320px',
  },
  whatsappBtn: {
    display: 'block',
    padding: '14px 20px',
    backgroundColor: '#25D366',
    color: '#ffffff',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '14px',
    textAlign: 'center',
  },
  emailBtn: {
    display: 'block',
    padding: '14px 20px',
    backgroundColor: '#0070f3',
    color: '#ffffff',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '14px',
    textAlign: 'center',
  },
  navBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '56px',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 100,
  },
  navItem: {
    background: 'none',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '11px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  icon: {
    fontSize: '18px',
    marginBottom: '2px',
  },
};
