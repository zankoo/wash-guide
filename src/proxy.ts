import { NextResponse, type NextRequest } from 'next/server';
import { PRODUCT_IDS } from '@/data/product-ids';

const KNOWN = new Set(PRODUCT_IDS);

/**
 * 产品页只有已收录的产品：未知 id 在渲染之前就改写到一个不存在的路径，返回正常的 404 页面。
 * Cache Components 下不能用 dynamicParams = false；否则未知 id 会先返回 200 的页面框架，
 * 后台补渲染又因为参数未知而失败，下一次请求变成 500。
 */
export function proxy(request: NextRequest) {
  let id: string;
  try {
    id = decodeURIComponent(request.nextUrl.pathname.slice('/p/'.length));
  } catch {
    id = '';
  }
  if (KNOWN.has(id)) return NextResponse.next();
  return NextResponse.rewrite(new URL('/p/not-found/_', request.url));
}

export const config = { matcher: '/p/:id' };
