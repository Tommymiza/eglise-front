/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "91.134.91.43",
        port: "4000",
      },
    ],
  },
};

export default nextConfig;
