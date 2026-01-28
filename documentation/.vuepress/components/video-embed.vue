<!-- https://stackblitz.com/edit/vuepress-auto-reg-components?file=docs%2F.vuepress%2Fconfig.js -->

<script>
// export default {}
const props = {
  props: {
    src: String,
    controls: Boolean,
    limit_height: Boolean,
    max_height: String,
  },
  data() {
    return {
      videoAspectRatio: '16/9', // Default aspect ratio
    }
  },
  methods: {
    getUrl,
    onMetadataLoaded(event) {
      const video = event.target;
      if (video.videoWidth && video.videoHeight) {
        this.videoAspectRatio = `${video.videoWidth}/${video.videoHeight}`;
      }
    }
  }
}

function getUrl(src) {

  let url = new URL(src);
  const videoId = url.searchParams.get("v");
  url.pathname = url.pathname.replace("watch", "embed");
  if (videoId) url.pathname += `/${videoId}`;
  url.searchParams.set("autoplay", "0");
  url.searchParams.set("origin", "http://docs.needle.tools");
  url.searchParams.set("controls", "1");
  url.searchParams.set("loop", "1");
  url.searchParams.set("modestbranding", "1");
  url.searchParams.set("showinfo", "0");
  url.searchParams.set("color", "white");
  url.searchParams.set("rel", "0");
  src = url.toString();
  console.log(src);
  return src;
}

export default props;
</script>

<style scoped>
.container {
  max-width: 100%;
  /*
  height: v-bind('limit_height ? "400px" : "initial"');

  */
  aspect-ratio: v-bind('videoAspectRatio');
  max-height: 300px;
  max-height: v-bind('limit_height || max_height ? max_height : "initial"');
  border-radius: 8px;
  overflow: hidden;
  margin: .75em 0;
}

video,
#ytplayer {
  background: rgba(0, 0, 0, .2);
  display: block;
  width: v-bind('limit_height ? "auto" : "100%"');
  height: v-bind('limit_height ? "100%" : "auto"');
  max-width: 100%;
  max-height: 100%;
  margin: 0;
  max-height: v-bind('limit_height ? max_height : "100%"');
  aspect-ratio: v-bind('videoAspectRatio');
  border-radius: 8px;
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
    <iframe id="ytplayer" class="video" :src="getUrl(src)" frameborder="0" allowfullscreen />
  </div>
  <div v-else class="container">
    <!-- <video loop autoplay="autoplay" playsinline style="pointer-events: none!important;" :src="src"></video> -->
    <video loop autoplay controls :src="src" @loadedmetadata="onMetadataLoaded"></video>
  </div>
</template>