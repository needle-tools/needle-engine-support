<script>
// export default {}
export default {
    props: {
        href: String,
        subtitle: String,
        icon: String,
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
    background: rgba(79, 133, 115, 0);
    color: inherit;
    padding: 1em 1em 1.2em 1em;
    border-radius: .5em;
    border: 1px solid rgba(100, 100, 100, .3);
    font-size: 1.2em;
    height: 30px;
    transition: all .5s ease-in-out;
    margin: 0;
}

a:hover {
    text-decoration: none;
}

.action:hover {
    /* transform: translate(0, -5px); */
    transition: all .3s ease-in-out;
    border: 1px solid rgba(100, 100, 100, 1);
}

.subtitle {
    font-size: .8rem;;
}

.action-content {
    display: flex;
    align-items: center;
    gap: 0.5em;
}

.icon {
    font-size: 1.2em;
}

</style>

<template>
    <a class="action no-external-link-icon" :href="href">
        <span class="action-content">
            <span class="icon" v-if="icon">{{ icon }}</span>
            <slot></slot>
        </span>
        <span class="subtitle" v-if="subtitle">{{ subtitle }}</span>
    </a>
</template>