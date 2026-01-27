# Diátaxis Migration Map - File-by-File Plan

**Purpose:** Detailed mapping of every documentation file to its new location in the Diátaxis structure.

**Legend:**
- 🆕 = New file to be created
- ✂️ = File to be split into multiple files
- 🔀 = File to be merged with another
- ↗️ = File to be redirected
- ✅ = Keep as-is (maybe rename)
- 🗑️ = Delete (redirect only)

---

## Current File Inventory with Actions

### Root Level Files

| Current File | Size | Action | New Location(s) | Notes |
|-------------|------|--------|-----------------|-------|
| `index.md` | 208 lines | ✅ Keep | `/` (root) | Homepage - minor updates only |
| `vision.md` | ~150 lines | ✅ Move | `/explanation/vision` | Philosophy page |
| `features-overview.md` | ~400 lines | ✅ Move | `/reference/features-overview` | Feature matrix |
| `technical-overview.md` | 417 lines | ✂️ Split | Multiple locations | See split details below |
| `project-structure.md` | ~200 lines | ✅ Move | `/explanation/project-structure` | Keep as explanation |
| `getting-started.md` | Redirect | 🗑️ Delete | → `/getting-started/` | Already redirects |
| `for-unity-developers.md` | Redirect | 🗑️ Delete | → `/tutorials/fundamentals/for-unity-developers` | Update redirect |
| `vanilla-js.md` | ~100 lines | 🔀 Merge | `/how-to-guides/web-integration/vanilla-js` | Merge with three/index.md content |
| `examples.md` | ~50 lines | ✅ Move | `/samples-and-showcase/` | Samples landing |
| `modules.md` | ~150 lines | ✂️ Split | `/explanation/npm-modules` + `/how-to-guides/scripting/use-npm-modules` | Split concepts from how-to |
| `networking.md` | 670 lines | ✂️ Split | Multiple locations | See split details below |
| `samples-and-modules.md` | ~100 lines | ✅ Move | `/samples-and-showcase/samples` | Sample projects page |
| `SUMMARY.md` | TOC | Update | Keep location | Update to reflect new structure |

### technical-overview.md Split Plan (417 lines)

| Section | Lines | New Location | Type |
|---------|-------|--------------|------|
| "How it works" intro | 1-13 | `/explanation/technical-architecture` | Explanation |
| "glTF Assets" | 15-62 | `/explanation/gltf-and-export-pipeline` | Explanation |
| "Supported glTF extensions" | 20-62 | `/reference/gltf-extensions` | Reference |
| "Vendor-specific extensions" | 65-341 | `/explanation/needle-gltf-extensions` | Explanation |
| "TypeScript and Data Mapping" | 399-402 | `/explanation/data-serialization` | Explanation (expand) |
| "Rendering with three.js" | 403-405 | `/explanation/threejs-integration` | Explanation (expand) |
| "Why not WASM?" | 407-417 | `/explanation/architecture-decisions` | Explanation |

### scripting.md Split Plan (850+ lines)

