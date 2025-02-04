import { App, defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'
import { path } from '@vuepress/utils'
// import { searchPlugin } from '@vuepress/plugin-search'
// import * as mermaidPlugin from "vuepress-plugin-mermaidjs";
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
// import * as videoplayer from "vuepress-plugin-core-video-player";
// import { pwaPlugin } from '@vuepress/plugin-pwa'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { shikiPlugin } from '@vuepress/plugin-shiki'

import { rendererRich, transformerTwoslash } from '@shikijs/twoslash';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toHast } from 'mdast-util-to-hast';
import { sitemapPlugin } from '@vuepress/plugin-sitemap';

// import { mermaidPlugin } from "@renovamen/vuepress-plugin-mermaid";
//@ts-ignore
import { generateMetaPlugin, cleanLink, cleanHeader } from "./plugins/generate-samples-meta/index"
import { includeSampleCode } from './plugins/include-samples-code/index'
import { generateSharedCode } from './plugins/generate-shared-code/index'
import * as dotenv from 'dotenv'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { modifyHtmlMeta } from './plugins/html-meta/index'

import { Element } from 'hast'

dotenv.config()

const _url = "https://engine.needle.tools/docs"
const _base = "/docs/";

const _title = "Needle Engine Documentation";
const _description = "Needle Engine is a web-based runtime for 3D apps. It runs on your machine for development, and can be deployed anywhere. It is flexible, extensible, and collaboration and XR come naturally. Needle Exporter for Unity bridges the Unity Editor and the web runtime. It helps you to export your assets, animations, lightmaps and so on to the web. It is built around the glTF standard for 3D assets.";
const _previewImg = "preview.jpeg";

// https://css-tricks.com/essential-meta-tags-social-media/
// https://ogp.me/

function renderMarkdown(content) {
    try {
        content = content.replace(/\{@link\s+([^ ]+)(?:\s+([^\}]*))?\}/g, function(match, p1, p2) {
            if (!p1 && !p2) return match;

            // console.log("MATCH", content, match, p1, p2);
            p1 = p1.replace(/^\s+|\s+$/g, '');

            if (p2) {
                // remove newlines and whitespaces at the beginning and end
                p2 = p2.replace(/^\s+|\s+$/g, '');
                return `[${p2.trim()}](${p1.trim()})`;
            }

            return `[${p1.trim()}](${p1.trim()})`;
        });

        // TODO support inline better, right now becomes a paragraph
        
        const processed = fromMarkdown(content);
        const hast = toHast(processed,
            // Could turn the code samples into nice formatted code again here... inception
            // from https://github.com/shikijs/shiki/blob/644a244aad3513f68c9037d9c46ae6a6a04068ca/packages/vitepress-twoslash/src/renderer-floating-vue.ts#L136
            /*
            {
                handlers: {
                  code: (state, node) => {
                    const lang = node.lang || ''
                    if (lang) {
                      return <Element>{
                        type: 'element',
                        tagName: 'code',
                        properties: {},
                        children: codeToHast(
                          node.value,
                          {
                            ...this.options,
                            transformers: [],
                            lang,
                            structure: node.value.trim().includes('\n') ? 'classic' : 'inline',
                          },
                        ).children,
                      }
                    }
                    return defaultHandlers.code(state, node)
                  },
                },
              },
              */
        );
        return (hast as Element).children;
    } catch (e) {
        console.warn("Error in markdown rendering", e);
        return content;
    }
}

