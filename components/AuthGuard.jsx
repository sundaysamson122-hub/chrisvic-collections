import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// 1. Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 2. Auth Guard Component
export default function AuthGuard({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setErrorMsg('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://chrisvic-collections.vercel.app/',
      },
    });
    if (error) setErrorMsg(error.message);
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setErrorMsg(error.message);
      else alert('Check your email for the confirmation link!');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setErrorMsg(error.message);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'grid', placeItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
        <p>Loading CHRISVIC COLLECTIONS...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h2 style={styles.title}>CHRISVIC COLLECTIONS</h2>
          <p style={styles.subtitle}>Please sign in to access the store and place your order.</p>

          {errorMsg && <p style={styles.error}>{errorMsg}</p>}

          <button onClick={handleGoogleLogin} style={styles.googleBtn}>
            Continue with Google
          </button>

          <div style={styles.divider}>OR</div>

          <form onSubmit={handleEmailAuth} style={styles.form}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.submitBtn}>
              {isSignUp ? 'Sign Up with Email' : 'Sign In with Email'}
            </button>
          </form>

          <button
            onClick={() => setIsSignUp(!isSignUp)}
            style={styles.toggleBtn}
          >
            {isSignUp
              ? 'Already have an account? Sign In'
              : "Don't have an account? Sign Up"}
          </button>

          {/* Need Help / Message Link */}
          <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
            <button
              onClick={() => setShowMessageModal(true)}
              style={styles.messageLink}
            >
              Need help? 💬 Message Us
            </button>
          </div>
        </div>

        {/* Message Options Modal Popup */}
        {showMessageModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalCard}>
              <h3 style={{ margin: '0 0 15px 0' }}>Contact Support</h3>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>
                Choose how you would like to reach us:
              </p>

              {/* WhatsApp Direct Link */}
              <a
                href="https://wa.me/2349033494813?text=Hello%20Chrisvic%20Collections,%20I%20need%20assistance%20with%20logging%20in."
                target="_blank"
                rel="noopener noreferrer"
                style={styles.whatsappBtn}
              >
                💬 WhatsApp (+234 903 349 4813)
              </a>

              {/* Email Direct Link */}
              <a
                href="mailto:chrisviccollection@gmail.com?subject=Support%20Inquiry%20-%20Chrisvic%20Collections"
                style={styles.emailBtn}
              >
                ✉️ Email (chrisviccollection@gmail.com)
              </a>

              <button
                onClick={() => setShowMessageModal(false)}
                style={styles.closeBtn}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return children;
}

const styles = {
  overlay: {
    display: 'grid',
    placeItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f5',
    padding: '20px',
    fontFamily: 'sans-serif',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    position: 'relative',
  },
  title: { margin: '0 0 10px 0', fontSize: '22px', fontWeight: 'bold' },
  subtitle: { margin: '0 0 20px 0', fontSize: '14px', color: '#666' },
  error: { color: '#e53e3e', fontSize: '14px', marginBottom: '15px' },
  googleBtn: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4285F4',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '14px',
  },
  divider: { margin: '15px 0', color: '#888', fontSize: '12px', fontWeight: 'bold' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  input: { padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px', outline: 'none' },
  submitBtn: {
    padding: '12px',
    backgroundColor: '#000000',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '14px',
  },
  toggleBtn: { marginTop: '15px', background: 'none', border: 'none', color: '#0070f3', cursor: 'pointer', fontSize: '13px' },
  messageLink: { background: 'none', border: 'none', color: '#25D366', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'grid',
    placeItems: 'center',
    zIndex: 1000,
  },
  modalCard: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '350px',
    textAlign: 'center',
  },
  whatsappBtn: {
    display: 'block',
    padding: '12px',
    backgroundColor: '#25D366',
    color: '#fff',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    marginBottom: '10px',
    fontSize: '13px',
  },
  emailBtn: {
    display: 'block',
    padding: '12px',
    backgroundColor: '#0070f3',
    color: '#fff',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    marginBottom: '15px',
    fontSize: '13px',
  },
  closeBtn: {
    background: '#eee',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
};
                
