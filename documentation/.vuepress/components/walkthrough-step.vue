<script>
import { zip } from './zip.js';

// How long the copy button stays in its "Copied" state, matching the plugin.
const COPIED_DURATION = 2000;

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
    return {
      loaded: false,
      mounted: false,
      offScreenTimer: null,
      reloadKey: 0,
      /*
        Width of the scrollbar inside the frame, in pixels. A step that scrolls
        inside its own page — the spline one — puts a scrollbar down the right
        edge, exactly where the reload button sits.
      */
      frameScrollbar: 0,
    };
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
    this.addCopyButtons();
    this.addDownloadButtons();
    /*
      Capture, so this runs before the copy plugin's own listener on the window
      and can stop the event reaching it. Copying is handled here instead, to
      annotate the shared-stage import on its way to the clipboard.
    */
    this.$el.addEventListener('click', this.onCodeButtonClick, true);

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
    clearTimeout(this.copiedTimer);
    this.observer?.disconnect();
    this.$el?.removeEventListener('click', this.onCodeButtonClick, true);
  },

  methods: {
    /*
      Give the code blocks a copy button.

      @vuepress/plugin-copy-code adds these itself, but it scans the page once
      the markdown has rendered — and every component here is registered with
      defineAsyncComponent, so this one resolves after that scan. Its slot
      content is not in the DOM yet, and the plugin never sees it: the code
      panels were the only blocks on the page without a copy button.

      The button below is the same element the plugin creates. Its click
      handler is delegated on the window and matches
      `div[class*="language-"] > button.vp-copy-code-button`, taking the next
      sibling as the code to copy — so inserting one here is all that's
      needed, and copying, the copied state and the styling all come from the
      plugin as usual.
    */
    addCopyButtons() {
      this.$el.querySelectorAll('div[class*="language-"] > pre').forEach(pre => {
        // The attribute is the plugin's own "already handled" marker.
        if (pre.hasAttribute('copy-code')) return;

        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add('vp-copy-code-button');
        button.setAttribute('aria-label', 'Copy code');
        button.setAttribute('data-copied', 'Copied');

        pre.parentElement?.insertBefore(button, pre);
        pre.setAttribute('copy-code', '');
      });
    },

    /*
      A button beside the copy button that saves the whole example.

      The code panel shows one file, and that file imports the shared stage —
      so copying it alone gives a script that cannot run. This takes the page
      and everything it references instead.
    */
    addDownloadButtons() {
      this.$el.querySelectorAll('div[class*="language-"] > pre').forEach(pre => {
        const wrapper = pre.parentElement;
        if (!wrapper || wrapper.querySelector('.walkthrough-download')) return;

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'walkthrough-download';
        button.title = 'Download this example';
        button.setAttribute('aria-label', 'Download this example');
        button.innerHTML =
          // Sized to sit level with the copy icon beside it, which renders at
          // 1.25rem. An outlined glyph reads heavier, so it goes a shade smaller.
          '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">' +
          '<path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" ' +
          'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
          'stroke-linejoin="round"/></svg>';

        /*
          Ahead of the copy button, never between it and the code. The copy
          plugin takes its button's next sibling as the block to copy, so
          anything inserted in that gap would be copied instead of the code.
        */
        wrapper.insertBefore(button, wrapper.firstChild);
      });
    },

    onCodeButtonClick(event) {
      const button = event.target?.closest?.(
        '.walkthrough-download, div[class*="language-"] > button.vp-copy-code-button'
      );
      if (!button) return;

      event.stopPropagation();
      if (button.classList.contains('walkthrough-download')) this.downloadExample(button);
      else this.copyCode(button);
    },

    /*
      Copy the code, with each relative import spelled out as a full URL.

      Someone who pastes this into their own project has no walkthrough-base.js
      next to it, and the failure gives no hint of where the file lives. The
      comment puts the address on the line the error points at.
    */
    async copyCode(button) {
      const pre = button.parentElement?.querySelector('pre');
      if (!pre) return;

      const folder = new URL('.', new URL(this.src, window.location.href));
      const text = (pre.textContent || '').replace(
        /(from\s+['"])(\.\/[^'"]+)(['"];?)/g,
        (match, before, relative, after) => {
          const url = new URL(relative, folder).href;
          const label = relative.endsWith('walkthrough-base.js') ? 'shared demo stage — ' : '';
          return `${before}${relative}${after} // ${label}${url}`;
        }
      );

      await this.writeClipboard(text);
      this.track('walkthrough_copy');

      // The plugin's own "Copied" styling comes from this class.
      button.classList.add('copied');
      clearTimeout(this.copiedTimer);
      this.copiedTimer = setTimeout(() => {
        button.classList.remove('copied');
        button.blur();
      }, COPIED_DURATION);
    },

    async writeClipboard(text) {
      try {
        await navigator.clipboard.writeText(text);
        return;
      }
      catch {
        // Falls through — the Clipboard API needs a secure context, and the
        // examples should still be copyable when the docs are served plainly.
      }
      const field = document.createElement('textarea');
      field.value = text;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      try { document.execCommand('copy'); } finally { field.remove(); }
    },

    /*
      Save the example as a zip: the page, the scripts it loads, and whatever
      those scripts reference.

      Nothing here is a list to keep up to date. It reads the page the step
      already points at and follows what it asks for, so a new sample — or a
      new asset in an existing one — is picked up on its own.
    */
    async downloadExample(button) {
      if (button.hasAttribute('data-busy')) return;
      button.setAttribute('data-busy', '');

      try {
        const files = await this.collectExampleFiles();
        const url = URL.createObjectURL(zip(files));
        const link = document.createElement('a');
        link.href = url;
        link.download = `${this.exampleName()}.zip`;
        link.click();
        // Counted only once the archive exists, so a failure is not a download.
        this.track('walkthrough_download');
        // Revoked on the next task, once the browser has taken the blob.
        setTimeout(() => URL.revokeObjectURL(url), 0);
      }
      catch (error) {
        console.error('[walkthrough] could not build the download', error);
      }
      finally {
        button.removeAttribute('data-busy');
      }
    },

    /*
      Report a walkthrough interaction to the site's own analytics.

      Rybbit is on every docs page and is the one that also runs in dev, so an
      event can be checked while working on it. Only the step name is sent.

      Guarded throughout: an ad blocker leaves window.rybbit undefined, and a
      counter must never be the reason a download or a copy fails.
    */
    track(name) {
      try {
        window.rybbit?.event?.(name, { step: this.exampleName() });
      }
      catch {
        // Analytics stays out of the way of the thing the reader asked for.
      }
    },

    exampleName() {
      const path = new URL(this.src, window.location.href).pathname;
      return path.split('/').pop().replace(/\.html?$/, '') || 'needle-example';
    },

    /*
      The step this example belongs to: the heading above it on the page, and
      the id that links straight back to that section.

      Taken from the page rather than passed in, so a step never has to repeat
      its own title and the two can never drift apart. The Ask AI button is
      appended into headings, so it is left out here the same way the sidebar
      leaves it out.
    */
    stepInfo() {
      for (let node = this.$el; node; node = node.parentElement) {
        for (let prev = node.previousElementSibling; prev; prev = prev.previousElementSibling) {
          if (prev.tagName !== 'H2') continue;
          let text = '';
          for (const child of prev.childNodes) {
            if (child.nodeType === Node.ELEMENT_NODE && child.matches('[data-nav-ignore]')) continue;
            text += child.textContent;
          }
          return { title: text.trim(), anchor: prev.id };
        }
      }
      return null;
    },

    /*
      A still of the scene as the reader has it on screen right now, including
      whatever angle they orbited to.

      The canvas keeps no drawing buffer between frames, so the pixels have to
      be read in the same task as the render — hence renderNow() immediately
      followed by toDataURL, with nothing awaited in between.
    */
    capturePreview() {
      try {
        const frame = this.$el.querySelector('iframe');
        const context = frame?.contentWindow?.document?.querySelector('needle-engine')?.context;
        const canvas = context?.renderer?.domElement;
        if (!canvas) return null;

        context.renderNow();
        const dataUrl = canvas.toDataURL('image/png');

        const binary = atob(dataUrl.slice(dataUrl.indexOf(',') + 1));
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        return bytes;
      }
      catch {
        // A step still loading has nothing to photograph, and that is no
        // reason to withhold the files.
        return null;
      }
    },

    async collectExampleFiles() {
      const page = new URL(this.src, window.location.href);
      const folder = new URL('.', page);
      const html = await fetch(page).then(response => response.text());
      const encoder = new TextEncoder();

      // Taken before anything is awaited, while the frame is still on screen.
      const preview = this.capturePreview();

      /*
        Named index.html rather than kept as-is, so serving the folder opens
        the example with no path to type.
      */
      const files = [
        { name: 'index.html', bytes: encoder.encode(html) },
        { name: 'README.md', bytes: encoder.encode(this.readme(!!preview)) },
      ];
      if (preview) files.push({ name: 'preview.png', bytes: preview });

      const doc = new DOMParser().parseFromString(html, 'text/html');
      const queue = Array.from(doc.querySelectorAll('script[src], link[href]'))
        .map(el => el.getAttribute('src') || el.getAttribute('href'))
        .filter(ref => ref?.startsWith('./'));

      const seen = new Set();
      while (queue.length) {
        const relative = queue.shift();
        if (seen.has(relative)) continue;
        seen.add(relative);

        const response = await fetch(new URL(relative, folder));
        if (!response.ok) continue;

        const name = relative.replace(/^\.\//, '');
        // Scripts can name files of their own, such as the audio clips in the
        // audio step, so read them as text and follow what they point at.
        if (/\.m?js$/.test(name)) {
          const source = await response.text();
          files.push({ name, bytes: encoder.encode(source) });
          const matches = source.match(/['"]\.\/[^'"]+['"]/g) ?? [];
          matches.forEach(match => queue.push(match.slice(1, -1)));
        }
        else {
          files.push({ name, bytes: new Uint8Array(await response.arrayBuffer()) });
        }
      }

      return files;
    },

    /*
      The README that ships in the zip.

      It is a map, not a lesson: say what this folder is, get it running, name
      the files, then point at the guide for each thing a reader might do next.
      Every link is a markdown link, so it stays clickable wherever the file is
      read. Link labels sit on one line — markdown allows no break between a
      label and its destination.
    */
    readme(hasPreview = false) {
      const step = this.exampleName();
      const info = this.stepInfo();
      const walkthrough = 'https://engine.needle.tools/docs/tutorials/scripting-walkthrough';
      // Straight to the section this came from, rather than the top of a long page.
      const section = info?.anchor ? `${walkthrough}#${info.anchor}` : walkthrough;
      return [
        `# ${info?.title || this.title}`,
        '',
        `${this.title}.`,
        '',
        `A runnable copy of one step from the [Needle Engine scripting walkthrough](${section}).`,
        '',
        ...(hasPreview ? ['![Preview of the scene](preview.png)', ''] : []),
        '## Run it',
        '',
        '1. Serve this folder:',
        '',
        '   ```bash',
        '   npx serve .',
        '   ```',
        '',
        '2. Open the address it prints.',
        '',
        'You get the scene from the docs, now running on your machine. Needle Engine',
        'and three.js load from a CDN, so there is nothing to install.',
        '',
        'Serving matters: browsers block ES modules loaded straight off disk, so',
        'opening `index.html` by hand shows an empty page.',
        '',
        '## What is in the folder',
        '',
        '| File | What it does |',
        '| --- | --- |',
        '| `index.html` | Loads the engine, then both scripts below |',
        `| \`${step}.js\` | The example — the file printed in the docs |`,
        '| `walkthrough-base.js` | The shared stage: lighting, ground, camera framing |',
        ...(hasPreview ? ['| `preview.png` | The scene as you had it when you downloaded this |'] : []),
        '',
        `Edit \`${step}.js\`. Every step shares \`walkthrough-base.js\`, which exists`,
        'only to give the example something to sit in.',
        '',
        '## Change something',
        '',
        '- Numbers on a component are yours to play with: a speed, a colour, a size.',
        '- Set them per object instead of writing a new class:',
        '  `cube.addComponent(Wave, { speed: 2 })`',
        '- Multiply per-frame motion by `this.context.time.deltaTime`, so it runs at',
        '  one speed on every display.',
        '- Copy an object with `instantiate()`. It brings the components along, which',
        '  three.js `clone()` leaves behind.',
        '',
        'The [walkthrough](https://engine.needle.tools/docs/tutorials/scripting-walkthrough) covers each of these with a live scene beside it.',
        '',
        '## Publish it',
        '',
        'Drag this folder, or the zip, onto [Needle Cloud](https://cloud.needle.tools)',
        'and you get a link to share. It looks for `index.html` at the top level,',
        'which is where the download puts it.',
        '',
        '## Start a project',
        '',
        'A CDN suits one file. For a project, start from the Vite template:',
        '',
        '```bash',
        'npm create needle',
        '```',
        '',
        'That gives you npm, Vite and TypeScript ready to go, so you get hot reload',
        'and compression.',
        '',
        'The [getting started guides](https://engine.needle.tools/docs/getting-started/) cover Unity and Blender too,',
        'where the components you write show up in the editor for an artist to use.',
        '',
        '## Work with AI',
        '',
        'The Needle Engine skill hands your AI assistant the whole engine as context,',
        'so it writes components that fit:',
        '',
        '```bash',
        'npx skills add needle-tools/ai',
        '```',
        '',
        'It works with Claude Code, Cursor, Copilot, Codex, Gemini CLI and others. In',
        'a project that already uses `@needle-tools/engine`, the Vite plugin installs',
        'it for you.',
        '',
        'More in [AI & Needle Engine](https://engine.needle.tools/docs/ai/).',
        '',
      ].join('\n');
    },

    /*
      Start the example over. Bumping the key makes Vue throw the old iframe
      away and build a new one, which is a real reload — reassigning src
      would leave the previous WebGL context and its scene alive.
    */
    reload() {
      this.loaded = false;
      this.frameScrollbar = 0;
      this.reloadKey++;
    },

    /*
      Measure the frame's scrollbar so the reload button can step around it.

      Read from the frame itself rather than assumed: the width differs between
      platforms, and an overlay scrollbar takes none at all.
    */
    onFrameLoad(event) {
      this.loaded = true;

      const measure = () => {
        try {
          const view = event.target.contentWindow;
          if (!view) return;
          const width = view.innerWidth - view.document.documentElement.clientWidth;
          this.frameScrollbar = width > 0 ? width : 0;
        }
        catch {
          // A frame from elsewhere cannot be measured, and a button one
          // scrollbar off is no reason to fail.
        }
      };

      measure();
      // Again next frame, in case the page grows to its full height after load.
      requestAnimationFrame(measure);
    },

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
        :style="{ '--wt-frame-scrollbar': frameScrollbar + 'px' }"
      >
        <iframe
          v-if="mounted"
          :key="reloadKey"
          :src="frameSrc"
          :title="frameSources.length > 1 ? `${title} (visitor ${i + 1})` : title"
          loading="lazy"
          @load="onFrameLoad"
          allow="xr; xr-spatial-tracking; camera; microphone; fullscreen"
        ></iframe>
        <!-- Only offered once there is something running to restart. -->
        <button
          v-if="mounted"
          type="button"
          class="walkthrough-reload"
          title="Restart the example"
          aria-label="Restart the example"
          @click="reload"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path
              d="M20 11a8 8 0 1 0-2.3 6.3M20 5v6h-6"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
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

<!--
  Not scoped: the download button is created in script, so it carries no
  scope attribute for a scoped rule to match. It sits beside the copy button
  and borrows its metrics, so the two read as one pair.
-->
<style>
.walkthrough-download {
  position: absolute;
  top: 0.5em;
  right: calc(0.5em + 2.5rem);
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: 0;
  border-radius: 0.5rem;
  background: none;
  color: var(--copy-code-c-text, currentColor);
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.4s;
}

div[class*="language-"]:hover .walkthrough-download,
.walkthrough-download:focus-visible,
.walkthrough-download[data-busy] {
  opacity: 1;
}

.walkthrough-download:hover,
.walkthrough-download:focus-visible {
  background: var(--copy-code-c-hover);
}

/* Fetching the files takes a moment on a cold cache. */
.walkthrough-download[data-busy] {
  cursor: progress;
}

@media print {
  .walkthrough-download { display: none; }
}
</style>

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

/*
  Sits over the top-right of the scene. Icon only, no fill — the examples have
  light backgrounds and a chip would read as part of the scene. Faint until
  hovered, so it stays out of the way of the thing it's sitting on.
*/
.walkthrough-reload {
  position: absolute;
  top: 0.5rem;
  /* Clear of the frame's own scrollbar, when it has one. */
  right: calc(0.5rem + var(--wt-frame-scrollbar, 0px));
  z-index: 1;
  display: flex;
  padding: 0.25rem;
  border: 0;
  background: none;
  color: var(--vp-c-text-2, #6b7280);
  opacity: 0.45;
  cursor: pointer;
  transition: opacity 0.15s ease, color 0.15s ease;
}

.walkthrough-reload:hover {
  opacity: 1;
  color: var(--vp-c-accent, #826aed);
}

.walkthrough-reload:focus-visible {
  opacity: 1;
  outline: 2px solid var(--vp-c-accent, #826aed);
  outline-offset: 2px;
  border-radius: 0.35rem;
}

/* Coarse pointers have no hover, so it can't rely on it to become visible. */
@media (hover: none) {
  .walkthrough-reload { opacity: 0.7; }
}

.walkthrough-stage {
  /* Anchors the reload button to this box rather than the page. */
  position: relative;
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
    Stacked, the scene comes first. It is the point of the step, and a reader
    scrolling on a phone should meet it before a screen of source.
  */
  .walkthrough-pane { order: 1; }
  .walkthrough-code { order: 2; }

  /*
    Stacked, the stage has no code column to match, so it sets its own size.
    Taller than a landscape ratio on purpose: the scene shares this space
    with engine UI — XR buttons, warnings, the menu — and a 16/10 letterbox
    leaves almost nothing for the scene itself on a phone.
  */
  .walkthrough-pane {
    max-height: none;
  }

  /*
    Leave a gutter down the right. The iframe swallows touch, so a
    full-width scene traps a finger dragging over it and the page stops
    scrolling. This strip is always page, never scene.
  */
  .walkthrough-stage {
    height: auto;
    aspect-ratio: 4 / 3;
    min-height: 24rem;
    width: calc(100% - 3rem);
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
