import { defineUserConfig, defaultTheme } from 'vuepress'
import { path } from '@vuepress/utils'
// import { searchPlugin } from '@vuepress/plugin-search'
// // import { mermaidPlugin } from "@renovamen/vuepress-plugin-mermaid";
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
// import * as videoplayer from "vuepress-plugin-core-video-player";


export default defineUserConfig({
    base: "/needle-engine-support/",
    lang: 'en-US',
    title: 'Needle Engine Documentation',
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
        navbar: [
            {
                text: 'Needle Engine',
                link: '/',
                children: [
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
                    "getting-started",
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
                text: 'Learn More',
                children: [
                    "vision",
                    "features-overview",
                    "technical-overview",
                ]
            },
        ],
        locales: {
            '/': {
                selectLanguageName: 'English',
            },
            // '/zh/': {
            //   selectLanguageName: '简体中文',
            // },
        },
    }),
    locales: {
        '/': {
            lang: 'en-US',
            title: 'Needle Engine Documentation',
            description: 'Needle Engine is a web-based runtime for 3D apps. It runs on your machine for development, and can be deployed anywhere. It is flexible, extensible, and collaboration and XR come naturally.',
        },
        // '/zh/': {
        //   lang: 'zh-CN',
        //   title: 'VuePress',
        //   description: 'Vue 驱动的静态网站生成器',
        // },
    },
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