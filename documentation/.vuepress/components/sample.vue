<!-- https://stackblitz.com/edit/vuepress-auto-reg-components?file=docs%2F.vuepress%2Fconfig.js -->

<script>
// export default {}
export default {
  props: {
    src: String,
    split: {
      type: Boolean,
      default: false
    },
    noRoom: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sanitizedUrl: "",
    }
  },
  watch: {
    src: {
      immediate: true,
      handler(newSrc) {
        const url = new URL(newSrc);
        const id = Math.random().toString(36).substring(2, 6);

        // generate random room
        url.searchParams.delete("room");
        if (!this.noRoom) {
          url.searchParams.append("room", `needle_docs_${id}`);
        }

        const currentUrl = typeof window !== "undefined" ? new URL(window.location.href) : null;

        url.searchParams.append("hideClose", "");
        url.searchParams.append("utm_source", "needle_docs");
        url.searchParams.append("utm_content", currentUrl?.toString() || "");
        this.sanitizedUrl = url.toString();
      }
    }
  },
  mounted() {
    // patch touch-action inside the iframes
    const patch = (frame) => {
      if (!frame || !frame.contentWindow)
        return;

      const needleFrame = frame.contentWindow.document.getElementsByTagName("iframe")[0];

      if (needleFrame) {
        const needleDoc = needleFrame.contentWindow.document;
        const needleElement = needleDoc.querySelector("needle-engine");
        if (needleElement) {
          needleElement.style.touchAction = "pan-y";
        }
      }
    };

    patch(this.$refs.frame1);
    patch(this.$refs.frame2);
  }
}
</script>

<template>
  <div>
    <iframe :src="sanitizedUrl" ref="frame1"
      allow="xr; xr-spatial-tracking; camera; microphone; fullscreen;display-capture"></iframe>
    <iframe v-if="split === true" :src="sanitizedUrl" ref="frame2"
      allow="xr; xr-spatial-tracking; camera; microphone; fullscreen;display-capture"></iframe>
  </div>
</template>

<style scoped>
div {
  margin-top: 0.3em;
  display: flex;
  flex-direction: column;
}

iframe {
  width: 100%;
  height: 100%;
  border: 0;
  aspect-ratio: 16/9;
}

iframe:only-of-type {
  border-radius: 1em;
}

iframe:first-of-type {
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
  margin-bottom: 0.1em;
}

iframe:last-of-type {
  border-bottom-left-radius: 1em;
  border-bottom-right-radius: 1em;
  margin-top: 0.1em;
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