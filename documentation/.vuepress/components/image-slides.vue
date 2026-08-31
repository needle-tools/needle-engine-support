<script>
/**
 * Image slideshow for screenshots, sized to match tables — a bit wider than the
 * body column, so a UI screenshot is readable instead of shrunk to fit prose.
 *
 * Takes a list of images:
 *
 *   <image-slides ratio="1920/1020" :images="[
 *     { src: '/docs/mesh-baker/bear.webp', alt: '…', caption: '…' },
 *     '/docs/mesh-baker/vase.webp'
 *   ]" />
 *
 * Paths are root URLs including the site base, since a Vue prop is an
 * expression and never gets the base rewritten into it the way markdown
 * image syntax does.
 *
 * Unlike quoteslides.vue (built for short testimonial text) this one is
 * image-aware: a fixed aspect-ratio frame so the page never reflows as images
 * decode, the next image fetched before it is shown, a progress bar counting
 * down to the next slide, and autoplay that yields to the reader — it pauses on
 * hover and focus, while the tab is hidden, when the OS asks for reduced
 * motion, and for `resumeDelay` after any manual move.
 */
export default {
  name: 'ImageSlides',
  props: {
    /** Array of `{ src, alt, caption }` objects, or plain src strings. */
    images: { type: Array, default: () => [] },
    /** Aspect ratio of the frame, as "w/h" or a number. Holds the height steady. */
    ratio: { type: [String, Number], default: '16/9' },
    autoplay: { type: Boolean, default: true },
    /** Milliseconds per slide. Screenshots need longer than a quote does. */
    interval: { type: Number, default: 6000 },
    /**
     * How long to leave autoplay alone after a manual move. Long enough that
     * stepping through by hand is never fought, short enough that a slideshow
     * left alone starts playing again instead of sitting there dead.
     */
    resumeDelay: { type: Number, default: 10000 },
  },
  data() {
    return {
      /**
       * Index into `trackSlides`, so it can sit on the trailing clone. The
       * logical slide the reader is on is `active`.
       */
      physical: 0,
      /*
        False until mounted in a browser. Autoplay MUST NOT start before that:
        the watcher below runs immediately, which during server-side rendering
        means setInterval on the build machine, with no unmount to clear it —
        VuePress then finishes rendering, prints success, and the node process
        hangs forever on a live timer instead of exiting.
      */
      ready: false,
      // Set while the reader is driving; cleared `resumeDelay` after the last
      // manual move, so autoplay picks up again on its own.
      manuallyPaused: false,
      hovered: false,
      reducedMotion: false,
      pageHidden: false,
    }
  },
  computed: {
    slides() {
      return this.images.map(entry =>
        typeof entry === 'string' ? { src: entry, alt: '', caption: '' } : entry,
      )
    },
    /**
     * The rendered track: every slide, plus a copy of the first appended to the
     * end. Advancing off the last slide scrolls forward onto that copy and then
     * silently resets to the real first one — so the sequence always moves in
     * one direction instead of rewinding past every slide to get home.
     */
    trackSlides() {
      if (this.slides.length < 2) return this.slides
      return [...this.slides, { ...this.slides[0], clone: true }]
    },
    active() {
      return this.slides.length ? this.physical % this.slides.length : 0
    },
    frameStyle() {
      return { aspectRatio: String(this.ratio) }
    },
    autoplayRunning() {
      return (
        this.ready &&
        this.autoplay &&
        this.slides.length > 1 &&
        !this.manuallyPaused &&
        !this.hovered &&
        !this.reducedMotion &&
        !this.pageHidden
      )
    },
  },
  watch: {
    autoplayRunning: {
      immediate: true,
      handler(running) {
        if (running) this.startTimer()
        else this.stopTimer()
      },
    },
  },
  mounted() {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    this.reducedMotion = query.matches
    this._onMotionChange = e => { this.reducedMotion = e.matches }
    query.addEventListener('change', this._onMotionChange)
    this._motionQuery = query

    // An advancing slideshow in a background tab is wasted work and lands the
    // reader mid-sequence when they come back.
    this.pageHidden = document.hidden
    this._onVisibility = () => { this.pageHidden = document.hidden }
    document.addEventListener('visibilitychange', this._onVisibility)

    this._onScroll = () => this.syncFromScroll()
    this.$refs.track?.addEventListener('scroll', this._onScroll, { passive: true })

    // Last: releases autoplay now that there is a browser to run it in.
    this.ready = true
  },
  beforeUnmount() {
    this.stopTimer()
    clearTimeout(this._selfScrollTimer)
    clearTimeout(this._wrapTimer)
    clearTimeout(this._resumeTimer)
    this._motionQuery?.removeEventListener('change', this._onMotionChange)
    document.removeEventListener('visibilitychange', this._onVisibility)
    this.$refs.track?.removeEventListener('scroll', this._onScroll)
  },
  methods: {
    startTimer() {
      this.stopTimer()
      // Belt and braces alongside `ready`: a timer on the server would keep the
      // build's node process alive after rendering has finished.
      if (typeof window === 'undefined') return
      this._timer = setInterval(() => this.advance(), this.interval)
    },
    stopTimer() {
      if (this._timer) {
        clearInterval(this._timer)
        this._timer = null
      }
    },
    /**
     * Hands control to the reader and schedules handing it back. Every manual
     * move restarts the clock, so stepping through several slides never has
     * autoplay cutting in between them.
     */
    pauseForUser() {
      this.manuallyPaused = true
      clearTimeout(this._resumeTimer)
      this._resumeTimer = setTimeout(() => { this.manuallyPaused = false }, this.resumeDelay)
    },
    /**
     * Scrolls the track rather than moving it with a transform, so a swipe and
     * a dot click are the same gesture to the browser and scroll-snap keeps the
     * slide aligned for free.
     *
     * The cost of that choice: our own scrolling raises the same scroll events a
     * swipe does. `_selfScrolling` tells them apart — without it the first
     * auto-advance would look like the reader taking over and stop the show.
     */
    scrollToPhysical(index, { instant = false } = {}) {
      const track = this.$refs.track
      const slide = track?.children[index]
      if (!slide) return
      this.physical = index

      this._selfScrolling = true
      clearTimeout(this._selfScrollTimer)
      this._selfScrollTimer = setTimeout(() => {
        this._selfScrolling = false
        // Snapping comes back only once we have arrived. Re-enabling it while
        // the track sits between slides makes the browser snap instantly, which
        // reads as the image jumping out from under the cursor on release.
        if (this.$refs.track) this.$refs.track.style.scrollSnapType = ''
      }, 1000)

      track.scrollTo({
        left: slide.offsetLeft - track.offsetLeft,
        // A smooth scroll needs animation frames, which a hidden tab never gets
        // — it would stall halfway and leave the track between slides.
        behavior: instant || this.reducedMotion || document.hidden ? 'auto' : 'smooth',
      })
    },
    /** One step forward, wrapping through the clone so motion stays forward. */
    advance() {
      const last = this.trackSlides.length - 1
      const next = this.physical + 1
      if (next > last) return
      this.scrollToPhysical(next)

      if (next === last && this.slides.length > 1) {
        // Landed on the clone. Once the animation has played out, jump back to
        // the real first slide with no animation — the two look identical, so
        // the reader sees continuous forward motion and never a rewind.
        clearTimeout(this._wrapTimer)
        this._wrapTimer = setTimeout(() => this.scrollToPhysical(0, { instant: true }), 700)
      }
    },
    /** A manual move is a signal the reader wants to look, not be shown. */
    goTo(logicalIndex) {
      this.pauseForUser()
      clearTimeout(this._wrapTimer)
      this.scrollToPhysical(logicalIndex)
    },
    step(delta) {
      this.pauseForUser()
      clearTimeout(this._wrapTimer)
      if (delta > 0) {
        this.advance()
        return
      }
      // Stepping back off the first slide: hop to the clone at the far end with
      // no animation, then scroll backwards from there, so this direction reads
      // as continuous too.
      if (this.physical === 0 && this.slides.length > 1) {
        this.scrollToPhysical(this.trackSlides.length - 1, { instant: true })
        this.$nextTick(() => this.scrollToPhysical(this.trackSlides.length - 2))
        return
      }
      this.scrollToPhysical(Math.max(0, this.physical - 1))
    },
    syncFromScroll() {
      // While we are scrolling we already know the destination; sampling the
      // animation's intermediate positions would fight it, and a wrap that
      // started from a stale index lands on the wrong slide.
      if (this._selfScrolling) return

      const track = this.$refs.track
      if (!track || !track.clientWidth) return
      const index = Math.round(track.scrollLeft / track.clientWidth)
      if (index === this.physical || index < 0 || index >= this.trackSlides.length) return
      this.physical = index
      // Scrolling by hand (swipe, trackpad) counts as taking over.
      this.pauseForUser()
    },
    /**
     * Slides up to here load eagerly. Purely lazy slides would only start
     * fetching once they scroll in, which on a slideshow means arriving at a
     * blank frame — so the next one is always fetched ahead of being shown.
     * Flipping the attribute from lazy to eager starts the load.
     */
    isEager(index) {
      return index <= this.physical + 1
    },

    /*
     * Drag to scrub. Touch already scrolls the track natively and does it
     * better (momentum, rubber-banding), so this is only for mouse and pen —
     * where an overflow container offers no way to drag at all.
     */
    onPointerDown(event) {
      if (event.pointerType === 'touch' || event.button !== 0) return
      const track = this.$refs.track
      if (!track) return

      this._drag = { startX: event.clientX, startScroll: track.scrollLeft, moved: false }
      // Snapping fights a scrollLeft written on every pointermove; it comes
      // back on release, which is what settles the slide into place.
      track.style.scrollSnapType = 'none'
      // Suppress scroll-position sampling for the duration — the release
      // decides which slide we land on, not the frames along the way.
      this._selfScrolling = true
      clearTimeout(this._selfScrollTimer)
      // Capture keeps the drag alive when the cursor leaves the frame. It
      // throws on a pointer id the browser no longer considers active, which
      // is not worth failing the drag over.
      try { track.setPointerCapture(event.pointerId) } catch { /* not capturable */ }
    },
    onPointerMove(event) {
      if (!this._drag) return
      const dx = event.clientX - this._drag.startX
      if (Math.abs(dx) > 3) this._drag.moved = true
      this.$refs.track.scrollLeft = this._drag.startScroll - dx
    },
    onPointerUp(event) {
      const drag = this._drag
      if (!drag) return
      this._drag = null

      const track = this.$refs.track
      try { track.releasePointerCapture(event.pointerId) } catch { /* already released */ }

      if (!drag.moved) {
        // Nothing moved, so the track is still snapped — safe to restore now.
        track.style.scrollSnapType = ''
        this._selfScrolling = false
        return
      }

      // Snapping stays off here on purpose; scrollToPhysical restores it once
      // the scroll has landed, so the slide glides into place instead of
      // snapping the moment the button comes up.

      const dx = event.clientX - drag.startX
      // A short decisive flick should advance, not spring back — so the
      // threshold is a fraction of the slide, not half of it.
      if (Math.abs(dx) > track.clientWidth * 0.15) {
        // step() routes through the same wrap handling as the arrows, so
        // dragging past either end keeps moving instead of rewinding.
        this.step(dx < 0 ? 1 : -1)
      } else {
        this.pauseForUser()
        this.scrollToPhysical(this.physical)
      }
    },
  },
}
</script>

