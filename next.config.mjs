/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.pexels.com", "res.cloudinary.com"],
  },
 webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      encoding: false,
    };
    return config;
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
