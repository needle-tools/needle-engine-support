<script>
export default {
    props: {
        title: String,
        open: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            isOpen: this.open
        }
    },
    mounted() {
        // Listen for the beforematch event (Chromium browsers)
        // This fires when Ctrl+F finds text inside a hidden-until-found area
        const body = this.$refs.body;
        if (body) {
            body.addEventListener('beforematch', () => {
                this.isOpen = true;
            });
        }
    },
    methods: {
        toggle() {
            this.isOpen = !this.isOpen;
        }
    }
}
</script>

<style scoped>
.faq-section {
    margin: 1.5em 0;
    border-radius: 12px;
    border: 1px solid rgba(130, 106, 237, 0.15);
    background: rgba(130, 106, 237, 0.03);
    overflow: hidden;
    transition: border-color 0.3s ease;
}

.faq-section:hover {
    border-color: rgba(130, 106, 237, 0.3);
}

.faq-header {
    display: flex;
    align-items: center;
    gap: 0.6em;
    padding: 0.8em 1.2em;
    cursor: pointer;
    user-select: none;
    background: rgba(130, 106, 237, 0.06);
    border-bottom: 1px solid rgba(130, 106, 237, 0.1);
    transition: background 0.2s ease;
}

.faq-header:hover {
    background: rgba(130, 106, 237, 0.1);
}

.faq-chevron {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    transition: transform 0.3s ease;
    color: var(--vp-c-accent, #826aed);
}

.faq-chevron.open {
    transform: rotate(90deg);
}

.faq-chevron svg {
    width: 16px;
    height: 16px;
}

.faq-title {
    font-size: 1.15em;
    font-weight: 700;
    color: var(--vp-c-dark);
    margin: 0;
    line-height: 1.4;
}

.faq-body {
    padding: 0.5em 1.5em 1em;
    overflow: hidden;
}

.faq-body.collapsed {
    content-visibility: hidden;
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
}

:root[data-theme='dark'] .faq-section {
    border-color: rgba(183, 170, 240, 0.15);
    background: rgba(183, 170, 240, 0.03);
}

:root[data-theme='dark'] .faq-header {
    background: rgba(183, 170, 240, 0.06);
    border-bottom-color: rgba(183, 170, 240, 0.1);
}

:root[data-theme='dark'] .faq-header:hover {
    background: rgba(183, 170, 240, 0.1);
}

:root[data-theme='dark'] .faq-section:hover {
    border-color: rgba(183, 170, 240, 0.3);
}
</style>

<template>
    <div class="faq-section">
        <div class="faq-header" @click="toggle" role="button" :aria-expanded="isOpen">
            <span class="faq-chevron" :class="{ open: isOpen }">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </span>
            <span class="faq-title">{{ title }}</span>
        </div>
        <div class="faq-body" ref="body" :class="{ collapsed: !isOpen }" :hidden="!isOpen ? 'until-found' : undefined">
            <slot></slot>
        </div>
    </div>
</template>