<template>
  <div
    v-if="slides.length"
    class="image-slides"
    role="group"
    :aria-label="`Image slideshow, ${slides.length} images`"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @focusin="hovered = true"
    @focusout="hovered = false"
    @keydown.left.prevent="step(-1)"
    @keydown.right.prevent="step(1)"
  >
    <div class="image-slides-frame" :style="frameStyle">
      <div
        ref="track"
        class="image-slides-track"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
        @dragstart.prevent
      >
        <figure
          v-for="(slide, i) in trackSlides"
          :key="i"
          class="image-slides-slide"
          :aria-hidden="slide.clone ? 'true' : null"
        >
          <img
            :src="slide.src"
            :alt="slide.clone ? '' : slide.alt || ''"
            :loading="isEager(i) ? 'eager' : 'lazy'"
            :fetchpriority="i === 0 ? 'high' : 'low'"
            decoding="async"
            draggable="false"
          />
        </figure>
      </div>

      <!--
        Countdown to the next slide. Keyed on the slide so the animation restarts
        each time, and paused rather than hidden whenever autoplay is paused —
        hovering to read leaves the bar visibly stopped where it was.
      -->
      <div
        v-if="autoplay && slides.length > 1 && !manuallyPaused && !reducedMotion"
        :key="physical"
        class="image-slides-progress"
        :style="{
          animationDuration: `${interval}ms`,
          animationPlayState: autoplayRunning ? 'running' : 'paused',
        }"
      />

      <template v-if="slides.length > 1">
        <button
          type="button"
          class="image-slides-arrow prev"
          aria-label="Previous image"
          @click="step(-1)"
        >‹</button>
        <button
          type="button"
          class="image-slides-arrow next"
          aria-label="Next image"
          @click="step(1)"
        >›</button>
      </template>
    </div>

    <!-- Caption sits outside the fixed frame so a long one never crops the image. -->
    <p v-if="slides[active] && slides[active].caption" class="image-slides-caption">
      {{ slides[active].caption }}
    </p>

    <div v-if="slides.length > 1" class="image-slides-dots">
      <button
        v-for="(slide, i) in slides"
        :key="i"
        type="button"
        class="image-slides-dot"
        :class="{ active: i === active }"
        :aria-label="`Go to image ${i + 1}`"
        :aria-current="i === active"
        @click="goTo(i)"
      />
    </div>
  </div>
