export const metadata = {
  title: "ADODO COLLECTIONS",
  description: "Curated clothing, beauty, home, jewelry, and everyday finds.",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.png",
    apple: "/icon-192.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/adodo.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
