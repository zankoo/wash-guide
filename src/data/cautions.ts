import type { CautionId } from './types';

/**
 * 注意事项的固定措辞：同一种情况在所有产品页上写法完全相同。
 * 产品特有的条件（温度、材质例外、原因）写进 notes，显示在页面底部的「备注」。
 * 键的顺序即页面上的显示顺序。
 */
export const CAUTION_TEXT: Record<CautionId, string> = {
  sun: '不要在阳光直射下施工。',
  sunOk: '可以在阳光直射下施工。',
  hot: '不要在发热的表面上施工。',
  dry: '不要让产品干在表面上。',
  test: '使用前先在不显眼处测试，确认材质兼容。',
  shake: '使用前摇匀。',
  gloves: '施工时戴手套。',
  ppe: '施工时戴手套和护目镜。',
  ventilate: '在通风处施工。',
  flammable: '易燃，远离明火。',
  storage: '防冻、防高温存放。',
  pro: '官方定位为专业产品。',
};

export const CAUTION_ORDER = Object.keys(CAUTION_TEXT) as CautionId[];

/** 按固定顺序返回注意事项文字 */
export function cautionTexts(ids: readonly CautionId[] = []): string[] {
  return CAUTION_ORDER.filter((id) => ids.includes(id)).map((id) => CAUTION_TEXT[id]);
}
