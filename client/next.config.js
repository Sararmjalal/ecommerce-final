/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    GOOGLE_CLIENT_ID:"152887091072-gesg86dl1vmfh7a0gdli99nl7nq2h9q8.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET:"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",
    NEXTAUTH_URL:"http://localhost:3000",
    JWT_SECRET:"rzi2CaP85bJ87IAg31lxLf7RrVUmTZSczavcjefRMS45",
    SERVER:"http://localhost:4313",
    TITLE:"E-Commerce!"
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
