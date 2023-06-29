<script setup>

defineProps({
    title: String,
    url: String,
})
</script>


<template>
    <a class="entry" :href="url">
        <div>
            {{ title }}
        </div>
    </a>
</template>


<style scoped>
.entry {
    display: block;
    padding: .4em;
    padding-bottom: .5em;
    padding-left: 1em;
    border-radius: .7em;
    font-size: 1.3em;
    /* border: 1px solid rgba(0, 0, 0, 0); */
}

.entry:hover {
    text-decoration: none;
    background-color: rgba(100, 100, 222, .2);
    box-shadow: inset 0 0 50px rgba(255, 255, 255, 1);
    /* border: 1px solid rgba(200, 200, 200, 1); */
}

html.dark .entry:hover {
    box-shadow: inset 0 0 30px rgba(50, 50, 50, 1);
    /* border: 1px solid rgba(100, 100, 180, .5); */
}
</style>
