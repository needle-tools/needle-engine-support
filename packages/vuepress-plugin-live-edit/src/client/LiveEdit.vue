<script setup>
/**
 * Editing controller. Replaces the rendered page content with the editor
 * (`mount.js`) and writes changes back on a debounce.
 */

import { computed, nextTick, onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { usePageData, useRoute } from 'vuepress/client'
import { fetchRegistry, fetchSource, saveDoc, fetchChanges } from './api.js'
import { createEditor } from './editor.js'
import { setGitChanges } from './change-marks.js'
import { parseFrontmatter, serializeFrontmatter, newEntry } from '../core/frontmatter.mjs'
import { takeOverContent } from './mount.js'
import './live-edit.css'

/** Idle time before an autosave. */
const AUTOSAVE_DELAY = 700

const route = useRoute()
const page = usePageData()

const open = ref(false)
const loading = ref(false)
const status = ref(null)
const sourcePath = ref('')
const assetDir = ref(null)
const autosave = ref(true)
const frontmatter = ref('')
const fields = ref(null)
const showFrontmatter = ref(false)
const conflict = ref(null)
const showGit = ref(false)
const gitAvailable = ref(true)
const warnings = ref([])

const view = shallowRef(null)
let surface = null
const registry = shallowRef(null)

let editingRoute = null
let baseSource = null
let expectHash = null
let pendingDoc = null
let saveTimer = null
let saving = false

/** Generated pages have no source file. */
const editable = computed(() => Boolean(page.value?.filePathRelative))

function setStatus(next) {
  status.value = next
  if (next?.kind === 'ok') {
    setTimeout(() => {
      if (status.value === next) status.value = null
    }, 4000)
  }
}

function destroyEditor() {
  // Captured first: destroying the view empties the host element.
  const anchor = surface?.capture()
  view.value?.destroy()
  view.value = null
  surface?.restore(anchor)
  surface = null
  clearTimeout(saveTimer)
  saveTimer = null
  pendingDoc = null
}

async function load() {
  loading.value = true
  conflict.value = null
  const targetRoute = route.path
  try {
    if (!registry.value) registry.value = await fetchRegistry()
    const data = await fetchSource(targetRoute)

    editingRoute = targetRoute
    baseSource = data.source
    expectHash = data.hash
    frontmatter.value = data.frontmatter ?? ''
    fields.value = frontmatter.value ? parseFrontmatter(frontmatter.value) : null
    sourcePath.value = data.path
    assetDir.value = data.assetDir

    destroyEditor()
    await nextTick()

    surface = takeOverContent()
    if (!surface) {
      setStatus({ kind: 'error', message: 'could not find the page content to edit' })
      return
    }

    view.value = createEditor({
      mount: surface.host,
      doc: data.doc,
      registry: registry.value,
      route: targetRoute,
      headingIds: surface.headingIds,
      onChange: (doc) => {
        pendingDoc = doc
        if (autosave.value) scheduleSave()
      },
      onStatus: setStatus,
    })
    // Components and images finish laying out after mount, so the anchor is
    // re-applied on the next frames as well.
    surface.settle()
    requestAnimationFrame(() => surface?.settle())
    setTimeout(() => surface?.settle(), 200)

    setStatus(null)
  } catch (error) {
    setStatus({ kind: 'error', message: error.message })
  } finally {
    loading.value = false
  }
}

/** Rebuild the frontmatter text from the fields and queue a save. */
function commitFields() {
  if (!fields.value) return
  frontmatter.value = serializeFrontmatter(fields.value)
  if (!open.value || !view.value) return
  pendingDoc = view.value.state.doc.toJSON()
  if (autosave.value) scheduleSave()
}

function addField() {
  fields.value?.entries.push(newEntry())
}

function removeField(index) {
  fields.value?.entries.splice(index, 1)
  commitFields()
}

function scheduleSave() {
  clearTimeout(saveTimer)
  saveTimer = setTimeout(save, AUTOSAVE_DELAY)
}

async function save() {
  if (!pendingDoc || saving) return
  const doc = pendingDoc
  pendingDoc = null
  saving = true
  setStatus({ kind: 'busy', message: 'saving…' })

  try {
    const result = await saveDoc({ route: editingRoute, baseSource, expectHash, doc, frontmatter: frontmatter.value })
    expectHash = result.hash
    warnings.value = result.warnings ?? []

    /*
      The session baseline deliberately survives a write. Autosave runs a few
      hundred milliseconds after a keystroke, so "changed since the last save"
      would empty itself while you were still looking at it. Git marks do move,
      since the commit they compare against has not.
    */
    refreshGit()

    const broken = warnings.value.length
    setStatus({
      kind: broken ? 'warn' : 'ok',
      message: broken
        ? `saved \u00b7 ${broken} missing ${broken === 1 ? 'file' : 'files'}`
        : result.unchanged ? 'no change' : 'saved',
    })
  } catch (error) {
    if (error.status === 409) {
      // Do not overwrite; let the user decide.
      conflict.value = error.payload
      setStatus({ kind: 'error', message: 'file changed on disk' })
    } else {
      pendingDoc = doc // keep the edit so a retry can still write it
      setStatus({ kind: 'error', message: error.message })
    }
  } finally {
    saving = false
    // An edit made during the save still needs writing.
    if (pendingDoc && autosave.value) scheduleSave()
  }
}

/** Ask the server which blocks differ from the last commit. */
async function refreshGit() {
  if (!showGit.value || !view.value || !editingRoute) return
  try {
    const result = await fetchChanges(editingRoute)
    gitAvailable.value = result.available
    setGitChanges(view.value, { keys: result.keys, showGit: result.available })
  } catch {
    gitAvailable.value = false
    setGitChanges(view.value, { keys: null, showGit: false })
  }
}

async function toggleGit() {
  showGit.value = !showGit.value
  if (!view.value) return
  if (!showGit.value) {
    setGitChanges(view.value, { showGit: false })
    return
  }
  await refreshGit()
}

async function discardAndReload() {
  conflict.value = null
  pendingDoc = null
  await load()
}

function toggle() {
  open.value = !open.value
}

/** Write any pending edit before the document is replaced. */
async function flush() {
  clearTimeout(saveTimer)
  saveTimer = null
  if (pendingDoc) await save()
}

watch(open, async (isOpen) => {
  document.body.classList.toggle('live-edit-open', isOpen)
  if (isOpen) {
    load()
  } else {
    await flush()
    destroyEditor()
  }
})

// Following a link while editing loads that page instead.
watch(
  () => route.path,
  async () => {
    if (!open.value) return
    await flush()
    load()
  },
)

function onKeydown(event) {
  const mod = event.metaKey || event.ctrlKey
  if (mod && event.key.toLowerCase() === 's' && open.value) {
    event.preventDefault()
    flush()
  }
  if (mod && event.shiftKey && event.key.toLowerCase() === 'e') {
    event.preventDefault()
    toggle()
  }
}
window.addEventListener('keydown', onKeydown)

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.classList.remove('live-edit-open')
  destroyEditor()
})

