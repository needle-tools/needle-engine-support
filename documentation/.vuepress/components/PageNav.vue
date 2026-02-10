<template>
  <div :class="['page-nav-container', { 'menu-open': mobileSidebarOpen }]">
    <!-- Mobile hamburger button - fixed position in navbar area -->
    <button 
      :class="['mobile-menu-btn', { open: mobileSidebarOpen }]" 
      @click="toggleMobileSidebar" 
      aria-label="Toggle menu"
    >
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>

    <!-- Desktop sidebar navigation - only visible on screens >= 1024px -->
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
        <p class="section-header">On this page</p>
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
        <p class="section-header">Extras</p>
        <div class="llm-link-container">
          <a :href="mdPath" class="llm-link" @click.prevent="copyToClipboard">{{ linkText }}</a>
        </div>
      </div>
    </aside>

    <!-- Mobile sidebar panel (no overlay) -->
    <aside :class="['mobile-sidebar', { open: mobileSidebarOpen }]">
      <!-- Back to parent link -->
      <div class="page-nav-header" v-if="parentLink">
        <a :href="parentLink.link" class="parent-link" @click="handleMobileParentLinkClick">
          <span class="back-arrow">←</span>
          <span>{{ parentLink.text }}</span>
        </a>
      </div>

      <!-- Main Navigation Links -->
      <div class="mobile-nav-section">
        <p class="section-header">Navigation</p>
        <ul class="mobile-nav-list">
          <li><a href="/docs/getting-started/" @click="closeMobileSidebar">Getting Started</a></li>
          <li><a href="/docs/tutorials/" @click="closeMobileSidebar">Tutorials</a></li>
          <li><a href="/docs/how-to-guides/" @click="closeMobileSidebar">How-To Guides</a></li>
          <li><a href="/docs/explanation/" @click="closeMobileSidebar">Explanation</a></li>
          <li><a href="/docs/reference/" @click="closeMobileSidebar">Reference</a></li>
          <li><a href="/docs/help/" @click="closeMobileSidebar">Help</a></li>
        </ul>
      </div>

      <!-- On this page -->
      <div class="mobile-nav-section" v-if="headers.length > 0">
        <p class="section-header">On this page</p>
        <ul class="page-nav-list">
          <li v-for="header in headers" :key="'mobile-' + header.slug"
            :class="['page-nav-item', `level-${header.level}`, { active: activeHeader === header.slug }]">
            <a :href="`#${header.slug}`" class="page-nav-link" @click="scrollToHeaderMobile(header.slug)">
              {{ header.title }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Extras -->
      <div class="mobile-nav-section">
        <p class="section-header">Extras</p>
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
      linkText: DEFAULT_LINK_TEXT,
      breadcrumbs: [],
      currentPageTitle: '',
      prevHeaders: [],
      nextHeaders: [],
      updateHeadersTimeout: null,
      mobileSidebarOpen: false
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

      // Handle initial hash in URL if present
      this.handleInitialHash()
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

          // Handle hash in URL after route change
          this.handleInitialHash()
          
          // Close mobile sidebar on navigation
          this.mobileSidebarOpen = false
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
    // Restore body scroll
    document.body.style.overflow = ''
  },

  methods: {
    handleInitialHash() {
      // Check if there's a hash in the URL
      const hash = window.location.hash
      if (hash && hash.length > 1) {
        // Remove the # and decode the slug
        const slug = decodeURIComponent(hash.substring(1))

        // Wait a bit more to ensure the page is fully rendered
        // Try multiple times with increasing delays to handle slow loading
        const attemptScroll = (attempt = 0) => {
          const success = this.tryScrollToHeader(slug)
          if (!success && attempt < 5) {
            setTimeout(() => attemptScroll(attempt + 1), 200 * (attempt + 1))
          }
        }

        setTimeout(() => attemptScroll(), 100)
      }
    },

    tryScrollToHeader(slug) {
      // Try to find the element by ID first
      let element = document.getElementById(slug)

      // If not found, try with CSS selector (for slugs with special characters)
      if (!element) {
        try {
          element = document.querySelector(`[id="${slug}"]`)
        } catch (e) {
          // Invalid selector, try escaping
          const escapedSlug = CSS.escape(slug)
          element = document.querySelector(`#${escapedSlug}`)
        }
      }

      if (element) {
        const offset = 80 // Account for fixed header
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        })
        // Update URL hash
        window.history.pushState(null, '', `#${slug}`)
        return true
      }
      return false
    },

    extractHeaders() {
      // Get all h2 and h3 headers from the page content
      const article = document.querySelector('.vp-theme-container, .vp-page')
      if (!article) return

      const headerElements = article.querySelectorAll('h2, h3')
      this.headers = Array.from(headerElements)
        .filter(el => {
          // Exclude headers that are inside tool tiles or other non-content components
          // These are UI elements, not actual content sections
          const isInsideTile = el.closest('.tile')
          return !isInsideTile
        })
        .map(el => {
          // Use the actual ID from the rendered element, not our own slugify
          // VuePress already generates IDs for headers
          const slug = el.id
          const title = el.textContent.replace(/^#\s*/, '').trim()

          return {
            level: parseInt(el.tagName.substring(1)),
            title: title,
            slug: slug
          }
        })
        .filter(h => h.slug) // Only include headers with IDs
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
      const success = this.tryScrollToHeader(slug)
      if (!success) {
        console.warn(`PageNav: Could not find element with id "${slug}"`)
      }
    },

    handleParentLinkClick() {
      // Navigate to parent link
      // Scroll position is now saved automatically by router.beforeEach in client.ts
      if (this.parentLink?.link) {
        if (this.$router) {
          this.$router.push(this.parentLink.link)
        } else {
          // Fallback to window.location if router not available
          window.location.href = this.parentLink.link
        }
      }
    },

    // Mobile sidebar methods
    toggleMobileSidebar() {
      this.mobileSidebarOpen = !this.mobileSidebarOpen
    },

    closeMobileSidebar() {
      this.mobileSidebarOpen = false
    },

    handleMobileParentLinkClick() {
      this.closeMobileSidebar()
      this.handleParentLinkClick()
    },

    scrollToHeaderMobile(slug) {
      this.closeMobileSidebar()
      // Small delay to allow sidebar to close before scrolling
      setTimeout(() => {
        this.scrollToHeader(slug)
      }, 100)
    },

    navigateToPage(link) {
      // Navigate using Vue Router to enable scroll restoration
      // Scroll position is saved automatically by router.beforeEach in client.ts
      if (link) {
        if (this.$router) {
          this.$router.push(link)
        } else {
          // Fallback to window.location if router not available
          window.location.href = link
        }
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
        const segmentPath = '/' + segments.slice(0, i + 1).join('/') + '/'
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
          '/tutorials/',
          '/how-to-guides/',
          '/explanation/',
          '/reference/',
          '/blender/',
          '/unity/',
          '/'
        ]

        if (pageExists || knownParents.includes(segmentPath)) {
          // Special case naming
          let displayText = segmentText
          if (segmentPath === '/tutorials/') {
            displayText = 'Tutorials'
          } else if (segmentPath === '/how-to-guides/') {
            displayText = 'How-To Guides'
          } else if (segmentPath === '/explanation/') {
            displayText = 'Explanations'
          } else if (segmentPath === '/reference/') {
            displayText = 'Reference'
          }

          this.breadcrumbs.push({ text: displayText, link: '/docs' + segmentPath })
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

      // Normalize the path - remove any duplicate /docs/ and trailing slash
      const normalizedPath = currentPath.replace(/^(\/docs)?\/docs\//, '/docs/').replace(/\/$/, '')

      // Remove /docs/ prefix for parsing
      const pathWithoutBase = normalizedPath.replace(/^\/docs\//, '')

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
          const parentPath = '/' + parentSegments.join('/') + '/'

          // Check if this parent page likely exists
          // We'll check common paths that we know exist (without /docs/ prefix)
          const knownParents = [
            '/tutorials/',
            '/how-to-guides/',
            '/explanation/',
            '/reference/',
            '/blender/',
            '/unity/',
            '/'
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
            if (parentPath === '/tutorials/') {
              parentText = 'All Tutorials'
            } else if (parentPath === '/how-to-guides/') {
              parentText = 'All How-To Guides'
            } else if (parentPath === '/explanation/') {
              parentText = 'All Explanations'
            } else if (parentPath === '/reference/') {
              parentText = 'All Reference'
            }

            // Prepend /docs/ to the parent link path
            foundParent = { text: parentText, link: '/docs' + parentPath }
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

        // Provide a more helpful error message
        if (err.name === 'NotAllowedError' || err.message?.includes('permission')) {
          this.linkText = 'Clipboard access denied'
        } else if (err.message?.includes('fetch') || err.message?.includes('Failed to fetch')) {
          this.linkText = 'Failed to fetch content'
        } else {
          this.linkText = 'Copy failed: ' + (err.message || 'Unknown error')
        }

        setTimeout(() => {
          this.linkText = DEFAULT_LINK_TEXT
        }, 3000)
      }
    }
  }
}
</script>

<style>

.DocSearch--active .page-nav-container {
  display: none;
}

</style>

<style scoped>
.page-nav-container {
  position: relative;
}

/* Mobile hamburger button - fixed position in navbar area */
.mobile-menu-btn {
  display: none; /* Hidden on desktop */
  position: fixed;
  top: 0;
  left: 5px;
  z-index: 101; /* Above navbar (z-index: 100) */
  width: var(--navbar-height);
  height: var(--navbar-height);
  padding: 8px;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  z-index: 20190 ;
  transform: scale(0.8);
}

/* Show only on mobile (< 1024px) */
@media (max-width: 1023px) {
  .mobile-menu-btn {
    display: flex;
  }
}

.mobile-menu-btn .hamburger-line {
  display: block;
  width: 22px;
  height: 2px;
  background-color: var(--vp-c-text, #333);
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform-origin: center;
}

/* Animate to X when open */
.mobile-menu-btn.open .hamburger-line:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.mobile-menu-btn.open .hamburger-line:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.open .hamburger-line:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/*
.mobile-menu-btn:hover .hamburger-line {
  background-color: var(--c-brand, #826aed);
}
*/

/* Section header - consistent styling with line */
.section-header {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--c-text, inherit);
  opacity: 0.6;
  margin: 0;
  padding-bottom: 0.5rem;
  padding-top: 1rem;
  border-top:  solid rgba(125, 125, 125, 0.15);
}

/* Desktop sidebar navigation */
.page-nav-sidebar {
  position: fixed;
  left: 2rem;
  top: calc(var(--navbar-height) + 1.5rem);
  width: 200px;
  max-height: calc(95vh - 8rem);
  padding: 1rem;
  font-size: 0.9rem;
  z-index: 10;

  white-space: nowrap;
  overflow-x: hidden;
  overflow-y: auto;

  /* background-color: color-mix(in srgb, var(--vp-c-bg) 50%, transparent);
  backdrop-filter: blur(10px);
  */
  border-radius: 8px;
}

.page-nav-extras {
  margin-top: 2em;
}

/* Large screens: center sidebar relative to page */
@media (width > 1500px) {
  .page-nav-sidebar {
    margin-left: 50%;
    transform: translateX(-780px);
  }
}

/* Medium screens (1024px - 1410px): keep sidebar visible but adjust layout */
@media (width >= 1024px) and (width < 1410px) {
  .page-nav-sidebar {
    left: 1rem;
    width: 180px;
    font-size: 0.85rem;
  }
}

/* Hide sidebar below 1024px - mobile uses VuePress navbar menu */
@media (width < 1024px) {
  .page-nav-sidebar {
    display: none;
  }
}

.page-nav-header {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
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
  text-decoration: none;
  border-left: 2px solid transparent;
  padding-left: 0.5rem;
  margin-left: -0.5rem;

  /* Text ellipsis overflow */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.page-nav-link:hover {
  color: var(--c-text-accent, #826aed);
  border-left-color: rgba(125, 125, 125, 0.3);
}

.page-nav-item.active .page-nav-link {
  color: var(--c-text-accent, #826aed);
  border-left-color: var(--c-text-accent, #826aed);
  font-weight: 800 !important;
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

/* Mobile Sidebar Styles */
.mobile-sidebar {
  display: none;
  position: fixed;
  top: 0px; /* Below navbar */
  left: 0;
  bottom: 0;
  width: 280px;
  max-width: 85vw;
  background: var(--c-quote-background);
  z-index: 150; /* Below hamburger button (200) but above page content */
  transform: translateX(calc(-100% - 20px));
  transition: transform 0.3s ease;
  overflow-y: auto;
  padding: 1rem;
  padding-top: calc(58px + 1rem);
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.20);
}

.mobile-sidebar.open {
  transform: translateX(0);
}

@media (max-width: 1023px) {
  .mobile-sidebar {
    display: block;
  }
}

.mobile-nav-section {
  margin-bottom: 1.0rem;
}

.mobile-nav-section:last-child {
  border-bottom: none;
}

.mobile-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mobile-nav-list li {
  margin: 0;
}

.mobile-nav-list a {
  display: block;
  padding: 0.3rem 0;
  color: var(--c-text, inherit);
  text-decoration: none;
  font-size: 0.95rem;
}

.mobile-nav-list a:hover {
  color: var(--c-text-accent, #826aed);
}
</style>

<style>
/* Global styles for page content layout adjustments */

/* Between 1024px and 1410px: shift page content to make room for sidebar */
@media (width >= 1024px) and (width < 1410px) {
  .vp-page {
    padding-left: 220px !important;
  }
  
  .theme-default-content {
    max-width: calc(100% - 20px) !important;
  }
}

/* Mobile parallax effect - move ONLY page content when menu opens (NOT navbar) */
@media (max-width: 1023px) {
  .vp-page {
    transition: transform 0.3s ease;
  }
  
  /* Navbar stays fixed - no parallax */
  .vp-navbar {
    z-index: 2000 !important;
  }
  
  /*
  .page-nav-container.menu-open ~ .vp-page,
  body:has(.page-nav-container.menu-open) .vp-page {
    transform: translateX(calc(100% - 20px));
  }
  
  body:has(.page-nav-container.menu-open) .vp-page {
    transform: translateX(min(calc(100% - 20px), 280px));
  }
  */
}
</style>
