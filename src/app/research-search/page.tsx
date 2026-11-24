import Link from 'next/link';
import { Logo } from '@/components/hero';
import { SourceSearch } from './source-search';

export const metadata = { title: '资料检索' };

export default function ResearchSearchPage() {
  return (
    <div className="page-detail tool-page">
      <nav className="page-nav" aria-label="页面导航">
        <Link href="/">← 产品速查</Link>
        <div className="page-nav-r">
          <Link href="/flows">洗车流程</Link>
          <Link href="/library">我的资料库</Link>
        </div>
      </nav>
      <main className="page-sheet tool-sheet">
        <header className="tool-head">
          <div className="tool-title-row">
            <Logo />
            <div className="tool-heading">
              <span className="tool-eyebrow">官方产品说明 · SDS 安全技术说明书</span>
              <h1>资料检索</h1>
            </div>
          </div>
          <p className="tool-desc">用自己的话搜索产品说明和安全技术说明书，查看相关段落和原文依据。</p>
        </header>
        <div className="tool-body">
          <SourceSearch />
        </div>
      </main>
    </div>
  );
}
