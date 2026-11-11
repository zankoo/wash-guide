import { PH_SHORT } from './taxonomy';
import type { PhEvidence, PhSourceKind, ProductPh } from './types';

export const PH_SOURCE_LABEL: Record<PhSourceKind, string> = {
  'product-page': '品牌产品资料',
  'technical-sheet': '厂商技术资料表',
  sds: 'SDS 第 9 节',
  'korean-registration': '韩国生活化学品申报',
  unrecorded: '旧记录尚未关联具体来源',
};

export function phEvidenceText(evidence: PhEvidence): string {
  if (evidence.kind === 'statement') return evidence.text;
  if (evidence.rule === 'sds-overrides-na') {
    return '其他官方资料写酸碱性「不适用」，SDS 第 9 节给出了 pH 数值，本站按 SDS 标注';
  }
  return `pH 按 SDS 第 9 节标注；其他官方资料写的是「${PH_SHORT[evidence.previousCategory]}」，两者不一致`;
}

export function phEvidenceNotes(ph?: ProductPh): string[] {
  return ph?.evidence.map(phEvidenceText) ?? [];
}
