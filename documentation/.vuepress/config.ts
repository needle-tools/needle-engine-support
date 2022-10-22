import { defineUserConfig, defaultTheme } from 'vuepress'
import { path } from '@vuepress/utils'
// import { searchPlugin } from '@vuepress/plugin-search'
// // import { mermaidPlugin } from "@renovamen/vuepress-plugin-mermaid";
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
// import * as videoplayer from "vuepress-plugin-core-video-player";


export default defineUserConfig({
    base: "/needle-engine-support/",
    lang: 'en-US',
    title: 'Needle Engine',
    description: 'Needle Engine is a web-based runtime for 3D apps. It runs on your machine for development, and can be deployed anywhere. It is flexible, extensible, and collaboration and XR come naturally.',
    theme: defaultTheme({
        // repo: "needle-tools/needle-engine-support", // this only adds the github link
        docsRepo: "needle-tools/needle-engine-support",
        docsBranch: "vuepress",
        docsDir: "documentation",
        logo: "/logo.png",
        colorModeSwitch: false, // disable until https://github.com/vuepress/vuepress-next/issues/1140
        lastUpdated: false, // disable until https://github.com/vuepress/vuepress-next/issues/1140
        // editLink: false,
        contributors: false,
        editLink: false,
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
                ]
            },
            {
                text: 'Getting Started ⭐',
                link: '/getting-started'
            },
            {
                text: 'Guides',
                children: [
                    "project_structure",
                    "export",
                    "html",
                    "deployment",
                    "networking",
                    "scripting",
                    "xr",
                    "faq",
                    "debugging"
                ]
            },
            {
                text: 'Reference',
                children: [
                    "samples-and-modules",
                    "for-unity-developers",
                    "component-reference",
                ]
            },
            {
                text: 'Case studies',
                children: [
                    {
                        text: 'Castle Builder 🏰',
                        link: 'showcase-castle',
                    },
                    {
                        text: 'Product Configurator 🚲',
                        link: 'showcase-bike',
                    }
                ]
            },
            {
                text: 'Learn More',
                children: [
                    "vision",
                    "features-overview",
                    "technical-overview",
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
                        text: 'Send email',
                        link: 'mailto:hi@needle.tools'
                    },
                    {
                        text: 'Newsletter',
                        link: ""
                    },
                    {
                        text: 'Beta Feedback',
                        link: "https://fwd.needle.tools/needle-engine/feedback"
                    },
                ]
            },
        ],
    }),
    plugins: [
        // searchPlugin({

        // }),
        // mermaidPlugin,
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, './components'),
        }),
        // videoplayer
    ],

})