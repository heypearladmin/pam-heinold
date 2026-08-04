import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1200, 1600],
    imageSizes: [64, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },
  compress: true,
  async redirects() {
    return [
      // Consolidate www → non-www (fixes Google Search Console split-domain issue)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.pamheinold.com" }],
        destination: "https://pamheinold.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.pamheinoldhomes.com" }],
        destination: "https://pamheinold.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "pamheinoldhomes.com" }],
        destination: "https://pamheinold.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
