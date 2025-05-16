// next.config.ts

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // 💥 Vercelビルド時にESLintエラーで落ちなくなる！
  },

  // 他に追加したいオプションはここに書け
};

export default nextConfig;
