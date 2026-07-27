export function quantityKey(productId: string, variantId = 'default'): string {
  return `${productId}::${variantId}`
}

export function parseQuantityKey(key: string): { productId: string; variantId: string } {
  const [productId, variantId = 'default'] = key.split('::')
  return { productId, variantId }
}
