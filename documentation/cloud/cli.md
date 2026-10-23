---
title: Needle Cloud CLI Reference
description: Detailed command behavior, output formats, content management, local AI tools, and browser SDK notes for needle-cloud.
---

# Needle Cloud CLI Reference

This reference covers **needle-cloud 3.2.1** (CLI v3). Check your installed version
with `npx needle-cloud --version`. For options available in that version, run
`npx needle-cloud help <command>`.

For installation and the choice between build-time optimization and standalone
assets, see [Needle Cloud](/docs/cloud/#deploy-with-optimized-models).

## Commands

```bash
npx needle-cloud help              # List all commands
npx needle-cloud help <command>    # Help for a specific command
```

### Output and automation

Cloud and account commands support `--output cli|json`. The default `cli` output
is readable in a terminal. JSON mode writes one JSON value to stdout; progress,
warnings and diagnostics go to stderr. Errors exit nonzero. Existing JSON result
shapes are preserved, including arrays from list commands.

Use `--non-interactive` in scripts to prohibit prompts and browser launches.
Authentication uses `--token <value>`, `NEEDLE_CLOUD_TOKEN`, or valid saved
credentials; missing credentials fail. Token-authenticated commands do not require
a prior browser login. Non-interactive deployments do not open the deployed site.

```bash
needle-cloud list --non-interactive --output json
needle-cloud upload ./model.glb --non-interactive --output json
needle-cloud download <identifier> ./assets --format glb --non-interactive --output json
needle-cloud deploy ./dist --non-interactive --output json
```

These examples use `NEEDLE_CLOUD_TOKEN` or saved credentials. Access tokens retain
their team scope. `login --non-interactive --output json` checks saved browser
authentication; it cannot establish a fresh login from an access token.
`me --output json` returns account identity fields and team memberships from the
saved login, without credentials.

Upload/optimize, label commands and `list-deployments` retain their older
`--format json` output option. If supplied together, `--output` and an output
`--format` must agree. Upload's `--format source-url` and `--format edit-url`
remain available. For `list` and `download`, `--format` selects an asset format;
use `--output json` to select JSON.

`delete` returns its Trash receipt as JSON; `download` returns `success` and saved
`paths`; `deploy` returns the successful SDK upload receipt; generation commands
return `success` and the job `identifier`. Login returns `authenticated`, logout
returns `success`, and `me` returns selected identity fields. An unauthenticated
account check reports `authenticated: false` and exits nonzero.

### Chat

`ask` starts an interactive conversation, optionally with an initial message.
Use `--once` for a single answer or `--non-interactive` for a single answer with
no authentication prompts or browser launches. Both require a message.

```bash
needle-cloud ask
needle-cloud ask "Explain progressive loading" --once
needle-cloud ask "Summarize my assets" --non-interactive --output json
```

`--output json` returns one complete chat response and exits. `--no-stream`
prints the full answer as text; by itself it keeps the interactive session.

### Guided content browser

In CLI v3, listing automatically opens the guided browser when both input and
output are terminals. Browse with numbered selection and inline guidance:

```bash
needle-cloud list-content --team "My Team"
# The shorter command works too
needle-cloud list --search wood --format glb
```

Type a number and Enter to inspect an item. Use `/wood` to search, `/` to clear
search, `n` / `p` for pages, `t` to switch Trash, `r` to refresh, and `?` for help.
Inside an item, `o` opens its viewer, `e` opens its editor, and `b` goes back.
The browser shows commands for downloading, updating or restoring an item;
browsing itself does not change content. Trash shows listing metadata; restore
an item to inspect its versions. Type `q` to leave, or use Ctrl+C at a prompt.

Both input and output must be terminals for browsing. `--interactive true` forces
that mode and cannot be combined with `--output json` or `--non-interactive`.
Use `--interactive false` for a one-shot human-readable list in a terminal;
`--non-interactive` also prohibits authentication prompts and browser launches.
JSON and redirected streams automatically keep one-shot output. Colors respect
`NO_COLOR`; the browser keeps its navigation in terminal scrollback.

CLI v3 is distributed on the `version-3` channel. Existing integrations can stay on
`version-2` while migrating. Publish v3 on its own channel before shipping updated
integrations that request `needle-cloud@version-3`.

**Core commands:**
- `deploy` — Deploy a website to Needle Cloud
- `optimize` — Optimize 3D files (glTF, GLB, VRM, FBX, USD) with Draco, KTX2, and Progressive Loading
- `list` — List content stored in Needle Cloud
- `download` — Download a content item
- `info` / `versions` — Inspect metadata, URLs, processing state and version history
- `update` — Change content metadata or its thumbnail
- `delete` — Move a content item to Trash
- `restore` — Restore a content item from Trash
- `login` / `logout` — Authenticate with Needle Cloud
- `start` — Start the local server for licensing, editor integrations, and MCP tools
- `settings` — View CLI settings, including [local tool access for Needle Cloud AI](#local-tools-in-needle-cloud-ai)

## Stop the local license server

Close Unity or other integrations that may automatically start the server, then run:

```bash
npx needle-cloud stop
```

`quit` is an alias. The command authenticates with the local server token, requests
shutdown, and exits. It does not sign you out, remove settings, or kill unrelated
Node.js processes. The shared licensing/MCP server disconnects from Cloud and
closes its HTTP and WebSocket connections, allowing up to three seconds to drain.

If the server is not running, the command exits successfully. Older running
versions without the stop endpoint must be closed manually once; this command
cannot add shutdown support to an already-running old server. After that, start
the updated CLI or reopen your project. `needle-cloud status` shows the running
server's port and PID.

## Upload assets

```bash
# Upload the source; processing continues in the background
npx needle-cloud upload ./model.glb --team "My Team"

# Print only the URL for this exact uploaded source file
npx needle-cloud upload ./model.glb --format source-url

# Return source identity and links as JSON
npx needle-cloud upload ./models --format json

# Wait for optimization and download the result
npx needle-cloud upload ./model.glb --wait --outdir ./optimized

# Existing scripts continue to work
npx needle-cloud optimize ./model.glb --outdir ./optimized
```

Use `--no-optimize` to upload without requesting processing. `--wait` selects the
optimized variant with `--progressive true|false` and `--usecase product|world`.
The latter options and `--outdir` require waiting. `optimize` always waits.

**Safe to repeat:** Cloud checks file content hashes before transferring data.
Unchanged files already stored in the same team are reused, and matching stored
optimization results are reused rather than recompressed. You can keep this step
in scripts and builds without repeatedly transferring or processing the same
assets. Changed files or processing settings, or results no longer available in
Cloud, can require a new upload or processing run. To keep updating one asset,
pass its content identifier with `--name <identifier>`.

Both commands support `--format cli` (default), `json`, `source-url`, and
`edit-url`. Progress and diagnostics, including `--verbose` output, go to stderr;
stdout contains only the selected result. Errors produce a nonzero exit code.
Authentication supports saved login, `--token`, or `NEEDLE_CLOUD_TOKEN`; `--team`
selects the team for saved-login uploads. Access tokens retain their team scope.

JSON contains `assetId`, `versionId`, `editUrl`, `sourceUrl`, `optimizedUrl`,
`processingStatus`, and `files`. Source URLs are pinned to the uploaded version;
optimization never changes `versionId` or the source links. After waiting,
`optimizedUrl` is pinned to the selected optimization and `optimization` describes
its version, progressive setting and use case.

Folders are collected recursively into one grouped upload, preserving current
behavior. The JSON `files` array contains a path and source URL for every uploaded
file. `sourceUrl` is null for a multi-file upload; `--format source-url` refuses
multiple files before uploading. `edit-url` returns the group's management URL.

Without waiting, `processingStatus` is `unknown`: background processing is not
queried. `--no-optimize` reports `not_requested` for this invocation; it does not
cancel processing from earlier uploads. Waiting reports `completed` for the
requested variant, which can differ from other background processing jobs.

Manage stored content by using the identifier shown by `list`:

```bash
npx needle-cloud list
npx needle-cloud download <identifier>
npx needle-cloud delete <identifier>
```

Inspect and manage an existing item:

```bash
npx needle-cloud info <identifier>
npx needle-cloud info <identifier> --output json
npx needle-cloud versions <identifier> --output json
npx needle-cloud update <identifier> --title "Wooden Crate" --tags "wood,crate"
npx needle-cloud update <identifier> --thumbnail ./preview.png
npx needle-cloud list --trash
npx needle-cloud restore <identifier>
```

`info`, `versions`, `update`, and `restore` support `--team`, `--token`, and
`--output cli|json`. Diagnostics go to stderr. `info` JSON returns the full item;
`versions` JSON returns its source versions, each with its derived outputs.
`update` changes only the fields supplied. Tags replace the existing list;
an empty `--title ""` or `--description ""` clears that field. Thumbnails accept
JPEG, PNG or WebP files up to 5 MiB. Visibility and password settings remain
available through the Cloud interface.

Choose an older source version, a derived output, or a named label when downloading:

```bash
npx needle-cloud download <identifier> ./assets --version <version-id>
npx needle-cloud download <identifier> ./assets --label main --format glb
```

Use either `--version` or `--label`. With a source version, `--format` selects a
matching output from that version and its derived outputs. With a label, it
selects a matching output carrying that label. Without either selector, download
keeps its existing behavior: the newest source, or the newest matching format.
Failed lookups and downloads exit with a nonzero code.

To upload a new source version of an existing asset, pass its exact content
identifier to `--name`:

```bash
npx needle-cloud upload ./model.glb --name <identifier>
```

Use `--team <name-or-id>` with content commands to select a team. The legacy
`--org` option remains supported for existing scripts.

Deleting content immediately frees total storage capacity, but it does not refund
the current month's upload usage. Deleted content can be restored from Trash for
31 days when the account has enough total storage available for it.

## Content labels

Labels keep a stable URL while you change the version it serves:

```bash
npx needle-cloud label list <content-id> --team "My Team"

# Promote the source version currently served by latest
npx needle-cloud label set <content-id> main --from latest

# Move a label to an explicit completed version, including an older version
npx needle-cloud label set <content-id> main --version <version-id>

# Create or move a custom label and return the result as JSON
npx needle-cloud label set <content-id> staging --from latest --format json
```

`label set` requires exactly one of `--version` or `--from`. The selected version
must belong to this content item and have completed processing. The server also
moves the label for related completed outputs. `latest` updates automatically;
it can be used with `--from` but cannot be assigned manually. New label names use
lowercase letters, numbers, hyphens or underscores.

Both commands support `--token`, `NEEDLE_CLOUD_TOKEN`, saved login, `--team`, and
`--format cli|json`. Listing requires read access; setting also requires write
access. Use the content ID and version ID returned by upload, or the IDs shown by
`list` and `label list`.

JSON lists each label's `sourceVersionIds` and `targets`. Each target includes
`versionId`, `sourceVersionId`, `displayName` and `url`, so source and derived
outputs remain distinguishable. A null or hidden URL is retained as returned by
Cloud. Setting returns `contentId`, `label`, the selected `versionId`, observed
`previousVersionIds`, and the confirmed `targets`. The previous state is a
snapshot; concurrent updates are not locked. If the update succeeds but cannot
be confirmed afterward, the command reports that explicitly and exits nonzero.

Diagnostics go to stderr; stdout contains only the requested result.

## Local tools in Needle Cloud AI

[Needle Cloud AI](https://cloud.needle.tools/team#ai) can use local tools provided by this CLI to read project files, search your code, and inspect logs. You can enable or disable local tools in an individual chat. See the [Needle Cloud AI documentation](https://engine.needle.tools/docs/cloud/#needle-cloud-ai) for how this works with your Unity or Blender project.

Tools that access files on your machine use `local_files_*`; commands that create, install, build, start a dev server, or deploy a local project use `local_project_*`. Cloud chat asks for approval before running project commands or changing files. After creating a project, the CLI adds it to the local project list and selects it for file tools. The AI can use `local_project_list` and `local_project_select` to return to any registered web project; selecting one does not approve edits. An explicit path to another project for a command requires fresh approval. A running dev server opens its local URL in your default browser and can be stopped with `local_project_cancel`.

`local_files_resolve_url` accepts a localhost HTTP URL such as `http://127.0.0.1:8765/preview.html` and returns the working directory of the process listening on that port. The server can have been started by any application. The URL path is returned for context; it is not treated as a file path. If the listener is absent or the OS does not allow inspection, the tool reports that instead of guessing a directory. A proxy or port forward can make the reported directory belong to the proxy rather than the app behind it.

The `local_files_check_project` tool checks the connected web project's TypeScript configuration using its locally installed TypeScript compiler. It returns structured errors with file names and line numbers, without emitting build files or applying fixes. It does not run package scripts or install dependencies. Checks stop after 10 seconds and retain up to 100 diagnostics; an unavailable or interrupted check is never reported as passing. This checks current TypeScript errors, not lint rules, Unity/Blender code, or whether an error existed before an AI edit. Referenced projects are not built.

By default, `local_files_check_project({})` runs a new check and returns five errors with short messages. Use `{ "mode": "results", "file": "Player.ts", "code": "TS2322" }` to filter the latest results without recompiling; both filters are optional. Pass the returned `nextOffset` as `offset` for another page. Use `{ "mode": "error", "index": 0 }` for more detail about an error, or omit `index` for the last matching error. Summary messages are capped at 300 characters and details at 2,000 characters, with truncation indicated. Cached results include their check time and remain available until another check replaces them, the selected project changes, or the CLI exits. Run a new check after editing files.

Use local tools only with trusted projects and dependencies: the installed TypeScript compiler runs on your machine. This is not an execution sandbox. The existing local-tool controls also govern `local_files_check_project`.

To block Needle Cloud AI from calling tools on this machine across all chats, run:

```bash
npx needle-cloud settings remote-ai-tools false
```

To re-enable access (the default):

```bash
npx needle-cloud settings remote-ai-tools true
```

To check the current setting:

```bash
npx needle-cloud settings
```

The setting is saved in `~/.needle/settings.json` for your user account on this machine and persists across restarts. A running local server applies changes automatically; no restart is required. Disabling remote AI tools keeps the local MCP server and Unity/Blender connections available. Enabling local tools in a chat does not override this CLI setting.

You can separately turn off AI file changes or project commands on this machine:

```bash
npx needle-cloud settings local-file-edits false
npx needle-cloud settings local-project-commands false
```

Both settings are enabled by default, but Needle Cloud chat still asks for approval before it edits a file or starts a project command. A Cloud approval cannot override a disabled local setting. Pass `true` to either command to turn that capability back on. Project commands cover creating a Needle project, installing packages, running its build or dev script, and deploying an existing build. These commands can run project or package scripts; a deployment publishes files to the selected team. `needle-cloud settings` shows the current values.

To find the local server's version and process ID (for example, in Task Manager):

```bash
npx needle-cloud status
```

This only checks the running server. It does not start or restart it. For older
servers, a PID read from the local server record is labeled `recorded`.

For AI clients that support stdio, use:

```toml
[mcp_servers.needle]
command = "npx"
args = ["-y", "needle-cloud", "mcp"]
```

On Windows, use `npx.cmd` if your client cannot resolve `npx`.
The command reuses or starts the local server, exposes its tools over stdio,
and reconnects if that server restarts. Inspector and Unity tools appear as
those apps connect. Closing the AI client stops its stdio process; the shared
local server stays available to other apps. Cloud access follows your
`remote-ai-tools` setting and requires a signed-in account.

While connected to Cloud, MCP also exposes read-only cloud tools with the
`needle_cloud_` prefix, using your default team (or personal account). For example,
`needle_cloud_get_file_info` accepts `metadata: ["animations", "bounds"]` and an
optional version job identifier. Without a metadata selection it returns a compact
summary; pass `metadata: []` to omit it.

Use `needle_cloud_search_content` with `has_animations`, `has_skinned_mesh`, or
`has_blendshapes` to filter by animation clips, declared skins, or morph targets.
Filters combine with AND on the same completed variant. Only worker-verified
facts match; missing facts do not match `false`. Results include up to three
matching variants with their job identifiers and summaries. These tools read
existing data and do not run model generation or modify assets. They require
compatible CLI and Cloud API versions and disappear when Cloud disconnects.

See the [Needle MCP documentation](https://engine.needle.tools/docs/ai/needle-mcp-server) for available tools and how to connect other AI assistants.

## CI/CD

For automated deployments, use an access token:

1. Create a token on [your team page](https://cloud.needle.tools/team) with `read/write` permissions
2. Pass it via `--token` or the `NEEDLE_CLOUD_TOKEN` environment variable

```bash
npx needle-cloud deploy ./dist --name my-project --token "$NEEDLE_CLOUD_TOKEN"
```

Or use the official [GitHub Action](https://github.com/marketplace/actions/deploy-to-needle-cloud):

```yml
- uses: needle-tools/deploy-to-needle-cloud-action@v1
  with:
    token: ${{ secrets.NEEDLE_CLOUD_TOKEN }}
    dir: ./dist
    name: my-project
```

## AI evaluation images and quota actions

The web API accepts PNG/JPEG image parts in evaluation state:

```js
import { aiEvaluate } from "needle-cloud";

const result = await aiEvaluate(
  ["Current viewport", { type: "image_url", image_url: { url: pngDataUrl } }],
  { visible: { type: "boolean", instructions: "Is the selected object visible?" } },
  undefined,
  { org: teamId },
);
```

Use base64 data URLs, not remote image URLs. A request supports up to four images with 2 MiB of decoded data in total, plus 128,000 characters of JSON text excluding the image URLs. Images must be 256–1,568 pixels on each side and at least 78,400 pixels in total. Image evaluation is experimental; resize screenshots before sending them.

Chat quota failures expose `details` on HTTP `AIChatError` objects and streamed `error` events. Evaluation errors also expose `details`. The quota metadata contains `code: "ai_allowance_exhausted"`, `account_id`, a readable `message`, and `actions` with `kind`, `label`, and `url` fields. Render these as links: `top_up` opens the team's top-up control; `view_usage` opens its usage section. Opening a link does not automatically purchase credits. Older servers may return text-only errors without `details`.

