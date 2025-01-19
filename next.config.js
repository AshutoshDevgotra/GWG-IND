/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
};

module.exports = nextConfig;