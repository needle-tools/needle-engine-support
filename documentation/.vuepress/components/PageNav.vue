<template>
  <div class="page-nav-container">
    <!-- Desktop sidebar navigation -->
    <aside class="page-nav page-nav-sidebar">
      <!-- Back to parent link -->
      <div class="page-nav-header" v-if="parentLink">
        <a :href="parentLink.link" class="parent-link" @click.prevent="handleParentLinkClick">
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

    <!-- Mobile breadcrumb navigation -->
    <div class="page-nav page-nav-breadcrumb">
      <div class="breadcrumb-row">
        <!-- Breadcrumb trail -->
        <nav class="breadcrumb-trail">
          <template v-if="breadcrumbs.length > 0">
            <a v-for="(crumb, index) in breadcrumbs" :key="index" :href="crumb.link" class="breadcrumb-item">
              {{ crumb.text }}
            </a>
          </template>
          <span class="breadcrumb-current" v-if="currentPageTitle">{{ currentPageTitle }}</span>
        </nav>

        <!-- Previous and next sections preview on the right -->
        <div class="context-sections" v-if="prevHeaders.length > 0 || nextHeaders.length > 0">
          <!-- <a v-for="header in prevHeaders" :key="'prev-' + header.slug" :href="`#${header.slug}`"
            class="breadcrumb-item breadcrumb-prev" @click.prevent="scrollToHeader(header.slug)">
            {{ header.title }}
          </a> -->
          <a v-for="header in nextHeaders" :key="'next-' + header.slug" :href="`#${header.slug}`"
            class="breadcrumb-item breadcrumb-next" @click.prevent="scrollToHeader(header.slug)">
            {{ header.title }}
          </a>
        </div>
      </div>
    </div>
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
      linkText: DEFAULT_LINK_TEXT,
      breadcrumbs: [],
      currentPageTitle: '',
      prevHeaders: [],
      nextHeaders: [],
      updateHeadersTimeout: null
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
      this.buildBreadcrumbs()
      this.updateActiveHeader()
      this.updateContextHeaders()
    }, 100)

    // Listen for scroll events to update active header and next sections
    // Throttle to 200ms to prevent flickering
    let didScroll = false;
    window.addEventListener('scroll', () => {
      this.updateActiveHeader()

      // Throttle updateContextHeaders to 100ms
      if (didScroll) return;
      didScroll = true;
      setTimeout(() => scheduleUpdate(), 300);
      const scheduleUpdate = () => {
        didScroll = false;
        this.updateContextHeaders();
      }
    })

    // Update headers when route changes
    this.$router?.afterEach(() => {
      // Use multiple nextTicks and a timeout to ensure content is fully rendered
      this.$nextTick(() => {
        this.extractHeaders()
        setTimeout(() => {
          this.extractHeaders()
          this.determineParentLink()
          this.buildBreadcrumbs()
          this.updateActiveHeader()
          this.updateContextHeaders()
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

    handleParentLinkClick() {
      // Save current scroll position before navigating to parent
      const currentPath = this.$route?.path || window.location.pathname
      sessionStorage.setItem(`scroll-${currentPath}`, window.scrollY.toString())

      // Navigate to parent link
      if (this.parentLink?.link) {
        window.location.href = this.parentLink.link
      }
    },

    buildBreadcrumbs() {
      const currentPath = this.$route?.path || window.location.pathname
      const pathWithoutBase = currentPath.replace(/^\/docs\//, '').replace(/\/$/, '')
      const segments = pathWithoutBase.split('/').filter(s => s)

      this.breadcrumbs = []

      // Get all pages from VuePress (if available)
      const allPages = this.$site?.pages || []

      // Build breadcrumb trail, checking if pages exist
      for (let i = 0; i < segments.length - 1; i++) {
        const segmentPath = '/docs/' + segments.slice(0, i + 1).join('/') + '/'
        const segmentText = segments[i]
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')

        // Check if this path exists in VuePress pages
        const pageExists = allPages.some(page => {
          const pagePath = page.path || page.regularPath || ''
          return pagePath === segmentPath || pagePath === segmentPath.replace(/\/$/, '')
        })

        // Only add breadcrumb if page exists or it's a known parent
        const knownParents = [
          '/docs/tutorials/',
          '/docs/how-to-guides/',
          '/docs/explanation/',
          '/docs/reference/',
          '/docs/blender/',
          '/docs/unity/',
          '/docs/'
        ]

        if (pageExists || knownParents.includes(segmentPath)) {
          // Special case naming
          let displayText = segmentText
          if (segmentPath === '/docs/tutorials/') {
            displayText = 'Tutorials'
          } else if (segmentPath === '/docs/how-to-guides/') {
            displayText = 'How-To Guides'
          } else if (segmentPath === '/docs/explanation/') {
            displayText = 'Explanations'
          } else if (segmentPath === '/docs/reference/') {
            displayText = 'Reference'
          }

          this.breadcrumbs.push({ text: displayText, link: segmentPath })
        }
      }

      // Get current page title from h1 or last segment
      const h1 = document.querySelector('h1')
      this.currentPageTitle = h1?.textContent?.trim() || segments[segments.length - 1]
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    },

    updateContextHeaders() {
      const scrollPosition = window.scrollY + window.innerHeight * 0.5

      // Find previous and next headers relative to current scroll position
      const article = document.querySelector('.vp-theme-container, .vp-page')
      if (!article) return

      const headerElements = article.querySelectorAll('h2, h3')
      const allHeaders = []
      let currentIndex = -1

      // Collect all headers and find the current one
      for (let i = 0; i < headerElements.length; i++) {
        const el = headerElements[i]
        const header = {
          level: parseInt(el.tagName.substring(1)),
          title: el.textContent.replace(/^#\s*/, '').trim(),
          slug: el.id || this.slugify(el.textContent)
        }
        allHeaders.push(header)

        // Find current header (the last one before or at scroll position)
        if (el.offsetTop <= scrollPosition - window.innerHeight * .3) {
          currentIndex = i
        }
      }

      // Get previous header (one before current)
      const previous = currentIndex > 0 ? [allHeaders[currentIndex - 1]] : []

      // Get next header (one after current)
      const upcoming = currentIndex < allHeaders.length - 1 ? [allHeaders[currentIndex + 1]] : []

      this.prevHeaders = previous
      this.nextHeaders = upcoming
    },

    determineParentLink() {
      const currentPath = this.$route?.path || window.location.pathname

      // Remove /docs/ prefix and trailing slash for easier parsing
      const pathWithoutBase = currentPath.replace(/^\/docs\//, '').replace(/\/$/, '')

      // Split path into segments
      const segments = pathWithoutBase.split('/').filter(s => s)

      // Only show parent link if we're deeper than 1 level after /docs/
      // e.g., /docs/blender -> no link (1 segment)
      // e.g., /docs/blender/components -> yes link (2 segments)
      if (segments.length > 1) {
        // Try to find an existing parent page by traversing up the hierarchy
        let foundParent = null

        for (let i = segments.length - 1; i > 0; i--) {
          const parentSegments = segments.slice(0, i)
          const parentPath = '/docs/' + parentSegments.join('/') + '/'

          // Check if this parent page likely exists
          // We'll check common paths that we know exist
          const knownParents = [
            '/docs/tutorials/',
            '/docs/how-to-guides/',
            '/docs/explanation/',
            '/docs/reference/',
            '/docs/blender/',
            '/docs/unity/',
            '/docs/'
          ]

          // If it's a known parent or we're at depth 1, use it
          const isKnownParent = knownParents.includes(parentPath)
          const isDepthOne = parentSegments.length === 1

          if (isKnownParent || isDepthOne) {
            // Create a readable parent text from the parent segment
            const parentSegment = parentSegments[parentSegments.length - 1]
            let parentText = parentSegment
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')

            // Special cases for better text
            if (parentPath === '/docs/tutorials/') {
              parentText = 'All Tutorials'
            } else if (parentPath === '/docs/how-to-guides/') {
              parentText = 'All How-To Guides'
            } else if (parentPath === '/docs/explanation/') {
              parentText = 'All Explanations'
            } else if (parentPath === '/docs/reference/') {
              parentText = 'All Reference'
            }

            foundParent = { text: parentText, link: parentPath }
            break
          }
        }

        this.parentLink = foundParent
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

/* Desktop sidebar navigation */
.page-nav-sidebar {
  position: fixed;
  right: 2rem;
  top: 6rem;
  width: 200px;
  max-height: calc(95vh - 8rem);
  padding: 1rem;
  font-size: 0.9rem;
  z-index: 10;

  white-space: nowrap;
  overflow-x: hidden;
  overflow-y: auto;

  background-color: color-mix(in srgb, var(--vp-c-bg) 50%, transparent);
  backdrop-filter: blur(10px);
  border-radius: 8px;
}

.page-nav-extras {
  margin-top: 2em;
}

@media (width > 1500px) {
  .page-nav-sidebar {
    margin-right: 50%;
    transform: translateX(750px);
  }
}

/* Hide sidebar on smaller screens */
@media (width < 1410px) {
  .page-nav-sidebar {
    display: none;
  }
}

/* Mobile breadcrumb navigation */
.page-nav-breadcrumb {
  display: block;
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  max-width: min(80vw, 48rem);
  width: calc(100% - 3rem);
  background-color: color-mix(in srgb, var(--vp-c-bg) 80%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(125, 125, 125, 0.1);
  padding: 0.75rem 1.5rem;
  font-size: 0.85rem;
  z-index: 5;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
}

/* Show breadcrumb only on narrow screens, hide on desktop */
@media (width >=1410px) {
  .page-nav-breadcrumb {
    display: none;
  }
}

.breadcrumb-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: nowrap;
  overflow: hidden;
}

.breadcrumb-trail {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.breadcrumb-item {
  color: var(--c-text-accent, #826aed);
  text-decoration: none;
  transition: opacity 0.2s;
  white-space: nowrap;
}

.breadcrumb-item:hover {
  text-decoration: underline;
}

.breadcrumb-item::after {
  color: rgba(125, 125, 125, 0.5);
}

.breadcrumb-current {
  font-weight: 600;
  color: var(--c-text, inherit);
  white-space: nowrap;
}

.context-sections {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  flex-wrap: nowrap;
  flex-shrink: 0;
  overflow: hidden;
  max-width: 50%;
}

.breadcrumb-prev {
  opacity: 1;
  font-size: 0.85rem;
}

.breadcrumb-prev::after {
  content: ' ←';
}

.breadcrumb-next {
  opacity: 1;
  font-size: 0.85rem;
}

.breadcrumb-next::before {
  content: '→ ';
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

/* Add top padding to page content when breadcrumb navigation is visible (mobile) */
@media (width < 1410px) {

  .vp-page {
    margin-top: 5rem !important;
  }
}
</style>
