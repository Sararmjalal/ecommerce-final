/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SERVER: "http://localhost:4313",
    TITLE: "E-Commerce!",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4313",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig
