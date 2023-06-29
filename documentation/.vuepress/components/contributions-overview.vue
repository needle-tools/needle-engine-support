<script>
</script>


<template>

    <div class="list">
        <slot></slot>
    </div>

</template>


<style>
.list{
    display: flex;
    flex-direction: column;
    justify-content: start;
}

.list > * {
    width: 95%;
    margin-bottom: 20px;
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: .5em;
}

</style>