import "../artifacts/adodo-collections/src/index.css";

export const metadata = {
  title: "ADODO COLLECTIONS",
  description: "Curated clothing, beauty, home, jewelry, and everyday finds.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}