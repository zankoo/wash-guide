import Link from 'next/link';
import { Logo } from '@/components/hero';
import { PrivateLibrary } from './private-library';

export const metadata = { title: '我的资料库', robots: { index: false, follow: false } };

export default function LibraryPage() {
  return (
    <div className="page-detail tool-page">
      <nav className="page-nav" aria-label="页面导航">
        <Link href="/">← 产品速查</Link>
        <div className="page-nav-r">
          <Link href="/flows">洗车流程</Link>
          <Link href="/research-search">资料检索</Link>
        </div>
      </nav>
      <main className="page-sheet tool-sheet private-library">
        <header className="tool-head">
          <div className="tool-title-row">
            <Logo />
            <div className="tool-heading">
              <span className="tool-eyebrow">跨设备同步 · 私人施工清单</span>
              <h1>我的资料库</h1>
            </div>
          </div>
          <p className="tool-desc">配对自己的设备同步常用产品收藏，按个人洗车习惯维护私人施工清单。</p>
        </header>
        <div className="tool-body">
          <PrivateLibrary />
        </div>
      </main>
    </div>
  );
}
