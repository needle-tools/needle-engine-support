# Cloud optimization workflows

2026-10-23 - READY FOR REVIEW

Update documentation/cloud/index.md with production-build vs standalone-asset
workflows, explicit token/plugin requirements, output placement and verification.
Link the Vite reference and explain compression vs progressive LODs. Thickness
textures are compressed but not progressively optimized (confirmed by Marcel).

Sources: team-wiki/gltf-build-pipeline.md; installed Engine plugins/vite/build-pipeline.js;
needle-web-editor/modules/needle-engine/plugins/vite/build-pipeline.js. The runtime
submodule in needle-engine-dev is empty locally. No unverified rig support claims.

Validation: review against CLI/plugin source and resolve added documentation targets.

Changed files:
- documentation/cloud/index.md: concrete production build/token requirements,
  standalone upload alternative, output/storage behavior and verification steps;
  compression vs progressive loading and thickness-map clarification.
- documentation/reference/needle-vite-plugin.md: link the end-to-end workflow from
  the existing technical reference.

Validation: commands and prerequisites reviewed against actual plugin and CLI
source, new documentation link targets/anchors checked, Markdown parsed and git
whitespace checked. No runtime changes, wording tests, dev servers or full
VuePress build. CLI README changes are in the needle-cloud repo.

2026-10-23 - READY FOR REVIEW: trim overview additions to the two practical workflows.
Move map-specific progressive support to gltf-progressive/index.md, checked against
needle-engine-build-pipeline/package/src/transforms/needle_progressive.ts (texture
LOD material slot switch). No changes to the compression implementation.

- documentation/gltf-progressive/index.md: supported named progressive texture
  slots and thickness compression/LOD distinction, with size/settings caveat.
- documentation/cloud/index.md: reduced workflow section from 68 to 29 lines;
  replaced map-specific explanation with a short link to the progressive reference.

Repeat-upload documentation: Cloud CLI batch section now describes team-scoped
content-hash transfer avoidance and reuse of matching stored processing results.
Checked api.upload.js exists response, share.upload.js artifact lookup and
share.jobs.js derived-result lookup. Conditional on retained inputs/results and
matching processing parameters; no quota-free or no-metadata-side-effects claim.

2026-10-23 - READY FOR REVIEW: README/reference split.
- documentation/cloud/cli.md: preserve the expanded command, output, content,
  local AI/MCP and browser SDK guidance removed from the package README.
- documentation/cloud/index.md: link the detailed CLI reference.
- CLI README in needle-cloud: core command table near top, short workflow examples,
  automation flags and MCP setup, with links to the reference for details.
No CLI server changes included; concurrent server refactoring is unrelated.

CLI reference now identifies needle-cloud 3.2.1 and links behavior to the installed
version via --version and command help. No runtime changes.
