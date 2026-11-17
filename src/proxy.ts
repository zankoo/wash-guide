import { NextResponse, type NextRequest } from 'next/server';
import { PRODUCT_IDS } from '@/data/product-ids';

const KNOWN = new Set(PRODUCT_IDS);

/**
 * 产品页只有已收录的产品：未知 id 在开始流式渲染前设置 404，
 * 页面组件的 notFound() 负责呈现站点的错误页面和返回链接。
 */
export function proxy(request: NextRequest) {
  let id: string;
  try {
    id = decodeURIComponent(request.nextUrl.pathname.slice('/p/'.length));
  } catch {
    id = '';
  }
  if (KNOWN.has(id)) return NextResponse.next();
  return NextResponse.next({ status: 404 });
}

export const config = { matcher: '/p/:id' };
