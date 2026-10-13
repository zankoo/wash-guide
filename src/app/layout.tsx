import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Noto_Sans_SC, Saira_Condensed } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { GuideProvider } from '@/components/guide-state';
import { SITE_URL } from '@/lib/site';
import './globals.css';

const display = Saira_Condensed({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-display',
});
const mono = IBM_Plex_Mono({
  weight: ['500', '600'],
  subsets: ['latin'],
  variable: '--font-mono',
});
// 中文字体按 unicode-range 拆成很多小文件，浏览器只下载用到的字；不预加载
const body = Noto_Sans_SC({
  subsets: ['latin'],
  variable: '--font-body',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: '洗车施工速查', template: '%s · 洗车施工速查' },
  description:
    'Labocosmetica、Maniac Line、Koch-Chemie、CarPro 四个品牌汽美产品的官方稀释比例、施工步骤和洗车流程速查，可按施工工具换算加水量和原液量。',
};

export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0b1a45' },
    { media: '(prefers-color-scheme: dark)', color: '#081335' },
  ],
};

export default function RootLayout({ children, modal }: LayoutProps<'/'>) {
  return (
    <html lang="zh-CN" className={`${display.variable} ${mono.variable} ${body.variable}`}>
      <body>
        <GuideProvider>
          {children}
          {modal}
        </GuideProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
