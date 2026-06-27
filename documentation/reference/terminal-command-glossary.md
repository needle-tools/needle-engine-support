---
title: Terminal Command Glossary
description: Lookup reference for terminal commands commonly used by AI agents, including shell, Git, Docker, Python, Node, platform-specific commands, and Needle debugging helpers.
---

# Terminal Command Glossary

This is a dense lookup reference for terminal commands you may see AI agents run. It is intentionally practical. If you do not usually work in a terminal, start with [Understanding Terminal Commands in AI Agent Workflows](/docs/explanation/understanding-ai-agent-terminal-commands).

For agent concepts, see the [AI Agent Glossary](/docs/reference/ai-agent-glossary).

## Shell and terminal basics

| Command | What it does |
| --- | --- |
| `zsh` | Starts the Z shell, the default shell on modern macOS. |
| `bash` | Starts the Bash shell, common on Linux and CI systems. |
| `sh` | Starts a minimal POSIX shell. Often used in scripts. |
| `pwd` | Prints the current working directory. |
| `cd path` | Changes directory. |
| `cd ..` | Moves one folder up. |
| `cd -` | Returns to the previous directory. |
| `ls` | Lists files and folders. |
| `ls -la` | Lists files with details, including hidden files. |
| `ls -lh` | Lists files with human-readable sizes. |
| `ls -R folder` | Lists a folder recursively. Can produce a lot of output. |
| `open .` | Opens the current folder in Finder on macOS. |
| `code .` | Opens the current folder in VS Code when the `code` command is installed. |
| `which node` | Shows the path to an executable. |
| `command -v node` | Portable way to check whether a command exists. |
| `env` | Prints environment variables. |
| `env NAME=value command` | Runs one command with an environment variable set only for that command. |
| `printenv NAME` | Prints one environment variable. |
| `export NAME=value` | Sets an environment variable for the current shell session. |
| `echo "$NAME"` | Prints text or an environment variable. |
| `source .env` | Loads shell variables from a file. Only use with files you trust. |
| `alias name='command'` | Creates a short name for a longer command in the current shell. |
| `unalias name` | Removes a shell alias. |
| `history` | Shows recent shell commands. |
| `date` | Prints the current date and time. |
| `clear` | Clears the terminal view. |

## Platform-specific commands

| Command | Platform | What it does |
| --- | --- | --- |
| `powershell` | Windows | Starts Windows PowerShell. Common on older Windows setups and still widely available. |
| `pwsh` | Windows/macOS/Linux | Starts PowerShell 7+, the cross-platform PowerShell. |
| `cmd.exe` | Windows | Starts the classic Windows Command Prompt. |
| `dir` | Windows | Lists files in Command Prompt or PowerShell. Similar role to `ls`. |
| `where node` | Windows | Finds an executable on the Windows `PATH`. Similar role to `which node`. |
| `Get-Command node` | PowerShell | Finds a command and shows how PowerShell resolves it. |
| `Get-ChildItem` | PowerShell | Lists files and folders. Aliased as `ls` in PowerShell. |
| `Get-Process node` | PowerShell | Lists running processes named `node`. |
| `Stop-Process -Id PID` | PowerShell | Stops a process by process ID. |
| `Get-NetTCPConnection` | PowerShell | Lists TCP connections on modern Windows systems. |
| `Select-String "text" file` | PowerShell | Searches text in files. Similar role to `grep`. |
| `Invoke-WebRequest URL` | PowerShell | Requests a URL. Similar role to `curl`, but returns PowerShell objects. |
| `start .` | Windows | Opens the current folder in File Explorer from Command Prompt. |
| `Start-Process .` | PowerShell | Opens the current folder or file with the default app. |
| `tasklist` | Windows | Lists running processes from Command Prompt. |
| `taskkill /PID PID /F` | Windows | Force-stops a process by process ID. Use carefully. |
| `netstat -ano` | Windows | Lists connections and process IDs, useful for finding what uses a port. |
| `open .` | macOS | Opens the current folder in Finder. |
| `open file.html` | macOS | Opens a file with the default application. |
| `pbcopy` | macOS | Copies standard input to the clipboard. |
| `pbpaste` | macOS | Prints the clipboard contents. |
| `osascript -e 'display dialog "Hello"'` | macOS | Runs AppleScript from the shell, useful for simple macOS automation. |
| `say "Build finished"` | macOS | Speaks text aloud. Occasionally useful for long-running local tasks. |
| `mdfind "text"` | macOS | Searches with Spotlight from the command line. |
| `xdg-open .` | Linux | Opens the current folder or file with the desktop default app. |
| `gnome-open .` | Linux | Older GNOME command for opening files or folders. Often replaced by `xdg-open`. |
| `ip addr` | Linux | Shows network interfaces and IP addresses. |
| `ifconfig` | macOS/Linux | Shows network interface details on systems where it is installed. |
| `systemctl status service` | Linux | Shows status for a systemd service. Mostly useful on servers. |
| `journalctl -u service` | Linux | Reads logs for a systemd service. Mostly useful on servers. |

