/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    API_URL: 'https://api.youtube-mp3.gq/api',
  },
  assetPrefix: './',
};

module.exports = nextConfig;
