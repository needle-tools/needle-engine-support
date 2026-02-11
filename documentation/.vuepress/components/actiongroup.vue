<script>
export default {}
</script>

<style scoped>
.actiongroup {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: .5em;
}
</style>

<template>
    <div class="actiongroup">
        <slot></slot>
    </div>
</template>