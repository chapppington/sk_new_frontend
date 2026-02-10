import { createRequire } from "node:module"
import type { NextConfig } from "next"

const require = createRequire(import.meta.url)
const rawLoaderPath = require.resolve("raw-loader")

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.regru.cloud",
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
