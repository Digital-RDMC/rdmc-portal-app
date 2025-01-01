import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  i18n: {
    locales: ['en', 'fr', 'ar'], // Add your supported languages here
    defaultLocale: 'en', // Default language
  },
};

export default nextConfig;
