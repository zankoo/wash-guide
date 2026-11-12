import { PH_SHORT } from './taxonomy';
import type { PhBasis, PhEvidence, PhSourceKind, ProductPh } from './types';

export const PH_SOURCE_LABEL: Record<PhSourceKind, string> = {
  'product-page': '品牌官网',
  'technical-sheet': '厂商技术资料表',
  sds: 'SDS 第 9 节',
  'korean-registration': '韩国生活化学品申报',
  unrecorded: '尚未关联具体资料',
};

export const PH_BASIS_LABEL: Record<PhBasis, string> = {
  raw: '原液',
  '1%': '1% 稀释液',
};

export function phEvidenceText(evidence: PhEvidence): string {
  if (evidence.kind === 'statement') return evidence.text;
  if (evidence.rule === 'sds-overrides-na') {
    return '其他官方资料写「不适用」，SDS 第 9 节给出了 pH 数值；本站按 SDS 第 9 节标注。';
  }
  return `其他官方资料写「${PH_SHORT[evidence.previousCategory]}」，与 SDS 第 9 节不一致；本站按 SDS 第 9 节标注。`;
}

export function phEvidenceNotes(ph?: ProductPh): string[] {
  return ph?.evidence.map(phEvidenceText) ?? [];
}
