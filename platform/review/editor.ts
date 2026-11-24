import { escape } from './html';
import type { ProductEdit } from './publication';
import type { DilutionRow } from '../../src/data/types';

export const fieldNames = { name: '产品名', type: '产品说明', materials: '适用材质', sizes: '规格', steps: '施工步骤', notes: '备注', dilutions: '稀释比例' };
export const addRowScript = `document.querySelectorAll('button[data-add]').forEach(button => {
  button.addEventListener('click', () => {
    const template = button.previousElementSibling;
    const list = template.previousElementSibling;
    if (list.children.length >= 64) return;
    list.append(template.content.cloneNode(true));
    list.lastElementChild.querySelector('input, textarea').focus();
  });
});`;

function repeat(title: string, rows: string[], blank: string) {
  return '<fieldset><legend>' + title + '</legend><div class="repeat-list">' + rows.join('') + (rows.length < 64 ? blank : '') +
    '</div><template>' + blank + '</template><button type="button" data-add>+ 添加一行</button></fieldset>';
}

export function editFields(p: ProductEdit) {
  const names = ['name','type','materials','sizes'] as const;
  const basic = names.map(key => `<label>${fieldNames[key]} <textarea name="${key}" rows="1" maxlength="1200">${escape(p[key])}</textarea></label>`).join('');
  const lists = (['steps','notes'] as const).map(key => {
    const row = (value: string) => `<label>${fieldNames[key]} <textarea rows="2" name="${key}" maxlength="1500">${escape(value)}</textarea></label>`;
    return repeat(fieldNames[key], p[key].map(row), row(''));
  }).join('');
  const dilution = ([scene, ratio, tool]: DilutionRow) => '<div class="dilution">' + [
    ['scene','场景',scene],['ratio','比例',ratio],['tool','工具',tool],
  ].map(([key, label, value]) => `<label>${label}<input name="${key}" maxlength="500" value="${escape(value)}"></label>`).join('') + '</div>';
  return basic + repeat(fieldNames.dilutions, p.dilutions.map(dilution), dilution(['','',''])) + lists;
}

export function submittedEdit(form: URLSearchParams) {
  const scenes = form.getAll('scene'), ratios = form.getAll('ratio'), tools = form.getAll('tool');
  if (scenes.length !== ratios.length || ratios.length !== tools.length) return null;
  return { name: form.get('name'), type: form.get('type'), materials: form.get('materials'), sizes: form.get('sizes'),
    steps: form.getAll('steps').filter(s => s.trim()), notes: form.getAll('notes').filter(s => s.trim()),
    dilutions: scenes.map((scene, i) => [scene, ratios[i], tools[i]]).filter(row => row.some(cell => cell.trim())),
  };
}
