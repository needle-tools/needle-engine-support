import './styles/embed-mode.scss'

let forcedTheme: 'light' | 'dark' | null = null
let previousTheme: string | null = null

export const updateEmbedMode = () => {
  if (typeof window === 'undefined') return

  const html = document.documentElement
  const params = new URLSearchParams(window.location.search)
  const isEmbed = params.has('embed')
  html.classList.toggle('docs-embed', isEmbed)
  html.classList.toggle('docs-embed-transparent', isEmbed && params.get('background') === 'transparent')

  const textColor = isEmbed ? params.get('textColor') : null
  const linkColor = isEmbed ? params.get('linkColor') : null
  const validTextColor = textColor && CSS.supports('color', textColor) ? textColor : null
  const validLinkColor = linkColor && CSS.supports('color', linkColor) ? linkColor : null

  html.classList.toggle('docs-embed-text-color', !!validTextColor)
  html.classList.toggle('docs-embed-link-color', !!validLinkColor)
  if (validTextColor) html.style.setProperty('--embed-text-color', validTextColor)
  else html.style.removeProperty('--embed-text-color')
  for (const property of ['--vp-c-text', '--vp-c-text-mute', '--vp-c-text-subtle']) {
    if (validTextColor) html.style.setProperty(property, validTextColor)
    else html.style.removeProperty(property)
  }
  if (validLinkColor) {
    html.style.setProperty('--vp-c-accent', validLinkColor)
    html.style.setProperty('--c-text-accent', validLinkColor)
    html.style.setProperty('--embed-link-color', validLinkColor)
  } else {
    html.style.removeProperty('--vp-c-accent')
    html.style.removeProperty('--c-text-accent')
    html.style.removeProperty('--embed-link-color')
  }

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
