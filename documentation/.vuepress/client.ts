import { defineClientConfig } from '@vuepress/client'
import '@shikijs/twoslash/style-rich.css';
import PageNav from './components/PageNav.vue'
import { nextTick } from 'vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    // Helper to get the full path including base for storage key
    const getStorageKey = (path) => {
      // Use window.location.pathname which includes the /docs/ base
      // Extract the path portion that matches the router path
      const currentFullPath = window.location.pathname
      // Normalize - remove trailing slash for comparison, then add back
      const normalizedPath = path.endsWith('/') ? path : path + '/'

      // If current path includes the router path, use the full path
      if (currentFullPath.includes(normalizedPath)) {
        return `scroll-${currentFullPath}`
      }
      // Otherwise construct it from the base
      const base = siteData.value?.base || '/docs/'
      const fullPath = base + normalizedPath.replace(/^\//, '')
      return `scroll-${fullPath}`
    }

    // Track whether we should restore scroll (only for back navigation)
    let shouldRestoreScroll = false

    // Override router scroll behavior to remove animation and wait for transitions
    if (router) {
      // Save scroll position before navigating away from any page
      router.beforeEach((to, from) => {
        // Save current page's scroll position when navigating away
        if (from.path) {
          const scrollY = window.scrollY
          const storageKey = getStorageKey(from.path)
          sessionStorage.setItem(storageKey, scrollY.toString())

          // Check if we're navigating to a parent (back navigation)
          // Parent has fewer segments than child
          const fromSegments = from.path.split('/').filter(s => s)
          const toSegments = to.path.split('/').filter(s => s)
          shouldRestoreScroll = toSegments.length < fromSegments.length
        }
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
                resolve({
                  el: to.hash,
                  behavior: 'instant',
                })
              } else {
                resolve({ top: 0, behavior: 'instant' })
              }
            }, 100) // Wait for VuePress page transition
          })
        })
      }
    }
  },
  setup() {},
  rootComponents: [PageNav],
})