| Section | Lines | New Location | Type |
|---------|-------|--------------|------|
| Intro & "How It Works" | 1-48 | `/explanation/component-system` | Explanation |
| "No-Code Approach" | 49-66 | `/how-to-guides/scripting/no-code-events` | How-To |
| "Creating First Component" | 67-172 | `/tutorials/scripting/your-first-component` | Tutorial |
| "Component Architecture" | 173-188 | `/explanation/component-architecture` | Explanation |
| "Lifecycle Methods" table | 189-209 | `/reference/lifecycle-methods` | Reference |
| "Physics Events" table | 210-222 | `/reference/physics-events` | Reference |
| "Input Events" table | 223-239 | `/reference/input-events` | Reference |
| "XR Events" table | 240-276 | `/reference/xr-events` | Reference |
| "Coroutines" | 277-310 | `/how-to-guides/scripting/use-coroutines` | How-To |
| "Lifecycle Hooks" | 311-357 | `/how-to-guides/scripting/use-lifecycle-hooks` | How-To |
| "Finding components" | 358-403 | `/how-to-guides/scripting/find-components` | How-To |
| "three.js & HTML DOM" | 404-451 | `/how-to-guides/scripting/access-threejs-scene` | How-To |
| "Time & Delta Time" | 452-470 | `/reference/time-api` | Reference |
| "Input" | 471-537 | `/how-to-guides/scripting/handle-input` | How-To |
| "Raycasting" | 538-568 | `/how-to-guides/scripting/perform-raycasting` | How-To |
| "Networking" | 569-571 | `/how-to-guides/networking/` (link only) | Link |
| "Accessing from anywhere" | 572-611 | `/how-to-guides/scripting/access-from-html` | How-To |
| "Debug Gizmos" | 612-643 | `/how-to-guides/scripting/use-gizmos` | How-To |
| "Serialization" | 644-654 | `/explanation/serialization` | Explanation |
| "Loading Scenes" | 655-665 | `/how-to-guides/scripting/load-assets` | How-To |

### deployment.md Split Plan (534+ lines)

| Section | Lines | New Location | Type |
|---------|-------|--------------|------|
| Intro & Quick Start | 1-30 | `/how-to-guides/deployment/` (landing) | How-To Landing |
| "Understanding Build Types" | 32-58 | `/explanation/build-types` | Explanation |
| "Production Build Setup" | 60-85 | `/how-to-guides/deployment/production-builds` | How-To |
| "Texture Compression" | 88-129 | `/how-to-guides/optimization/compress-textures` | How-To |
| "Mesh Compression" | 130-163 | `/how-to-guides/optimization/compress-meshes` | How-To |
| "Progressive Texture Loading" | 164-180 | `/how-to-guides/optimization/progressive-loading` | How-To |
| "Automatic Mesh LODs" | 181-196 | `/how-to-guides/optimization/mesh-lods` | How-To |
| Platform guides (Netlify, Vercel, etc.) | 199-481 | Keep as individual how-to guides | How-To |
| "Build To Folder" | 404-427 | `/how-to-guides/deployment/build-to-folder` | How-To |
| "Advanced Topics" | 482-517 | `/how-to-guides/deployment/advanced` | How-To |

### networking.md Split Plan (670 lines)

| Section | Lines | New Location | Type |
|---------|-------|--------------|------|
| Intro & concepts | ~1-100 | `/explanation/networking-architecture` | Explanation |
| Getting started | ~100-200 | `/tutorials/multiplayer/your-first-multiplayer-app` | Tutorial |
| Room setup | ~200-300 | `/how-to-guides/networking/use-rooms` | How-To |
| State sync | ~300-400 | `/how-to-guides/networking/sync-state` | How-To |
| Voice chat | ~400-500 | `/how-to-guides/networking/add-voice-chat` | How-To |
| Custom servers | ~500-670 | `/how-to-guides/networking/custom-servers` | How-To |

---

## Getting Started Directory

| Current File | Action | New Location | Notes |
|-------------|--------|--------------|-------|
| `getting-started/index.md` | ✅ Keep | `/getting-started/` | Main entry point - minimal edits |
| `getting-started/typescript-essentials.md` | ✅ Move | `/tutorials/fundamentals/typescript-essentials` | Tutorial |
| `getting-started/for-unity-developers.md` | ✅ Move | `/tutorials/fundamentals/for-unity-developers` | Tutorial |

---

## Integration Directories

### Unity Directory

| Current File | Action | New Location | Notes |
|-------------|--------|--------------|-------|
| `unity/index.md` | ✂️ Split | Multiple locations | Split setup vs concepts |
| - Setup sections | | `/tutorials/unity/quick-start` | Tutorial |
| - Workflow sections | | `/how-to-guides/unity/workflow` | How-To |
| - Concepts | | `/explanation/unity-integration` | Explanation |
| `unity/editor-sync.md` | ✅ Move | `/how-to-guides/unity/hot-reload` | How-To |

### Blender Directory

