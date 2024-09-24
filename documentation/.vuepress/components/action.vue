<script>
// export default {}
export default {
    props: {
        href: String,
        subtitle: String,
    }
}
</script>

<style scoped>
.action {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background: #826aed; */
    background: rgba(125, 125, 125, .1);
    color: inherit;
    padding: 1em 1em 1.2em 1em;
    border-radius: 1em;
    margin: .5em;
    box-shadow: 0 0 .5em rgba(100, 100, 100, .2), inset 0 0 1.5em rgba(100, 100, 100, .1);
    border: 1px solid rgba(100, 100, 100, .3);
    font-size: 1.2em;
    height: 30px;
    transition: all .1s ease-in-out;
}

a:hover {
    text-decoration: none;
}

.action:hover {
    /* transform: translate(0, -5px); */
    transition: all .1s ease-in-out;
    box-shadow: 0 0 .3em rgba(255, 255, 100, .5), inset 0 0 1.5em rgba(200, 200, 100, .1);
}

.subtitle {
    font-size: .8rem;;
}

</style>

<template>
    <a class="action no-external-link-icon" :href="href">
        <slot></slot>
        <span class="subtitle" v-if="subtitle">{{ subtitle }}</span>
    </a>
</template>