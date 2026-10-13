import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
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
};

export default nextConfig;
