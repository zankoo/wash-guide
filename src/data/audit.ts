import { BRAND, BRANDS } from './taxonomy';
import type { Product } from './types';

const reference = (p: Product) => ({ id: p.id, brand: p.brand, name: p.name, category: p.category });

/** 仅统计当前目录的资料覆盖，不判断文件是否在互联网上存在或链接是否有效。 */
export function auditCatalog(products: readonly Product[]) {
  const included = products.filter((p) => p.category !== 'acc');
  const sorted = [...included].sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
  const list = (predicate: (p: Product) => boolean) => sorted.filter(predicate).map(reference);
  const missingSds = list((p) => !p.sds);
  const ph = {
    unrecorded: list((p) => !p.ph),
    notApplicable: list((p) => p.ph?.category === 'na'),
    qualitativeOnly: list((p) => !!p.ph && p.ph.category !== 'na' && !p.ph.value),
    withValue: list((p) => !!p.ph && p.ph.category !== 'na' && !!p.ph.value),
    // 下列两项与前面的数值状态重叠。
    missingSource: list((p) => p.ph?.source.kind === 'unrecorded'),
    conflictingEvidence: list((p) => p.ph?.conflict === true),
  };
  const localSds = included.filter((p) => p.sds?.hosting === 'local');
  return {
    schemaVersion: 1,
    scope: { total: products.length, excludedAccessories: products.length - included.length, included: included.length },
    sds: { linked: included.length - missingSds.length, missing: missingSds },
    ph,
    localSds: {
      count: localSds.length,
      missingOriginalUrl: list((p) => p.sds?.hosting === 'local' && !p.sds.originalUrl),
    },
    byBrand: BRANDS.map((brand) => {
      const own = included.filter((p) => p.brand === brand);
      const linked = own.filter((p) => p.sds).length;
      return { brand, name: BRAND[brand], products: own.length, linkedSds: linked, missingSds: own.length - linked };
    }),
  };
}

export function formatCatalogAudit(report: ReturnType<typeof auditCatalog>): string {
  const { scope, sds, ph, localSds } = report;
  return [
    `产品 ${scope.total} 款；排除配件 ${scope.excludedAccessories} 款；统计 ${scope.included} 款。`,
    `SDS：已关联 ${sds.linked}；未关联 ${sds.missing.length}。`,
    `pH：有数值 ${ph.withValue.length}；仅定性 ${ph.qualitativeOnly.length}；不适用 ${ph.notApplicable.length}；未记录 ${ph.unrecorded.length}。`,
    `pH 证据：来源未关联 ${ph.missingSource.length}；存在口径差异 ${ph.conflictingEvidence.length}（与数值状态重叠）。`,
    `站内 SDS：${localSds.count} 份；缺原始地址 ${localSds.missingOriginalUrl.length} 份。`,
    '',
    '品牌\t产品\t已关联 SDS\t未关联 SDS',
    ...report.byBrand.map((b) => `${b.name}\t${b.products}\t${b.linkedSds}\t${b.missingSds}`),
    '',
    '未关联不代表网上没有公开文件；此命令不联网验证链接。用 --json 导出完整产品清单。',
  ].join('\n');
}
