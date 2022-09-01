/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.jsdelivr.net', 'lh3.googleusercontent.com', '', 'firebasestorage.googleapis.com', 'randomuser.me']
  }
}

module.exports = nextConfig
