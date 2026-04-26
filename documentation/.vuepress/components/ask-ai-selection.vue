<template>
  <span></span>
</template>

<script>
export default {
  name: 'AskAiSelection',
  mounted() {
    this.createPopup()
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('mousedown', this.onMouseDown)
  },
  beforeUnmount() {
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('mousedown', this.onMouseDown)
    this.clearHighlight()
    if (this._popup) this._popup.remove()
  },
  methods: {
    createPopup() {
      const popup = document.createElement('div')
      popup.className = 'ask-ai-selection-popup'

      const input = document.createElement('input')
      input.type = 'text'
      input.className = 'ask-ai-selection-input'
      input.placeholder = 'Ask AI about selection...'
      input.addEventListener('mousedown', (e) => e.stopPropagation())
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          this.submit(input.value.trim())
        }
        if (e.key === 'Escape') {
          this.hidePopup()
        }
      })

      const btn = document.createElement('button')
      btn.className = 'ask-ai-selection-btn material-symbols-outlined'
      btn.setAttribute('translate', 'no')
      btn.textContent = 'send'
      btn.addEventListener('mousedown', (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.submit(input.value.trim())
      })

      popup.appendChild(input)
      popup.appendChild(btn)
      document.body.appendChild(popup)
      this._popup = popup
      this._input = input
    },

    setHighlight(range) {
      this.clearHighlight()
      if (!CSS.highlights) return
      const highlight = new Highlight(range)
      CSS.highlights.set('ask-ai-selection', highlight)
    },

    clearHighlight() {
      if (CSS.highlights) CSS.highlights.delete('ask-ai-selection')
    },

    submit(customQuestion) {
      const text = this._savedSelection
      if (text) {
        const truncated = text.length > 1000 ? text.substring(0, 1000) + '...' : text
        const url = this.buildUrl(truncated, customQuestion)
        window.open(url, '_blank', 'noopener')
      }
      this.hidePopup()
    },

    onMouseDown(e) {
      if (this._popup && !this._popup.contains(e.target)) {
        this.hidePopupDelayed()
      }
    },

    onMouseUp(e) {
      if (this._popup && this._popup.contains(e.target)) return
      setTimeout(() => {
        const sel = window.getSelection()
        const text = sel?.toString().trim()
        if (!text || text.length < 3) {
          if (!this._savedSelection) this.hidePopupDelayed()
          return
        }
        this._savedSelection = text
        this._savedRange = sel.rangeCount > 0 ? sel.getRangeAt(0).cloneRange() : null
        this.cancelHide()
        this.showPopup(e.clientX, e.clientY)
      }, 300)
    },

    showPopup(x, y) {
      const popup = this._popup
      if (!popup) return
      popup.style.top = `${y + window.scrollY - 50}px`
      popup.style.left = `${x}px`
      popup.classList.add('visible')
      if (this._input) {
        this._input.value = ''
        // Apply custom highlight so selection stays visible while input has focus
        if (this._savedRange) this.setHighlight(this._savedRange)
        this._input.focus({ preventScroll: true })
      }
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
      this.clearHighlight()
      if (this._popup) this._popup.classList.remove('visible')
      this._savedSelection = null
      this._savedRange = null
    },

    buildUrl(selection, customQuestion) {
      const page = typeof window !== 'undefined' ? window.location.href : ''
      let msg
      if (customQuestion) {
        msg = `${customQuestion}\n\nContext: "${selection}"\nSource: ${page}`
      } else {
        msg = `Please help me understand: "${selection}"\nSource: ${page}`
      }
      return `https://cloud.needle.tools/ai/chat/needle-documentation?message=${encodeURIComponent(msg)}`
    }
  }
}
</script>

<style>
::highlight(ask-ai-selection) {
  color: var(--c-selection-color, #000000);
  background-color: var(--c-selection-bg, #ccff6ca8);
}

.ask-ai-selection-popup {
  position: absolute;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0;
  background: var(--c-quote-background, #f8f8f8);
  border: 1px solid var(--c-border, #eaecef);
  border-radius: 8px;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s;
  overflow: hidden;
}

.ask-ai-selection-popup.visible {
  opacity: 1;
  pointer-events: auto;
  transition: opacity 0.15s, top 0.2s ease, left 0.2s ease;
}

.ask-ai-selection-popup::after {
  content: none !important;
}

.ask-ai-selection-input {
  border: none;
  outline: none;
  background: transparent;
  color: var(--c-text, #333);
  font-size: 0.75rem;
  padding: 0.35rem 0.5rem;
  width: 180px;
  font-family: inherit;
}

.ask-ai-selection-input::placeholder {
  color: var(--c-text-lighter, #999);
  font-weight: 500;
}

.ask-ai-selection-btn {
  border: none;
  background: transparent;
  color: var(--c-text, #333);
  font-family: 'Material Symbols Outlined';
  font-size: 1.1rem;
  font-weight: 400;
  padding: 0.35rem 0.5rem;
  cursor: pointer;
  line-height: 1;
}

.ask-ai-selection-btn:hover {
  background: var(--c-border, #eaecef);
}
</style>