| Current File | Action | New Location | Notes |
|-------------|--------|--------------|-------|
| `blender/index.md` | ✂️ Split | Multiple locations | Similar to Unity split |
| - Setup sections | | `/tutorials/blender/quick-start` | Tutorial |
| - Workflow sections | | `/how-to-guides/blender/workflow` | How-To |
| - Concepts | | `/explanation/blender-integration` | Explanation |

### Three.js Directory

| Current File | Action | New Location | Notes |
|-------------|--------|--------------|-------|
| `three/index.md` | ✂️ Split | Multiple locations | Split setup, how-to, explanation |
| - Setup | | `/tutorials/web/quick-start` | Tutorial |
| - Integration | | `/how-to-guides/web-integration/threejs` | How-To |
| - Concepts | | `/explanation/threejs-integration` | Explanation |
| `three/needle-devtools-for-threejs-chrome-extension.md` | ✅ Move | `/how-to-guides/debugging/chrome-extension` | How-To |

### Cloud Directory

| Current File | Action | New Location | Notes |
|-------------|--------|--------------|-------|
| `cloud/index.md` | ✂️ Split | `/how-to-guides/deployment/needle-cloud` + `/explanation/needle-cloud` | Split how-to from explanation |

### AI Directory

| Current File | Action | New Location | Notes |
|-------------|--------|--------------|-------|
| `ai/index.md` | ✅ Move | `/how-to-guides/integrations/ai-mcp-server` | How-To |
| `ai/needle-mcp-server.md` | 🔀 Merge | Merge into ai/index.md | Combine into single guide |

### Custom Integrations Directory

| Current File | Action | New Location | Notes |
|-------------|--------|--------------|-------|
| `custom-integrations/index.md` | ✅ Move | `/how-to-guides/integrations/custom` | How-To |

---

## Core Content Files

### Export & Assets

| Current File | Action | New Location | Notes |
|-------------|--------|--------------|-------|
| `export.md` | ✂️ Split | Multiple how-to guides | Split by topic |
| - Overview | | `/how-to-guides/export/` (landing) | Landing page |
| - Meshes | | `/how-to-guides/export/meshes` | How-To |
| - Materials | | `/how-to-guides/export/materials` | How-To |
| - Animations | | `/how-to-guides/export/animations` | How-To |
| - Lightmaps | | `/how-to-guides/export/lightmaps` | How-To |
| `materialx.md` | ✅ Move | `/how-to-guides/export/materialx` | How-To |
| `component-compiler.md` | ✅ Move | `/explanation/component-compiler` | Explanation |

### Web Integration

| Current File | Action | New Location | Notes |
|-------------|--------|--------------|-------|
| `html.md` | ✂️ Split | Multiple how-to guides | Split by framework/topic |
| - Frameworks | | `/how-to-guides/web-integration/frameworks` | How-To |
| - Bundlers | | `/how-to-guides/web-integration/bundlers` | How-To |
| - PWA | | `/how-to-guides/web-integration/pwa` | How-To |
| - CDN | | `/how-to-guides/web-integration/cdn` | How-To |
| `embedding.md` | 🔀 Merge | `/how-to-guides/web-integration/embedding` | Merge with relevant html.md sections |
| `integrating-with-framer.md` | ✅ Move | `/how-to-guides/web-integration/framer` | How-To |
| `integrating-with-wordpress.md` | ✅ Move | `/how-to-guides/web-integration/wordpress` | How-To |
| `responsive-3D-webdesign-with-needle-and-threejs.md` | ✅ Move | `/how-to-guides/web-integration/responsive-design` | How-To |

### XR Files

| Current File | Action | New Location | Notes |
|-------------|--------|--------------|-------|
| `xr.md` | ✂️ Split | Multiple locations | Split concepts, how-to, reference |
| - Platform overview | | `/explanation/webxr-platforms` | Explanation |
| - Setup guide | | `/how-to-guides/xr/enable-webxr` | How-To |
| - Platform matrix | | `/reference/xr-platform-support` | Reference |
| `ios-webxr-app-clip.md` | ✅ Move | `/how-to-guides/xr/ios-app-clips` | How-To |
| `webxr-image-tracking.md` | ✅ Move | `/how-to-guides/xr/image-tracking` | How-To |
| `everywhere-actions.md` | ✅ Move | `/how-to-guides/xr/usdz-quicklook` | How-To |

