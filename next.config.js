/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    externalDir: true,
  },
  transpilePackages: ["@workspace/api-client-react", "@workspace/api-zod"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://adodo-collections-store.replit.app/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