</template>

<style scoped>
/*
  Table width. The content column is 850px, and index.scss widens tables past it
  on roomy viewports — a screenshot of a full UI needs the same room, and
  matching the breakpoints keeps its edges lined up with the tables around it.
*/
.image-slides {
  min-width: 100%;
  margin: 1.5rem 0 2rem;
}

@media screen and (min-width: 1700px) {
  .image-slides {
    min-width: 1000px;
  }
}

@media screen and (min-width: 1900px) {
  .image-slides {
    min-width: 1200px;
  }
}

/*
  The frame holds the aspect ratio, so the page keeps its height from first
  paint — no reflow as each image decodes, and no jump between slides whose
  dimensions differ slightly.
*/
.image-slides-frame {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 0.5em;
  background: var(--c-quote-background, rgba(125, 125, 125, 0.08));
  box-shadow: 0 0 40px rgba(100, 100, 100, 0.1);
}

.image-slides-track {
  display: flex;
  height: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  cursor: grab;
  /* A drag must not start a text selection across the slides. */
  user-select: none;
}

.image-slides-track:active {
  cursor: grabbing;
}

.image-slides-track::-webkit-scrollbar {
  display: none;
}

.image-slides-slide {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  margin: 0;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.image-slides-slide img {
  display: block;
  width: 100%;
  height: 100%;
  /* Screenshots must not be cropped — letterbox against the frame instead. */
  object-fit: contain;
  border-radius: 0;
}

.image-slides-progress {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  height: 3px;
  width: 0;
  border-radius: 0 3px 3px 0;

  background: var(--c-brand, #99cc33);
  animation-name: image-slides-progress;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

@keyframes image-slides-progress {
  from { width: 0; }
  to { width: 100%; }
}

.image-slides-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 2.2rem;
  height: 2.2rem;
  border: none;
  border-radius: 50%;

  background: rgba(20, 20, 20, 0.45);
  color: #fff;
  font-size: 1.5rem;
  line-height: 1;

  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s, background-color 0.2s;
}

.image-slides-arrow.prev { left: 0.6rem; }
.image-slides-arrow.next { right: 0.6rem; }

.image-slides:hover .image-slides-arrow,
.image-slides-arrow:focus-visible {
  opacity: 1;
}

.image-slides-arrow:hover {
  background: rgba(20, 20, 20, 0.7);
}

/* Touch has no hover to reveal them, so the arrows stay put. */
@media (hover: none) {
  .image-slides-arrow {
    opacity: 1;
  }
}

.image-slides-caption {
  margin: 0.6rem 0 0;
  color: var(--vp-c-text-mute, #666);
  font-size: 0.85rem;
  text-align: center;
}

.image-slides-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.7rem;
}

.image-slides-dot {
  width: 10px;
  height: 10px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background-color: var(--c-quote-light, rgba(50, 50, 50, 0.2));
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.image-slides-dot.active {
  background-color: var(--c-brand, #99cc33);
}

@media (prefers-reduced-motion: reduce) {
  .image-slides-track {
    scroll-behavior: auto;
  }
}
</style>
