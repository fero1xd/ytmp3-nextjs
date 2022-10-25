/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    API_URL: 'https://api.youtube-to-mp3.ml/api',
  },
  assetPrefix: './',
};

module.exports = nextConfig;
