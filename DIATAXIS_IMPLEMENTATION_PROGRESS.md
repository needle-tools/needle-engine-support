# Diátaxis Implementation Progress Tracker

**Project:** Needle Engine Documentation Restructuring
**Start Date:** 2026-01-27
**Status:** 🚧 In Progress

---

## Original Instructions

> The documentation should be updated to follow the https://diataxis.fr/ approach - please review the whole docs structure and write notes down in a markdown files where to find what to keep track of progress and to plan the new structure. Currently documentation is quite scattered. It's hard to find and navigate the right content. We hope by using diataxis tutorials - how to gudes - explanation - reference structuring (also reflected in the menus) it will be eaiser to navigate and find content. Existing pages should not be completely deleted but rather point to the new updated entrypoints once we have a new sturcture in plane.

**Purpose of this document:** Track all implementation progress, completed tasks, blockers, and next steps throughout the Diátaxis restructuring project.

---

## Related Documents

- [DIATAXIS_ANALYSIS.md](./DIATAXIS_ANALYSIS.md) - Comprehensive analysis and planning
- [DIATAXIS_MIGRATION_MAP.md](./DIATAXIS_MIGRATION_MAP.md) - File-by-file migration plan

---

## Implementation Phases

- [x] **Phase 0:** Planning & Analysis (COMPLETED 2026-01-27)
- [ ] **Phase 1:** Structure & Redirects (IN PROGRESS)
- [ ] **Phase 2:** Content Migration
- [ ] **Phase 3:** Navigation Update
- [ ] **Phase 4:** Testing
- [ ] **Phase 5:** Launch

---

## Phase 1: Structure & Redirects

**Goal:** Create new folder structure, set up redirect system, create landing pages

**Status:** 🚧 In Progress
**Started:** 2026-01-27

### Tasks

#### 1.1 Create New Folder Structure
- [ ] Create `/tutorials/` directory
  - [ ] Create `/tutorials/fundamentals/` subdirectory
  - [ ] Create `/tutorials/unity/` subdirectory
  - [ ] Create `/tutorials/blender/` subdirectory
  - [ ] Create `/tutorials/web/` subdirectory
  - [ ] Create `/tutorials/interactive/` subdirectory
  - [ ] Create `/tutorials/xr/` subdirectory
  - [ ] Create `/tutorials/multiplayer/` subdirectory
  - [ ] Create `/tutorials/scripting/` subdirectory

- [ ] Create `/how-to-guides/` directory
  - [ ] Create `/how-to-guides/setup/` subdirectory
  - [ ] Create `/how-to-guides/export/` subdirectory
  - [ ] Create `/how-to-guides/scripting/` subdirectory
  - [ ] Create `/how-to-guides/web-integration/` subdirectory
  - [ ] Create `/how-to-guides/xr/` subdirectory
  - [ ] Create `/how-to-guides/networking/` subdirectory
  - [ ] Create `/how-to-guides/optimization/` subdirectory
  - [ ] Create `/how-to-guides/deployment/` subdirectory
  - [ ] Create `/how-to-guides/debugging/` subdirectory
  - [ ] Create `/how-to-guides/testing/` subdirectory
  - [ ] Create `/how-to-guides/unity/` subdirectory
  - [ ] Create `/how-to-guides/blender/` subdirectory
  - [ ] Create `/how-to-guides/integrations/` subdirectory

- [ ] Create `/explanation/` directory
  - [ ] Create `/explanation/core-concepts/` subdirectory
  - [ ] Create `/explanation/architecture/` subdirectory
  - [ ] Create `/explanation/export-pipeline/` subdirectory
  - [ ] Create `/explanation/xr/` subdirectory
  - [ ] Create `/explanation/networking/` subdirectory

- [ ] Reorganize `/reference/` directory
  - [ ] Create `/reference/components/` subdirectory
  - [ ] Create `/reference/api/` subdirectory
  - [ ] Create `/reference/configuration/` subdirectory
  - [ ] Create `/reference/platforms/` subdirectory

- [ ] Create `/samples-and-showcase/` directory
  - [ ] Create `/samples-and-showcase/projects/` subdirectory

- [ ] Create `/help/` directory

#### 1.2 Create Landing Pages
- [ ] Create `/tutorials/index.md` (Tutorials landing)
- [ ] Create `/how-to-guides/index.md` (How-To Guides landing)
- [ ] Create `/explanation/index.md` (Explanation landing)
- [ ] Create `/reference/index.md` (Reference landing)
- [ ] Create `/samples-and-showcase/index.md` (Samples landing)
- [ ] Create `/help/index.md` (Help landing)

#### 1.3 Set Up Redirect System
- [ ] Research VuePress redirect options
- [ ] Install redirect plugin if needed
- [ ] Create redirect configuration file
- [ ] Test redirect functionality

