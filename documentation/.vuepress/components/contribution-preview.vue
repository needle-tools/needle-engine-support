<script setup>
const props = defineProps({
    title: String,
    pageUrl: String,
})

function onClick(){
    window.location.href = props.pageUrl;
}

</script>

<template>
    <div class="preview" v-on:click="onClick">
        <div class="title">
            {{ title }}
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
a {
    color: initial;
    text-decoration: none;
}
.preview {
    margin: 1%;
    display: inline-block;
    position: relative;
    min-width: 48%;
    flex-grow: 1;
    flex-shrink: 1;
    height: 300px;
    overflow: hidden;
    user-select: none;
    border-radius: .5em;
    box-shadow: 0 0 1px rgba(0, 0, 100, .2);
    border: 1px solid rgba(0, 0, 100, .3);
    transition: all .1s ease-in-out;
}
.preview:hover {
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 100, .1);
    transition: all .1s ease-in-out;
}

.content {
    overflow: hidden;
    bottom: 10px;
    padding: 0 10px;
    position: relative;
}

.title {
    display: flex;
    align-items: center;
    font-size: 1.5em;
    margin: 0;
    padding: 1em;
    height: 3em;
    background: linear-gradient(180deg, rgba(100, 100, 200, .2) 20%, rgba(200, 200, 200, 0) 100%);
    user-select: initial !important;
}

</style>