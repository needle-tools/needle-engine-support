<script setup>

// props
defineProps({
    title: String,
    url: String,
    page: String,
    author: String,
    profileImage: String,
    githubUrl: String,
})


</script>

<template>
    <div class="contribution">
        <div class="header">
            <div class="profile">
                <img :src="profileImage" alt="profile image" />
                <a class="authorname" :href="page">
                    <span>{{ author }}</span>
                </a>
            </div>
            <div class="links">
                <a v-if="githubUrl" :href="githubUrl" target="_blank" rel="noopener noreferrer">View on Github</a>
            </div>
        </div>
        <div v-if="title" class="title">
            <h2>{{ title }}</h2>
        </div>
        <slot></slot>
    </div>
</template>

<style scoped>
.contribution {
    margin-bottom: 20px;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.profile {
    display: flex;
    align-items: center;
    margin-top: .5em;
    margin-bottom: 1em;
    margin-left: .9em;
    margin-top: 1em;
}

.profile img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
    border-radius: 50%;
    border: 2px solid #ccc;
    pointer-events: none;
}

.profile .authorname {
    font-size: 1.2rem;
    font-weight: 600;
    color: #000;
    text-decoration: none;
}

html.dark .authorname {
    color: #fff;
}
</style>