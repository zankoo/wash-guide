import type { MetadataRoute } from 'next';

/** 添加到主屏幕后像 App 一样全屏打开 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '洗车施工速查',
    short_name: '洗车速查',
    description: 'Labocosmetica、Maniac Line、MAFRA、Koch-Chemie、CarPro、GYEON、BolaSolution、FEYNLAB、P&S 的官方稀释比例、施工步骤和洗车流程',
    lang: 'zh-CN',
    start_url: '/',
    display: 'standalone',
    background_color: '#eef1f2',
    theme_color: '#eef1f2',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