---

## Phase 2: Content Migration

**Status:** ⏳ Not Started

### High Priority Files (Week 1-2)

#### 2.1 Split scripting.md
- [ ] Create explanation/component-system.md
- [ ] Create explanation/component-architecture.md
- [ ] Create explanation/serialization.md
- [ ] Create tutorials/scripting/your-first-component.md
- [ ] Create how-to-guides/scripting/no-code-events.md
- [ ] Create how-to-guides/scripting/use-coroutines.md
- [ ] Create how-to-guides/scripting/use-lifecycle-hooks.md
- [ ] Create how-to-guides/scripting/find-components.md
- [ ] Create how-to-guides/scripting/access-threejs-scene.md
- [ ] Create how-to-guides/scripting/handle-input.md
- [ ] Create how-to-guides/scripting/perform-raycasting.md
- [ ] Create how-to-guides/scripting/access-from-html.md
- [ ] Create how-to-guides/scripting/use-gizmos.md
- [ ] Create how-to-guides/scripting/load-assets.md
- [ ] Create reference/lifecycle-methods.md
- [ ] Create reference/physics-events.md
- [ ] Create reference/input-events.md
- [ ] Create reference/xr-events.md
- [ ] Create reference/time-api.md
- [ ] Add redirect from /scripting to /how-to-guides/scripting/
- [ ] Update all internal links

#### 2.2 Split deployment.md
- [ ] Create how-to-guides/deployment/index.md (landing)
- [ ] Create explanation/build-types.md
- [ ] Create how-to-guides/deployment/production-builds.md
- [ ] Create how-to-guides/optimization/compress-textures.md
- [ ] Create how-to-guides/optimization/compress-meshes.md
- [ ] Create how-to-guides/optimization/progressive-loading.md
- [ ] Create how-to-guides/optimization/mesh-lods.md
- [ ] Create how-to-guides/deployment/needle-cloud.md
- [ ] Create how-to-guides/deployment/netlify.md
- [ ] Create how-to-guides/deployment/vercel.md
- [ ] Create how-to-guides/deployment/github-pages.md
- [ ] Create how-to-guides/deployment/itchio.md
- [ ] Create how-to-guides/deployment/facebook-instant-games.md
- [ ] Create how-to-guides/deployment/ftp.md
- [ ] Create how-to-guides/deployment/build-to-folder.md
- [ ] Add redirect from /deployment to /how-to-guides/deployment/
- [ ] Update all internal links

#### 2.3 Split networking.md
- [ ] Create explanation/networking-architecture.md
- [ ] Create tutorials/multiplayer/your-first-multiplayer-app.md
- [ ] Create how-to-guides/networking/index.md (landing)
- [ ] Create how-to-guides/networking/use-rooms.md
- [ ] Create how-to-guides/networking/sync-state.md
- [ ] Create how-to-guides/networking/add-voice-chat.md
- [ ] Create how-to-guides/networking/custom-servers.md
- [ ] Add redirect from /networking to /how-to-guides/networking/
- [ ] Update all internal links

#### 2.4 Reorganize Getting Started
- [ ] Move getting-started/typescript-essentials.md to tutorials/fundamentals/
- [ ] Move getting-started/for-unity-developers.md to tutorials/fundamentals/
- [ ] Update getting-started/index.md links
- [ ] Delete root-level for-unity-developers.md redirect
- [ ] Update redirect to new location
- [ ] Update all internal links

#### 2.5 Create New Tutorials
- [ ] Create tutorials/interactive/product-viewer.md (comprehensive tutorial)
- [ ] Create tutorials/xr/vr-gallery.md (VR tutorial)
- [ ] Create tutorials/multiplayer/first-multiplayer-app.md (from networking split)

### Medium Priority Files (Week 3-4)

#### 2.6 Split technical-overview.md
- [ ] Create explanation/technical-architecture.md
- [ ] Create explanation/gltf-and-export-pipeline.md
- [ ] Create reference/gltf-extensions.md
- [ ] Create explanation/needle-gltf-extensions.md
- [ ] Create explanation/data-serialization.md
- [ ] Create explanation/threejs-integration.md
- [ ] Create explanation/architecture-decisions.md
- [ ] Add redirect
- [ ] Update all internal links

#### 2.7 Split xr.md
- [ ] Create explanation/webxr-platforms.md
- [ ] Create how-to-guides/xr/index.md (landing)
- [ ] Create how-to-guides/xr/enable-webxr.md
- [ ] Create reference/xr-platform-support.md
- [ ] Move ios-webxr-app-clip.md to how-to-guides/xr/
- [ ] Move webxr-image-tracking.md to how-to-guides/xr/
- [ ] Move everywhere-actions.md to how-to-guides/xr/usdz-quicklook.md
- [ ] Add redirect from /xr to /how-to-guides/xr/
- [ ] Update all internal links

