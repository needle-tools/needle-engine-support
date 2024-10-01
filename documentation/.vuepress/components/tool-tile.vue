<script lang="ts">

export default {
    props: {
        image: String,
        docs_url: String,
    },
    methods: {
        getClass,
    }
}

function getClass() {
    if (!this.$slots['video-tutorial']) {
        return "small";
    } else {
        return "";
    }
}

</script>

<template>
    <div class="tile" :class='getClass()'>
        <img :src="image" alt="Tool Image" :class='image ? "": "hidden"'/>
        <h3><slot name="tool-name"></slot></h3>
        <p class="description"><slot name="tool-description"></slot></p>
        <slot name="download-button"></slot>
        <p><slot name="video-tutorial"></slot></p>
        <a v-if="docs_url":href="docs_url">Next Steps</a>
    </div>
</template>


<style scoped>
    img {
        height: 110px;
        max-height: 70px;
        aspect-ratio: 1/1;
        object-fit: contain;
        pointer-events: none;
    }

    img.hidden {
        visibility: hidden;
    }

    div.tile {
        background: var(--b811b9c2);
        border: var(--e2940f36) solid var(--7e5aa0ea);
        border-radius: 1em;
        box-shadow: 0 0px 5px 1px #0000001a;
        outline: 1px solid var(--c-border);
        display: flex;
        flex-direction: column;
        max-width: 230px;
        min-width: 200px;
        padding: 1em;
        margin-right: 1em;
        margin-top: 1em;
        position: relative;
        align-items: center;
        justify-content: space-between;
        flex-wrap: nowrap;
    }

    div.small {
        height: 220px;
    }

    div.small .description {
        /* height: initial; */
        margin-bottom: 0.5em;
    }

    h3 {
        font-weight: bold;
        margin-top: 0.5em;
        padding-top: 0;
    }

    p {
        margin: 0;
        padding: 0;
    }

    p.description {
        font-size: 0.8em;
        height: 75px;
        margin-top: 0.5em;
        text-align: center;
    }

    @media screen and (max-width: 720px) {
        div.tile {
            min-width: initial;
            max-width: initial;
            width: 70%;
        }
    }
</style>