import type { Metadata, Viewport } from 'next';
import { Saira_Condensed } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { GuideProvider } from '@/components/guide-state';
import { OfflineSupport } from '@/components/offline-support';
import { SITE_URL } from '@/lib/site';
import './globals.css';

const display = Saira_Condensed({
  weight: ['500', '600'],
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: '洗车施工速查', template: '%s · 洗车施工速查' },
  description:
    'Labocosmetica、Maniac Line、MAFRA、Koch-Chemie、CarPro、GYEON、BolaSolution、FEYNLAB、P&S 九个品牌汽美产品的官方稀释比例、施工步骤和洗车流程速查，可按施工工具换算加水量和原液量。',
};

export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#eef1f2' },
    { media: '(prefers-color-scheme: dark)', color: '#0c1418' },
  ],
};

export default function RootLayout({ children, modal }: LayoutProps<'/'>) {
  return (
    <html lang="zh-CN" className={display.variable}>
      <body>
        <GuideProvider>
          {children}
          {modal}
          <OfflineSupport />
        </GuideProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
