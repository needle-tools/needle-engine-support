
<script>

export default {
    props: {
        href: String,
        secondary: Boolean,
        same_tab: Boolean,
    }
}

</script>

<style scoped>
button {
    border: none;
    border-radius: 10em;
    text-shadow: none;
    padding: 1em 2em;
    background-color: v-bind('secondary ? "#aaa" : "#826bed"');
    transition: background-color .2s ease-in-out;
    margin: .2em;
    cursor: pointer;
    margin-left:-0.3em;
    color: white;
}

button:hover {
    background-color: #6248be;
    background-color: v-bind('secondary ? "#bbb" : "#6248be"');
    transition: background-color .2s ease-in-out;
}

a {
    text-shadow: none !important;
}
</style>

<template>
    <a :href="href" :target="same_tab ? '_self' : '_blank'">
        <button>
            <slot></slot>
        </button>
    </a>
</template>
