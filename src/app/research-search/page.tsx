import Link from 'next/link';
import { SourceSearch } from './source-search';

export const metadata = { title: '资料检索' };

export default function ResearchSearchPage() {
  return <main className="wrap source-search">
    <Link href="/">← 产品速查</Link>
    <h1>资料检索</h1>
    <p>用自己的话搜索产品说明和安全技术说明书，查看相关段落和原文。</p>
    <SourceSearch />
  </main>;
}
