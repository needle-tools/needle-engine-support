<script>
import { withBase } from '@vuepress/client'
import { computed } from 'vue'

export default {
    props: {
        logo: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            default: ''
        },
        maxHeight: {
            type: String,
            default: undefined
        },
        maxWidth: {
            type: String,
            default: undefined
        },
        aspectRatio: {
            type: String,
            default: undefined
        }
    },
    setup(props) {
        const logoSrc = computed(() => {
            // If the path already includes /docs/ or is absolute, return as-is
            if (props.logo.startsWith('/docs/') || props.logo.startsWith('http')) {
                return props.logo
            }
            // Otherwise, use withBase to add the base path
            return withBase(props.logo)
        })

        const imageStyle = computed(() => {
            const style = {}
            if (props.maxHeight) {
                style.maxHeight = props.maxHeight
            }
            if (props.maxWidth) {
                style.maxWidth = props.maxWidth
            }
            if (props.aspectRatio) {
                style.aspectRatio = props.aspectRatio
            }
            return style
        })

        return {
            logoSrc,
            imageStyle
        }
    }
}
</script>

<style scoped>
.logo-header {
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
    margin: 0;
    vertical-align: middle;
}

/*
  A fixed square, not height with width:auto. The logos have very different
  aspect ratios — a wide wordmark next to a round badge — so sizing by height
  alone left every label starting at a different x and the list looking
  ragged. contain scales each logo inside the box without distorting it.
*/
.logo-header img {
    width: var(--logo-header-size, 1.6em);
    height: var(--logo-header-size, 1.6em);
    margin: 0;
    flex-shrink: 0;
    object-fit: contain;
    object-position: center;
}

.logo-header-text {
    display: inline-flex;
    align-items: center;
    margin: 0;
    line-height: 1.6em;
}
</style>

<template>
    <span class="logo-header">
        <img :src="logoSrc" :alt="alt" :style="imageStyle" />
        <span class="logo-header-text"><slot></slot></span>
    </span>
</template>
