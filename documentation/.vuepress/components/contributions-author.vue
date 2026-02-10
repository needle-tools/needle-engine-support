<script setup>
defineProps({
    name: String,
    url: String,
    githubUrl: String,
    profileImage: String,
    overviewLink: String,
})
</script>

<template>
    <a v-if="overviewLink" :href="overviewLink" class="overview-link">◀ Overview</a>
    <contribution-header :profileImage="profileImage" :author="name" :githubUrl="githubUrl"></contribution-header>
    <div class="previews">
        <slot></slot>
    </div>
    <div class="footer">
        <a href="https://github.com/needle-tools/needle-engine-support/discussions/new?category=share">Add your
            contribution</a>
    </div>
</template>


<style scoped>
.overview-link {
    display: block;
    padding-top: 1em;
    padding-bottom: 1em;
    text-decoration: none;
}

.overview-link:hover {
    text-decoration: none;
}

.previews {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.footer {
    margin-top: 1em;
    display: block;
    padding-top: 1em;
    border-top: 1px solid rgba(100, 100, 100, .2);
}</style>