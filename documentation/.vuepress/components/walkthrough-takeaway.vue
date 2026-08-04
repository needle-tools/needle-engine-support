<script>
export default {};
</script>

<template>
  <div class="wt-takeaway">
    <slot></slot>
  </div>
</template>

<style scoped>
/*
  The one idea a reader should leave the step with.

  Set as a standfirst rather than a callout: no rule, no panel, no icon. A
  ruled block is the default move for "important text" in docs, and the page
  already carries a heading, a tag row, a code panel and a live scene — one
  more bordered box reads as another piece of furniture rather than as the
  point of the section.

  Size, spacing and a narrower measure do the work instead, which is the same
  job a deck does under a headline.
*/
.wt-takeaway {
  margin: 0.2rem 0 1.6rem;
  max-width: 62ch;
  font-size: 1.2rem;
  line-height: 1.55;
  text-wrap: pretty;
}

.wt-takeaway :deep(p) {
  margin: 0.4rem 0;
}

.wt-takeaway :deep(code) {
  /* Keep inline code from bulking up at this size. */
  font-size: 0.85em;
}
</style>
