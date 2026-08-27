'use client';

import React, { useState } from 'react';

// Sample Product Data modeled after 1688 wholesale style
const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: 'Luxury Italian Leather Handbag - Wholesale Quality',
    price: '₦25,500',
    minOrder: 'Min. Order: 2 pcs',
    tag: 'Hot Seller',
    image: '👜',
  },
  {
    id: 2,
    title: 'Designer Platform Sneakers - Unisex Streetwear',
    price: '₦18,000',
    minOrder: 'Min. Order: 3 pairs',
    tag: 'Direct Factory',
    image: '👟',
  },
  {
    id: 3,
    title: 'Vintage Gold Plated Jewelry Set (Necklace + Earrings)',
    price: '₦12,500',
    minOrder: 'Min. Order: 5 sets',
    tag: 'Trending',
    image: '💍',
  },
  {
    id: 4,
    title: 'Premium Chronograph Men’s Wristwatch',
    price: '₦32,000',
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

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = INITIAL_PRODUCTS.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* 1688-Style Sticky Header */}
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
        {activeTab === 'home' && (
          <div>
            {/* Banner Section */}
            <div style={styles.banner}>
              <h2 style={{ margin: '0 0 6px 0', fontSize: '18px' }}>⚡ Direct Supplier Deals</h2>
              <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>
                Order directly via WhatsApp or Email for volume discounts.
              </p>
            </div>

            {/* Visual Categories Grid */}
            <h3 style={styles.sectionHeader}>Top Categories</h3>
            <div style={styles.categoryGrid}>
              {CATEGORIES.map((cat, index) => (
                <div key={index} style={styles.categoryCard}>
                  <span style={{ fontSize: '28px' }}>{cat.icon}</span>
                  <span style={styles.categoryName}>{cat.name}</span>
                </div>
              ))}
            </div>

            {/* 1688 Wholesale Product Feed */}
            <h3 style={styles.sectionHeader}>Recommended Products</h3>
            <div style={styles.productGrid}>
              {filteredProducts.map((product) => (
                <div key={product.id} style={styles.productCard}>
                  <div style={styles.productImagePlaceholder}>{product.image}</div>
                  <div style={styles.productDetails}>
                    <span style={styles.tag}>{product.tag}</span>
                    <h4 style={styles.productTitle}>{product.title}</h4>
                    <p style={styles.productPrice}>{product.price}</p>
                    <p style={styles.productMoq}>{product.minOrder}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages Tab */}
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

        {/* Cart Tab */}
        {activeTab === 'cart' && (
          <div style={styles.tabSection}>
            <h2 style={styles.heading}>Your Shopping Cart</h2>
            <p style={styles.subtext}>Your cart is currently empty.</p>
          </div>
        )}

        {/* Me Tab */}
        {activeTab === 'me' && (
          <div style={styles.tabSection}>
            <h2 style={styles.heading}>Account & Wholesale Orders</h2>
            <p style={styles.subtext}>Manage your saved items and supplier history.</p>
          </div>
        )}
      </main>

      {/* 1688 Fixed Bottom Navigation Bar */}
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
    backgroundColor: 'linear-gradient(135deg, #ff6b00 0%, #ff4d00 100%)',
    background: '#ff4d00',
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
    justify.content: 'space-around',
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
              
