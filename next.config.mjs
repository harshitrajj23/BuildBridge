/** @type {import('next').NextConfig} */
const nextConfig = {
  // ❌ removed reactCompiler
  optimizePackageImports: ['@radix-ui/react-icons'],
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig