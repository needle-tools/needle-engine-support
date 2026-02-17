import { defineClientConfig } from '@vuepress/client'
import '@shikijs/twoslash/style-rich.css';
import PageNav from './components/PageNav.vue'
import { nextTick } from 'vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    // Only run scroll restoration on client-side (not during SSR)
    if (typeof window === 'undefined' || !router) {
      return
    }

    // Helper to get the full path including base for storage key
    const getStorageKey = (path) => {
      // Normalize the router path first
      const normalizedPath = path.endsWith('/') ? path : path + '/'

      // Construct the full path with base
      const base = siteData.value?.base || '/docs/'
      let fullPath = base + normalizedPath.replace(/^\//, '')

      // Remove any duplicate slashes
      fullPath = fullPath.replace(/\/+/g, '/')

      // Ensure trailing slash
      if (!fullPath.endsWith('/')) {
        fullPath += '/'
      }

      return `scroll-${fullPath}`
    }

    // Track whether we should restore scroll (only for back navigation)
    let shouldRestoreScroll = false

    // Track scroll position continuously while on a page
    let scrollSaveTimeout
    const saveCurrentScrollPosition = () => {
      const currentPath = router.currentRoute.value.path
      if (currentPath) {
        const scrollY = window.scrollY
        const storageKey = getStorageKey(currentPath)

        // Only save if scrolled past a threshold (to avoid saving 0)
        if (scrollY > 50) {
          sessionStorage.setItem(storageKey, scrollY.toString())
        }
      }
    }

    // Listen to scroll events and save position with throttling
    window.addEventListener('scroll', () => {
      clearTimeout(scrollSaveTimeout)
      scrollSaveTimeout = setTimeout(saveCurrentScrollPosition, 300)
    })

    // Save scroll position before navigating away from any page
    router.beforeEach((to, from) => {
      // Save current page's scroll position when navigating away
      if (from.path) {
        const scrollY = window.scrollY
        const storageKey = getStorageKey(from.path)

        // Only save scroll position if user has scrolled down
        // or if we already have a saved position for this page
        const existingScroll = sessionStorage.getItem(storageKey)
        if (scrollY > 0 || existingScroll !== null) {
          sessionStorage.setItem(storageKey, scrollY.toString())
        }

        // Check if we're navigating to a parent (back navigation)
        // Parent has fewer segments than child
        const fromSegments = from.path.split('/').filter(s => s)
        const toSegments = to.path.split('/').filter(s => s)
        shouldRestoreScroll = toSegments.length < fromSegments.length
      }
    })

    // Re-trigger text fragment highlighting (#:~:text=...) after SPA navigation.
    // Browsers process text fragments only on initial page load, not after client-side
    // navigation. After the router settles, we reload via location.replace() so the
    // browser can process the fragment natively - but only when a text fragment is present.
    let isFirstNavigation = true
    router.afterEach(() => {
      if (isFirstNavigation) {
        // On the first navigation (initial page load) the browser already handled the fragment
        isFirstNavigation = false
        return
      }
      nextTick(() => {
        setTimeout(() => {
          const hash = window.location.hash
          if (hash && hash.includes(':~:text=')) {
            // location.replace re-triggers native text fragment processing
            // without adding a new history entry
            window.location.replace(window.location.href)
          }
        }, 150) // after page content is rendered
      })
    })

    router.options.scrollBehavior = (to, from, savedPosition) => {
      return new Promise((resolve) => {
        // Wait for Vue's next tick to ensure DOM is updated
        nextTick(() => {
          // Wait a bit longer for any page transitions/animations to complete
          // This ensures the scroll happens after the page content is visible
          setTimeout(() => {
            // Only restore scroll if navigating back to parent
            if (shouldRestoreScroll) {
              // Get the storage key for the target page
              const storageKey = getStorageKey(to.path)

              // Check if we have a manually saved scroll position
              const manualScroll = sessionStorage.getItem(storageKey)

              if (manualScroll !== null) {
                const scrollY = parseInt(manualScroll, 10)
                // Don't remove it - keep it for future navigations back to this page
                resolve({ top: scrollY, behavior: 'instant' })
                return
              }
            }

            if (savedPosition) {
              // Browser back/forward - use saved position instantly
              resolve({ ...savedPosition, behavior: 'instant' })
            } else if (to.hash) {
              // Hash navigation - scroll to element with offset for fixed header
              // The 'top' offset moves the target position up by that amount
              resolve({
                el: to.hash,
                top: 60,
                behavior: 'instant',
              })
            } else {
              resolve({ top: 0, behavior: 'instant' })
            }
          }, 100) // Wait for VuePress page transition
        })
      })
    }
  },
  setup() {
    // Add click handler to toggle DocSearch (close if already open)
    if (typeof window !== 'undefined') {
      // Use event delegation on document to catch DocSearch button clicks
      document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement
        const searchButton = target.closest('.DocSearch-Button')
        
        if (searchButton) {
          // Check if DocSearch modal is already open
          const isOpen = document.body.classList.contains('DocSearch--active') || 
                         document.querySelector('.DocSearch-Modal')
          
          if (isOpen) {
            // Prevent the default DocSearch behavior and close it
            event.preventDefault()
            event.stopPropagation()
            
            // Simulate Escape key to close DocSearch
            const escapeEvent = new KeyboardEvent('keydown', {
              key: 'Escape',
              code: 'Escape',
              keyCode: 27,
              which: 27,
              bubbles: true,
              cancelable: true
            })
            document.dispatchEvent(escapeEvent)
          }
        }
      }, true) // Use capture phase to intercept before DocSearch handler
    }
  },
  rootComponents: [PageNav],
})