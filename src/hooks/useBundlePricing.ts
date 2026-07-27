import { useMemo } from 'react'
import type { Product } from '../types'
import productsData from '../data/products.json'
import { useBundle } from './useBundle'
import {
  buildLineItems,
  computeTotals,
  groupByCategory,
  sumLineItems,
} from '../utils/lineItems'

const products = productsData as Product[]

export function useBundlePricing() {
  const { state } = useBundle()

  return useMemo(() => {
    const lineItems = buildLineItems(state.quantities)
    const grouped = groupByCategory(lineItems, products)
    const planProduct = products.find((p) => p.category === 'plan')
    const planQty = planProduct
      ? state.quantities[`${planProduct.productId}::default`] || 0
      : 0
    const { compare, active } = sumLineItems(lineItems, products)
    const hasItems = lineItems.length > 0
    const totals = computeTotals(compare, active, hasItems)

    return {
      products,
      lineItems,
      grouped,
      planProduct,
      planQty,
      hasItems,
      ...totals,
    }
  }, [state.quantities])
}
