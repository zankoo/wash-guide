import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  images: {
    // Koch-Chemie / CarPro 产品图来自官网图床，经 Vercel 图片优化转成 webp 并按尺寸缩放
    remotePatterns: [
      new URL('https://media.koch-chemie.com/Mockups/**'),
      new URL('https://carpro.nyc3.digitaloceanspaces.com/**'),
    ],
    // 只输出 webp，并收窄尺寸档位，控制 Vercel 图片优化的转换次数
    formats: ['image/webp'],
    qualities: [75],
    deviceSizes: [640, 828, 1080],
    imageSizes: [64, 128, 256, 384],
    minimumCacheTTL: 2678400, // 31 天：产品图基本不变
  },
};

export default nextConfig;
