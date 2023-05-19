<script>
export default {}
</script>

<style>
.actiongroup {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.actiongroup>* {
    margin: .0em .5em;
}
</style>

<template>
    <div class="actiongroup">
        <slot></slot>
    </div>
</template>