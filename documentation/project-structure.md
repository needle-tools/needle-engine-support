---
title: Web Project Structure
---

# Needle Engine Project Structure

### Web Project Files

| | |
| --- | --- |
| **Needle Engine** | |
| [`needle.config.json`](./reference/needle-config-json.md) | Configuration for Needle Engine builds and integrations |
| **Ecosystem** | |
| `package.json` | Project configuration containing name, version, dependencies and scripts |
| `tsconfig.json` | Typescript compiler configuration |
| `.gitignore` | Files and folders to be ignored in git |
| `vite.config.js` | Contains vite specific configuration.<br/>It also adds the Needle Engine vite plugins. |


### Default Vite project structure

Our main project template uses the superfast [vite](https://vitejs.dev/) bundler. The following shows the structure of the Vite template that we created and ship (altough it is possible to adapt it to your own needs).

| | |
| --- | --- |
| **Folders** | |
| `assets/` | The asset folder contains exported assets from Unity. E.g. generated ``gltf`` files, audio or video files. It is not recommended to manually add files to ``assets`` as it will get cleared on building the distribution for the project.
| `include/` | (optional) - If you have custom assets that you need to reference/load add them to the include directory. On build this directory will be copied to the output folder.
| `src/generated/` | The generated javascript code. Do not edit manually!
| `src/scripts/` | Your project specific scripts / components
| `src/styles/` | Stylesheets
| `*` | You can add any new folders here as you please. Make sure to [copy](./reference/needle-config-json.md) them to the output directory when building |
| **Files** | |
| `index.html` | The landing- or homepage of your website
| `vite.config` | The [vite config](https://vitejs.dev/config/). Settings for building the distribution and hosting the development server are made here. It is usually not necessary to edit these settings.
| `src/main.ts` | Included from `index.html` and importing `needle-engine`
| `*` | You can add any new files here as you please. Make sure to [copy](./reference/needle-config-json.md) them to the output directory when building (unless they are just being used during development) |

Our exporter can be used with other project structures as well, vite is just our go-to frontend bundling tool because of its speed. Feel free to set up your JavaScript project as you like. 

[Learn more in the docs about bundling and usage with other frameworks](html.md)



---

#### Continue Reading

- [Typescript Guide for Unity Developers](./getting-started/for-unity-developers.md)
- [Typescript Essentials](./getting-started/typescript-essentials.md)
- [Writing custom scripts](./scripting.md)
- [Everywhere Actions](./everywhere-actions.md)
