'use client';

import Image from 'next/image';
import { useState } from 'react';
import { BRAND } from '@/data/taxonomy';
import type { BrandId } from '@/data/types';

interface Props {
  src: string | undefined;
  name: string;
  brand: BrandId;
  alt?: string;
  sizes: string;
  /** 首屏大图：立即加载并提高优先级 */
  eager?: boolean;
}

/** 产品图（fill 到定位容器），无图或加载失败时显示名称卡片 */
export function ProductImage({ src, name, brand, alt = '', sizes, eager }: Props) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <Placeholder name={name} brand={brand} />;
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      onError={() => setFailed(true)}
    />
  );
}

export function Placeholder({ name, brand }: { name: string; brand: BrandId }) {
  return (
    <div className={`ph-img ${brand}`}>
      <i />
      <b>{name}</b>
      <span>{BRAND[brand]} · 暂无产品图</span>
    </div>
  );
}

/** 流程步骤里的小图 */
export function ProductThumb({ src, name, brand }: { src: string | undefined; name: string; brand: BrandId }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <i className={`ph-mini ${brand}`}>{name.slice(0, 2)}</i>;
  return <Image src={src} alt="" width={32} height={32} onError={() => setFailed(true)} />;
}
