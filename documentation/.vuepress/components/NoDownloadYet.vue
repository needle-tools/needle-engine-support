<script lang="ts">

export default {
    methods: {
        checkQueryParams,
    }
}

function checkQueryParams() {
    if (typeof window === 'undefined') {
        return false;
    }
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has('dl');
}
</script>

<template>
    <slot v-if="!checkQueryParams()"></slot>
</template>