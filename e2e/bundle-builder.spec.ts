import { test, expect, type Page } from '@playwright/test'

async function resetApp(page: Page) {
  await page.goto('/')
  await page.evaluate(() => localStorage.clear())
  await page.reload()
  await expect(page.locator('.builder-step.open .step-title')).toHaveText('Choose your cameras')
  // Wait for entrance motion to settle so layout metrics match resting state
  await page.waitForTimeout(700)
}

function rgb(r: number, g: number, b: number, a = 1) {
  return a === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`
}

test.describe('Notion requirements — fidelity tokens', () => {
  test('desktop layout, colors, and typography match Figma tokens', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'Desktop-only token audit')
    await resetApp(page)

    const tokens = await page.evaluate(() => {
      const cs = (sel: string) => {
        const el = document.querySelector(sel)
        if (!el) return null
        const s = getComputedStyle(el)
        const b = el.getBoundingClientRect()
        return {
          fontFamily: s.fontFamily,
          fontSize: s.fontSize,
          color: s.color,
          backgroundColor: s.backgroundColor,
          letterSpacing: s.letterSpacing,
          borderRadius: s.borderRadius,
          width: Math.round(b.width),
          height: Math.round(b.height),
          paddingTop: s.paddingTop,
        }
      }
      return {
        builder: cs('.builder'),
        review: cs('.review-panel'),
        layout: cs('.app-layout'),
        stepTitle: cs('.step-title'),
        stepCounter: cs('.step-counter'),
        stepCount: cs('.step-count'),
        productCard: cs('.product-card'),
        checkout: cs('.checkout-btn'),
        nextBtn: cs('.step-next-btn'),
        reviewTitle: cs('.review-title'),
        totalActive: cs('.total-active'),
        savings: cs('.savings-banner'),
        purple: getComputedStyle(document.documentElement).getPropertyValue('--color-purple').trim(),
        countParent: document.querySelector('.step-count')?.parentElement?.className,
      }
    })

    expect(tokens.builder?.width).toBe(768)
    expect(tokens.review?.width).toBe(399)
    expect(tokens.layout?.paddingTop).toBe('49px')
    expect(tokens.review?.backgroundColor).toBe(rgb(237, 244, 255))
    expect(tokens.review?.borderRadius).toBe('10px')
    expect(tokens.stepTitle?.fontSize).toBe('18px')
    expect(tokens.stepTitle?.fontFamily).toContain('Gilroy-SemiBold')
    expect(tokens.stepCounter?.fontSize).toBe('10px')
    expect(tokens.stepCounter?.letterSpacing).toBe('1.6px')
    expect(tokens.stepCount?.color).toBe(rgb(78, 47, 210))
    expect(tokens.countParent).toContain('step-header-right')
    expect(tokens.productCard?.borderRadius).toBe('10px')
    expect(tokens.productCard?.height).toBeGreaterThanOrEqual(155)
    expect(tokens.productCard?.height).toBeLessThanOrEqual(200)
    expect(tokens.checkout?.backgroundColor).toBe(rgb(78, 47, 210))
    expect(tokens.checkout?.height).toBeGreaterThanOrEqual(50)
    expect(tokens.checkout?.height).toBeLessThanOrEqual(56)
    expect(tokens.nextBtn?.height).toBeGreaterThanOrEqual(32)
    expect(tokens.nextBtn?.height).toBeLessThanOrEqual(40)
    expect(tokens.reviewTitle?.fontSize).toBe('22px')
    expect(tokens.reviewTitle?.letterSpacing).toBe('0.6px')
    expect(tokens.totalActive?.fontSize).toBe('24px')
    expect(tokens.totalActive?.color).toBe(rgb(78, 47, 210))
    expect(tokens.purple).toBe('#4e2fd2')

    // Savings banner only appears once something is selected
    await page.locator('.product-card', { hasText: 'Wyze Cam v4' }).getByRole('button', { name: 'Increase quantity' }).click()
    const savingsColor = await page.locator('.savings-banner').evaluate((el) => getComputedStyle(el).color)
    expect(savingsColor).toBe(rgb(10, 162, 136))
  })

  test('mobile stacks with Figma mobile heading', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'Mobile-only layout audit')
    await resetApp(page)

    const heading = page.locator('.mobile-heading')
    await expect(heading).toBeVisible()
    await expect(heading).toHaveText("Let's get started!")

    const metrics = await page.evaluate(() => {
      const heading = document.querySelector('.mobile-heading')!
      const builder = document.querySelector('.builder')!
      const review = document.querySelector('.review-panel')!
      const layout = document.querySelector('.app-layout')!
      const stepTitle = document.querySelector('.step-title')!
      const stepCount = document.querySelector('.step-count')!
      const stepCounter = document.querySelector('.step-counter')!
      const cardPrice = document.querySelector('.product-card .price-active')
      const learnMore = document.querySelector('.product-learn-more')
      const hs = getComputedStyle(heading)
      const layoutBox = layout.getBoundingClientRect()
      const builderBox = builder.getBoundingClientRect()
      return {
        headingSize: hs.fontSize,
        headingFamily: hs.fontFamily,
        headingTracking: hs.letterSpacing,
        headingColor: hs.color,
        headingPadTop: hs.paddingTop,
        headingPadBottom: hs.paddingBottom,
        stepTitleSize: getComputedStyle(stepTitle).fontSize,
        stepTitleFamily: getComputedStyle(stepTitle).fontFamily,
        stepCountSize: getComputedStyle(stepCount).fontSize,
        stepCountColor: getComputedStyle(stepCount).color,
        stepCounterSize: getComputedStyle(stepCounter).fontSize,
        stepCounterTracking: getComputedStyle(stepCounter).letterSpacing,
        countParent: stepCount.parentElement?.className,
        builderGap: getComputedStyle(builder).gap,
        layoutPad: getComputedStyle(layout).padding,
        layoutFlex: getComputedStyle(layout).flexDirection,
        // Full-bleed: builder should span nearly the viewport width
        builderWidth: Math.round(builderBox.width),
        layoutWidth: Math.round(layoutBox.width),
        reviewRadius: getComputedStyle(review).borderRadius,
        cardPriceColor: cardPrice ? getComputedStyle(cardPrice).color : null,
        cardPriceFamily: cardPrice ? getComputedStyle(cardPrice).fontFamily : null,
        learnMoreDisplay: learnMore ? getComputedStyle(learnMore).display : null,
        learnMoreParent: learnMore?.parentElement?.className ?? null,
      }
    })

    expect(metrics.headingSize).toBe('31.875px')
    expect(metrics.headingFamily).toContain('Gilroy-Bold')
    expect(metrics.headingTracking).toBe('-0.064px')
    expect(metrics.headingColor).toBe('rgb(31, 31, 31)')
    expect(metrics.headingPadTop).toBe('20px')
    expect(metrics.headingPadBottom).toBe('12px')
    expect(metrics.stepTitleSize).toBe('18px')
    expect(metrics.stepTitleFamily).toContain('Gilroy-SemiBold')
    expect(metrics.stepCountSize).toBe('14px')
    expect(metrics.stepCountColor).toBe('rgb(78, 47, 210)')
    expect(metrics.stepCounterSize).toBe('10px')
    expect(metrics.stepCounterTracking).toBe('1.6px')
    expect(metrics.countParent).toContain('step-header-right')
    expect(metrics.builderGap).toBe('0px')
    expect(metrics.layoutPad).toBe('0px')
    expect(metrics.layoutFlex).toBe('column')
    expect(metrics.builderWidth).toBe(metrics.layoutWidth)
    expect(metrics.reviewRadius).toBe('0px')
    expect(metrics.cardPriceColor).toBe('rgb(11, 13, 16)')
    expect(metrics.cardPriceFamily).toContain('Gilroy-SemiBold')
    expect(metrics.learnMoreParent).toContain('product-info')
  })
})

test.describe('Notion requirements — interactions', () => {
  test.beforeEach(async ({ page }) => {
    await resetApp(page)
  })

  test('starts empty — review only fills after selection', async ({ page }) => {
    await expect(page.locator('.builder-step.open .step-count')).toHaveText('0 selected')
    await expect(page.locator('.product-card.selected')).toHaveCount(0)
    await expect(page.locator('.review-empty')).toBeVisible()
    await expect(page.locator('.review-panel .total-active')).toHaveText('$0.00')
    await expect(page.locator('.review-section-label', { hasText: 'Shipping' })).toHaveCount(0)
    await expect(page.locator('.savings-banner')).toBeAttached()
    await expect(page.locator('.savings-banner').locator('..')).toHaveClass(/invisible/)

    const card = page.locator('.product-card', { hasText: 'Wyze Cam v4' })
    await card.getByRole('button', { name: 'Increase quantity' }).click()

    await expect(card).toHaveClass(/selected/)
    await expect(page.locator('.review-empty')).toHaveCount(0)
    await expect(page.locator('.review-section-label', { hasText: 'Cameras' })).toBeVisible()
    await expect(page.locator('.review-section-label', { hasText: 'Shipping' })).toBeVisible()
    await expect(page.locator('.review-panel .review-item', { hasText: 'Wyze Cam v4' })).toHaveCount(1)
    await expect(page.locator('.review-panel .total-active')).toHaveText('$27.98')
  })

  test('accordion: step 1 open on load; expand/collapse; next advances', async ({ page }) => {
    await expect(page.locator('.builder-step.open')).toHaveCount(1)
    await expect(page.locator('.builder-step.open .step-title')).toHaveText('Choose your cameras')

    await page.getByRole('button', { name: /Next: Choose your plan/i }).click()
    await expect(page.locator('.builder-step.open .step-title')).toHaveText('Choose your plan')
    await expect(page.locator('.builder .product-title', { hasText: 'Cam Unlimited' })).toBeVisible()

    await page.locator('.builder-step', { has: page.locator('.step-title', { hasText: 'Choose your sensors' }) }).locator('.step-header').click()
    await expect(page.locator('.builder-step.open .step-title')).toHaveText('Choose your sensors')

    await page.locator('.builder-step.open .step-header').click()
    await expect(page.locator('.builder-step.open')).toHaveCount(0)
  })

  test('N selected counter reflects distinct products per step', async ({ page }) => {
    const step1 = page.locator('.builder-step', { has: page.locator('.step-title', { hasText: 'Choose your cameras' }) })
    await expect(step1.locator('.step-count')).toHaveText('0 selected')

    const doorbell = page.locator('.product-card', { hasText: 'Wyze Duo Cam Doorbell' })
    await doorbell.getByRole('button', { name: 'Increase quantity' }).click()
    await expect(step1.locator('.step-count')).toHaveText('1 selected')

    const cam = page.locator('.product-card', { hasText: 'Wyze Cam v4' })
    await cam.getByRole('button', { name: 'Increase quantity' }).click()
    await expect(step1.locator('.step-count')).toHaveText('2 selected')

    await doorbell.getByRole('button', { name: 'Decrease quantity' }).click()
    await expect(step1.locator('.step-count')).toHaveText('1 selected')
  })

  test('variant quantities are independent and card stepper binds to active variant', async ({ page }) => {
    const card = page.locator('.product-card', { hasText: 'Wyze Cam v4' })

    await expect(card.locator('.variant-chip.active')).toContainText('White')
    await expect(card.locator('.stepper-value')).toHaveText('0')

    await card.getByRole('button', { name: 'Increase quantity' }).click()
    await expect(card.locator('.stepper-value')).toHaveText('1')
    await card.getByRole('button', { name: 'Increase quantity' }).click()
    await expect(card.locator('.stepper-value')).toHaveText('2')

    await card.locator('.variant-chip', { hasText: 'Grey' }).click()
    await expect(card.locator('.variant-chip.active')).toContainText('Grey')
    await expect(card.locator('.stepper-value')).toHaveText('0')

    await card.getByRole('button', { name: 'Increase quantity' }).click()
    await card.getByRole('button', { name: 'Increase quantity' }).click()
    await expect(card.locator('.stepper-value')).toHaveText('2')

    await card.locator('.variant-chip', { hasText: 'White' }).click()
    await expect(card.locator('.stepper-value')).toHaveText('2')

    const reviewLines = page.locator('.review-panel .review-item', { hasText: 'Wyze Cam v4' })
    await expect(reviewLines).toHaveCount(2)
  })

  test('products without variants only have a single quantity', async ({ page }) => {
    const card = page.locator('.product-card', { hasText: 'Wyze Duo Cam Doorbell' })
    await expect(card.locator('.variant-selector')).toHaveCount(0)
    await card.getByRole('button', { name: 'Increase quantity' }).click()
    await expect(card.locator('.stepper-value')).toHaveText('1')
    await expect(page.locator('.review-panel .review-item', { hasText: 'Wyze Duo Cam Doorbell' })).toHaveCount(1)
  })

  test('quantity steppers stay in sync between cards and review', async ({ page }) => {
    const card = page.locator('.product-card', { hasText: 'Wyze Cam Pan v3' })
    await card.getByRole('button', { name: 'Increase quantity' }).click()
    await card.getByRole('button', { name: 'Increase quantity' }).click()

    const reviewItem = page.locator('.review-panel .review-item', { hasText: 'Wyze Cam Pan v3' })
    await expect(card.locator('.stepper-value')).toHaveText('2')
    await expect(reviewItem.locator('.stepper-value')).toHaveText('2')

    await reviewItem.getByRole('button', { name: 'Increase quantity' }).click()
    await expect(reviewItem.locator('.stepper-value')).toHaveText('3')
    await expect(card.locator('.stepper-value')).toHaveText('3')

    await reviewItem.getByRole('button', { name: 'Decrease quantity' }).click()
    await expect(reviewItem.locator('.stepper-value')).toHaveText('2')
    await expect(card.locator('.stepper-value')).toHaveText('2')
  })

  test('live review panel recalculates totals as quantities change', async ({ page }) => {
    const total = page.locator('.review-panel .total-active')
    await expect(total).toHaveText('$0.00')

    const card = page.locator('.product-card', { hasText: 'Wyze Cam v4' })
    await card.getByRole('button', { name: 'Increase quantity' }).click()
    await expect(total).toHaveText('$27.98')

    await card.getByRole('button', { name: 'Increase quantity' }).click()
    await expect(total).toHaveText('$55.96')
    await expect(page.locator('.badge-pill-text')).toContainText('$4.66/mo')
  })

  test('selected product cards get purple border state', async ({ page }) => {
    const card = page.locator('.product-card', { hasText: 'Wyze Cam v4' })
    const unselected = page.locator('.product-card', { hasText: 'Wyze Duo Cam Doorbell' })

    await expect(card).not.toHaveClass(/selected/)
    await card.getByRole('button', { name: 'Increase quantity' }).click()
    await expect(card).toHaveClass(/selected/)
    await expect(unselected).not.toHaveClass(/selected/)

    // Wait for border-color transition to settle on purple
    await expect
      .poll(async () => card.evaluate((el) => getComputedStyle(el).borderColor))
      .toContain('78, 47, 210')
  })

  test('save my system for later persists across reload', async ({ page }) => {
    const card = page.locator('.product-card', { hasText: 'Wyze Cam Pan v3' })
    await card.getByRole('button', { name: 'Increase quantity' }).click()
    await card.getByRole('button', { name: 'Increase quantity' }).click()
    await card.getByRole('button', { name: 'Increase quantity' }).click()
    await expect(card.locator('.stepper-value')).toHaveText('3')

    await page.getByRole('button', { name: 'Save my system for later' }).click()
    await expect(page.getByRole('button', { name: 'Saved!' })).toBeVisible()

    await page.reload()
    await expect(card.locator('.stepper-value')).toHaveText('3')
    await expect(page.locator('.review-panel .review-item', { hasText: 'Wyze Cam Pan v3' }).locator('.stepper-value')).toHaveText('3')
  })

  test('checkout requires a selection, then shows placeholder', async ({ page }) => {
    await page.getByRole('button', { name: 'Checkout' }).click()
    const dialog = page.getByRole('alertdialog')
    await expect(dialog).toBeVisible()
    await expect(dialog).toContainText(/select products/i)
    await dialog.getByRole('button', { name: /keep building/i }).click()
    await expect(dialog).toHaveCount(0)

    await page.locator('.product-card', { hasText: 'Wyze Cam v4' }).getByRole('button', { name: 'Increase quantity' }).click()

    await page.getByRole('button', { name: 'Checkout' }).click()
    await expect(page.getByRole('alertdialog')).toBeVisible()
    await expect(page.getByRole('alertdialog')).toContainText(/checkout/i)
    await page.getByRole('alertdialog').getByRole('button', { name: /sounds good/i }).click()
    await expect(page.getByRole('alertdialog')).toHaveCount(0)
  })

  test('UI is data-driven from JSON product titles', async ({ page }) => {
    const titles = [
      'Wyze Cam v4',
      'Wyze Cam Pan v3',
      'Wyze Cam Floodlight v2',
      'Wyze Duo Cam Doorbell',
      'Wyze Battery Cam Pro',
    ]
    for (const title of titles) {
      await expect(page.locator('.product-title', { hasText: title })).toBeVisible()
    }
  })

  test('decreasing quantity to zero removes review line and selection', async ({ page }) => {
    const card = page.locator('.product-card', { hasText: 'Wyze Cam v4' })
    await card.getByRole('button', { name: 'Increase quantity' }).click()
    await expect(page.locator('.review-panel .review-item', { hasText: 'Wyze Cam v4' })).toHaveCount(1)

    await card.getByRole('button', { name: 'Decrease quantity' }).click()
    await expect(card.locator('.stepper-value')).toHaveText('0')
    await expect(card).not.toHaveClass(/selected/)
    await expect(page.locator('.review-panel .review-item', { hasText: 'Wyze Cam v4' })).toHaveCount(0)
    await expect(page.locator('.builder-step.open .step-count')).toHaveText('0 selected')
    await expect(page.locator('.review-empty')).toBeVisible()
  })
})
