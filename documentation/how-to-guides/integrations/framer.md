---
title: Integrating with Framer
---

# <logo-header logo="/imgs/framer-logo.webp" alt="Framer">Integrating with Framer</logo-header>

The easiest way to integrate with [Framer](https://framer.com) is to use the [Needle Engine Framer Plugin](https://www.framer.com/marketplace/plugins/needle-engine/).   


## Add a 3D embed to your Framer project

1. Deploy your project to Needle Cloud (or use a different hosting provider)

2. In Framer click on the menu item `Insert/Plugins/Browse All` to find the Needle Engine Framer plugin

    ![](/imgs/framer-plugin-01.jpg)

3. Search for `Needle Engine` and add the plugin to your project


    ![](/imgs/framer-plugin-02.jpg)

4. In the Needle Engine panel click on `Add Needle Engine` and add the URL of your deployed project.


    ![](/imgs/framer-plugin-03.jpg)

5. Select the added element and in the `3D Model URL` field add the URL of your deployed project.


    ![](/imgs/framer-plugin-04.jpg)


6. You can now adjust the size and position of your Needle Engine project in Framer.


    ![](/imgs/framer-plugin-05.jpg)



## Add a 3D website to your Framer project

**Example: [Framer Example Website](https://enchanted-chart-098958.framer.app/)** embedding the LookAtCursor sample

With Needle Engine 4.11 we add support for directly embedding a Needle Engine project into a framer website. This allows you to use the full power of Needle Engine to create interactive 3D websites and integrate them into your Framer project. 


1. To use simply paste your `needle.run` URL (this is the URL of your Needle Cloud hosted projects) into the `src` field of the Needle Engine Framer plugin.  

2. Set `Use iFrame` to OFF to use the direct embedding option.

3. That's it! Your Needle Engine project is now running on your Framer website.


<br/>

## There are more integration options

See [Embedding a Needle project into an existing website](/docs/how-to-guides/deployment/embedding#platform-specific-integrations) for more options and details.