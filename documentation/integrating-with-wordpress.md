---
title: Integrating with Wordpress
---

# <logo-header logo="/imgs/wordpress-logo.webp" alt="WordPress">Integrating with WordPress</logo-header>


The easiest way to integrate with WordPress is to use an iframe. This way, you can host your Needle Engine project anywhere, and just embed it into your WordPress page.

## Embedding a Needle project as iframe

1. Deploy your project to Needle Cloud

2. Add the following code snippet to your Wordpress page, replacing the `src` URL with the URL of your deployed project.

    ```html
    <!-- Embedding a Needle Engine project as iframe -->
    <iframe src="https://focus-rect-demo-z23hmxbztexgt-z19e07i.needle.run/"
        style="width: 100%; height: 500px; border: none;">
    </iframe>
    ```


:::tip Get Embed code from Needle Cloud

Needle Cloud offers an easy way to get the embed code for your project. Just open your project in Needle Cloud, and click on the "Share" button. There, you can find the embed code snippet ready to copy.

:::



## There are more integration options

See [Embedding a Needle project into an existing website](./embedding.md#integrations) for more options and details.