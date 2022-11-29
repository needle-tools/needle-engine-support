<!-- https://stackblitz.com/edit/vuepress-auto-reg-components?file=docs%2F.vuepress%2Fconfig.js -->

<script>
// export default {}
const props = {
  props: {
    src: String,
    controls: Boolean,
    limit_height: Boolean,
  }
}

export default props;
</script>

<style scoped>
.container {
  max-width: 100%;
  height: v-bind('limit_height ? "400px" : "initial"');
}

video,
#ytplayer {
  background: rgba(0, 0, 0, .2);
  display: block;
  width: v-bind('limit_height ? "auto" : "100%"');
  height: v-bind('limit_height ? "100%" : "auto"');
  max-width: 100%;
  max-height: 100%;
  margin: .75em 0;
}

#ytplayer {
  aspect-ratio: 16/9;
  border-radius: 1em;
}

@media screen and (max-width: 1200px) {
  .container {
    width: 100%;
    height: auto;
  }

  video,
  #ytplayer {
    width: 100%;
    height: auto;
  }
}
</style>

<template>
  <div v-if='src.includes("youtube.com")' class="container">
    <iframe id="ytplayer" class="video"
      :src='src.replace("watch?v=", "embed/") + "?autoplay=0&origin=http://needle.tools"' frameborder="0"
      allowfullscreen />
  </div>
  <div v-else class="container">
    <!-- <video loop autoplay="autoplay" playsinline style="pointer-events: none!important;" :src="src"></video> -->
    <video loop autoplay="autoplay" controls :src="src"></video>
  </div>
</template>