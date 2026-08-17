import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
  },
  compress: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            // Enumerated from actual third-party scripts in layout.tsx:
            // - reports.heypearl.io (dynamic_optimization.js, loaded via inline script)
            // - www.googletagmanager.com (GA4 script tag)
            // - connect.facebook.net (Meta Pixel)
            // unsafe-inline required: JSON-LD, GA config, and Meta Pixel all use dangerouslySetInnerHTML
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' reports.heypearl.io www.googletagmanager.com connect.facebook.net",
              "connect-src 'self' reports.heypearl.io www.google-analytics.com analytics.google.com www.googletagmanager.com www.facebook.com",
              "img-src 'self' data: www.facebook.com",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self'",
              "frame-src 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
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
