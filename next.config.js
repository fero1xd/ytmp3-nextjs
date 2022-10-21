/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    API_URL: 'http://localhost:3001',
  },
};

module.exports = nextConfig;