### Scripting Files

| Current File | Action | New Location | Notes |
|-------------|--------|--------------|-------|
| `scripting.md` | ✂️ Split | See detailed split plan above | Major restructuring |
| `scripting-examples.md` | ✅ Move | `/reference/scripting-examples` | Reference (code examples) |

### Support & Debug

| Current File | Action | New Location | Notes |
|-------------|--------|--------------|-------|
| `debugging.md` | ✂️ Split | `/how-to-guides/debugging/` + `/reference/debug-flags` | Split how-to from reference |
| `testing.md` | ✅ Move | `/how-to-guides/testing/` | How-To |
| `faq.md` | ✅ Keep | `/reference/faq` (also link from `/help/`) | Reference |
| `support.md` | ✅ Keep | `/help/support` | Support landing |

---

## Reference Directory

| Current File | Action | New Location | Notes |
|-------------|--------|--------------|-------|
| `reference/needle-config-json.md` | ✅ Keep | `/reference/needle-config-json` | Already well-placed |
| `reference/needle-engine-attributes.md` | ✅ Keep | `/reference/web-component-attributes` | Maybe rename |
| `reference/typescript-decorators.md` | ✅ Keep | `/reference/typescript-decorators` | Already well-placed |
| `component-reference.md` | ✅ Move | `/reference/components` | Move into reference folder |

---

## Showcase Files

| Current File | Action | New Location | Notes |
|-------------|--------|--------------|-------|
| `testimonials.md` | ✅ Keep | Keep on homepage or move to `/about/testimonials` | Optional |
| `showcase-bike.md` | ✅ Move | `/samples-and-showcase/bike` | Showcase |
| `showcase-castle.md` | ✅ Move | `/samples-and-showcase/castle` | Showcase |
| `showcase-mercedes-benz.md` | ✅ Move | `/samples-and-showcase/mercedes-benz` | Showcase |
| `showcase-monsterhands.md` | ✅ Move | `/samples-and-showcase/monsterhands` | Showcase |
| `showcase-towerdefence.md` | ✅ Move | `/samples-and-showcase/tower-defense` | Showcase |
| `showcase-website.md` | ✅ Move | `/samples-and-showcase/website` | Showcase |
| `showcase-zenrepublic.md` | ✅ Move | `/samples-and-showcase/zen-republic` | Showcase |

---

## New Files to Create

### Tutorials (🆕)

| New File | Purpose | Est. Lines | Priority |
|----------|---------|-----------|----------|
| `/tutorials/interactive/product-viewer` | Complete product viewer tutorial | 400-600 | High |
| `/tutorials/xr/vr-gallery` | VR gallery experience tutorial | 500-700 | High |
| `/tutorials/multiplayer/first-multiplayer-app` | Multiplayer game tutorial | 600-800 | High |
| `/tutorials/unity/quick-start` | Unity getting started (extracted) | 200-300 | High |
| `/tutorials/blender/quick-start` | Blender getting started (extracted) | 200-300 | High |
| `/tutorials/web/quick-start` | Web getting started (extracted) | 200-300 | High |

### Explanation Pages (🆕)

| New File | Purpose | Est. Lines | Priority |
|----------|---------|-----------|----------|
| `/explanation/gltf-and-export-pipeline` | How export pipeline works | 300-400 | Medium |
| `/explanation/needle-gltf-extensions` | Deep dive into NEEDLE_* extensions | 400-500 | Medium |
| `/explanation/data-serialization` | How data mapping works | 200-300 | Low |
| `/explanation/architecture-decisions` | Why certain choices were made | 200-300 | Low |
| `/explanation/build-types` | Dev vs production builds | 150-200 | Medium |
| `/explanation/networking-architecture` | How networking works | 300-400 | Medium |

