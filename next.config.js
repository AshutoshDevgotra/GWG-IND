/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config) => {
    // Handle undici module
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });
    
    // Exclude undici from being processed
    config.resolve.alias = {
      ...config.resolve.alias,
      undici: false,
    };
    
    return config;
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
    unoptimized: true
  }
};

module.exports = nextConfig;

 