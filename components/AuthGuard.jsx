import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// 1. Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 2. Auth Guard Component to Require One-Time Login
export default function AuthGuard({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Check initial authentication session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for authentication changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle Google OAuth Sign In
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

  // Handle Email & Password Sign In / Sign Up
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

  // Display loading state while checking session
  if (loading) {
    return (
      <div style={{ display: 'grid', placeItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
        <p>Loading CHRISVIC COLLECTIONS...</p>
      </div>
    );
  }

  // Block access and demand sign-in if no active session is found
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
        </div>
      </div>
    );
  }

  // Render store content once authenticated
  return children;
}

// Inline Styles
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
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '22px',
    fontWeight: 'bold',
  },
  subtitle: {
    margin: '0 0 20px 0',
    fontSize: '14px',
    color: '#666',
  },
  error: {
    color: '#e53e3e',
    fontSize: '14px',
    marginBottom: '15px',
  },
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
  divider: {
    margin: '15px 0',
    color: '#888',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
    outline: 'none',
  },
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
  toggleBtn: {
    marginTop: '15px',
    background: 'none',
    border: 'none',
    color: '#0070f3',
    cursor: 'pointer',
    fontSize: '13px',
  },
};
        
