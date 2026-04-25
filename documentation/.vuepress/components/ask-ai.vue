<template>
  <span></span>
</template>

<script>
export default {
  name: 'AskAi',
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => this.addButtons(), 300)
    })
  },
  methods: {
    addButtons() {
      const article = document.querySelector('.vp-theme-container, .vp-page')
      if (!article) return

      const headers = article.querySelectorAll('h2')
      for (const h of headers) {
        if (h.querySelector('.ask-ai-btn')) continue
        const title = h.textContent.replace(/^#\s*/, '').trim()
        if (!title) continue

        const btn = document.createElement('a')
        btn.className = 'ask-ai-btn'
        btn.href = '#'
        btn.target = '_blank'
        btn.rel = 'noopener'
        btn.title = 'Ask Needle AI about this'
        btn.textContent = 'Ask AI'
        btn.addEventListener('click', (e) => {
          e.stopPropagation()
          e.preventDefault()
          const url = this.buildUrl(title)
          window.open(url, '_blank', 'noopener')
        })
        h.appendChild(btn)
      }
    },
    buildUrl(question) {
      const page = typeof window !== 'undefined' ? window.location.href : ''
      const msg = `${question}\nSource: ${page}`
      return `https://cloud.needle.tools/ai/chat/needle-documentation?message=${encodeURIComponent(msg)}`
    }
  }
}
</script>

<style>
.ask-ai-btn {
  display: inline-block;
  margin-left: 0.5rem;
  padding: 0.1rem 0.5rem;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--c-text-accent, #826aed);
  background: oklch(from var(--c-text-accent, #826aed) l c h / 0.08);
  border: 1px solid oklch(from var(--c-text-accent, #826aed) l c h / 0.25);
  border-radius: 4px;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  transition: all 0.2s;
  opacity: 0;
}

h2:hover .ask-ai-btn {
  opacity: 1;
}

.ask-ai-btn::after {
  content: none !important;
}

.ask-ai-btn:hover {
  background: oklch(from var(--c-text-accent, #826aed) l c h / 0.15);
  border-color: oklch(from var(--c-text-accent, #826aed) l c h / 0.5);
  text-decoration: none;
}
</style>
