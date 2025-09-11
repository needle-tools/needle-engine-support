<template>
    <div class="code-wrap">

        <slot />

    </div>
</template>


<style>
.code-wrap {
    & pre {
        white-space: pre-wrap;
    }
}
</style>