import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  compress: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.pamheinold.com" }],
        destination: "https://pamheinold.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
