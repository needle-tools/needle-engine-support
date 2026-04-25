<template>
  <span></span>
</template>

<script>
export default {
  name: 'AskAiSelection',
  mounted() {
    console.log('AskAiSelection mounted')
    this.createPopup()
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('mousedown', this.onMouseDown)
  },
  beforeUnmount() {
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('mousedown', this.onMouseDown)
    if (this._popup) this._popup.remove()
  },
  methods: {
    createPopup() {
      const popup = document.createElement('a')
      popup.className = 'ask-ai-selection-popup'
      popup.href = '#'
      popup.textContent = 'Ask AI'
      popup.addEventListener('mousedown', (e) => {
        e.preventDefault()
        e.stopPropagation()
        const sel = window.getSelection()
        const text = sel?.toString().trim()
        if (text) {
          const truncated = text.length > 1000 ? text.substring(0, 1000) + '...' : text
          const url = this.buildUrl(truncated)
          window.open(url, '_blank', 'noopener')
        }
        this.hidePopup()
      })
      document.body.appendChild(popup)
      this._popup = popup
    },

    onMouseDown(e) {
      if (this._popup && !this._popup.contains(e.target)) {
        this.hidePopupDelayed()
      }
    },

    onMouseUp(e) {
      setTimeout(() => {
        const sel = window.getSelection()
        const text = sel?.toString().trim()
        if (!text || text.length < 3) {
          this.hidePopupDelayed()
          return
        }
        this.cancelHide()
        this.showPopup(e.clientX, e.clientY)
      }, 300)
    },

    showPopup(x, y) {
      const popup = this._popup
      if (!popup) return
      popup.style.top = `${y + window.scrollY - 46}px`
      popup.style.left = `${x}px`
      popup.classList.add('visible')
    },

    hidePopupDelayed() {
      this.cancelHide()
      this._hideTimeout = setTimeout(() => this.hidePopup(), 300)
    },

    cancelHide() {
      if (this._hideTimeout) {
        clearTimeout(this._hideTimeout)
        this._hideTimeout = null
      }
    },

    hidePopup() {
      this.cancelHide()
      if (this._popup) this._popup.classList.remove('visible')
    },

    buildUrl(question) {
      const page = typeof window !== 'undefined' ? window.location.href : ''
      const msg = `Please help me understand: "${question}"\nSource: ${page}`
      return `https://cloud.needle.tools/ai/chat/needle-documentation?message=${encodeURIComponent(msg)}`
    }
  }
}
</script>

<style>
.ask-ai-selection-popup {
  position: absolute;
  transform: translateX(-50%);
  padding: 0.2rem 0.6rem;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--c-text-accent, #826aed);
  background: var(--c-quote-background, #f8f8f8);
  border: 1px solid oklch(from var(--c-text-accent, #826aed) l c h / 0.25);
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s;
}

.ask-ai-selection-popup.visible {
  opacity: 1;
  pointer-events: auto;
}

.ask-ai-selection-popup::after {
  content: none !important;
}

.ask-ai-selection-popup:hover {
  border-color: var(--c-text-accent, #826aed);
  text-decoration: none;
}
</style>
