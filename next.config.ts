import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    defaultLocale: "en", // Default language
    locales: ["en", "fr", "ar"], // Supported languages
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/**', // Allow all paths
      },
    ],
  },
};

export default nextConfig;
