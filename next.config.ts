import { createRequire } from "node:module"
import type { NextConfig } from "next"

const require = createRequire(import.meta.url)
const rawLoaderPath = require.resolve("raw-loader")

const nextConfig: NextConfig = {
  // Отключает streaming metadata — title и meta description всегда в <head>
  // (иначе при async generateMetadata они оказываются в body)
  htmlLimitedBots: /.*/,
  reactCompiler: true,
  images: {
    qualities: [100, 90, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.regru.cloud",
      },
      {
        protocol: "https",
        hostname: "sibkomplekt.ru",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.{glsl,vs,fs,vert,frag}": {
        loaders: [rawLoaderPath],
        as: "*.js",
      },
    },
  },
}

export default nextConfig
