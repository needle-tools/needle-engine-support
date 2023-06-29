
<script setup>

// props
defineProps({
    title: String,
    url: String,
    page: String,
    author: String,
    profileImage: String,
    contributions: Array,
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
        </div>
        <slot></slot>
    </div>
</template>

<style scoped>
.contribution {
    margin-bottom: 20px;
}
.profile {
    display: flex;
    align-items: center;
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
</style>