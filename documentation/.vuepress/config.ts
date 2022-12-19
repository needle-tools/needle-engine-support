import { defineUserConfig, defaultTheme } from 'vuepress'
import { path } from '@vuepress/utils'
import { searchPlugin } from '@vuepress/plugin-search'
// import * as mermaidPlugin from "vuepress-plugin-mermaidjs";
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
// import * as videoplayer from "vuepress-plugin-core-video-player";
import { pwaPlugin } from '@vuepress/plugin-pwa'

// import { mermaidPlugin } from "@renovamen/vuepress-plugin-mermaid";
//@ts-ignore
import { generateMetaPlugin, cleanLink, cleanHeader } from "./plugins/generate-samples-meta/index"

const _url = "https://engine.needle.tools/docs"
const _base = "/docs/";

const _title = "Needle Engine Documentation";
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
        searchPlugin({
        }),
        //@ts-ignore
        pwaPlugin({}),
        // mermaidPlugin({}),
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, './components'),
        }),
        // videoplayer
        generateMetaPlugin
    ],
    head: [
        ['link', { rel: 'icon', href: 'icons/favicon.ico' }],
        ['link', { rel: 'manifest', href: 'manifest.webmanifest' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],

        ['meta', { property: "og:title", content: _title }],
        ['meta', { property: "og:type", content: "website" }],
        ['meta', { property: "og:description", content: _description }],
        ['meta', { property: "og:image", content: _previewImg }],
        ['meta', { property: "og:url", content: _url }],
        ['meta', { property: "twitter:card", content: "summary_large_image" }],

    ],
    markdown: {
        importCode: {
            handleImportPath: (str) =>
                str.replace(/^@code/, path.resolve(__dirname, 'code-samples')),
        },
        slugify: (str) => cleanLink(str),
        headers: {
            // https://v2.vuepress.vuejs.org/reference/config.html#markdown-headers
            format: (link) => cleanHeader(link),
        }
    },
    theme: defaultTheme({
        // repo: "needle-tools/needle-engine-support", // this only adds the github link
        docsRepo: "needle-tools/needle-engine-support",
        docsBranch: "main",
        docsDir: "documentation",
        logo: "/logo.png",
        colorModeSwitch: true,
        lastUpdated: false,
        contributors: false,
        editLink: true,
        notFound: [
            "Oops, this page does not exist 😥",
            "Gosh! You found a 🌵 glitch",
        ],
        navbar: [
            {
                text: 'Needle Engine',
                link: '/',
                children: [
                    {
                        text: 'Needle Engine',
                        link: '/',
                    },
                    "/vision",
                    "/features-overview",
                    "/technical-overview",
                    {
                        text: 'Testimonials 💬',
                        link: '/testimonials',
                    },
                ]
            },
            {
                text: 'Getting Started ⭐',
                link: '/getting-started'
            },
            {
                text: 'Guides',
                children: [
                    {
                        text: "Basics",
                        children: [
                            "/getting-started",
                            "/export",
                            "/deployment",
                            "/project_structure",
                            "/html",
                            "/debugging",
                        ]
                    },
                    {
                        text: "Scripting",
                        children: [
                            "/scripting",
                            "/scripting-examples",
                        ]
                    },
                    {
                        text: "Advanced",
                        children: [
                            "/networking",
                            "/xr",
                        ]
                    },
                ]
            },
            {
                text: 'Reference',
                children: [
                    "/for-unity-developers",
                    "/component-reference",
                    "/vanilla-js",
                    "/scripting-examples",
                    "/debugging",
                    "/faq",
                    {
                        text: "Releases and Changelog",
                        link: "https://github.com/needle-tools/needle-engine-support/releases"
                    },
                    {
                        text: "Download and Learn",
                        children: [
                            {
                                text: "Sample Projects", 
                                link: "https://engine.needle.tools/samples",
                            },
                            "/modules",
                        ]
                    },
                ]
            },
            {
                text: 'Case studies',
                children: [
                    {
                        text: 'Needle',
                        children: [
                            {
                                text: 'Needle Website 🌐',
                                link: '/showcase-website',
                            },
                            {
                                text: 'Castle Builder 🏰',
                                link: '/showcase-castle',
                            },
                            {
                                text: 'Product Configurator 🚲',
                                link: '/showcase-bike',
                            },
                        ],
                    },
                    {
                        text: 'Community Contributions',
                        children: [
                            {
                                text: 'AR.js integration',
                                link: 'https://github.com/FireDragonGameStudio/NeedleAndARjs',
                            },
                            {
                                text: 'Mercedes Benz Techdemo',
                                link: '/showcase-mercedes-benz',
                            },
                        ]
                    },
                ]
            },
            {
                text: 'Contact',
                children: [
                    {
                        text: 'Needle Website',
                        link: 'https://needle.tools'
                    },
                    {
                        text: 'Github',
                        link: 'https://github.com/needle-tools/needle-engine-support'
                    },
                    {
                        text: 'Discord 💜',
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
                        text: 'Needle on Glitch 🎏',
                        link: "https://glitch.com/@needle-tools"
                    },
                    {
                        text: 'Send an email',
                        link: 'mailto:hi@needle.tools'
                    },
                    {
                        text: 'Beta Feedback',
                        link: "https://fwd.needle.tools/needle-engine/feedback"
                    },
                    {
                        text: 'Report a bug',
                        link: "https://github.com/needle-tools/needle-engine-support/issues/new"
                    },
                ]
            },
        ],
    }),

})
