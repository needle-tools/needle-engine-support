<template>
    <div class="code-wrap">

        <slot />

    </div>
</template>


<style scoped>
.code-wrap {
    & pre {
        white-space: pre-wrap;
    }
}
</style>