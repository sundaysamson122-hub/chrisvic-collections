'use client';

import AuthGuard from '../components/AuthGuard';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'sans-serif' }}>
        <AuthGuard>
          {children}
        </AuthGuard>
      </body>
    </html>
  );
}
