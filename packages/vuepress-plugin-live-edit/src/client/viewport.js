/** Viewport helpers shared by the floating controls. */

/** Bottom edge of whatever fixed header the theme renders. */
export function headerBottom() {
  for (const selector of ['.vp-navbar', '.navbar', 'header']) {
    const element = document.querySelector(selector)
    if (!element) continue
    const style = getComputedStyle(element)
    if (style.position !== 'fixed' && style.position !== 'sticky') continue
    return element.getBoundingClientRect().bottom
  }
  return 0
}

/**
 * Keep `top` between the header and `limit`, so a control stays reachable when
 * the element it belongs to is partly scrolled past.
 *
 * @param {number} top preferred viewport position
 * @param {number} limit lowest acceptable position
 * @param {number} gap clearance below the header
 */
export function clampBelowHeader(top, limit, gap = 12) {
  const lowest = headerBottom() + gap
  return Math.min(Math.max(top, lowest), Math.max(limit, lowest))
}
