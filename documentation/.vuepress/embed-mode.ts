import './styles/embed-mode.scss'

let forcedTheme: 'light' | 'dark' | null = null
let previousTheme: string | null = null

export const updateEmbedMode = () => {
  if (typeof window === 'undefined') return

  const html = document.documentElement
  const params = new URLSearchParams(window.location.search)
  html.classList.toggle('docs-embed', params.has('embed'))

  const theme = params.get('theme')
  const nextTheme = theme === 'light' || theme === 'dark' ? theme : null

  if (nextTheme) {
    if (!forcedTheme) previousTheme = html.getAttribute('data-theme')
    forcedTheme = nextTheme
    html.setAttribute('data-theme', nextTheme)
  } else if (forcedTheme) {
    forcedTheme = null
    if (previousTheme === null) html.removeAttribute('data-theme')
    else html.setAttribute('data-theme', previousTheme)
    previousTheme = null
  }
}

if (typeof window !== 'undefined') {
  new MutationObserver(() => {
    if (!forcedTheme) return
    const html = document.documentElement
    const currentTheme = html.getAttribute('data-theme')
    if (currentTheme !== forcedTheme) {
      previousTheme = currentTheme
      html.setAttribute('data-theme', forcedTheme)
    }
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  updateEmbedMode()
  window.addEventListener('popstate', updateEmbedMode)
}
