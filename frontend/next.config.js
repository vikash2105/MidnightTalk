/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // extra checks in dev
  swcMinify: true,       // faster builds
  experimental: {
    appDir: true,        // ensures App Router works correctly
  },
  // Ensures server-side rendering works; don’t force `output: export`
  // Unless you REALLY want static only!
  // output: 'standalone', // (optional) good for custom servers
};

module.exports = nextConfig;
