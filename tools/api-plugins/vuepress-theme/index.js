import { Application, DefaultTheme, JSX, PageEvent, RendererEvent } from "typedoc";

/**
 * Custom TypeDoc theme that mimics VuePress styling
 * @param {import("typedoc").Application} app
 */
export function load(app) {
    console.log("Loading VuePress-style theme customization");

    // Inject VuePress-compatible CSS and navigation
    app.renderer.hooks.on("head.end", (context) => {
        return [
            // Load VuePress fonts
            JSX.createElement("link", {
                rel: "preconnect",
                href: "https://fonts.googleapis.com"
            }),
            JSX.createElement("link", {
                rel: "preconnect",
                href: "https://fonts.gstatic.com",
                crossorigin: true
            }),
            JSX.createElement("link", {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
            }),
            // VuePress-style custom CSS
            JSX.createElement("link", {
                rel: "stylesheet",
                href: "./vuepress-overrides.css"
            }),
        ];
    });

    // Add VuePress-style navigation bar
    app.renderer.hooks.on("body.begin", (context) => {
        return JSX.createElement("div", { class: "vp-navbar-wrapper" },
            JSX.createElement("header", { class: "vp-navbar" },
                JSX.createElement("div", { class: "vp-navbar-container" },
                    JSX.createElement("div", { class: "vp-navbar-left" },
                        JSX.createElement("a", {
                            class: "vp-navbar-logo",
                            href: "https://engine.needle.tools/docs/"
                        },
                            JSX.createElement("img", {
                                src: "https://engine.needle.tools/docs/needle-logo-black.svg",
                                alt: "Needle Engine",
                                class: "vp-logo-light"
                            }),
                            JSX.createElement("img", {
                                src: "https://engine.needle.tools/docs/needle-logo-white.svg",
                                alt: "Needle Engine",
                                class: "vp-logo-dark"
                            }),
                        ),
                        JSX.createElement("span", { class: "vp-navbar-title" }, "API Reference")
                    ),
                    JSX.createElement("nav", { class: "vp-navbar-nav" },
                        JSX.createElement("a", { href: "https://engine.needle.tools/docs/getting-started/" }, "Getting Started"),
                        JSX.createElement("a", { href: "https://engine.needle.tools/docs/tutorials/" }, "Tutorials"),
                        JSX.createElement("a", { href: "https://engine.needle.tools/docs/how-to-guides/" }, "How-To Guides"),
                        JSX.createElement("a", { href: "https://engine.needle.tools/docs/explanation/" }, "Explanation"),
                        JSX.createElement("a", { href: "https://engine.needle.tools/docs/reference/" }, "Reference"),
                        JSX.createElement("a", { href: ".", class: "active" }, "API Reference"),
                        JSX.createElement("a", { href: "https://engine.needle.tools/docs/help/" }, "Help"),
                    )
                )
            )
        );
    });

    // Customize page content wrapper
    app.renderer.hooks.on("content.begin", (context) => {
        return JSX.createElement("div", { class: "vp-breadcrumb" },
            JSX.createElement("a", { href: "https://engine.needle.tools/docs/" }, "Docs"),
            JSX.createElement("span", { class: "vp-breadcrumb-separator" }, " / "),
            JSX.createElement("span", null, "API Reference")
        );
    });
}
