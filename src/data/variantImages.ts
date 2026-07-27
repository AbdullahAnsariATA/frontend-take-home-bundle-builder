/** High-res product photos (1024²) for cards + review. */
export const variantImageMap: Record<string, string> = {
  'wyze-cam-v4-white': 'wyze-cam-v4-white.png',
  'wyze-cam-v4-grey': 'wyze-cam-v4-grey.png',
  'wyze-cam-v4-black': 'wyze-cam-v4-black.png',
  'wyze-cam-pan-v3-white': 'wyze-cam-v3-white.png',
  'wyze-cam-pan-v3-black': 'wyze-cam-v3-black.png',
  'wyze-cam-floodlight-v2-white': 'wyze-cam-v2-white.png',
  'wyze-cam-floodlight-v2-black': 'wyze-cam-v2-black.png',
  'wyze-battery-cam-pro-white': 'wyze-cam-battery-white.png',
  'wyze-battery-cam-pro-black': 'wyze-cam-battery-black.png',
}

/** Crisp chip thumbs (72² ≈ 18px @4x). */
export function getVariantChipImage(productId: string, variantId: string): string | undefined {
  const file = variantImageMap[`${productId}-${variantId}`]
  return file ? `/images/variants/chips/${file}` : undefined
}

/** Full product photo for cards and review lines. */
export function getVariantImage(productId: string, variantId: string): string | undefined {
  const file = variantImageMap[`${productId}-${variantId}`]
  return file ? `/images/variants/${file}` : undefined
}
