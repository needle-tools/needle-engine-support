<!-- https://stackblitz.com/edit/vuepress-auto-reg-components?file=docs%2F.vuepress%2Fconfig.js -->

<script>
// export default {}
const props = {
  props: {
    src: String,
    sources: Array,
    controls: Boolean,
    limit_height: Boolean,
    max_height: String,
    /*
      Pixels to trim off every edge, measured in the source video's own pixels.
      For screen recordings that captured a window along with its rounded
      corners and border, those edges are baked into the frames — this zooms in
      just far enough to push them out of view, so the page's own corner radius
      is the only one you see. Left at 0 nothing happens.
    */
    crop: { type: [Number, String], default: 0 },
    /** Soft drop shadow, to lift the video off the page. */
    shadow: Boolean,
    /** Soft hairline border, for footage whose edges are close to the page colour. */
    outline: Boolean,
  },
  data() {
    return {
      videoAspectRatio: '16/9', // Default aspect ratio
      videoNaturalWidth: 0,     // known only once metadata has loaded
    }
  },
  computed: {
    /*
      Scale the video up so `crop` source pixels fall outside the frame on each
      side. Expressed against the source width, so it trims the same amount of
      picture no matter how wide the video is rendered.
    */
    cropTransform() {
      const trim = parseFloat(this.crop) || 0;
      const w = this.videoNaturalWidth;
      if (trim <= 0 || !w || trim * 2 >= w) return 'none';
      return `scale(${(w / (w - trim * 2)).toFixed(5)})`;
    }
  },
  methods: {
    getUrl,
    getMimeType(url) {
      if (url.endsWith('.mp4')) return 'video/mp4';
      if (url.endsWith('.webm')) return 'video/webm';
      return undefined;
    },
    onMetadataLoaded(event) {
      const video = event.target;
      if (video.videoWidth && video.videoHeight) {
        this.videoAspectRatio = `${video.videoWidth}/${video.videoHeight}`;
        this.videoNaturalWidth = video.videoWidth;
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
/*
  Wrapper for anything that has to paint OUTSIDE the clipped frame. Both effects
  are deliberately quiet: a screenshot should sit on the page, not be framed
  like a photograph.
*/
.video-frame {
  margin: .75em 0;
  border-radius: 8px;
}

.video-frame.has-shadow {
  /* Two layers: a tight one for contact, a wide soft one for the lift. */
  box-shadow:
    0 1px 2px rgba(0, 0, 0, .1),
    0 8px 24px rgba(0, 0, 0, .20);
}

/* The shadow disappears into a dark page, so it leans on ambient light instead. */
html[data-theme='dark'] .video-frame.has-shadow {
  box-shadow:
    0 1px 2px rgba(0, 0, 0, .5),
    0 8px 28px rgba(0, 0, 0, .7);
}

.video-frame.has-outline {
  border: 1px solid var(--vp-c-divider, rgba(125, 125, 125, .25));
  /* One pixel wider so the border's INNER edge still measures 8px, matching
     the clip on the container and keeping the two corners concentric. */
  border-radius: 9px;
}

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
  /*
    A <video> is composited onto its own layer, and neither border-radius nor
    overflow on an ancestor clips a composited child — the frames paint square
    and poke out past the radius. clip-path is applied by the compositor, so it
    does cut the corners. It lives here rather than on the video so that it
    still trims to the frame when `crop` scales the video up past these bounds.
  */
  clip-path: inset(0 round 8px);
  isolation: isolate;
  /* Spacing belongs to the frame now, so the shadow is not offset from it. */
  margin: 0;
  /* Kills the inline-block descender gap that would show as a sliver of page
     colour along the bottom border. */
  display: block;
  line-height: 0;
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
  /* Zooms past the container's edges to trim baked-in borders; see the crop prop. */
  transform: v-bind('cropTransform');
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
  <!--
    The frame carries the shadow and border, the container inside carries the
    corner clip. They cannot be the same element: clip-path clips everything the
    element paints, a box-shadow included, so a shadow set alongside it is cut
    away at the very edge it is supposed to fall outside of.
  -->
  <div class="video-frame" :class="{ 'has-shadow': shadow, 'has-outline': outline }">
    <div v-if='src && src.includes("youtube.com")' class="container">
      <iframe id="ytplayer" class="video" :src="getUrl(src)" frameborder="0" allowfullscreen />
    </div>
    <div v-else class="container">
      <video v-if="sources && sources.length" loop autoplay muted playsinline controls @loadedmetadata="onMetadataLoaded">
        <source v-for="s in sources" :key="s" :src="s" :type="getMimeType(s)" />
      </video>
      <video v-else loop autoplay muted playsinline controls :src="src" @loadedmetadata="onMetadataLoaded"></video>
    </div>
  </div>
</template>