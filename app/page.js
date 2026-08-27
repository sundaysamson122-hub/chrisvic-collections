'use client';

import React, { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div style={styles.container}>
      {/* Main Content Area */}
      <main style={styles.mainContent}>
        {activeTab === 'home' && (
          <div style={styles.tabSection}>
            <h1 style={styles.heading}>Welcome to CHRISVIC COLLECTIONS</h1>
            <p style={styles.text}>Browse our luxury collections and place your orders.</p>
          </div>
        )}

        {activeTab === 'message' && (
          <div style={styles.tabSection}>
            <h2 style={styles.heading}>Messages</h2>
            <p style={styles.subtext}>Choose how you would like to reach customer support:</p>

            <div style={styles.contactContainer}>
              {/* WhatsApp Direct Link */}
              <a
                href="https://wa.me/2349033494813?text=Hello%20Chrisvic%20Collections,%20I%20have%20an%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                style={styles.whatsappBtn}
              >
                💬 WhatsApp (+234 903 349 4813)
              </a>

              {/* Email Direct Link */}
              <a
                href="mailto:chrisviccollection@gmail.com?subject=Inquiry%20-%20Chrisvic%20Collections"
                style={styles.emailBtn}
              >
                ✉️ Email (chrisviccollection@gmail.com)
              </a>
            </div>
          </div>
        )}

        {activeTab === 'cart' && (
          <div style={styles.tabSection}>
            <h2 style={styles.heading}>Your Shopping Cart</h2>
            <p style={styles.text}>Your cart is currently empty.</p>
          </div>
        )}

        {activeTab === 'me' && (
          <div style={styles.tabSection}>
            <h2 style={styles.heading}>Account & Settings</h2>
            <p style={styles.text}>Manage your orders and profile preferences.</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <nav style={styles.navBar}>
        <button
          onClick={() => setActiveTab('home')}
          style={{
            ...styles.navItem,
            color: activeTab === 'home' ? '#f97316' : '#666',
          }}
        >
          <span style={styles.icon}>🏠</span>
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('message')}
          style={{
            ...styles.navItem,
            color: activeTab === 'message' ? '#f97316' : '#666',
          }}
        >
          <span style={styles.icon}>💬</span>
          <span>Message</span>
        </button>

        <button
          onClick={() => setActiveTab('cart')}
          style={{
            ...styles.navItem,
            color: activeTab === 'cart' ? '#f97316' : '#666',
          }}
        >
          <span style={styles.icon}>🛒</span>
          <span>Cart</span>
        </button>

        <button
          onClick={() => setActiveTab('me')}
          style={{
            ...styles.navItem,
            color: activeTab === 'me' ? '#f97316' : '#666',
          }}
        >
          <span style={styles.icon}>👤</span>
          <span>Me</span>
        </button>
      </nav>
    </div>
  );
}

// Inline Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
    backgroundColor: '#f9fafb',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    paddingBottom: '80px',
  },
  tabSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '40px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#111827',
  },
  text: {
    fontSize: '14px',
    color: '#4b5563',
  },
  subtext: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '24px',
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
    height: '60px',
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
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  icon: {
    fontSize: '18px',
    marginBottom: '2px',
  },
};
