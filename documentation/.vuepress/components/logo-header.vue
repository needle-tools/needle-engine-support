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

.logo-header img {
    height: 1.6em;
    width: auto;
    margin: 0;
    flex-shrink: 0;
    object-fit: contain;
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