export default defineUserConfig({
    base: _base,
    lang: 'en-US',
    title: _title,
    dest: "dist",
    description: _description,
    plugins: [
        // searchPlugin({
        // }),
        // @ts-ignore
        docsearchPlugin({
            appId: "2LT25GG3KX",
            apiKey: "389be16f732f82c611e1b0f22c031dff",
            indexName: "engine-needle",
            injectStyles: true,
        }),
        sitemapPlugin({
            hostname: _url,
            devServer: true,
        }),
        //@ts-ignore
        // pwaPlugin(),
        // mermaidPlugin({}),
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, './components'),
        }),
        // videoplayer
        generateMetaPlugin,
        includeSampleCode,
        generateSharedCode,
        modifyHtmlMeta,
        //@ts-ignore
        googleAnalyticsPlugin({
            id: "G-V2Q445L3XQ",
            debug: false,
        }),
        (args, ctx) => {
            return {
                name: "kill-broken-pages",
                onInitialized: async (app) => {
                    for (const page of app.pages) {
                        if (!page.filePathRelative) {
                            // This one is allowed – only one that is expected to come from a virtual page
                            if (page.path === "/404.html") continue;
                            console.error("Broken page", page.path);
                        }
                        const nonBrokenPages = app.pages.filter(x => x.filePathRelative);
                        const nonBrokenLinks = nonBrokenPages.map(x => x.filePathRelative);
                        let allLinks = app.pages.flatMap(x => x.links).map(x => x.relative);
                        allLinks = allLinks.map(x => x.endsWith("/") ? x + "index.md" : x);
                        const missingLinks = allLinks.filter(x => !nonBrokenLinks.includes(x));
                        if (missingLinks.length > 0) {
                            console.error("Missing Links!", missingLinks); //, allLinks, nonBrokenLinks);
                        }
                    }
                    /*
                    console.log("app", app.pages.map(x => {
                        if (!x.filePathRelative) {
                            console.error("Broken page", x.path);
                        }return { path: x.path, data: { ...x, content: undefined, contentRendered: undefined, ...x.routeMeta }, eData: { ...x.data } }}));
                    */
                },
                onPrepared: async (app: App) => {
                },
            }
        },
        shikiPlugin({
            langs: ['ts', 'json', 'vue', 'md', 'mermaid', 'csharp', 'cs', 'bash'],
            themes: { light: 'catppuccin-latte', dark: 'catppuccin-frappe' },
            lineNumbers: false,
            highlightLines: false,
            // Disabled because Shiki for vuepress is deprecated:
            // https://github.com/shikijs/shiki/blob/9cd269d9b3358680413ca0f5cc8d2b5636a86eae/docs/guide/migrate.md?plain=1#L50
            // > `vuepress-plugin-shiki` is deprecated as [VuePress](https://github.com/vuejs/vuepress#status) 
            // > is no longer recommended. Its successor [VitePress](https://vitepress.dev/) has a built-in 
            // > Shiki integration.
            // We should look into bringing Shiki back after the migration to vitepress.
            __transformers: [
                // https://twoslash.netlify.app/refs/options#compiler-options
                // complex example: https://github.com/shikijs/shiki/blob/644a244aad3513f68c9037d9c46ae6a6a04068ca/packages/vitepress-twoslash/src/renderer-floating-vue.ts#L50
                transformerTwoslash({
                    renderer: rendererRich({
                        jsdoc: true,
                        renderMarkdown: renderMarkdown,
                        renderMarkdownInline(markdown, context) {
                            return renderMarkdown(markdown);
                        },
                    }),
                    twoslashOptions: {
                        handbookOptions: {
                            noErrorsCutted: true,
                            noErrors: [
                                2532, // Object is possibly 'undefined'
                                2304, // cannot find name
                            ],
                        },
                        compilerOptions: {
                            experimentalDecorators: true,
                        }
                    },
                    explicitTrigger: true, // set to true to debug individual code snippets
                    onTwoslashError: (e, code) => {
                        console.warn("\n-----------\n", "Twoslash error\n", e, "in:\n", code, "\n-----------\n");
                    },
                }),
            ]
        }) as any,
    ],
    head: [
        ['link', { rel: 'icon', href: _url + '/icons/favicon.ico' }],
        ['link', { rel: 'manifest', href: 'manifest.webmanifest' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],

        ['meta', { property: "og:title", content: _title }],
        ['meta', { property: "og:type", content: "website" }],
        // this is inserted via the html-meta plugin from the frontmatter description
        // ['meta', { property: "og:description", content: _description }],
        ['meta', { property: "og:image", content: _url + "/" + _previewImg }],
        ['meta', { property: "og:url", content: _url }],
        ['meta', { property: "twitter:card", content: "summary_large_image" }],

        // stackblitz
        ['script', { src: 'https://unpkg.com/@stackblitz/sdk/bundles/sdk.umd.js' }],
        ['script', { src: 'https://analytics.needle.tools/js/script.tagged-events.outbound-links.js', defer: "", "data-domain": "docs.needle.tools" } ]

    ],
    markdown: {
        importCode: {
            handleImportPath: (str) =>
                str.replace(/^@code/, path.resolve(__dirname, 'public', 'code-samples')),
        },
        slugify: (str) => cleanLink(str),
        headers: {
            // https://v2.vuepress.vuejs.org/reference/config.html#markdown-headers
            format: (link) => cleanHeader(link),
        },
    },
    bundler: viteBundler(),
    theme: defaultTheme({
        // repo: "needle-tools/needle-engine-support", // this only adds the github link
        docsRepo: "needle-tools/needle-engine-support",
        docsBranch: "main",
        docsDir: "documentation",
        logo: "/needle-logo-black.svg",
        logoDark: "/needle-logo-white.svg",
        colorModeSwitch: true,
        colorMode: "light",
        lastUpdated: true, // useful for locally testing / seeing which pages are outdated
        contributors: false,
        editLink: true,
        editLinkText: "Suggest changes",
        externalLinkIcon: true,
        notFound: [
            "Oh no — this page does not exist!",
            "Gosh! You found a 🌵 glitch",
        ],
        themePlugins: {
            backToTop: false,
            prismjs: false,
            linksCheck: {
                dev: true,
                build: 'error',
            }
        },
        navbar: [
            {
                text: 'Overview',
                link: '/',
                children: [
                    {
                        text: 'What is Needle Engine?',
                        link: '/',
                    },
                    '/testimonials',
                    {
                        text: "Get an overview",
                        children: [
                            {
                                text: "Samples and Showcase",
                                link: "https://engine.needle.tools/samples?utm_source=needle_docs&utm_content=headernav"
                            },
                            "/vision",
                            "/features-overview",
                            "/technical-overview",
                        ],
                    },
                    {
                        text: "Resources",
                        children: [
                            {
                                text: 'Pricing and Plans',
                                link: "https://needle.tools/pricing/?utm_source=needle_docs&utm_content=headersubnav"
                            },
                            {
                                text: "Changelog",
                                link: "https://github.com/needle-tools/needle-engine-support/releases"
                            },
                            {
                                text: "API Documentation",
                                link: "https://engine.needle.tools/docs/api/latest",
                            },
                            {
                                text: "Get Help",
                                target: "_blank",
                                link: "https://forum.needle.tools/?utm_source=needle_docs&utm_content=headersubnav",
                            },
                        ],
                    },
                ]
            },
            {
                text: 'Downloads',
                link: '/getting-started/',
            },
            {
                text: 'Guides',
                children: [
                    {
                        text: "Integrations",
                        children: [
                            "/unity/",
                            "/blender/",
                            "/three/",
                            "/embedding",
                            "/cloud/",
                            // "/custom-integrations/",
                        ]
                    },
                    {
                        text: "Topics",
                        children: [
                            "/project-structure",
                            "/everywhere-actions",
                            "/export",
                            "/html",
                            "/testing",
                            "/deployment",
                        ]
                    },
                    {
                        text: "Advanced",
                        children: [
                            "/networking",
                            "/xr",
                            "/vanilla-js",
                            "/unity/editor-sync",
                        ]
                    },
                    {
                        text: "Troubleshooting",
                        children: [
                            "/debugging",
                            "/faq",
                            {
                                text: "Get Help",
                                target: "_blank",
                                link: "https://forum.needle.tools/?utm_source=needle_docs&utm_content=headersubnav",
                            },
                        ]
                    },
                    {
                        text: "Videos",
                        children: [
                            {
                                text: "Tutorials on Youtube",
                                target: "_blank",
                                link: "https://www.youtube.com/playlist?list=PLJ4BaFFEGP1GVTmPhKDC6QzL8Am9700Wo"
                            },
                            {
                                text: "Interviews on Youtube",
                                target: "_blank",
                                link: "https://www.youtube.com/playlist?list=PLJ4BaFFEGP1EOHCjYszc__d2yO7RkB-iw"
                            },
                        ]
                    },
                ]
            },
            {
                text: 'Reference',
                children: [
                    {
                        text: "Scripting Overview",
                        children: [
                            "/getting-started/typescript-essentials",
                            "/getting-started/for-unity-developers",
                            "/component-reference",
                            "/everywhere-actions",
                        ]
                    },
                    {
                        text: "Components and Lifecycle",
                        children: [
                            "/scripting",
                            "/reference/typescript-decorators",
                            "/component-compiler",
                            "/scripting-examples",
                            {
                                text: "Community Contributions",
                                link: "/community/contributions"
                            },
                            "/modules", 
                        ]
                    },
                    {
                        text: "Settings and APIs",
                        children: [
                            "/reference/needle-engine-attributes",
                            "/reference/needle-config-json",
                            {
                                text: "Needle Engine API",
                                link: "https://engine.needle.tools/docs/api/latest",
                            },
                            {
                                text: "three.js API",
                                link: "https://threejs.org/docs/index.html",
                            },
                        ]
                    },
                ]
            },
            {
                text: 'Samples',
                target: "_blank",
                link: 'https://engine.needle.tools/samples?utm_source=needle_docs&utm_content=headernav',
            },
            {
                text: 'Pricing',
                target: "_blank",
                link: "https://needle.tools/pricing/?utm_source=needle_docs&utm_content=headernav"
            },
            {
                text: "Get Help",
                target: "_blank",
                link: "https://forum.needle.tools/?utm_source=needle_docs&utm_content=headersubnav",
            },
            {
                text: 'Contact',
                children: [
                    {
                        text: 'Needle Website',
                        link: 'https://needle.tools?utm_source=needle_docs&utm_content=headernav'
                    },
                    {
                        text: 'Support Community',
                        link: 'https://forum.needle.tools?utm_source=needle_docs&utm_content=headernav'
                    },
                    {
                        text: 'Discord Server',
                        link: 'https://discord.needle.tools'
                    },
                    {
                        text: 'Twitter',
                        link: 'https://twitter.com/needletools'
                    },
                    {
                        text: 'Youtube',
                        link: 'https://www.youtube.com/@needle-tools'
                    },
                    {
                        text: 'Newsletter',
                        link: "https://fwd.needle.tools/needle-engine/newsletter"
                    },
                    {
                        text: 'Email',
                        link: 'mailto:hi+docs@needle.tools'
                    },
                    {
                        text: 'Feedback',
                        link: 'https://fwd.needle.tools/needle-engine/feedback'
                    },
                    {
                        text: 'Github',
                        link: 'https://github.com/needle-tools'
                    },
                ]
            },
        ],
        sidebarDepth: 1,
        sidebar: {
            '/': [
                {
                    text: "Getting Started",
                    children: [
                        {
                            text: 'Downloads',
                            link: "/getting-started/",
                        },
                        {
                            text: 'Needle Engine for Unity',
                            link: '/unity/',
                        },
                        {
                            text: 'Needle Engine for Blender',
                            link: '/blender/',
                        },
                        {
                            text: 'Needle Engine as Web Component',
                            link: '/three/',
                        },
                        {
                            text: 'Needle Engine on your Website',
                            link: '/embedding',
                        },
                        {
                            text: 'Custom integrations',
                            link: '/custom-integrations/',
                        },
                        {
                            text: 'Needle Cloud',
                            link: '/cloud/',
                        },
                        {
                            text: 'Support and Community',
                            link: '/support',
                        }
                    ]
                },
                {
                    text: "Core Concepts",
                    children: [
                        "/project-structure",
                        "/everywhere-actions",
                        "/export",
                        "/html",
                        "/testing",
                        "/deployment",
                        "/debugging",
                        "/faq",
                    ]
                },
                {
                    text: "Scripting",
                    children: [
                        "/getting-started/typescript-essentials",
                        "/getting-started/for-unity-developers",
                        "/scripting",
                        "/component-compiler",
                        "/scripting-examples",
                        {
                            text: "Community Contributions",
                            link: "/community/contributions/"
                        },
                    ]
                },
                {
                    text: "Advanced",
                    children: [
                        "/xr",
                        "/networking",
                        "/unity/editor-sync",
                    ]
                },
                {
                    text: "Reference",
                    children: [
                        "/features-overview",
                        "/technical-overview",
                        "/component-reference",
                        "/reference/needle-config-json",
                        "/reference/needle-engine-attributes",
                        "/reference/typescript-decorators",
                    ]
                },
            ]
            // '/getting-started/': [
            //     "/getting-started/typescript-essentials",
            //     "/getting-started/for-unity-developers",
            //     "/project-structure",
            //     "/everywhere-actions",
            //     "/export",
            //     "/html",
            //     "/deployment",
            //     "/debugging",
            // ],
            // '/getting-started/': [
            //     '',
            //     {
            //         text: "Typescript Essentials",
            //         link: "/getting-started/typescript-essentials",
            //     },
            //     {
            //         text: "For Unity Developers",
            //         link: "/getting-started/for-unity-developers",
            //     },
            //     "/project-structure",
            //     "/everywhere-actions",
            //     "/export",
            //     "/html",
            //     "/deployment",
            //     "/debugging",
            // ],
            // '/': [
            //     '', /* fallback, generate by header by default */
            // ]
        },
    }),
    /*
    alias: {
        '@theme/VPSidebarItem.vue': path.resolve(__dirname, 'components/theme/SidebarItem.vue'),
    },
    */
})

/*
{
    '@theme/SidebarItem': path.resolve(__dirname, 'components/theme/SiderbarItem.vue'),
}
*/