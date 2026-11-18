import { NextResponse, type NextRequest } from 'next/server';
import { env } from 'cloudflare:workers';

/**
 * 产品页只有已收录的产品：未知 id 在开始流式渲染前设置 404，
 * 页面组件的 notFound() 负责呈现站点的错误页面和返回链接。
 */
export async function proxy(request: NextRequest) {
  let id: string;
  try {
    id = decodeURIComponent(request.nextUrl.pathname.slice('/p/'.length));
  } catch {
    id = '';
  }
  const found = id && await env.DB.prepare(`SELECT 1 FROM products WHERE id = ?
    AND version_id = (SELECT version_id FROM catalog_publication WHERE singleton = 1)`).bind(id).first();
  if (found) return NextResponse.next();
  return NextResponse.next({ status: 404 });
}

export const config = { matcher: '/p/:id' };
