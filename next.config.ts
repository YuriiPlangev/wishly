import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'content.rozetka.com.ua', 'content1.rozetka.com.ua' ],
  },
<<<<<<< HEAD
   eslint: {
    ignoreDuringBuilds: true,
=======
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
>>>>>>> my-hotfix
  },
};

export default nextConfig;
