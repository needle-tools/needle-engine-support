<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
.material-icon {
    font-family: 'Material Symbols Outlined';
    font-size: 1.2em;
    vertical-align: middle;
    line-height: 1;
    display: inline;
    translate: no;
}
</style>

<template>
    <span class="material-icon">{{ name }}</span>
</template>
