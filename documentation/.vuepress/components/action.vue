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
    border-radius: .5em;
    margin: .5em;
    border: 1px solid rgba(100, 100, 100, .3);
    font-size: 1.2em;
    height: 30px;
    transition: all .5s ease-in-out;
}

a:hover {
    text-decoration: none;
}

.action:hover {
    /* transform: translate(0, -5px); */
    transition: all .3s ease-in-out;
    border: 1px solid rgba(61, 61, 61, 0.3);
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