:::tip Cross-platform gotchas
- Paths use `/` on macOS/Linux and usually `\` on Windows, though many tools accept `/` on Windows too.
- Environment variables are written as `$NAME` in POSIX shells, `$env:NAME` in PowerShell, and `%NAME%` in Command Prompt.
- Some command names exist on multiple platforms but behave differently. PowerShell's `curl` may be an alias for `Invoke-WebRequest`, while macOS/BSD and Linux/GNU tools can support different flags.
:::

## File inspection commands

| Command | What it does |
| --- | --- |
| `cat file` | Prints a whole file. Best for short files. |
| `less file` | Opens a scrollable file viewer. |
| `head file` | Shows the first lines of a file. |
| `head -n 40 file` | Shows the first 40 lines of a file. |
| `tail file` | Shows the last lines of a file. |
| `tail -n 80 file` | Shows the last 80 lines of a file. |
| `tail -f file` | Follows a log file as it changes. |
| `tail -n 100 -f file` | Shows recent log lines and then follows new output. |
| `sed -n '1,120p' file` | Prints lines 1 through 120 of a file. |
| `sed 's/old/new/g' file` | Prints the file with text substitutions applied. Without `-i`, it does not edit the file. |
| `wc -l file` | Counts lines in a file. |
| `wc -c file` | Counts bytes in a file. |
| `file asset.glb` | Identifies a file type. |
| `du -sh folder` | Shows the size of a folder. |
| `du -h -d 1 folder` | Shows the size of each direct child folder on macOS/BSD. |
| `du -h --max-depth=1 folder` | Shows the size of each direct child folder on Linux/GNU systems. |
| `du -ah folder | sort -h` | Lists files and folders by size when supported by the local `sort`. Useful for finding what is large. |
| `df -h` | Shows available disk space. |
| `stat file` | Shows file metadata. |
| `realpath file` | Prints an absolute path for a file or folder when available. |
| `readlink file` | Shows where a symbolic link points. Flags differ between macOS/BSD and Linux/GNU. |
| `basename path/to/file.ext` | Prints the final file or folder name from a path. |
| `dirname path/to/file.ext` | Prints the parent directory portion of a path. |
| `tree` | Prints a folder tree when installed. Useful for quickly showing project structure. |

## Search commands

| Command | What it does |
| --- | --- |
| `rg "text"` | Searches recursively for text. Fast and agent-friendly. |
| `rg -n "text"` | Shows matching line numbers. |
| `rg -i "text"` | Searches case-insensitively. |
| `rg --files` | Lists files known to ripgrep. |
| `rg --files -g "*.ts"` | Lists TypeScript files. |
| `rg "text" documentation -g "*.md"` | Searches markdown files inside `documentation`. |
| `rg "TODO|FIXME"` | Searches for either `TODO` or `FIXME` using a regex. |
| `grep "text" file` | Searches one file or stream. Older and usually slower than `rg`. |
| `grep -R "text" folder` | Searches recursively with grep. Useful where `rg` is unavailable. |
| `find . -name "*.md"` | Finds files by name or path pattern. |
| `find . -type f` | Lists files below the current folder. |
| `find . -type d -name node_modules -prune -o -name "*.md" -print` | Finds markdown files while skipping `node_modules`. |
| `find . -type f -size +10M` | Finds large files. |
| `xargs command` | Turns text output into arguments for another command. Common in bulk file operations. |

## Text processing commands

| Command | What it does |
| --- | --- |
| `sort file` | Sorts lines. |
| `uniq file` | Removes adjacent duplicate lines, usually after `sort`. |
| `cut -d, -f1 file.csv` | Extracts columns from text. |
| `awk '{print $1}' file` | Extracts and transforms structured text. |
| `tr a-z A-Z` | Replaces or deletes characters in a stream. |
| `tee file` | Writes output to a file and also prints it. |
| `paste file1 file2` | Combines lines from files side by side. |
| `diff -u old new` | Shows differences between two files. |
| `comm file1 file2` | Compares two sorted files line by line. |

## JSON and data commands

| Command | What it does |
| --- | --- |
| `jq '.' file.json` | Pretty-prints JSON. |
| `jq '.scripts' package.json` | Reads the `scripts` property from `package.json`. |
| `jq -r '.name' package.json` | Reads a JSON value as raw text. |
| `jq 'keys' file.json` | Lists object keys. |
| `jq 'length' file.json` | Counts items in an array or keys in an object. |
| `jq '.items[] | .name' file.json` | Reads a property from each item in an array. |
| `jq 'map(select(.enabled == true))' file.json` | Filters an array of objects. |
| `node -e "console.log(require('./package.json').scripts)"` | Reads JSON with Node.js. Useful when `jq` is not installed. |
| `python -m json.tool file.json` | Pretty-prints JSON with Python when available. |
| `yq '.name' file.yaml` | Reads YAML when `yq` is installed. Similar role to `jq`, but for YAML. |

## Runtime and package commands

| Command | What it does |
| --- | --- |
| `node --version` | Shows the installed Node.js version. |
| `node file.js` | Runs a JavaScript file with Node.js. |
| `node -e "console.log('hello')"` | Runs a short JavaScript snippet from the command line. |
| `python --version` | Shows the installed Python version if `python` is available. On some systems this is Python 2, on others Python 3. |
| `python3 --version` | Shows the installed Python 3 version. |
| `python script.py` | Runs a Python script with the default `python` command. |
| `python3 script.py` | Runs a Python script explicitly with Python 3. |
| `python3 -m http.server 8000` | Starts a simple local static file server on port 8000. |
| `python3 -m venv .venv` | Creates a local Python virtual environment. |
| `python3 -m pip install package` | Installs a Python package using Python 3's pip module. |
| `pip install package` | Installs a Python package when `pip` is available. |
| `pip3 install package` | Installs a Python package explicitly for Python 3 when `pip3` is available. |
| `npm --version` | Shows the installed npm version. |
| `npm install` | Installs dependencies from `package.json`. |
| `npm ci` | Installs dependencies exactly from `package-lock.json`, common in CI. |
| `npm run` | Lists available npm scripts. |
| `npm run dev` | Starts a development server if the project defines that script. |
| `npm run build` | Builds the project if defined. |
| `npm test` | Runs tests if defined. |
| `npm ls package-name` | Shows which version of a package is installed and why. |
| `npm outdated` | Shows dependencies with newer versions available. |
| `npm explain package-name` | Explains why a package is installed. |
| `npm exec command` | Runs a package command through npm. Similar role to `npx` in modern npm. |
| `corepack enable` | Enables package-manager shims for tools like pnpm and Yarn when supported by Node.js. |
| `npx command` | Runs a package command without manually installing it globally. |
| `npx --yes command` | Runs a package command without interactive install prompts. Useful in automation. |
| `npx vite --host 0.0.0.0` | Starts Vite and exposes it on the local network. |
| `npx vite preview` | Serves a production build locally for testing. |
| `npx serve dist` | Serves the `dist` folder locally when `serve` is available. |
| `npx tsc --noEmit` | Type-checks a TypeScript project without writing output. |
| `npx prettier --check .` | Checks formatting when Prettier is available. |
| `npx prettier --write .` | Formats files with Prettier. |
| `npx eslint .` | Runs ESLint when the project is configured for it. |
| `pnpm install` | Installs dependencies with pnpm when the project uses it. |
| `pnpm run build` | Runs the `build` script with pnpm. |
| `pnpm dlx command` | Runs a package command with pnpm, similar to `npx`. |
| `yarn install` | Installs dependencies with Yarn when the project uses it. |
| `yarn build` | Runs the `build` script with Yarn. |
| `yarn dlx command` | Runs a package command with modern Yarn, similar to `npx`. |
| `bun --version` | Shows the installed Bun version. |
| `bun install` | Installs dependencies with Bun. |
| `bun run dev` | Runs the `dev` script with Bun. |
| `bun run build` | Runs the `build` script with Bun. |
| `bun test` | Runs Bun's test runner. |
| `bunx command` | Runs a package binary with Bun, similar to `npx`. |
| `deno --version` | Shows the installed Deno version. |
| `deno run script.ts` | Runs a TypeScript or JavaScript file with Deno. |
| `deno run --allow-read script.ts` | Runs a Deno script with explicit permission to read files. |
| `deno task` | Lists tasks from `deno.json` or `deno.jsonc`. |
| `deno task build` | Runs the `build` task from a Deno config file. |
| `deno test` | Runs Deno tests. |

## Needle project commands

| Command | What it does |
| --- | --- |
| `npm run docs:dev` | Starts this documentation site locally. |
| `npm run docs:build` | Builds this documentation site. |
| `npm run docs:build-api` | Builds generated Needle Engine API docs in this repository. |
| `npm run test:links` | Runs this repository's link-checking script. |
| `npm run dev` | Starts a Needle web project's dev server when the project defines this script. |
| `npm run build` | Builds a Needle web project when the project defines this script. |
| `npm run preview` | Serves a built web project if the project defines a preview script. |

## Git commands

| Command | What it does |
| --- | --- |
| `git status --short` | Shows changed files in a compact format. |
| `git diff` | Shows unstaged changes. |
| `git diff --staged` | Shows staged changes. |
| `git log --oneline -10` | Shows recent commits. |
| `git show commit` | Shows one commit. |
| `git show --stat commit` | Shows the files changed by one commit. |
| `git rev-parse --show-toplevel` | Prints the root folder of the current Git repository. Useful before editing paths. |
| `git blame file` | Shows who last changed each line. |
| `git branch` | Lists branches. |
| `git switch branch` | Switches branches. |
| `git switch -c branch` | Creates and switches to a new branch. |
| `git add file` | Stages a file for commit. |
| `git commit -m "message"` | Creates a commit. |
| `git pull` | Fetches and integrates changes from the current branch's remote. |
| `git fetch` | Downloads remote changes without switching or merging your current work. |
| `git grep "text"` | Searches tracked files in Git. |
| `git ls-files` | Lists files tracked by Git. |
| `git stash push -m "message"` | Temporarily saves local changes. Use carefully and remember to restore them. |
| `git stash list` | Lists saved stashes. |
| `git restore file` | Restores a file from Git. Use carefully because it discards local changes. |
| `git restore --staged file` | Unstages a file without changing the file contents. |
| `git checkout -- file` | Older way to discard local changes in a file. Use carefully. |
| `git reset --hard` | Discards local tracked-file changes and resets the working tree. Use only with explicit intent. |
| `git clean -fd` | Deletes untracked files and folders. Useful for cleanup, but destructive. |

## Process and network commands

| Command | What it does |
| --- | --- |
| `ps aux` | Lists running processes. |
| `ps axo pid,ppid,stat,command` | Lists running processes with selected columns: process ID, parent process ID, status, and command. Useful for process trees. |
| `ps -ef` | Lists running processes in a format common on Linux and Unix systems. |
| `pgrep name` | Finds process IDs by process name. Useful before inspecting or stopping a process. |
| `pgrep -af name` | Finds matching processes and prints their full command lines. |
| `pkill name` | Stops processes by name. Use carefully because it can match more than you intended. |
| `lsof -i :3000` | Shows what is using port 3000. |
| `lsof -nP -iTCP -sTCP:LISTEN` | Lists processes listening on TCP ports. |
| `kill PID` | Stops a process by process ID. |
| `kill -TERM PID` | Politely asks a process to stop. This is the default signal for `kill`. |
| `kill -9 PID` | Force-stops a process. Use only when a normal `kill` does not work. |
| `jobs` | Lists background jobs started by the current shell. |
| `fg %1` | Brings shell job 1 back to the foreground. |
| `bg %1` | Resumes shell job 1 in the background. |
| `nohup command &` | Starts a command that can keep running after the shell closes. |
| `disown %1` | Removes a background job from the shell's job table. |
| `sleep 5` | Waits five seconds. Common in scripts and retry loops. |
| `watch command` | Re-runs a command repeatedly on systems where `watch` is installed, common on Linux. |
| `top` | Opens an interactive process monitor. |
| `htop` | Opens a friendlier process monitor when installed. |
| `timeout 30 command` | Runs a command with a 30-second limit on systems with GNU `timeout`, common on Linux and CI. |
| `gtimeout 30 command` | macOS name for GNU `timeout` when installed via coreutils. |
| `curl URL` | Requests a URL and prints the response. |
| `curl -I URL` | Shows only response headers. |
| `curl -s URL` | Requests a URL quietly, useful in scripts. |
| `curl -L URL` | Follows redirects. |
| `curl -X POST URL` | Sends a POST request. Often combined with headers and JSON data. |
| `wget URL` | Downloads a URL when `wget` is installed. |
| `nc -vz host port` | Checks whether a TCP port is reachable when netcat is installed. |
| `ping host` | Checks whether a host responds on the network. |
| `traceroute host` | Shows the network path to a host on macOS/Linux. |
| `netstat` | Shows network connections on systems where it is available. |
| `ss -ltnp` | Lists listening TCP sockets on Linux systems where `ss` is available. |
| `dig domain` | Looks up DNS records for a domain when `dig` is installed. |
| `nslookup domain` | Looks up DNS records and is widely available, including on Windows. |
| `host domain` | Looks up DNS records on many macOS/Linux systems. |

## Remote access commands

| Command | What it does |
| --- | --- |
| `ssh user@host` | Opens a shell on a remote machine over SSH. |
| `ssh -i key.pem user@host` | Connects with a specific private key file. |
| `ssh -L 8080:localhost:80 user@host` | Creates a local port forward to a service reachable from the remote machine. |
| `ssh-keygen -t ed25519 -C "name"` | Creates a new SSH key pair. |
| `ssh-add key` | Adds a private key to the local SSH agent. |
| `scp file user@host:path/` | Copies a file to a remote machine over SSH. |
| `scp user@host:path/file .` | Copies a file from a remote machine to the current folder. |
| `rsync -av folder/ user@host:path/` | Syncs a folder to a remote machine, preserving useful file metadata. |
| `rsync -av --delete folder/ user@host:path/` | Syncs and removes remote files that no longer exist locally. Use carefully. |
| `sftp user@host` | Opens an interactive file-transfer session over SSH. |

## Docker commands

| Command | What it does |
| --- | --- |
| `docker --version` | Shows the installed Docker version. |
| `docker ps` | Lists running containers. |
| `docker ps -a` | Lists all containers, including stopped ones. |
| `docker images` | Lists local container images. |
| `docker build -t name .` | Builds an image from the current folder's Dockerfile. |
| `docker run image` | Starts a container from an image. |
| `docker logs container` | Prints logs from a container. |
| `docker logs -f container` | Follows container logs as they update. |
| `docker exec -it container sh` | Opens a shell inside a running container. |
| `docker stop container` | Stops a running container. |
| `docker rm container` | Removes a stopped container. |
| `docker system df` | Shows Docker disk usage. |
| `docker compose up` | Starts services from a Compose file. |
| `docker compose up -d` | Starts Compose services in the background. |
| `docker compose down` | Stops and removes Compose services. |
| `docker compose logs -f` | Follows logs for Compose services. |

## File change commands

| Command | What it does |
| --- | --- |
| `mkdir folder` | Creates a folder. |
| `mkdir -p path/to/folder` | Creates nested folders and does nothing if they already exist. |
| `mktemp -d` | Creates a temporary folder and prints its path. Useful for isolated experiments. |
| `touch file` | Creates an empty file or updates its timestamp. |
| `cp source target` | Copies files or folders. |
| `cp -R source target` | Copies a folder recursively. |
| `mv source target` | Moves or renames files or folders. |
| `rm file` | Deletes a file. Use carefully. |
| `rm -rf folder` | Deletes a folder recursively. Use very carefully. |
| `ln -s source target` | Creates a symbolic link from `target` to `source`. |
| `chmod +x file` | Makes a file executable. |
| `chown user file` | Changes file ownership. Often requires admin permissions. |
| `chgrp group file` | Changes the group ownership of a file. |
| `tar -czf archive.tgz folder` | Creates a compressed archive. |
| `tar -xzf archive.tgz` | Extracts a compressed archive. |
| `zip -r archive.zip folder` | Creates a zip archive from a folder. |
| `unzip file.zip` | Extracts a zip archive. |
| `gzip file` | Compresses one file to `file.gz` and usually removes the original. |
| `gunzip file.gz` | Decompresses a gzip file. |

## Patch and editing terms

| Term | Meaning |
| --- | --- |
| Patch | A text representation of file changes. |
| Unified diff | The common patch format shown by `git diff`, with `+` lines added and `-` lines removed. |
| Hunk | One contiguous changed region inside a patch. |
| Apply patch | Apply a structured diff to one or more files. |
| Formatter | A tool that rewrites code style automatically, such as Prettier. |
| Linter | A tool that reports code quality or style issues, such as ESLint. |
| Type checker | A tool that validates types without necessarily running the program. |

## Needle debugging helpers

| Item | What it does |
| --- | --- |
| `node_modules/.needle/logs` | Folder where the Needle Engine Vite plugin writes browser and dev-server logs during local development. |
| `?console` | URL parameter that opens an on-screen console, useful on mobile and XR devices. |
| `?stats` | URL parameter that shows FPS and renderer statistics. |
| `?printGltf` | URL parameter that logs loaded glTF files to the console. |
| `?showcolliders` | URL parameter that visualizes physics colliders. |
| `?gizmos` | URL parameter that enables gizmo rendering for debugging helpers. |
| Needle Inspector | Chrome DevTools extension for inspecting and editing three.js, React Three Fiber, and Needle Engine scenes. |

## See also

- [Understanding Terminal Commands in AI Agent Workflows](/docs/explanation/understanding-ai-agent-terminal-commands)
- [Understanding AI Agents](/docs/explanation/understanding-ai-agents)
- [AI Agent Glossary](/docs/reference/ai-agent-glossary)
- [AI & Needle Engine](/docs/ai/)
- [Needle MCP Server](/docs/ai/needle-mcp-server)