// Warn on reload or close with an unwritten edit.
function onBeforeUnload(event) {
  if (!pendingDoc) return
  event.preventDefault()
  event.returnValue = ''
}
window.addEventListener('beforeunload', onBeforeUnload)
onBeforeUnmount(() => window.removeEventListener('beforeunload', onBeforeUnload))
</script>

<template>
  <button
    v-if="!open && editable"
    class="live-edit-launch"
    type="button"
    title="Edit this page (Cmd/Ctrl+Shift+E)"
    @click="toggle"
  >
    <span aria-hidden="true">✎</span> Edit
  </button>

  <div v-if="open" class="live-edit-bar">
    <span v-if="status" class="live-edit-bar__status" :class="`is-${status.kind}`">{{ status.message }}</span>
    <button type="button" :class="{ 'is-active': showFrontmatter }" @click="showFrontmatter = !showFrontmatter">
      frontmatter
    </button>
    <button
      type="button"
      :class="{ 'is-active': showGit }"
      :title="gitAvailable ? 'Mark blocks that differ from the last commit' : 'No git repository here'"
      @click="toggleGit"
    >
      git changes
    </button>
    <label class="live-edit-bar__toggle" title="Write to disk as you type">
      <input v-model="autosave" type="checkbox" />
      autosave
    </label>
    <button type="button" @click="flush">Save</button>
    <button type="button" @click="toggle">Done</button>
  </div>

  <div v-if="open && showFrontmatter" class="live-edit-frontmatter">
    <div v-if="fields" class="live-edit-frontmatter__grid">
      <template v-for="(entry, index) in fields.entries" :key="index">
        <template v-if="entry.scalar">
          <input
            v-model="entry.key"
            class="live-edit-frontmatter__key"
            type="text"
            spellcheck="false"
            @input="commitFields"
          />
          <input
            v-model="entry.value"
            class="live-edit-frontmatter__value"
            type="text"
            @input="commitFields"
          />
          <button type="button" title="Remove field" @click="removeField(index)">✕</button>
        </template>
        <template v-else>
          <span class="live-edit-frontmatter__key is-block">{{ entry.key || 'yaml' }}</span>
          <pre class="live-edit-frontmatter__block">{{ entry.lines.join('\n') }}</pre>
          <span></span>
        </template>
      </template>
    </div>
    <p v-else class="live-edit-frontmatter__empty">This page has no frontmatter.</p>
    <button v-if="fields" type="button" class="live-edit-frontmatter__add" @click="addField">
      Add field
    </button>
  </div>

  <div v-if="open && warnings.length" class="live-edit-warnings">
    <p>Saved, but these files are not there:</p>
    <ul>
      <li v-for="(warning, index) in warnings" :key="index"><code>{{ warning.src }}</code> &mdash; {{ warning.where || 'reference' }}</li>
    </ul>
  </div>

  <div v-if="conflict" class="live-edit-conflict">
    <p>
      <strong>{{ sourcePath }}</strong> changed on disk while you were editing it.
      Reloading discards what you typed here; nothing has been written.
    </p>
    <button type="button" @click="discardAndReload">Reload from disk</button>
  </div>
</template>
