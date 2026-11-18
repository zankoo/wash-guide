import Link from 'next/link';
import { PrivateLibrary } from './private-library';

export const metadata = { title: '我的资料库', robots: { index: false, follow: false } };
export default function LibraryPage() {
  return (
    <main className="wrap source-search private-library">
      <Link href="/">← 产品速查</Link>
      <h1>我的资料库</h1>
      <PrivateLibrary />
    </main>
  );
}
