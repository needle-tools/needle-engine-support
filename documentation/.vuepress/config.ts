import { defineUserConfig, defaultTheme } from 'vuepress'
import { path } from '@vuepress/utils'
import { searchPlugin } from '@vuepress/plugin-search'
// import * as mermaidPlugin from "@renovamen/vuepress-plugin-mermaid";
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
// import * as videoplayer from "vuepress-plugin-core-video-player";
import { pwaPlugin } from '@vuepress/plugin-pwa'

const _base = "/needle-engine-support/";

export default defineUserConfig({
    base: _base,
    lang: 'en-US',
    title: 'Needle Engine',
    dest: "dist",
    description: 'Needle Engine is a web-based runtime for 3D apps. It runs on your machine for development, and can be deployed anywhere. It is flexible, extensible, and collaboration and XR come naturally.',
    plugins: [
        searchPlugin({
        }),
        //@ts-ignore
        pwaPlugin({}),
        // mermaidPlugin,
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, './components'),
        }),
        // videoplayer
    ],
    head: [
        ['link', { rel: 'icon', href: 'icons/favicon.ico' }],
        ['link', { rel: 'manifest', href: 'manifest.webmanifest' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ],
    markdown: {
        importCode: {
            handleImportPath: (str) =>
                str.replace(/^@code/, path.resolve(__dirname, 'code-samples')),
        },
    },
    theme: defaultTheme({
        // repo: "needle-tools/needle-engine-support", // this only adds the github link
        docsRepo: "needle-tools/needle-engine-support",
        docsBranch: "vuepress",
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
                    "vision",
                    "features-overview",
                    "technical-overview",
                    {
                        text: 'Testimonials 💬',
                        link: 'testimonials',
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
                            "getting-started",
                            "deployment",
                            "project_structure",
                            "export",
                            "html",
                            {
                                text: "Vanilla javascript",
                                link: "vanilla-js"
                            },
                            "debugging",
                        ]
                    },
                    {
                        text: "Scripting",
                        children: [
                            "scripting",
                            "scripting-examples",
                        ]
                    },
                    {
                        text: "Advanced",
                        children: [
                            "networking",
                            "xr",
                        ]
                    },
                ]
            },
            {
                text: 'Reference',
                children: [
                    "samples-and-modules",
                    "for-unity-developers",
                    "component-reference",
                    "scripting",
                    "debugging",
                    "faq",
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
                                link: 'showcase-website',
                            },
                            {
                                text: 'Castle Builder 🏰',
                                link: 'showcase-castle',
                            },
                            {
                                text: 'Product Configurator 🚲',
                                link: 'showcase-bike',
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
                        link: 'https://github.com/needle-tools'
                    },
                    {
                        text: 'Discord',
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
                        text: 'Beta Feedback',
                        link: "https://fwd.needle.tools/needle-engine/feedback"
                    },
                    {
                        text: 'Needle on Glitch 🎏',
                        link: "https://glitch.com/@needle-tools"
                    },
                    
                    {
                        text: 'Send email',
                        link: 'mailto:hi@needle.tools'
                    },
                ]
            },
        ],
    }),

})