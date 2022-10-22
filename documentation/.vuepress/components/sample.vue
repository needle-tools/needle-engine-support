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
iframe {
  width: 100%;
  height: 100%;
  border: 0;
  aspect-ratio: 16/9;
  border-radius: 1em;
}

@media (max-aspect-ratio: 1/1) {
  iframe {
    aspect-ratio: 9/9
  }
}

@media (max-aspect-ratio: 9/16) {
  iframe {
    aspect-ratio: 9/14
  }
}
</style>

<template>
  <iframe :src="src" allow="xr; xr-spatial-tracking; camera; microphone; fullscreen;display-capture"></iframe>
</template>