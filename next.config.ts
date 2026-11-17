import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 完整预渲染由 vinext 完成；不启用尚未完整兼容的 PPR / 分段预取协议。
  reactCompiler: true,
  experimental: {
    agentUpgrade: 'security',
  },
  images: {
    // 本地 WebP 直接交给 Workers Static Assets，不依赖在线图片转换服务。
    unoptimized: true,
    // 产品图全部在 public/img 下，不读取任何外部图床；只允许优化这个目录
    localPatterns: [{ pathname: '/img/**', search: '' }],
    // 保留本地 Next.js 开发时的图片尺寸配置。
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
