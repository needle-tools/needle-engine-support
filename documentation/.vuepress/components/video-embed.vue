<!-- https://stackblitz.com/edit/vuepress-auto-reg-components?file=docs%2F.vuepress%2Fconfig.js -->

<script>
// export default {}
export default {
  props: {
    src: String
  }
}
</script>

<style scoped>
    video {
        max-width: 100%;
        height: auto;
    }
</style>

<template>
    <video loop autoplay="autoplay" controls :src="src"></video>
</template>