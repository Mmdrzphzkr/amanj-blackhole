/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["three"],
  experimental: {
    optimizePackageImports: ["@react-three/drei", "@react-three/fiber"],
  },
};

module.exports = nextConfig;
