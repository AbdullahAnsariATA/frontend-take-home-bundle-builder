import { chromium } from '@playwright/test'
import fs from 'fs'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1400 } })

async function audit(url, label) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(2000)
  await page.screenshot({ path: `e2e/screenshots/compare/${label}.png`, fullPage: true })

  const metrics = await page.evaluate(() => {
    const pick = (sel) => document.querySelector(sel)
    const style = (el) => (el ? getComputedStyle(el) : null)
    const box = (el) => (el ? el.getBoundingClientRect() : null)
    const s = (sel) => {
      const el = pick(sel)
      const cs = style(el)
      const b = box(el)
      if (!cs || !b) return null
      return {
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        color: cs.color,
        backgroundColor: cs.backgroundColor,
        letterSpacing: cs.letterSpacing,
        lineHeight: cs.lineHeight,
        borderRadius: cs.borderRadius,
        width: Math.round(b.width),
        height: Math.round(b.height),
        x: Math.round(b.x),
        y: Math.round(b.y),
        paddingTop: cs.paddingTop,
        paddingRight: cs.paddingRight,
        paddingBottom: cs.paddingBottom,
        paddingLeft: cs.paddingLeft,
      }
    }
    return {
      builder: s('.builder'),
      review: s('.review-panel'),
      stepOpen: s('.builder-step.open'),
      stepTitle: s('.step-title'),
      stepCounter: s('.step-counter'),
      stepCount: s('.step-count'),
      productCard: s('.product-card'),
      productTitle: s('.product-title'),
      productBadge: s('.product-badge'),
      productDesc: s('.product-desc'),
      learnMore: s('.product-learn-more'),
      variantActive: s('.variant-chip.active'),
      variantIdle: s('.variant-chip:not(.active)'),
      nextBtn: s('.step-next-btn'),
      reviewTitle: s('.review-title'),
      reviewSubtitle: s('.review-subtitle'),
      reviewLabel: s('.review-step-label'),
      sectionLabel: s('.review-section-label'),
      checkout: s('.checkout-btn'),
      saveLink: s('.save-link'),
      totalActive: s('.total-active'),
      totalCompare: s('.total-compare'),
      savings: s('.savings-banner'),
      layout: s('.app-layout'),
      mobileHeading: s('.mobile-heading'),
      priceCompareCard: s('.product-card .price-compare'),
      priceActiveCard: s('.product-card .price-active'),
    }
  })
  fs.writeFileSync(`e2e/screenshots/compare/${label}.json`, JSON.stringify(metrics, null, 2))
  console.log('AUDITED', label, 'builderW=', metrics.builder?.width, 'reviewW=', metrics.review?.width)
}

await audit('http://127.0.0.1:5173/', 'ours-desktop')
await page.setViewportSize({ width: 390, height: 844 })
await audit('http://127.0.0.1:5173/', 'ours-mobile')

await page.setViewportSize({ width: 1440, height: 1400 })
for (const [url, label] of [
  ['https://bundle-builder-bay.vercel.app/', 'ref-ahmad-desktop'],
]) {
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
    await page.waitForTimeout(2000)
    await page.screenshot({ path: `e2e/screenshots/compare/${label}.png`, fullPage: true })
    console.log('SHOT', label)
  } catch (e) {
    console.log('SKIP', label, e.message)
  }
}

await page.setViewportSize({ width: 390, height: 844 })
try {
  await page.goto('https://bundle-builder-bay.vercel.app/', { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(2000)
  await page.screenshot({ path: 'e2e/screenshots/compare/ref-ahmad-mobile.png', fullPage: true })
  console.log('SHOT ref-ahmad-mobile')
} catch (e) {
  console.log('SKIP mobile', e.message)
}

await browser.close()
console.log('DONE')
