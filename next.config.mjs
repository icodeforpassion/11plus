/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true
  },
  images: {
    domains: []
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'ElevenSpark'
  }
};

export default nextConfig;