### Reference Pages (🆕)

| New File | Purpose | Est. Lines | Priority |
|----------|---------|-----------|----------|
| `/reference/lifecycle-methods` | Complete lifecycle reference | 100-150 | High |
| `/reference/physics-events` | Physics event reference | 50-75 | High |
| `/reference/input-events` | Input event reference | 50-75 | High |
| `/reference/xr-events` | XR event reference | 75-100 | High |
| `/reference/time-api` | Time and deltaTime API | 50-75 | Medium |
| `/reference/debug-flags` | All URL parameters and flags | 100-150 | Medium |
| `/reference/xr-platform-support` | XR device compatibility matrix | 100-150 | High |
| `/reference/browser-compatibility` | Browser support matrix | 75-100 | Medium |
| `/reference/gltf-extensions` | Supported glTF extensions list | 100-150 | Low |

### Landing Pages (🆕)

| New File | Purpose | Est. Lines | Priority |
|----------|---------|-----------|----------|
| `/tutorials/` | Tutorials landing page | 100-150 | High |
| `/how-to-guides/` | How-to guides landing page | 100-150 | High |
| `/explanation/` | Explanation landing page | 100-150 | High |
| `/reference/` | Reference landing page | 100-150 | High |
| `/samples-and-showcase/` | Samples landing page | 100-150 | Medium |
| `/help/` | Help & community landing page | 100-150 | Medium |

---

## URL Redirect Table

### Critical Redirects (High Traffic)

| Old URL | New URL | Type | Notes |
|---------|---------|------|-------|
| `/scripting` | `/how-to-guides/scripting/` | 301 | Most visited page |
| `/deployment` | `/how-to-guides/deployment/` | 301 | High traffic |
| `/getting-started` | `/getting-started/` | 301 | Already exists |
| `/for-unity-developers` | `/tutorials/fundamentals/for-unity-developers` | 301 | Update existing redirect |
| `/networking` | `/how-to-guides/networking/` | 301 | Popular page |
| `/xr` | `/how-to-guides/xr/` | 301 | XR landing |
| `/export` | `/how-to-guides/export/` | 301 | Core workflow |
| `/debugging` | `/how-to-guides/debugging/` | 301 | Common need |
| `/component-reference` | `/reference/components` | 301 | Core reference |
| `/unity/` | `/tutorials/unity/quick-start` | 301 | Entry point |
| `/blender/` | `/tutorials/blender/quick-start` | 301 | Entry point |
| `/three/` | `/tutorials/web/quick-start` | 301 | Entry point |

### All Redirects (Comprehensive List)

*(Full redirect table would include all 55+ files - expand as needed during implementation)*

---

## Implementation Checklist

### Phase 1: Preparation
- [ ] Create new folder structure
- [ ] Set up redirect system
- [ ] Create all landing pages
- [ ] Design page templates for each Diátaxis type

### Phase 2: Content Migration (by section)

#### High Priority (Weeks 1-2)
- [ ] Split `scripting.md` (850 lines → ~10 files)
- [ ] Split `deployment.md` (534 lines → ~8 files)
- [ ] Split `networking.md` (670 lines → ~5 files)
- [ ] Reorganize getting-started pages
- [ ] Create 3 new tutorials (product viewer, VR, multiplayer)

#### Medium Priority (Weeks 3-4)
- [ ] Split `technical-overview.md`
- [ ] Split `xr.md`
- [ ] Split `export.md`
- [ ] Split `html.md`
- [ ] Merge `embedding.md` + `deployment.md` sections
- [ ] Create explanation pages
- [ ] Create reference pages

#### Low Priority (Week 5)
- [ ] Move showcase files
- [ ] Move individual integration guides
- [ ] Create missing reference pages
- [ ] Polish and cross-link

