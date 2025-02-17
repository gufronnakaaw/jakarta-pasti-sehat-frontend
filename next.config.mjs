/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: [
      "@heroui/react",
      "@phosphor-icons/react",
      "@ckeditor/ckeditor5-react",
      "framer-motion",
      "embla-carousel-react",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "is3.cloudhost.id",
      },
    ],
  },
};

export default nextConfig;
