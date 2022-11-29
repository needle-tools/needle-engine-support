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
video,
#ytplayer {
  background: rgba(0, 0, 0, .2);
  display: block;
  width: 100%;
  height: auto;
  margin: .75em 0;
}

.limit-height {
  height: 400px;
  max-height:400px;
}

#ytplayer {
  aspect-ratio: 16/9;
  border-radius: 1em;
}
</style>

<template>
  <div v-if='src.includes("youtube.com")'>
    <iframe id="ytplayer" class="video"
      :src='src.replace("watch?v=", "embed/") + "?autoplay=0&origin=http://needle.tools"' frameborder="0"
      allowfullscreen />
  </div>
  <div v-else>
    <!-- <video loop autoplay="autoplay" playsinline style="pointer-events: none!important;" :src="src"></video> -->
    <video loop autoplay="autoplay" controls :src="src"></video>
  </div>
</template>