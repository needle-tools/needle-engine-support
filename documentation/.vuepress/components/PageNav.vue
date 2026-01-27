<template>
  <div class="page-nav-container">
    <aside class="page-nav">
      <!-- Back to parent link -->
      <div class="page-nav-header" v-if="parentLink">
        <a :href="parentLink.link" class="parent-link">
          <span class="back-arrow">←</span>
          <span>{{ parentLink.text }}</span>
        </a>
      </div>

      <!-- On this page -->
      <div class="page-nav-content">
        <p class="page-nav-title">On this page</p>
        <ul class="page-nav-list">
          <li v-for="header in headers" :key="header.slug"
            :class="['page-nav-item', `level-${header.level}`, { active: activeHeader === header.slug }]">
            <a :href="`#${header.slug}`" class="page-nav-link" @click.prevent="scrollToHeader(header.slug)">
              {{ header.title }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Extras -->
      <div class="page-nav-extras">
        <p class="page-nav-title">Extras</p>
        <div class="llm-link-container">
          <a :href="mdPath" class="llm-link" @click.prevent="copyToClipboard">{{ linkText }}</a>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
const DEFAULT_LINK_TEXT = 'Copy for AI (LLMs)'

export default {
  name: 'PageNav',

  data() {
    return {
      headers: [],
      activeHeader: '',
      parentLink: null,
      observer: null,
      linkText: DEFAULT_LINK_TEXT
    }
  },

  computed: {
    mdPath() {
      let path

      // Use $route.path for reactivity, but it doesn't include base path
      if (this.$route?.path) {
        const base = this.$site?.base || '/docs/'
        path = base.replace(/\/$/, '') + this.$route.path
      } else {
        path = window.location.pathname
      }

      // Remove .html suffix
      path = path.replace(/\.html$/, '')

      // For paths ending with /, add index (e.g., /docs/xr/ -> /docs/xr/index.md)
      if (path.endsWith('/')) {
        path = path + 'index.md'
      } else {
        // Add .md extension
        path = path + '.md'
      }

      return path
    }
  },

  mounted() {
    // Initial extraction with a small delay to ensure DOM is ready
    setTimeout(() => {
      this.extractHeaders()
      this.determineParentLink()
      this.updateActiveHeader()
    }, 100)

    // Listen for scroll events to update active header
    window.addEventListener('scroll', this.updateActiveHeader)

    // Update headers when route changes
    this.$router?.afterEach(() => {
      // Use multiple nextTicks and a timeout to ensure content is fully rendered
      this.$nextTick(() => {
        this.extractHeaders()
        setTimeout(() => {
          this.extractHeaders()
          this.determineParentLink()
          this.updateActiveHeader()
        }, 1000)
      })
    })

    // Watch for DOM changes to catch dynamically loaded content
    this.setupMutationObserver()
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.updateActiveHeader)
    if (this.observer) {
      this.observer.disconnect()
    }
  },

  methods: {
    extractHeaders() {
      // Get all h2 and h3 headers from the page content
      const article = document.querySelector('.vp-theme-container, .vp-page')
      if (!article) return

      const headerElements = article.querySelectorAll('h2, h3')
      this.headers = Array.from(headerElements).map(el => ({
        level: parseInt(el.tagName.substring(1)),
        title: el.textContent.replace(/^#\s*/, '').trim(),
        slug: el.id || this.slugify(el.textContent)
      })).filter(h => h.slug) // Only include headers with IDs
    },

    slugify(text) {
      return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
    },

    updateActiveHeader() {
      const scrollPosition = window.scrollY + 100 // Offset for fixed header

      // Find the current active header based on scroll position
      const article = document.querySelector('.vp-theme-container, .vp-page')
      if (!article) return

      const headerElements = article.querySelectorAll('h2, h3')
      let currentHeader = ''
      let activeHeaderElement = null

      // Remove 'active-header' class from all headers first
      headerElements.forEach(el => el.classList.remove('active-header'))

      for (const el of headerElements) {
        if (el.offsetTop <= scrollPosition + window.innerHeight * .3) {
          currentHeader = el.id
          activeHeaderElement = el
        } else {
          break
        }
      }

      // Add 'active-header' class to the current header element
      if (activeHeaderElement) {
        activeHeaderElement.classList.add('active-header')
      }

      this.activeHeader = currentHeader
    },

    scrollToHeader(slug) {
      const element = document.getElementById(slug)
      if (element) {
        const offset = 80 // Account for fixed header
        const elementPosition = element.offsetTop - offset
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        })
        // Update URL hash
        window.history.pushState(null, '', `#${slug}`)
      }
    },

    determineParentLink() {
      const currentPath = this.$route?.path || window.location.pathname

      // Determine parent based on current path
      if (currentPath.includes('/tutorials/')) {
        this.parentLink = { text: 'All Tutorials', link: '/docs/tutorials/' }
      } else if (currentPath.includes('/how-to-guides/')) {
        this.parentLink = { text: 'All How-To Guides', link: '/docs/how-to-guides/' }
      } else if (currentPath.includes('/explanation/')) {
        this.parentLink = { text: 'All Explanations', link: '/docs/explanation/' }
      } else if (currentPath.includes('/reference/')) {
        this.parentLink = { text: 'All Reference', link: '/docs/reference/' }
      } else {
        this.parentLink = null
      }
    },

    setupMutationObserver() {
      // Watch for changes in the main content area
      const targetNode = document.body

      if (!targetNode) return

      const config = {
        childList: true,
        subtree: true,
        attributes: false
      }

      this.observer = new MutationObserver((mutationsList) => {
        // Check if any mutations involve the main content area
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            const addedNodes = Array.from(mutation.addedNodes)
            const hasContentChange = addedNodes.some(node => {
              return node.nodeType === 1 && (
                node.matches?.('.theme-default-content, .vp-doc') ||
                node.querySelector?.('.theme-default-content, .vp-doc')
              )
            })

            if (hasContentChange) {
              // Debounce the extraction to avoid multiple rapid updates
              clearTimeout(this.extractTimeout)
              this.extractTimeout = setTimeout(() => {
                this.extractHeaders()
                this.updateActiveHeader()
              }, 150)
              break
            }
          }
        }
      })

      this.observer.observe(targetNode, config)
    },

    async copyToClipboard() {
      try {
        // Get the full URL with protocol and host
        const fullUrl = window.location.origin + this.mdPath

        // Show fetching status, if it takes more than 500ms
        let fetchingTextTimeout = setTimeout(() => {
          this.linkText = 'Fetching content...'
        }, 500)

        // Fetch the content from the URL
        const response = await fetch(fullUrl);
        clearTimeout(fetchingTextTimeout);

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
        }

        const content = await response.text()

        // Prepend the URL to the content
        const contentWithUrl = `Content copied from ${fullUrl}\n\n${content}`

        // Try modern clipboard API first
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(contentWithUrl)
        } else {
          // Fallback for older browsers or insecure contexts
          const textArea = document.createElement('textarea')
          textArea.value = contentWithUrl
          textArea.style.position = 'fixed'
          textArea.style.left = '-999999px'
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand('copy')
          document.body.removeChild(textArea)
        }

        // Update link text to show success
        this.linkText = 'Text copied!'

        // Reset text after 2 seconds
        setTimeout(() => {
          this.linkText = DEFAULT_LINK_TEXT
        }, 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
        this.linkText = 'Copy failed'

        setTimeout(() => {
          this.linkText = DEFAULT_LINK_TEXT
        }, 2000)
      }
    }
  }
}
</script>

