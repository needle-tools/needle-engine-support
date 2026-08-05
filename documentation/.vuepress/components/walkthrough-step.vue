<script>
export default {
  props: {
    // Path to the self-contained runnable example page
    src: { type: String, required: true },
    // Accessible description of the running scene
    title: { type: String, default: "Live example" },
    /*
      Optional controls for the scene. Either a comma-separated list of names,
      or an array of { name, code, label } so each row can show the call it
      makes — clicking the button and reading the line teach the same thing.
    */
    actions: { type: [String, Array], default: "" },
    /*
      Render the scene twice, as two visitors in one room. Only useful for
      networking steps, where a single view can't show anything syncing.
    */
    split: { type: Boolean, default: false },
    /*
      Drop the iframe once the step has been off screen for a while, and
      rebuild it when it comes back. A page with a dozen steps would
      otherwise hold a dozen live WebGL contexts, and browsers start
      discarding the oldest ones somewhere around sixteen.
    */
    autoUnload: { type: Boolean, default: true },
    /** Seconds off screen before unloading. */
    unloadAfter: { type: Number, default: 2 },
  },
  data() {
    return { loaded: false, mounted: false, offScreenTimer: null };
  },
  computed: {
    actionList() {
      const raw = Array.isArray(this.actions)
        ? this.actions
        : this.actions.split(',').map(name => ({ name: name.trim() }));

      return raw
        .filter(a => a && a.name)
        .map(a => ({
          name: a.name,
          code: a.code || "",
          label: a.label || a.name.charAt(0).toUpperCase() + a.name.slice(1),
        }));
    },
    /*
      Width of the widest label, so every button in a panel matches. Right
      aligned buttons of different widths leave a ragged left edge down the
      column; matching them gives the panel a single clean vertical line.
    */
    actionWidth() {
      const longest = this.actionList.reduce((n, a) => Math.max(n, a.label.length), 0);
      return `calc(${longest}ch + 1.9rem)`;
    },
    /*
      A room name unique to this page load, shared by both frames of a split
      step. `SyncedRoom` reads `?room=` from the URL, so the two views join
      each other rather than whoever else is reading the docs right now.
    */
    frameSources() {
      if (!this.split) return [this.src];
      const room = `needle_docs_${Math.random().toString(36).slice(2, 8)}`;
      const join = this.src.includes('?') ? '&' : '?';
      return [`${this.src}${join}room=${room}`, `${this.src}${join}room=${room}`];
    },
  },
  mounted() {
    // Without IntersectionObserver, just mount everything and never unload.
    if (!this.autoUnload || typeof IntersectionObserver === 'undefined') {
      this.mounted = true;
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(this.offScreenTimer);
          this.offScreenTimer = null;
          this.mounted = true;
        }
        else if (this.mounted && !this.offScreenTimer) {
          this.offScreenTimer = setTimeout(() => {
            this.mounted = false;
            this.loaded = false;
            this.offScreenTimer = null;
          }, this.unloadAfter * 1000);
        }
      },
      // A little margin so a step reloads just before it scrolls into view.
      { rootMargin: '200px' }
    );
    this.observer.observe(this.$el);
  },

  beforeUnmount() {
    clearTimeout(this.offScreenTimer);
    this.observer?.disconnect();
  },

  methods: {
    send(action) {
      /*
        Query the DOM rather than using a ref: the iframes are rendered in a
        v-for, so `$refs.frame` is an array, and a split step has more than
        one frame to reach. Same origin — the example page is served from
        this site — so the origin can be pinned rather than using "*".
      */
      const frames = this.$el?.querySelectorAll('iframe') ?? [];
      frames.forEach(frame =>
        frame.contentWindow?.postMessage(action, window.location.origin)
      );
    },
  },
};
</script>

