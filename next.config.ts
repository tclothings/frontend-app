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
    ],
  },
  /* config options here */
};

export default nextConfig;
