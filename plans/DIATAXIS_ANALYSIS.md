# Diátaxis Documentation Restructuring Plan

**Date:** 2026-01-27
**Purpose:** Reorganize Needle Engine documentation following the [Diátaxis framework](https://diataxis.fr/) for better navigation and content discovery.

---

## Executive Summary

The Needle Engine documentation is comprehensive (~55 main files) but currently scattered across multiple files with overlapping content and unclear categorization. By applying the Diátaxis framework's four-quadrant approach (Tutorials, How-To Guides, Explanation, Reference), we can significantly improve content discoverability and user experience.

**Key Goals:**
1. Restructure navigation menus to follow Diátaxis categories
2. Eliminate content duplication and overlap
3. Create clear entry points for different user needs
4. Preserve all existing content (redirect old URLs to new locations)

---

## Understanding Diátaxis

### The Four Quadrants

| Type | Purpose | User Need | Characteristics |
|------|---------|-----------|----------------|
| **Tutorials** | Learning-oriented | "Teach me how to get started" | Step-by-step, complete examples, beginner-friendly, guaranteed to work |
| **How-To Guides** | Task-oriented | "Show me how to solve X" | Goal-focused, assumes competence, solves specific problems |
| **Explanation** | Understanding-oriented | "Help me understand Y" | Conceptual, provides context, discusses design decisions |
| **Reference** | Information-oriented | "Tell me what Z does" | Complete, accurate, structured like the product |

### Key Principles

**Tutorials:**
- Concrete, step-by-step guidance
- Focus on learning, not task completion
- Early visible results to build confidence
- Minimal explanation (link to concepts instead)
- Perfect reliability (every step must work)

**How-To Guides:**
- Problem-centered, not tool-centered
- Assumes user already knows what they want
- Action-oriented, no digression
- Practical over complete

**Explanation:**
- Broader perspective
- Makes connections across topics
- Provides historical context and "why"
- Can include opinions and alternatives

**Reference:**
- Neutral, factual descriptions
- Consistent patterns and structure
- Mirrors product organization
- Complete and accurate

---

## Current Documentation Analysis

### File Inventory (55 main files)

#### Landing & Overview (4 files)
- `index.md` - Homepage with features and testimonials
- `vision.md` - Project philosophy and goals
- `features-overview.md` - Comprehensive feature list
- `technical-overview.md` - glTF architecture deep dive

#### Getting Started (4 files)
- `getting-started/index.md` - Installation guide with workflow choices
- `getting-started/typescript-essentials.md` - TypeScript fundamentals
- `getting-started/for-unity-developers.md` - Unity to web transition guide
- `examples.md` - Links to samples and showcase

#### Integration Guides (6 directories)
- `unity/index.md` - Unity editor integration (~320 lines)
- `unity/editor-sync.md` - Hot reload and live editing
- `blender/index.md` - Blender addon guide (~450 lines)
- `three/index.md` - three.js integration
- `three/needle-devtools-for-threejs-chrome-extension.md` - Chrome extension
- `cloud/index.md` - Needle Cloud platform
- `custom-integrations/index.md` - Custom integration guide
- `ai/index.md` - AI integration (MCP server)

#### Core Scripting & Development (6 files)
- `scripting.md` - Component system, lifecycle (~850 lines) **[LARGE]**
- `scripting-examples.md` - Code patterns and examples (~530 lines)
- `component-reference.md` - Built-in components catalog (~400+ components)
- `component-compiler.md` - TypeScript-to-C# generation
- `modules.md` - NPM module system
- `project-structure.md` - Editor vs web project explanation

#### Export & Assets (3 files)
- `export.md` - Exporting from Unity/Blender (meshes, materials, animations)
- `materialx.md` - MaterialX format for complex materials
- `everywhere-actions.md` - USDZ/QuickLook AR experiences

#### Web Integration (7 files)
- `html.md` - Frameworks, bundlers, PWA, CDN
- `embedding.md` - Ways to embed on websites
- `deployment.md` - Hosting, compression, optimization (~534 lines) **[LARGE]**
- `vanilla-js.md` - Pure JavaScript usage
- `integrating-with-framer.md` - Framer integration
- `integrating-with-wordpress.md` - WordPress integration
- `responsive-3D-webdesign-with-needle-and-threejs.md` - Responsive design

#### XR & Immersive (4 files)
- `xr.md` - WebXR VR/AR documentation
- `ios-webxr-app-clip.md` - Native iOS WebXR
- `webxr-image-tracking.md` - Image tracking for AR
- (everywhere-actions.md also covers AR)

#### Advanced Topics (4 files)
- `networking.md` - Multiplayer, state sync (~670 lines) **[LARGE]**
- `debugging.md` - Debug flags, gizmos, testing tools
- `testing.md` - Testing strategies
- `unity/editor-sync.md` - Hot reload and live editing

#### Reference (3 files)
- `reference/needle-config-json.md` - Configuration file reference
- `reference/needle-engine-attributes.md` - Web component attributes
- `reference/typescript-decorators.md` - TypeScript decorators

#### Support & Community (3 files)
- `faq.md` - Frequently asked questions (~290 lines)
- `support.md` - Support resources
- `testimonials.md` - User testimonials

#### Showcase (7 files)
- `showcase-*.md` - Various project showcases
- `samples-and-modules.md` - Sample projects and npm modules

---

## Content Categorization by Diátaxis Type

### TUTORIALS (Learning-Oriented)

**Goal:** Take a beginner from zero to a working project

| Current File | Diátaxis Category | Notes |
|-------------|-------------------|-------|
| `getting-started/index.md` | Tutorial | Good tutorial structure, multiple paths |
| `getting-started/typescript-essentials.md` | Tutorial | Teaches fundamentals from scratch |
| `unity/index.md` (sections) | Tutorial | Unity-specific getting started |
| `blender/index.md` (sections) | Tutorial | Blender-specific getting started |
| `three/index.md` (sections) | Tutorial | Web-first getting started |
| NEW: "Your First Interactive Scene" | Tutorial | **Missing:** End-to-end tutorial building something interactive |
| NEW: "Your First VR Experience" | Tutorial | **Missing:** WebXR tutorial |
| NEW: "Your First Multiplayer App" | Tutorial | **Missing:** Networking tutorial |

**Recommendations:**
- Keep existing getting started guides
- Add 3 new comprehensive tutorials:
  - "Build an Interactive Product Viewer" (covers scripting, UI, loading)
  - "Create a VR Gallery Experience" (covers XR, teleportation, interaction)
  - "Make a Multiplayer Game" (covers networking, state sync, rooms)

---

### HOW-TO GUIDES (Task-Oriented)

**Goal:** Solve specific problems for users that have learned the basics

| Current File | Diátaxis Category | Notes |
|-------------|-------------------|-------|
| `export.md` | How-To | "How to export 3D content" |
| `deployment.md` | How-To | "How to deploy to various platforms" |
| `embedding.md` | How-To | "How to embed Needle Engine" |
| `html.md` | How-To | "How to integrate with frameworks" |
| `integrating-with-framer.md` | How-To | Specific platform integration |
| `integrating-with-wordpress.md` | How-To | Specific platform integration |
| `networking.md` (sections) | How-To | "How to set up multiplayer" |
| `xr.md` (sections) | How-To | "How to enable XR features" |
| `ios-webxr-app-clip.md` | How-To | "How to deploy iOS WebXR" |
| `webxr-image-tracking.md` | How-To | "How to use image tracking" |
| `everywhere-actions.md` | How-To | "How to create USDZ experiences" |
| `materialx.md` | How-To | "How to use MaterialX" |
| `debugging.md` | How-To | "How to debug your app" |
| `testing.md` | How-To | "How to test your app" |
| `responsive-3D-webdesign-with-needle-and-threejs.md` | How-To | "How to make responsive 3D" |

**Recommendations:**
- Reorganize into task-based categories:
  - **Setup & Installation** (export, embedding, deployment)
  - **Scripting & Development** (scripting patterns, testing, debugging)
  - **XR Development** (VR, AR, image tracking, USDZ)
  - **Multiplayer & Networking** (rooms, sync, custom servers)
  - **Optimization** (compression, LODs, performance)
  - **Platform Integration** (frameworks, CMS, hosting)

---

### EXPLANATION (Understanding-Oriented)

**Goal:** Provide conceptual understanding and context

| Current File | Diátaxis Category | Notes |
|-------------|-------------------|-------|
| `vision.md` | Explanation | Philosophy and project goals |
| `technical-overview.md` | Explanation | Architecture, glTF, design decisions |
| `project-structure.md` | Explanation | Editor vs web project concepts |
| `scripting.md` (intro sections) | Explanation | Component architecture explanation |
| `networking.md` (architecture sections) | Explanation | Networking concepts |
| `xr.md` (platform sections) | Explanation | XR platform differences |
| `component-compiler.md` | Explanation | How component generation works |
| `modules.md` | Explanation | NPM module system concepts |
| NEW: "Understanding glTF Extensions" | Explanation | **Missing:** Deep dive into NEEDLE_* extensions |
| NEW: "Understanding the Export Pipeline" | Explanation | **Missing:** How Unity/Blender → glTF works |
| NEW: "Performance Architecture" | Explanation | **Missing:** How optimization works |

**Recommendations:**
- Create a dedicated "Concepts" or "Understanding" section
- Extract conceptual content from mixed documents
- Add missing explanations:
  - "Understanding the Component Lifecycle"
  - "Understanding three.js Integration"
  - "Understanding Compression & Optimization"
  - "Understanding WebXR Architecture"

---

### REFERENCE (Information-Oriented)

**Goal:** Provide complete, accurate technical information

| Current File | Diátaxis Category | Notes |
|-------------|-------------------|-------|
| `component-reference.md` | Reference | Catalog of all built-in components |
| `reference/needle-config-json.md` | Reference | Configuration file schema |
| `reference/needle-engine-attributes.md` | Reference | Web component API |
| `reference/typescript-decorators.md` | Reference | Decorator syntax reference |
| `scripting.md` (lifecycle tables) | Reference | API methods and events |
| `features-overview.md` | Reference | Feature matrix/capabilities |
| External: API docs | Reference | TypeScript API documentation |
| `faq.md` | Reference | Common issues and solutions |

**Recommendations:**
- Keep current reference structure
- Add missing references:
  - "Component Lifecycle Reference" (extracted from scripting.md)
  - "Built-in Events Reference"
  - "URL Parameters Reference"
  - "Compression Format Comparison"
  - "Platform Compatibility Matrix"
- Link to external API docs prominently

---

## Content Overlap & Duplication Issues

### Major Overlaps Identified

#### 1. **Getting Started Duplication**
- Problem: `getting-started.md` (root) redirects to `getting-started/index.md`
- Problem: `for-unity-developers.md` (root) redirects to `getting-started/for-unity-developers.md`
- **Solution:** Delete root-level redirect files, update all links

#### 2. **Scripting Content Overlap**
- Problem: `scripting.md` (850 lines) contains examples also in `scripting-examples.md` (530 lines)
- Problem: Both cover component creation, lifecycle, and patterns
- **Solution:**
  - Split `scripting.md` into:
    - **Explanation:** "Understanding Components" (architecture, concepts)
    - **How-To:** "Creating Components" (practical guide)
    - **Reference:** "Component Lifecycle Reference" (API tables)
  - Move all code examples to `scripting-examples.md`
  - Rename `scripting-examples.md` to "Component Code Examples"

#### 3. **XR Documentation Fragmentation**
- Problem: XR content spread across 4 files (`xr.md`, `ios-webxr-app-clip.md`, `webxr-image-tracking.md`, `everywhere-actions.md`)
- **Solution:**
  - Create unified "XR" section with clear structure:
    - **Tutorial:** "Your First VR Experience"
    - **How-To Guides:** "Enable WebXR", "iOS App Clips", "Image Tracking", "USDZ for iOS"
    - **Explanation:** "Understanding WebXR Platforms"
    - **Reference:** "XR Platform Support Matrix"

#### 4. **Deployment & Embedding Overlap**
- Problem: `deployment.md` and `embedding.md` both cover deployment methods
- Problem: Sections 1-6 overlap between files
- **Solution:**
  - Merge into topic-based how-to guides:
    - "How to Deploy to Hosting Platforms"
    - "How to Embed in Websites"
    - "How to Optimize for Production"

#### 5. **Component Reference Duplication**
- Problem: `component-reference.md` lists components, `scripting.md` explains many of the same components
- **Solution:**
  - Keep `component-reference.md` as pure reference (catalog format)
  - Extract explanations to "Understanding Built-in Components"
  - Cross-link heavily between reference and explanation

---

## Proposed New Navigation Structure

### Top-Level Menu (Based on Diátaxis)

```
├── Getting Started          [Landing page with paths]
├── Tutorials               [Learning-oriented, step-by-step]
├── How-To Guides           [Task-oriented, problem-solving]
├── Explanation             [Understanding-oriented, concepts]
├── Reference               [Information-oriented, API docs]
├── Samples & Showcase      [Examples and inspiration]
└── Help & Community        [Support, FAQ, Discord]
```

---

### Detailed Structure

#### **1. Getting Started** (Single page with clear paths)
```
Getting Started
├─ Choose Your Tool
│  ├─ Unity → Unity Quick Start
│  ├─ Blender → Blender Quick Start
│  └─ Web Code → three.js Quick Start
├─ Install Tools (Node.js, toktx, VS Code)
└─ Next Steps → Tutorials
```

**Current files used:** `getting-started/index.md`

---

#### **2. Tutorials** (Learning-oriented)

```
Tutorials
├─ Fundamentals
│  ├─ TypeScript Essentials             [getting-started/typescript-essentials.md]
│  ├─ For Unity Developers              [getting-started/for-unity-developers.md]
│  └─ Understanding three.js            [NEW - extract from three/index.md]
│
├─ Your First Project
│  ├─ Unity: First Scene                [NEW - from unity/index.md]
│  ├─ Blender: First Scene              [NEW - from blender/index.md]
│  └─ Web: Your First Scene             [NEW - from three/index.md]
│
├─ Interactive Experiences
│  ├─ Build an Interactive Product Viewer  [NEW - comprehensive tutorial]
│  ├─ Create a VR Gallery Experience       [NEW - WebXR tutorial]
│  └─ Make a Multiplayer Game              [NEW - networking tutorial]
│
└─ Platform-Specific
   ├─ Unity Editor Workflows            [Extract from unity/index.md]
   ├─ Blender Workflows                 [Extract from blender/index.md]
   └─ Web-First Development             [Extract from three/index.md]
```

---

#### **3. How-To Guides** (Task-oriented)

```
How-To Guides
│
├─ Setup & Installation
│  ├─ Install for Unity                 [unity/index.md - setup sections]
│  ├─ Install for Blender               [blender/index.md - setup sections]
│  ├─ Install for Web Projects          [three/index.md - setup sections]
│  ├─ Custom Integrations               [custom-integrations/index.md]
│  └─ Setup with AI (MCP)               [ai/index.md]
│
├─ Export & Assets
│  ├─ Export 3D Content                 [export.md]
│  ├─ Work with Materials               [export.md - materials section]
│  ├─ Export Animations                 [export.md - animations section]
│  ├─ Use MaterialX                     [materialx.md]
│  ├─ Generate Lightmaps                [export.md - lightmaps section]
│  └─ Load Assets at Runtime            [Extract from scripting.md]
│
├─ Scripting & Development
│  ├─ Create Components                 [scripting.md - restructured]
│  ├─ Use Component Lifecycle           [scripting.md - lifecycle sections]
│  ├─ Handle User Input                 [scripting.md - input sections]
│  ├─ Perform Raycasting                [scripting.md - raycasting sections]
│  ├─ Use Coroutines                    [scripting.md - coroutines]
│  ├─ Debug Your App                    [debugging.md]
│  ├─ Test Your App                     [testing.md]
│  └─ Use NPM Modules                   [modules.md - practical sections]
│
├─ Web Integration
│  ├─ Embed in Websites                 [embedding.md]
│  ├─ Integrate with React/Vue/Svelte   [html.md - framework sections]
│  ├─ Use with Bundlers                 [html.md - bundler sections]
│  ├─ Create PWAs                       [html.md - PWA sections]
│  ├─ Integrate with Framer             [integrating-with-framer.md]
│  ├─ Integrate with WordPress          [integrating-with-wordpress.md]
│  └─ Make Responsive 3D Sites          [responsive-3D-webdesign-with-needle-and-threejs.md]
│
├─ XR Development (VR & AR)
│  ├─ Enable WebXR                      [xr.md - setup sections]
│  ├─ Deploy iOS WebXR (App Clips)      [ios-webxr-app-clip.md]
│  ├─ Use Image Tracking                [webxr-image-tracking.md]
│  ├─ Create USDZ Experiences           [everywhere-actions.md]
│  └─ Handle XR Controllers             [xr.md - controllers section]
│
├─ Multiplayer & Networking
│  ├─ Set Up Multiplayer                [networking.md - setup]
│  ├─ Sync State                        [networking.md - state sync]
│  ├─ Use Rooms                         [networking.md - rooms]
│  ├─ Add Voice Chat                    [networking.md - voice]
│  └─ Run Custom Servers                [networking.md - custom servers]
│
├─ Optimization & Performance
│  ├─ Compress Textures                 [deployment.md - texture compression]
│  ├─ Compress Meshes                   [deployment.md - mesh compression]
│  ├─ Use Progressive Loading           [deployment.md - progressive textures]
│  ├─ Generate Mesh LODs                [deployment.md - mesh LODs]
│  └─ Optimize Performance              [Extract from multiple files]
│
└─ Deployment & Hosting
   ├─ Deploy to Needle Cloud            [cloud/index.md]
   ├─ Deploy to Netlify                 [deployment.md - Netlify section]
   ├─ Deploy to Vercel                  [deployment.md - Vercel section]
   ├─ Deploy to GitHub Pages            [deployment.md - GitHub section]
   ├─ Deploy to itch.io                 [deployment.md - itch section]
   ├─ Deploy to Facebook Instant Games  [deployment.md - Facebook section]
   ├─ Deploy via FTP                    [deployment.md - FTP section]
   └─ Build for Production              [deployment.md - build sections]
```

---

#### **4. Explanation** (Understanding-oriented)

```
Explanation
│
├─ Core Concepts
│  ├─ Vision & Philosophy               [vision.md]
│  ├─ Technical Architecture            [technical-overview.md]
│  ├─ Project Structure                 [project-structure.md]
│  ├─ Component System                  [Extract from scripting.md]
│  ├─ NPM Module System                 [modules.md - concepts]
│  └─ Component Compiler                [component-compiler.md]
│
├─ Export Pipeline
│  ├─ How Export Works                  [NEW - explain Unity/Blender → glTF]
│  ├─ glTF Extensions (NEEDLE_*)        [technical-overview.md - extensions]
│  └─ Data Mapping & Serialization      [technical-overview.md - mapping]
│
├─ three.js Integration
│  ├─ How three.js Works with Needle    [Extract from three/index.md]
│  ├─ Rendering Pipeline                [technical-overview.md - rendering]
│  └─ Scene Graph & GameObject          [Extract from scripting.md]
│
├─ XR & Immersive
│  ├─ Understanding WebXR               [xr.md - platform explanation]
│  ├─ WebXR Platform Differences        [xr.md - platform sections]
│  └─ iOS AR Options (WebXR vs USDZ)    [Combine xr.md + everywhere-actions.md]
│
├─ Networking Architecture
│  ├─ How Networking Works              [networking.md - architecture]
│  ├─ State Synchronization             [networking.md - concepts]
│  └─ Custom Networking Servers         [networking.md - server architecture]
│
└─ Optimization
   ├─ Compression Formats                [deployment.md - format explanations]
   ├─ How Progressive Loading Works      [deployment.md - progressive concepts]
   └─ Performance Best Practices         [NEW - consolidate from multiple files]
```

---

#### **5. Reference** (Information-oriented)

```
Reference
│
├─ API Documentation
│  ├─ TypeScript API (External)         [Link to engine.needle.tools/docs/api]
│  └─ three.js API (External)           [Link to threejs.org/docs]
│
├─ Components
│  ├─ Built-in Components Catalog       [component-reference.md]
│  ├─ Component Lifecycle Methods       [Extract from scripting.md - tables]
│  ├─ Physics Event Methods             [Extract from scripting.md - tables]
│  ├─ Input Event Methods               [Extract from scripting.md - tables]
│  └─ XR Event Methods                  [Extract from scripting.md - tables]
│
├─ Configuration
│  ├─ needle-config.json                [reference/needle-config-json.md]
│  ├─ Web Component Attributes          [reference/needle-engine-attributes.md]
│  ├─ TypeScript Decorators             [reference/typescript-decorators.md]
│  └─ URL Parameters                    [Extract from debugging.md]
│
├─ Platform & Format Support
│  ├─ Features Overview                 [features-overview.md]
│  ├─ XR Platform Support Matrix        [Extract from xr.md]
│  ├─ Compression Format Comparison     [Extract from deployment.md]
│  ├─ Supported glTF Extensions         [technical-overview.md - extensions list]
│  └─ Browser Compatibility             [NEW - create from scattered info]
│
└─ Troubleshooting
   ├─ FAQ                               [faq.md]
   ├─ Common Issues                     [Extract from debugging.md]
   └─ Error Messages                    [NEW - create reference]
```

---

#### **6. Samples & Showcase** (Inspiration)

```
Samples & Showcase
├─ Sample Projects                      [samples-and-modules.md]
├─ Live Examples (External)             [Link to engine.needle.tools/samples]
├─ Showcase Projects
│  ├─ Mercedes Benz                     [showcase-mercedes-benz.md]
│  ├─ Castle Demo                       [showcase-castle.md]
│  ├─ Tower Defense Game                [showcase-towerdefence.md]
│  └─ More...                           [Other showcase-*.md files]
└─ Community Contributions              [Current location unclear]
```

---

#### **7. Help & Community** (Support)

```
Help & Community
├─ Support                              [support.md]
├─ FAQ                                  [faq.md - also in Reference]
├─ Forum (External)                     [forum.needle.tools]
├─ Discord (External)                   [discord.needle.tools]
├─ Feedback (External)                  [Feedback form link]
└─ Testimonials                         [testimonials.md - optional]
```

---

## Migration Strategy

### Phase 1: Planning & Structure (Week 1)
1. ✅ Document current state (this document)
2. Create detailed file-by-file migration map
3. Design URL redirect strategy
4. Get stakeholder approval

### Phase 2: Content Reorganization (Weeks 2-3)
1. Create new folder structure
2. Split large files (scripting.md, deployment.md, networking.md)
3. Extract conceptual content to "Explanation" section
4. Merge overlapping content (deployment + embedding)
5. Create missing tutorial content
6. Update all internal links

### Phase 3: Navigation & Menus (Week 4)
1. Update [config.ts](./config.ts#L130-L497) navbar structure
2. Update [config.ts](./config.ts#L356-L466) sidebar structure
3. Create Diátaxis landing pages for each section
4. Add breadcrumbs showing current quadrant

### Phase 4: Redirects & Testing (Week 5)
1. Set up URL redirects for all moved pages
2. Test all internal links
3. Test external links (from blog, social media)
4. Update search index

### Phase 5: Polish & Launch (Week 6)
1. Review all content for consistency
2. Add "Next Steps" recommendations at end of each page
3. Add Diátaxis navigation hints (badges, colors)
4. Soft launch to community for feedback
5. Official announcement

---

## URL Redirect Map (Preserve Old URLs)

| Old URL | New URL | Type |
|---------|---------|------|
| `/getting-started.md` | `/getting-started/` | Redirect (already exists) |
| `/for-unity-developers.md` | `/tutorials/fundamentals/for-unity-developers` | Redirect |
| `/scripting.md` | `/how-to-guides/scripting/create-components` | Redirect |
| `/deployment.md` | `/how-to-guides/deployment/` | Redirect |
| `/networking.md` | `/how-to-guides/networking/` | Redirect |
| `/xr.md` | `/how-to-guides/xr/` | Redirect |
| *All existing pages* | *New locations* | Must be mapped |

**Implementation:** Use VuePress/Vite redirect plugin or meta refresh tags

---

## Content Creation Needs

### New Tutorials Required
1. **"Build an Interactive Product Viewer"** (~60 min)
   - Load a 3D model
   - Add UI buttons and controls
   - Implement camera rotation
   - Add hotspots with information
   - Deploy to Netlify

2. **"Create a VR Gallery Experience"** (~90 min)
   - Set up WebXR scene
   - Add teleportation
   - Implement grabbable objects
   - Add spatial audio
   - Test on Quest

3. **"Make a Multiplayer Game"** (~120 min)
   - Set up networking
   - Create player avatars
   - Sync game state
   - Add voice chat
   - Deploy with networking

### New Explanation Pages Required
1. **"Understanding glTF Extensions"**
   - Deep dive into NEEDLE_* extensions
   - How data is serialized
   - Custom extension development

2. **"Understanding the Export Pipeline"**
   - Unity/Blender → TypeScript → glTF flow
   - Component compiler details
   - Data mapping process

3. **"Performance Architecture"**
   - How compression works
   - Progressive loading internals
   - Mesh LOD generation

### New Reference Pages Required
1. **"URL Parameters Reference"**
   - All debug flags
   - Query parameter options
   - Testing parameters

2. **"Browser Compatibility Matrix"**
   - Supported browsers
   - WebXR support by device
   - Known limitations

3. **"Error Messages Reference"**
   - Common errors
   - Causes and solutions
   - Troubleshooting steps

---

## Design & UX Enhancements

### Visual Indicators
- **Color-code quadrants:** Blue (Tutorials), Green (How-To), Orange (Explanation), Purple (Reference)
- **Add badges:** "Tutorial", "How-To", "Explanation", "Reference" on each page
- **Breadcrumbs:** Show current location in structure

### Navigation Improvements
- **"Next Steps" sections:** End each page with relevant next actions
- **Related Content:** Show related pages in other quadrants
- **Search filtering:** Filter by Diátaxis type

### Landing Pages
Create dedicated landing pages for each Diátaxis quadrant:
- `/tutorials/` - "Learn Needle Engine"
- `/how-to-guides/` - "Solve Problems"
- `/explanation/` - "Understand Concepts"
- `/reference/` - "Look Up Information"

---

## Success Metrics

### Quantitative
- Reduce avg. time to find information by 40%
- Increase tutorial completion rate by 30%
- Reduce duplicate content by 50%
- Achieve 95%+ internal link accuracy

### Qualitative
- Positive community feedback
- Reduced "where is X?" questions on Discord
- New users report clearer onboarding
- Contributors understand where to add new content

---

## Stakeholder Approval Required

### Decisions Needed
1. Approve new URL structure
2. Approve content duplication removal plan
3. Approve tutorial creation scope
4. Set timeline and assign resources
5. Define success criteria

### Risks & Mitigation
| Risk | Impact | Mitigation |
|------|--------|------------|
| Broken external links | High | Comprehensive redirect strategy |
| User confusion during transition | Medium | Gradual rollout, announcement |
| SEO impact | Medium | Maintain old URLs with redirects |
| Content gaps discovered | Low | Phased approach, community feedback |

---

## Next Steps

1. **Review & Approve:** Stakeholders review this plan
2. **Create File-by-File Map:** Detailed migration spreadsheet
3. **Prototype Navigation:** Test new menu structure
4. **Begin Phase 2:** Start content reorganization

---

## Appendix: File-by-File Migration Map

*(This section will be expanded in a separate document)*

[See DIATAXIS_MIGRATION_MAP.md](./DIATAXIS_MIGRATION_MAP.md)

---

**Document Version:** 1.0
**Last Updated:** 2026-01-27
**Authors:** Claude AI (Analysis), Needle Team (Review & Approval)
