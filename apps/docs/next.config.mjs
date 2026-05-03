import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const docsDir = dirname(fileURLToPath(import.meta.url));

const isPagesBuild = process.env.GITHUB_PAGES === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  outputFileTracingRoot: join(docsDir, "../.."),
  transpilePackages: ["@lumora-design/themes"],
  ...(isPagesBuild && {
    output: "export",
    basePath: "/lumora-ui",
    assetPrefix: "/lumora-ui/",
    trailingSlash: true,
    images: { unoptimized: true }
  })
};

export default nextConfig;
