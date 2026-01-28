import { defineClientConfig } from '@vuepress/client'
import '@shikijs/twoslash/style-rich.css';
import PageNav from './components/PageNav.vue'
import { nextTick } from 'vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    // Override router scroll behavior to remove animation and wait for transitions
    if (router) {
      router.options.scrollBehavior = (to, from, savedPosition) => {
        return new Promise((resolve) => {
          // Wait for Vue's next tick to ensure DOM is updated
          nextTick(() => {
            // Wait a bit longer for any page transitions/animations to complete
            // This ensures the scroll happens after the page content is visible
            setTimeout(() => {
              if (savedPosition) {
                resolve(savedPosition)
              } else if (to.hash) {
                resolve({
                  el: to.hash,
                  behavior: 'auto',
                })
              } else {
                resolve({ top: 0, behavior: 'auto' })
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