<style scoped>
.page-nav-container {
  position: relative;
}

.page-nav {
  position: fixed;
  right: 2rem;
  top: 6rem;
  width: 200px;
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
  padding: 1rem;
  font-size: 0.9rem;
  z-index: 10;

  white-space: nowrap;
  overflow: hidden;

  background-color: color-mix(in srgb, var(--vp-c-bg) 50%, transparent);
  backdrop-filter: blur(10px);
  border-radius: 8px;
}

.page-nav-extras {
  margin-top: 2em;
}

@media (width > 1500px) {
  .page-nav {
    margin-right: 50%;
    transform: translateX(750px);
  }
}

/* Hide on smaller screens */
@media (width < 1410px) {
  .page-nav {
    display: none;
  }
}

.page-nav-header {
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(125, 125, 125, 0.15);
}

.parent-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--c-text-accent, #826aed);
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s;
}

.parent-link:hover {
  opacity: 0.7;
}

.back-arrow {
  font-size: 1.1em;
}

.page-nav-title {
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: var(--c-text, inherit);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.8;
}

.page-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.page-nav-item {
  margin: 0;
  line-height: 1.6;
}

.page-nav-item.level-2 {
  margin-left: 0;
}

.page-nav-item.level-3 {
  margin-left: 1rem;
  font-size: 0.85rem;
}

.page-nav-link {
  display: block;
  padding: 0.25rem 0;
  color: var(--c-text, inherit);
  /* Normal text color */
  text-decoration: none;
  border-left: 2px solid transparent;
  padding-left: 0.5rem;
  margin-left: -0.5rem;
  transition: all 0.2s;

  /* Text ellipsis overflow */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.page-nav-link:hover {
  color: var(--c-text-accent, #826aed);
  /* Link color on hover */
  border-left-color: rgba(125, 125, 125, 0.3);
  text-decoration: underline;
  /* Show it's a link */
}

.page-nav-item.active .page-nav-link {
  color: var(--c-text-accent, #826aed);
  /* Link color for active */
  border-left-color: var(--c-text-accent, #826aed);
  font-weight: 700 !important;
  /* Bold - force override */
}

/* LLM Link Styles */
.llm-link-container {
  margin-top: 0.5rem;
}

.llm-link {
  display: block;
  padding: 0.5rem;
  font-size: .8rem;
  font-family: monospace;
  color: var(--c-text-accent, #826aed);
  background: rgba(130, 106, 237, 0.05);
  border: 1px solid rgba(130, 106, 237, 0.5);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s;
  word-break: break-all;
}

.llm-link:hover {
  background: rgba(130, 106, 237, 0.1);
  border-color: var(--c-text-accent, #826aed);
  text-decoration: none;
}

/* Custom scrollbar */
.page-nav::-webkit-scrollbar {
  width: 4px;
}

.page-nav::-webkit-scrollbar-track {
  background: transparent;
}

.page-nav::-webkit-scrollbar-thumb {
  background: rgba(125, 125, 125, 0.2);
  border-radius: 2px;
}

.page-nav::-webkit-scrollbar-thumb:hover {
  background: rgba(125, 125, 125, 0.3);
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .page-nav {
    border-left-color: rgba(255, 255, 255, 0.1);
  }

  .page-nav-header {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }
}
</style>

<style>
/* Global styles for active headers on the page (not scoped) */
/* h2.active-header,
h3.active-header {
  font-weight: 800 !important;
  transition: font-weight 0.1s;
} */
</style>
