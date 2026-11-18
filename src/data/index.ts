import * as bola from './bola';
import * as carpro from './carpro';
import * as gyeon from './gyeon';
import * as feynlab from './feynlab';
import * as koch from './koch';
import * as mafra from './mafra';
import * as laboManiac from './labo-maniac';
import * as laboManiacFlows from './labo-maniac-flows';
import * as ps from './ps';
import type { Product } from './types';
import { productsOfStep, stepsOf, type FlowEntry } from './presentation';

export * from './presentation';
export * from './materials';
export * from './subcategories';
export * from './taxonomy';
export * from './sds-sources';
export * from './ph';
export * from './cautions';
export type * from './types';

export const PRODUCTS: Product[] = [...laboManiac.products, ...mafra.products, ...koch.products, ...carpro.products, ...gyeon.products, ...bola.products, ...feynlab.products, ...ps.products];

export const FLOWS: FlowEntry[] = [
  ...[laboManiacFlows.flows, mafra.flows, koch.flows, carpro.flows, gyeon.flows, bola.flows, feynlab.flows, ps.flows].flat().map((f) => ({ ...f, kind: 'off' as const })),
  ...[laboManiacFlows.combos, mafra.combos, koch.combos, carpro.combos, gyeon.combos].flat().map((f) => ({ ...f, kind: 'combo' as const })),
];

export const PRODUCT_BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]));
export const FLOW_BY_ID = new Map(FLOWS.map((f) => [f.id, f]));

export function getProduct(id: string): Product {
  const p = PRODUCT_BY_ID.get(id);
  if (!p) throw new Error(`Unknown product id: ${id}`);
  return p;
}

export const flowsUsing = (id: string): FlowEntry[] =>
  FLOWS.filter((f) => stepsOf(f).some((x) => productsOfStep(x).includes(id)));

export const OFFICIAL_RATIO_ROWS = PRODUCTS.reduce((n, p) => n + p.dilutions.filter((d) => /1:\d|原液/.test(d[1])).length, 0);
