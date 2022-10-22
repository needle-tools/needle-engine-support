<!-- https://stackblitz.com/edit/vuepress-auto-reg-components?file=docs%2F.vuepress%2Fconfig.js -->

<script>
// export default {}
export default {
  props: {
    src: String
  }
}
</script>

<style>

</style>

<template>
    
    <iframe style="border:none; width:100%; aspect-ratio:16/9"
        :src="src"
        allow="xr-spatial-tracking; camera; microphone; fullscreen;display-capture"></iframe>
</template>