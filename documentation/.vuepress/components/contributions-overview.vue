<script>
</script>


<template>
    <div class="list">
        <slot></slot>
    </div>
</template>


<style scoped>
.list {
    display: flex;
    flex-direction: column;
}

.list>* {
    width: 95%;
    margin-bottom: 10px;
    border: 1px solid rgba(100, 100, 200, .2);
    border-radius: .5em;
    padding: .5em;
    padding-bottom: 2em;
    background: linear-gradient(180deg, rgba(100, 100, 200, .1) 0%, rgba(200, 200, 200, .1) 50%);
    /* box-shadow: inset 0 0 100px rgba(0, 0, 100, .05); */
}

html.dark .list>* {
    border: 1px solid rgba(200, 200, 200, .05);
    background: linear-gradient(180deg, rgba(100, 100, 200, .1) 0%, rgba(100, 100, 100, .2) 50%);
}
</style>