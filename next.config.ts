// next.config.ts

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // 💥 Vercelビルド時にESLintエラーで落ちなくなる！
  },
  experimental: {
    ppr: 'incremental', // 部分的事前レンダリングを有効化
  }
  // 他に追加したいオプションはここに書け
};

export default nextConfig;
