<!-- https://stackblitz.com/edit/vuepress-auto-reg-components?file=docs%2F.vuepress%2Fconfig.js -->

<script>
// export default {}
const props = {
  props: {
    src: String,
    controls: Boolean,
  }
}

export default props;
</script>

<style scoped>
video, #ytplayer {
  display: block;
  width: 100%;
  aspect-ratio: 16/9;
  height: auto;
}
</style>

<template>
  <div v-if='src.includes("youtube.com")'>
    <iframe id="ytplayer" class="video" :src='src.replace("watch?v=", "embed/") + "?autoplay=1&origin=http://needle.tools"' frameborder="0"
    allowfullscreen />
  </div>
  <div v-else>
    <!-- <video loop autoplay="autoplay" playsinline style="pointer-events: none!important;" :src="src"></video> -->
    <video loop autoplay="autoplay" controls :src="src"></video>
  </div>
</template>