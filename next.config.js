/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.jsdelivr.net', 'github.githubassets.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://desafio-05-api.onrender.com/api/:path*',
      },
    ];
  },
}

module.exports = nextConfig