<template>
  <div class="walkthrough-step">
    <div class="walkthrough-code">
      <slot></slot>
    </div>
    <div class="walkthrough-pane">
      <div
        v-for="(frameSrc, i) in frameSources"
        :key="i"
        class="walkthrough-stage"
      >
        <iframe
          v-if="mounted"
          :src="frameSrc"
          :title="frameSources.length > 1 ? `${title} (visitor ${i + 1})` : title"
          loading="lazy"
          @load="loaded = true"
          allow="xr; xr-spatial-tracking; camera; microphone; fullscreen"
        ></iframe>
      </div>
      <div
        v-if="actionList.length"
        class="walkthrough-actions"
        :style="{ '--wt-action-width': actionWidth }"
      >
        <div v-for="action in actionList" :key="action.name" class="walkthrough-action">
          <code v-if="action.code">{{ action.code }}</code>
          <span v-else></span>
          <button type="button" @click="send(action.name)">{{ action.label }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.walkthrough-step {
  /*
    Widen to the RIGHT only — never to the left, where the docs sidebar lives.
    Shrinks to zero when the viewport can't spare the space, so it never
    causes horizontal scrolling.
  */
  --breakout: clamp(
    0rem,
    (100vw - var(--sidebar-width, 20rem) - var(--content-width, 850px)) / 2 - 2rem,
    24rem
  );
  width: calc(100% + var(--breakout));
  margin-left: 0;
  display: grid;
  /*
    The code gets the larger share. Example lines run to ~80 characters and a
    scene reads fine at 450px, so splitting 50/50 spends width on the half that
    doesn't need it and makes the half that does scroll sideways.
  */
  grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
  gap: 1rem;
  align-items: stretch;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
}

/*
  The stage matches the code panel's height rather than setting its own aspect
  ratio — an example is as tall as the code it illustrates, so the two halves
  end flush and there's no dead space beside a long snippet.
*/
/* Right column: the scene, with its controls beneath it when a step has any. */
.walkthrough-pane {
  min-width: 0;
  min-height: 0;
  max-height: var(--walkthrough-max-height, 42rem);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/*
  Each row pairs the call with the button that makes it, so reading the panel
  and clicking through it teach the same thing.
*/
.walkthrough-actions {
  border: 1px solid color-mix(in srgb, var(--vp-c-border, #ccc) 60%, transparent);
  /* concentric: 0.75rem outer − 0.35rem padding ≈ 0.4rem inner button radius */
  border-radius: 0.75rem;
  overflow: hidden;
}

.walkthrough-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.35rem 0.35rem 0.35rem 0.75rem;
}

.walkthrough-action + .walkthrough-action {
  border-top: 1px solid color-mix(in srgb, var(--vp-c-border, #ccc) 40%, transparent);
}

.walkthrough-action code {
  min-width: 0;
  overflow-x: auto;
  background: none;
  padding: 0;
  font-size: 0.8rem;
  white-space: nowrap;
}

.walkthrough-actions button {
  flex: none;
  min-width: var(--wt-action-width, 6rem);
  min-height: 34px;
  padding: 0 0.85rem;
  border: 1px solid color-mix(in srgb, var(--vp-c-accent, #826aed) 35%, transparent);
  border-radius: 0.4rem;
  background: color-mix(in srgb, var(--vp-c-accent, #826aed) 10%, transparent);
  color: inherit;
  font-size: 0.82rem;
  cursor: pointer;
  transition: scale 0.12s cubic-bezier(0.2, 0, 0, 1), background 0.12s ease;
}

.walkthrough-actions button:hover {
  background: color-mix(in srgb, var(--vp-c-accent, #826aed) 20%, transparent);
}

.walkthrough-actions button:active { scale: 0.96; }

.walkthrough-actions button:focus-visible {
  outline: 2px solid var(--vp-c-accent, #826aed);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .walkthrough-actions button { transition: none; }
}

.walkthrough-stage {
  min-width: 0;
  /* min-height:0 lets it shrink inside the flex column; the cap lives on the
     pane and the code panel, never on the grid container — capping the
     container leaves `height:100%` children resolving against the taller row,
     so they spill out and paint over what follows. */
  min-height: 0;
  flex: 1;
  border-radius: 1em;
  overflow: hidden;
  /*
    Neutral placeholder behind the iframe while it loads. Not a dark fill:
    sub-pixel rounding leaves a sliver of the container visible down one edge,
    and against a light scene a near-black fill reads as a hard border there.
  */
  background: color-mix(in srgb, currentColor 5%, transparent);
  /* Media surfaces read as floating without a hairline edge. Pure black/white
     only — a tinted neutral picks up the page colour and looks like grime. */
  outline: 1px solid rgba(0, 0, 0, 0.1);
  outline-offset: -1px;
}

.walkthrough-stage iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}

.walkthrough-code {
  min-width: 0;
  min-height: 0;
  max-height: var(--walkthrough-max-height, 42rem);
  display: flex;
  flex-direction: column;
}

/*
  Scrolling lives on the <pre>, not the wrapper: the wrapper hosts the
  absolutely-positioned copy button and the language label, and scrolling it
  would carry both out of view.
*/
.walkthrough-code :deep(div[class*="language-"]) {
  margin: 0;
  height: 100%;
  border-radius: 1em;
  overflow: hidden;
}

/*
  Chrome makes scrollable regions keyboard-focusable on its own, so the code
  block is already a tab stop — with the browser's default black ring, which
  looks like an error against the docs palette. Restyle it rather than adding
  a tabindex of our own, which would only create a second stop on the same
  block. Inset, because the ring would otherwise sit outside the rounded
  corners.
*/
.walkthrough-code :deep(div[class*="language-"] > pre):focus-visible {
  outline: 2px solid var(--vp-c-accent, #826aed);
  outline-offset: -2px;
  border-radius: 1em;
}

.walkthrough-code :deep(div[class*="language-"] > pre) {
  height: 100%;
  margin: 0;
  overflow: auto;
}

@media (prefers-color-scheme: dark) {
  .walkthrough-stage {
    outline-color: rgba(255, 255, 255, 0.1);
  }
}

html[data-theme="dark"] .walkthrough-stage {
  outline-color: rgba(255, 255, 255, 0.1);
}

html[data-theme="light"] .walkthrough-stage {
  outline-color: rgba(0, 0, 0, 0.1);
}

/*
  Stack early. Side by side, each half gets roughly half of the 850px content
  column — around 415px, which is already tight for a code line. Below this the
  two columns fight rather than cooperate, so give each the full width instead.
*/
@media (max-width: 1280px) {
  .walkthrough-step {
    width: 100%;
    grid-template-columns: minmax(0, 1fr);
    max-height: none;
  }

  /*
    Stacked, the stage has no code column to match, so it sets its own size.
    Taller than a landscape ratio on purpose: the scene shares this space
    with engine UI — XR buttons, warnings, the menu — and a 16/10 letterbox
    leaves almost nothing for the scene itself on a phone.
  */
  .walkthrough-pane {
    max-height: none;
  }

  .walkthrough-stage {
    height: auto;
    aspect-ratio: 4 / 3;
    min-height: 24rem;
  }
}

/* Narrow phones: go taller still, since the width has nowhere left to give. */
@media (max-width: 560px) {
  .walkthrough-stage {
    aspect-ratio: 3 / 4;
    min-height: 26rem;
  }
}
</style>