#### 2.8 Split export.md
- [ ] Create how-to-guides/export/index.md (landing)
- [ ] Create how-to-guides/export/meshes.md
- [ ] Create how-to-guides/export/materials.md
- [ ] Create how-to-guides/export/animations.md
- [ ] Create how-to-guides/export/lightmaps.md
- [ ] Move materialx.md to how-to-guides/export/
- [ ] Add redirect from /export to /how-to-guides/export/
- [ ] Update all internal links

#### 2.9 Split html.md
- [ ] Create how-to-guides/web-integration/index.md (landing)
- [ ] Create how-to-guides/web-integration/frameworks.md
- [ ] Create how-to-guides/web-integration/bundlers.md
- [ ] Create how-to-guides/web-integration/pwa.md
- [ ] Create how-to-guides/web-integration/cdn.md
- [ ] Merge embedding.md content into appropriate sections
- [ ] Add redirect
- [ ] Update all internal links

#### 2.10 Split Integration Directories
- [ ] Split unity/index.md into tutorial, how-to, explanation
- [ ] Split blender/index.md into tutorial, how-to, explanation
- [ ] Split three/index.md into tutorial, how-to, explanation
- [ ] Move unity/editor-sync.md to how-to-guides/unity/hot-reload.md
- [ ] Update all redirects and links

### Low Priority Files (Week 5)

#### 2.11 Move Remaining Files
- [ ] Move showcase files to /samples-and-showcase/projects/
- [ ] Move support.md to /help/
- [ ] Move faq.md to /reference/ (keep copy in /help/)
- [ ] Move component-reference.md to /reference/components/
- [ ] Move reference/*.md files as needed
- [ ] Update all links

---

## Phase 3: Navigation Update

**Status:** ⏳ Not Started

### Tasks

- [ ] Update config.ts navbar (lines 130-355)
- [ ] Update config.ts sidebar (lines 357-466)
- [ ] Add Diátaxis section badges/indicators
- [ ] Add breadcrumb navigation
- [ ] Add "Next Steps" sections to all pages
- [ ] Add "Related Content" cross-links
- [ ] Test navigation on mobile
- [ ] Test navigation on desktop

---

## Phase 4: Testing

**Status:** ⏳ Not Started

### Tasks

- [ ] Test all URL redirects (50+ redirects)
- [ ] Test all internal links (hundreds of links)
- [ ] Test search functionality
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices
- [ ] Test accessibility (screen readers, keyboard navigation)
- [ ] Performance testing (page load times)
- [ ] SEO check (meta tags, sitemap)

---

## Phase 5: Launch

**Status:** ⏳ Not Started

### Tasks

- [ ] Soft launch to beta testers
- [ ] Collect feedback
- [ ] Address critical issues
- [ ] Final content review
- [ ] Update external links (blog posts, social media)
- [ ] Prepare announcement post
- [ ] Official launch
- [ ] Monitor community feedback
- [ ] Address post-launch issues

---

## Progress Summary

### Completed
- ✅ Phase 0: Planning & Analysis

### In Progress
- 🚧 Phase 1: Structure & Redirects (0% complete)

### Statistics
- **Total files to migrate:** 55+
- **Files migrated:** 0
- **New files created:** 0
- **Redirects configured:** 0
- **Tests passing:** 0/0

---

## Blockers & Issues

*None yet*

---

## Notes & Decisions

### 2026-01-27
- Project approved and started
- Created progress tracking document
- Beginning Phase 1: Creating folder structure and landing pages

---

## Daily Log

### 2026-01-27
- ✅ Created comprehensive analysis (DIATAXIS_ANALYSIS.md)
- ✅ Created migration map (DIATAXIS_MIGRATION_MAP.md)
- ✅ Got project approval
- ✅ Created progress tracker (this document)
- 🚧 Started Phase 1: Creating folder structure

---

**Last Updated:** 2026-01-27
**Next Update:** After completing Phase 1.1 (folder structure)
## Progress Update - 2026-01-27 13:31

### Completed:
- ✅ Created folder structure (all Diátaxis directories)
- ✅ Created all 6 landing pages (tutorials, how-to-guides, explanation, reference, samples, help)
- ✅ Moved getting-started tutorials to tutorials/fundamentals/
- ✅ Created how-to-guides/scripting/create-components.md
- ✅ Created reference/api/lifecycle-methods.md
- ✅ Created reference/api/physics-events.md
- ✅ Created reference/api/input-events.md

### In Progress:
- 🚧 Splitting scripting.md
- 🚧 Creating reference pages

### Next:
- Create more reference pages (XR events, time API)
- Move showcase files
- Update config.ts navigation

