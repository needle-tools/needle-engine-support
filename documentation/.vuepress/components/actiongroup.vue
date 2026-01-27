<script>
export default {}
</script>

<style>
.actiongroup {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.actiongroup > * {
    margin: .5em .5em;
}
</style>

<template>
    <div class="actiongroup">
        <slot></slot>
    </div>
</template>