### Phase 3: Navigation Update
- [ ] Update `config.ts` navbar (lines 130-355)
- [ ] Update `config.ts` sidebar (lines 357-466)
- [ ] Add Diátaxis visual indicators
- [ ] Add breadcrumbs
- [ ] Add "Next Steps" to all pages

### Phase 4: Testing
- [ ] Test all redirects
- [ ] Test all internal links
- [ ] Test search functionality
- [ ] Mobile testing
- [ ] Browser compatibility testing

### Phase 5: Launch
- [ ] Soft launch to beta testers
- [ ] Community feedback round
- [ ] Final adjustments
- [ ] Official announcement
- [ ] Update external links (blog, social media)

---

## Content Split Examples

### Example: scripting.md → Multiple Files

**Before:** Single 850-line file
**After:** 15+ focused files

```
scripting.md (850 lines)
├─ explanation/component-system.md (100 lines)
├─ explanation/component-architecture.md (80 lines)
├─ explanation/serialization.md (60 lines)
├─ tutorials/scripting/your-first-component.md (120 lines)
├─ how-to-guides/scripting/no-code-events.md (40 lines)
├─ how-to-guides/scripting/use-coroutines.md (80 lines)
├─ how-to-guides/scripting/use-lifecycle-hooks.md (100 lines)
├─ how-to-guides/scripting/find-components.md (90 lines)
├─ how-to-guides/scripting/access-threejs-scene.md (70 lines)
├─ how-to-guides/scripting/handle-input.md (120 lines)
├─ how-to-guides/scripting/perform-raycasting.md (80 lines)
├─ how-to-guides/scripting/access-from-html.md (80 lines)
├─ how-to-guides/scripting/use-gizmos.md (70 lines)
├─ how-to-guides/scripting/load-assets.md (60 lines)
├─ reference/lifecycle-methods.md (50 lines)
├─ reference/physics-events.md (30 lines)
├─ reference/input-events.md (40 lines)
├─ reference/xr-events.md (80 lines)
└─ reference/time-api.md (40 lines)

Total: ~1,290 lines (expanded with intros/outros)
```

**Benefits:**
- Each file has clear purpose
- Users find exactly what they need
- Easier to maintain and update
- Can be read in any order

---

## Timeline Estimate

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Phase 1: Planning & Structure | 1 week | Stakeholder approval |
| Phase 2: Content Migration | 3 weeks | Phase 1 complete |
| Phase 3: Navigation Update | 1 week | Phase 2 complete |
| Phase 4: Testing | 1 week | Phase 3 complete |
| Phase 5: Launch | 1 week | Phase 4 complete, community feedback |
| **Total** | **7 weeks** | |

**Buffer:** Add 1-2 weeks for unexpected issues

---

## Resource Requirements

| Role | Time Commitment | Responsibilities |
|------|----------------|------------------|
| Technical Writer | Full-time (7 weeks) | Content splitting, rewriting, new tutorials |
| Developer | Part-time (2-3 days/week) | Redirect setup, config updates, testing |
| Designer | Part-time (1-2 days/week) | Visual indicators, page templates |
| Reviewer | Part-time (ongoing) | Content review, technical accuracy |
| Project Manager | Part-time (ongoing) | Coordination, timeline tracking |

---

## Success Criteria

### Content Quality
- [ ] All 55+ files migrated or updated
- [ ] No broken internal links
- [ ] All old URLs redirect correctly
- [ ] 3 new comprehensive tutorials created
- [ ] 10+ new explanation pages created
- [ ] 15+ new reference pages created

### User Experience
- [ ] Clear navigation by Diátaxis type
- [ ] <3 clicks to any page from homepage
- [ ] Search finds content 95%+ of the time
- [ ] Mobile-friendly navigation
- [ ] Positive community feedback (>80% approval)

### Technical
- [ ] All redirects tested and working
- [ ] SEO maintained or improved
- [ ] Page load times <2s
- [ ] Accessibility (WCAG 2.1 AA)

---

**Document Version:** 1.0
**Last Updated:** 2026-01-27
**Next Review:** After Phase 1 approval
