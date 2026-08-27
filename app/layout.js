export const metadata = {
  title: 'Chrisvic Collections',
  description: 'Luxury Fashion & Collections Storefront',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'sans-serif', background: '#0a0a0a', color: '#fff' }}>
        {children}
      </body>
    </html>
  )
}
