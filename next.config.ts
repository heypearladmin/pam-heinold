import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1200, 1600],
    imageSizes: [64, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },
  compress: true,
};

export default nextConfig;
