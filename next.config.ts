import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'content.rozetka.com.ua', 'content1.rozetka.com.ua' ],
  },
  i18n: {
    locales: ['en', 'uk'],
    defaultLocale: 'en',
  },
};

export default nextConfig;
