import { defineUserConfig } from 'vuepress'
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
import {fromMarkdown} from 'mdast-util-from-markdown'
import {toHast} from 'mdast-util-to-hast'

// import { mermaidPlugin } from "@renovamen/vuepress-plugin-mermaid";
//@ts-ignore
import { generateMetaPlugin, cleanLink, cleanHeader } from "./plugins/generate-samples-meta/index"
import { includeSampleCode } from './plugins/include-samples-code/index'
import { generateSharedCode } from './plugins/generate-shared-code/index'
import * as dotenv from 'dotenv'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { modifyHtmlMeta } from './plugins/html-meta/index'

import { Behaviour } from '@needle-tools/engine';

dotenv.config()

const _url = "https://engine.needle.tools/docs"
const _base = "/docs/";

const _title = "Documentation";
const _description = "Needle Engine is a web-based runtime for 3D apps. It runs on your machine for development, and can be deployed anywhere. It is flexible, extensible, and collaboration and XR come naturally. Needle Exporter for Unity bridges the Unity Editor and the web runtime. It helps you to export your assets, animations, lightmaps and so on to the web. It is built around the glTF standard for 3D assets.";
const _previewImg = "preview.jpeg";

// https://css-tricks.com/essential-meta-tags-social-media/
// https://ogp.me/

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
        shikiPlugin({
            langs: ['ts', 'json', 'vue', 'md', 'mermaid', 'csharp', 'cs'],
            themes: { light: 'catppuccin-latte', dark: 'catppuccin-frappe' },
            lineNumbers: true,
            highlightLines: true,
            transformers: [
                {
                    name: 'add-lines',
                    // prepend lines
                    preprocess: (code: string, options) => {
                        if (options.lang !== "ts") return code;
                        if (code.includes("@needle-tools/engine")) return code;
                        return `/******/
                        import { Behaviour, serializable } from '@needle-tools/engine';
                        /******/` + code;
                    },
                },
                // https://twoslash.netlify.app/refs/options#compiler-options
                // complex example: https://github.com/shikijs/shiki/blob/644a244aad3513f68c9037d9c46ae6a6a04068ca/packages/vitepress-twoslash/src/renderer-floating-vue.ts#L50
                transformerTwoslash({
                    renderer: rendererRich({
                        jsdoc: true,
                        renderMarkdown: (c) => {
                            const mdast = fromMarkdown(c);
                            const hast = toHast(mdast);

                            const convertFromHastNodesToElementContent = (hast: any): any => {
                                if (hast.type === "element") {
                                    if (hast.tagName === "pre") {
                                        return {
                                            type: "code",
                                            lang: hast.properties?.language,
                                            value: hast.children?.[0]?.value,
                                        };
                                    }
                                }
                                if (hast.children) {
                                    hast.children = hast.children.map(convertFromHastNodesToElementContent);
                                }
                                return hast;
                            }

                            const convert = convertFromHastNodesToElementContent(hast);
                            console.log("HAST", hast, convertFromHastNodesToElementContent(hast));
                            return convert;
                        }
                    }),
                    explicitTrigger: true,
                    onTwoslashError: (e, code) => {
                        console.warn("Twoslash error", e);
                    },
                }),
            ]
        }) as any,
    ],
    head: [
        ['link', { rel: 'icon', href: 'icons/favicon.ico' }],
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
            prismjs: false, /*{
                theme: 'coy',
            },*/
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
                    "/project-structure",
                    "/everywhere-actions",
                    "/export",
                    "/html",
                    "/testing",
                    "/deployment",
                    {
                        text: "Advanced",
                        children: [
                            "/networking",
                            "/xr",
                            "/vanilla-js",
                        ]
                    },
                    {
                        text: "Blender",
                        children: [
                            "/blender"
                        ]
                    },
                    {
                        text: "Tutorials",
                        children: [
                            {
                                text: "Tutorials on Youtube",
                                link: "https://www.youtube.com/playlist?list=PLJ4BaFFEGP1GVTmPhKDC6QzL8Am9700Wo"
                            },
                        ]
                    },
                    {
                        text: "Troubleshooting",
                        children: [
                            "/debugging",
                            "/faq",
                        ]
                    }
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
                link: 'https://engine.needle.tools/samples?utm_source=needle_docs&utm_content=headernav',
            },
            {
                text: 'Pricing',
                link: "https://needle.tools/pricing/?utm_source=needle_docs&utm_content=headernav"
            },
            {
                text: 'Contact',
                children: [
                    {
                        text: 'Needle Website',
                        link: 'https://needle.tools?utm_source=needle_docs&utm_content=headernav'
                    },
                    {
                        text: 'Github',
                        link: 'https://github.com/needle-tools/needle-engine-support'
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
                            text: 'Installation',
                            link: "/getting-started/",
                        },
                        /*
                        {
                            text: 'Getting started with Unity',
                            stub: true,
                        },
                        {
                            text: 'Getting started with Blender',
                            stub: true,
                        },
                        {
                            text: 'Getting started with three.js',
                            stub: true,
                        },
                        {
                            text: 'Custom integrations',
                            stub: true,
                        }
                        */
                    ]
                },
                {
                    text: "Creating your Project",
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
                        "/vanilla-js",
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
                {
                    text: "Blender",
                    children: [
                        "/blender",
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
            // '/getting-started': [
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