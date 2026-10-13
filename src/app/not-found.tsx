import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="page-detail">
      <p className="empty">
        没有找到这个页面。<Link href="/">回到产品速查</Link>
      </p>
    </div>
  );
}
