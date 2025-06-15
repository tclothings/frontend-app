import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ng.jumia.is",
        port: "",
        pathname: "/unsafe/**",
      },
      new URL("https://t-clothing-bucket.s3.amazonaws.com/**"),
      new URL("https://example.com/**"),
    ],
  },
  /* config options here */
};

export default nextConfig;
