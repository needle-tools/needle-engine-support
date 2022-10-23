<script>
// export default {}
export default {
    props: {
        href: String
    }
}
</script>

<style scoped>
.action {
    display: inline-block;
    /* background: #826aed; */
    background: rgba(125, 125, 125, .1);
    color: inherit;
    padding: 1em 1em 1.2em 1em;
    border-radius: 1em;
    margin: 1em;
    box-shadow: 0 0 .5em rgba(100, 100, 100, .2), inset 0 0 1.5em rgba(100, 100, 100, .1);
    border: 1px solid rgba(100, 100, 100, .3);
    transition: transform .2s ease-in-out;
    font-size: 1.2em;
    /* font-weight: normal; */
}

a:hover {
    text-decoration: none;
}

.action:hover {
    /* transform: translate(0, -5px); */
    transform: scale(1.1);
    transition: transform .1s ease-in-out;
}
</style>

<template>
    <a class="action" :href="href">
        <slot></slot>
    </a>
</template>