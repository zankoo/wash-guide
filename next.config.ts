import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  experimental: {
    agentUpgrade: 'security',
  },
  images: {
    // 产品图全部在 public/img 下，不读取任何外部图床；只允许优化这个目录
    localPatterns: [{ pathname: '/img/**', search: '' }],
    // 只输出 webp，并收窄尺寸档位，控制 Vercel 图片优化的转换次数
    formats: ['image/webp'],
    qualities: [75],
    deviceSizes: [640, 828, 1080],
    imageSizes: [64, 128, 256, 384],
    minimumCacheTTL: 2678400, // 31 天：产品图基本不变
  },
  async headers() {
    return [
      {
        // Service Worker 本身不能被缓存，否则更新后用户拿不到新版本
        source: '/sw.js',
        headers: [
          { key: 'Content-Type', value: 'application/javascript; charset=utf-8' },
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self'" },
        ],
      },
    ];
  },
};

export default nextConfig;
