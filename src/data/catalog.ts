import { PRODUCTS, FLOWS, getProduct } from './index';
import { projectFlows, projectProducts } from './projections';

export const productItems = projectProducts(PRODUCTS);
export const flowItems = projectFlows(FLOWS, getProduct);
