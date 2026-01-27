---
title: Integrating with Adobe Experience Manager (AEM)
---

# <logo-header logo="/imgs/adobe-experience-manager-logo.webp" alt="Adobe Experience Manager">Integrating with Adobe Experience Manager</logo-header>

Adobe Experience Manager (AEM) is an enterprise-grade content management system. This guide covers multiple approaches for integrating Needle Engine 3D content into AEM, from simple iframe embeds to advanced component-based integrations that content authors can manage.

## Overview: Integration Approaches

Choose the approach that fits your AEM setup and authoring requirements:

| Approach | Best For | Author-Friendly | Technical Complexity |
|----------|----------|-----------------|---------------------|
| [iframe Embed](#approach-1-iframe-embedding) | Quick integration, isolated content | ⭐⭐ | Low |
| [AEM Component](#approach-2-custom-aem-component) | Authorable content, reusability | ⭐⭐⭐⭐ | Medium |
| [Direct Integration](#approach-3-direct-web-component-integration) | Maximum control, custom layouts | ⭐⭐⭐ | Medium-High |
| [Experience Fragment](#approach-4-experience-fragments) | Multi-channel content, reusability | ⭐⭐⭐⭐⭐ | Medium |

---

## Approach 1: iframe Embedding

**Best for:** Quick integration when you have limited access to AEM development resources.

This is the simplest approach and works with any AEM setup, including AEM as a Cloud Service.

### Steps

1. **Deploy your Needle project** to Needle Cloud or your preferred hosting platform
   - [Deploy to Needle Cloud](/docs/cloud/)
   - [Other deployment options](/docs/how-to-guides/deployment/)

2. **Get your project URL**
   ```
   https://your-project.needle.run/
   ```

3. **Add iframe to AEM page** using one of these methods:

   **Option A: Using the Embed Component (AEM Core Components)**

   If your AEM site uses Core Components:
   - Drag the "Embed" component onto your page
   - Select "Embeddable" type
   - Paste your Needle project URL
   - Configure size and other options

   **Option B: Using HTML in Text Component**

   ```html
   <iframe
       src="https://your-project.needle.run/"
       allow="xr; xr-spatial-tracking; fullscreen; accelerometer; gyroscope"
       style="width: 100%; height: 600px; border: none;"
       allowfullscreen>
   </iframe>
   ```

:::tip Get Embed Code from Needle Cloud
Needle Cloud provides ready-to-use embed code. Open your project, click "Share", and copy the iframe snippet.
:::

### iframe Considerations

**Pros:**
- ✅ No AEM development required
- ✅ Works with any AEM version
- ✅ Easy updates (just redeploy Needle project)
- ✅ Content isolation

**Cons:**
- ❌ Limited integration with page content
- ❌ Less flexible sizing options
- ❌ Authors can't edit 3D content properties in AEM

---

## Approach 2: Custom AEM Component

**Best for:** Content authors who need to configure and manage 3D experiences directly in AEM.

Create a custom AEM component that allows authors to add and configure Needle Engine content through AEM's authoring interface.

### Architecture Overview

```
Unity/Blender → Needle Engine → Deploy → AEM Component → Author configures
```

### Implementation Steps

#### 1. Create the AEM Component

Create a new component in your AEM project:

**Component Structure:**
```
/apps/myproject/components/content/needle-engine/
├── .content.xml
├── _cq_dialog.xml
├── needle-engine.html
└── clientlibs/
    ├── .content.xml
    ├── css.txt
    ├── js.txt
    └── js/
        └── needle-loader.js
```

**`.content.xml`** (Component Definition):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0"
          xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="cq:Component"
    jcr:title="Needle Engine 3D"
    jcr:description="Embeds a Needle Engine 3D experience"
    componentGroup="My Project - Content"/>
```

#### 2. Create the Author Dialog

**`_cq_dialog.xml`** (Author Interface):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0"
          xmlns:cq="http://www.day.com/jcr/cq/1.0"
          xmlns:jcr="http://www.jcp.org/jcr/1.0"
          xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="nt:unstructured"
    jcr:title="Needle Engine Configuration"
    sling:resourceType="cq/gui/components/authoring/dialog">
    <content
        jcr:primaryType="nt:unstructured"
        sling:resourceType="granite/ui/components/coral/foundation/container">
        <items jcr:primaryType="nt:unstructured">
            <tabs
                jcr:primaryType="nt:unstructured"
                sling:resourceType="granite/ui/components/coral/foundation/tabs">
                <items jcr:primaryType="nt:unstructured">
                    <basic
                        jcr:primaryType="nt:unstructured"
                        jcr:title="Basic Settings"
                        sling:resourceType="granite/ui/components/coral/foundation/container">
                        <items jcr:primaryType="nt:unstructured">
                            <projectUrl
                                jcr:primaryType="nt:unstructured"
                                sling:resourceType="granite/ui/components/coral/foundation/form/textfield"
                                fieldLabel="Project URL"
                                fieldDescription="URL to your deployed Needle Engine project"
                                name="./projectUrl"
                                required="{Boolean}true"/>
                            <integrationMode
                                jcr:primaryType="nt:unstructured"
                                sling:resourceType="granite/ui/components/coral/foundation/form/select"
                                fieldLabel="Integration Mode"
                                name="./integrationMode">
                                <items jcr:primaryType="nt:unstructured">
                                    <iframe
                                        jcr:primaryType="nt:unstructured"
                                        text="iframe (Isolated)"
                                        value="iframe"
                                        selected="{Boolean}true"/>
                                    <webcomponent
                                        jcr:primaryType="nt:unstructured"
                                        text="Direct (Integrated)"
                                        value="webcomponent"/>
                                </items>
                            </integrationMode>
                            <height
                                jcr:primaryType="nt:unstructured"
                                sling:resourceType="granite/ui/components/coral/foundation/form/textfield"
                                fieldLabel="Height"
                                fieldDescription="Height in pixels (e.g., 600)"
                                name="./height"
                                value="600"/>
                            <enableAR
                                jcr:primaryType="nt:unstructured"
                                sling:resourceType="granite/ui/components/coral/foundation/form/checkbox"
                                fieldDescription="Enable AR/VR features"
                                name="./enableAR"
                                text="Enable AR/VR"
                                value="true"/>
                            <autoplay
                                jcr:primaryType="nt:unstructured"
                                sling:resourceType="granite/ui/components/coral/foundation/form/checkbox"
                                fieldDescription="Start animations automatically"
                                name="./autoplay"
                                text="Autoplay"
                                value="true"
                                checked="{Boolean}true"/>
                        </items>
                    </basic>
                    <advanced
                        jcr:primaryType="nt:unstructured"
                        jcr:title="Advanced"
                        sling:resourceType="granite/ui/components/coral/foundation/container">
                        <items jcr:primaryType="nt:unstructured">
                            <backgroundColor
                                jcr:primaryType="nt:unstructured"
                                sling:resourceType="granite/ui/components/coral/foundation/form/textfield"
                                fieldLabel="Background Color"
                                fieldDescription="Hex color or 'transparent' (e.g., #ffffff)"
                                name="./backgroundColor"
                                value="transparent"/>
                            <loadingStyle
                                jcr:primaryType="nt:unstructured"
                                sling:resourceType="granite/ui/components/coral/foundation/form/select"
                                fieldLabel="Loading Style"
                                name="./loadingStyle">
                                <items jcr:primaryType="nt:unstructured">
                                    <default
                                        jcr:primaryType="nt:unstructured"
                                        text="Default"
                                        value="default"
                                        selected="{Boolean}true"/>
                                    <light
                                        jcr:primaryType="nt:unstructured"
                                        text="Light"
                                        value="light"/>
                                    <dark
                                        jcr:primaryType="nt:unstructured"
                                        text="Dark"
                                        value="dark"/>
                                </items>
                            </integrationMode>
                        </items>
                    </advanced>
                </items>
            </tabs>
        </items>
    </content>
</jcr:root>
```

#### 3. Create the HTL Template

**`needle-engine.html`** (Component Rendering):
```html
<sly data-sly-use.clientlib="/libs/granite/sightly/templates/clientlib.html">
    <sly data-sly-call="${clientlib.js @ categories='myproject.needle-engine'}"/>
</sly>

<div class="needle-engine-wrapper"
     data-project-url="${properties.projectUrl}"
     data-integration-mode="${properties.integrationMode || 'iframe'}"
     data-height="${properties.height || '600'}"
     data-enable-ar="${properties.enableAR}"
     data-autoplay="${properties.autoplay}"
     data-background-color="${properties.backgroundColor}"
     data-loading-style="${properties.loadingStyle}">

    <sly data-sly-test="${properties.integrationMode == 'webcomponent'}">
        <!-- Direct Web Component Integration -->
        <script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"></script>
        <needle-engine
            src="${properties.projectUrl}"
            background-color="${properties.backgroundColor || 'transparent'}"
            loading-style="${properties.loadingStyle || 'default'}"
            style="width: 100%; height: ${properties.height}px;">
        </needle-engine>
    </sly>

    <sly data-sly-test="${properties.integrationMode != 'webcomponent'}">
        <!-- iframe Integration -->
        <iframe
            src="${properties.projectUrl}"
            allow="xr; xr-spatial-tracking; fullscreen; accelerometer; gyroscope; camera; microphone"
            style="width: 100%; height: ${properties.height}px; border: none;"
            allowfullscreen>
        </iframe>
    </sly>
</div>

<sly data-sly-test="${wcmmode.edit}">
    <div class="needle-engine-placeholder" style="background: #f5f5f5; padding: 20px; text-align: center; border: 2px dashed #ccc;">
        <p><strong>Needle Engine 3D Experience</strong></p>
        <p style="font-size: 0.9em; color: #666;">
            <sly data-sly-test="${properties.projectUrl}">
                URL: ${properties.projectUrl}
            </sly>
            <sly data-sly-test="${!properties.projectUrl}">
                Configure this component to add a 3D experience
            </sly>
        </p>
    </div>
</sly>
```

#### 4. Add Client Library (Optional for Enhanced Features)

**`clientlibs/.content.xml`**:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0"
          xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="cq:ClientLibraryFolder"
    categories="[myproject.needle-engine]"
    embed="[core.wcm.components.commons.site.link]"/>
```

**`clientlibs/js/needle-loader.js`** (Optional enhancements):
```javascript
(function() {
    'use strict';

    // Add responsive behavior or custom initialization
    document.addEventListener('DOMContentLoaded', function() {
        const wrappers = document.querySelectorAll('.needle-engine-wrapper');

        wrappers.forEach(function(wrapper) {
            // Add responsive height adjustments
            const iframe = wrapper.querySelector('iframe');
            const webComponent = wrapper.querySelector('needle-engine');

            if (iframe || webComponent) {
                // Custom initialization logic here
                console.log('Needle Engine component initialized');
            }
        });
    });
})();
```

#### 5. Deploy and Use

1. **Deploy the component** to your AEM instance
2. **Add component to page template** policy (if using editable templates)
3. **Authors can now:**
   - Drag the "Needle Engine 3D" component onto pages
   - Configure project URL and options through the dialog
   - Preview in edit mode
   - Publish with the page

:::tip Content Workflow
Recommended workflow: 3D artists update content in Unity/Blender → Export via Needle → Deploy to Needle Cloud → AEM authors update URL in component → Publish
:::

---

## Approach 3: Direct Web Component Integration

**Best for:** Custom AEM templates where you want full control over layout and integration with existing page JavaScript.

This approach embeds Needle Engine directly into AEM templates without using iframes.

### Steps

1. **Add Needle Engine to your AEM clientlib**

   **`/apps/myproject/clientlibs/clientlib-site/js.txt`**:
   ```
   #base=js
   needle-engine.js
   ```

   **`/apps/myproject/clientlibs/clientlib-site/js/needle-engine.js`**:
   ```javascript
   // Load Needle Engine from CDN
   const script = document.createElement('script');
   script.type = 'module';
   script.src = 'https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js';
   document.head.appendChild(script);
   ```

2. **Add to your page template** (HTL):

   ```html
   <div class="container">
       <div class="row">
           <div class="col-md-6">
               <!-- Your AEM content -->
               <h1>${properties.title}</h1>
               <p>${properties.description}</p>
           </div>
           <div class="col-md-6">
               <!-- Needle Engine content -->
               <needle-engine
                   src="https://your-project.needle.run/assets/scene.glb"
                   background-color="transparent"
                   style="width: 100%; height: 500px;">
               </needle-engine>
           </div>
       </div>
   </div>
   ```

3. **For dynamic content**, use Sling Models:

   **Java Sling Model**:
   ```java
   @Model(adaptables = Resource.class)
   public class NeedleEngineModel {

       @ValueMapValue
       private String projectUrl;

       @ValueMapValue
       private String backgroundColor;

       @ValueMapValue
       private Integer height;

       public String getProjectUrl() {
           return projectUrl;
       }

       public String getBackgroundColor() {
           return backgroundColor != null ? backgroundColor : "transparent";
       }

       public Integer getHeight() {
           return height != null ? height : 600;
       }
   }
   ```

   **HTL Template**:
   ```html
   <sly data-sly-use.model="com.myproject.models.NeedleEngineModel">
       <needle-engine
           src="${model.projectUrl}"
           background-color="${model.backgroundColor}"
           style="width: 100%; height: ${model.height}px;">
       </needle-engine>
   </sly>
   ```

---

## Approach 4: Experience Fragments

**Best for:** Reusable 3D content across multiple pages or channels (email, mobile app, etc.).

Experience Fragments let you create reusable Needle Engine content that can be shared across pages and exported to other channels.

### Steps

1. **Create an Experience Fragment template** with Needle Engine component

2. **Content authors can:**
   - Create an Experience Fragment with 3D content
   - Configure the Needle Engine component once
   - Reuse across multiple pages
   - Export to Adobe Target for personalization
   - Use in email campaigns or mobile apps

3. **Reference the fragment** on pages:
   ```html
   <sly data-sly-resource="${'/content/experience-fragments/myproject/needle-3d-hero' @ resourceType='cq/experience-fragments/components/experiencefragment'}"></sly>
   ```

:::tip Multi-Channel Content
Experience Fragments are especially powerful when you need the same 3D content across web, mobile apps, and email campaigns. Configure once, use everywhere.
:::

---

## Advanced Integration: Communication Between AEM and Needle

For advanced use cases where AEM content needs to interact with Needle Engine (e.g., clicking an AEM button triggers an animation in the 3D scene).

### Example: Triggering 3D Animations from AEM

**AEM Component JavaScript**:
```javascript
// In your AEM component's clientlib
document.querySelector('.my-aem-button').addEventListener('click', function() {
    // Get reference to Needle Engine
    const needleEngine = document.querySelector('needle-engine');

    if (needleEngine && needleEngine.context) {
        // Dispatch custom event that Needle scripts can listen to
        const event = new CustomEvent('aem-trigger', {
            detail: { action: 'playAnimation', animationName: 'Rotate' }
        });
        needleEngine.dispatchEvent(event);
    }
});
```

**Needle Engine Component (TypeScript)**:
```typescript
import { Behaviour } from "@needle-tools/engine";

export class AEMIntegration extends Behaviour {

    start() {
        // Listen for events from AEM
        this.context.domElement.addEventListener('aem-trigger', (evt: CustomEvent) => {
            const { action, animationName } = evt.detail;

            if (action === 'playAnimation') {
                this.playAnimation(animationName);
            }
        });
    }

    private playAnimation(name: string) {
        // Your animation logic here
        console.log('Playing animation:', name);
    }
}
```

---

## Asset Management Considerations

### Where to Host Needle Engine Projects

| Option | Best For | Pros | Cons |
|--------|----------|------|------|
| **Needle Cloud** | Quick iteration, dev/staging | Fast deployment, preview sharing | May want custom domain for production |
| **AEM DAM** | Enterprise compliance, single platform | Integrated with AEM, compliance | Larger asset sizes, may need CDN |
| **Separate CDN** | Performance-critical apps | Fast global delivery, cache control | Additional infrastructure |
| **AEM Publish** | Simple setups | No extra infrastructure | Not optimized for 3D assets |

### Recommended Setup

1. **Development**: Host on Needle Cloud for rapid iteration
2. **Staging**: Host on AEM staging environment or dedicated CDN
3. **Production**: Host on CDN (CloudFront, Akamai, etc.) with AEM URLs stored in component properties

---

## Content Author Workflow

A typical workflow for content authors:

1. **Receive 3D content** from design/development team
   - Deployed to Needle Cloud or CDN
   - Provided with URL

2. **Add to AEM page**
   - Drag Needle Engine component onto page
   - Configure URL and options in dialog
   - Preview in edit mode

3. **Adjust properties** as needed
   - Height, background color, AR features
   - Integration mode (iframe vs direct)

4. **Publish** the page

:::tip For Content Authors
The Needle Engine component works like any other AEM component. Just paste the URL of your 3D experience and configure the display options. No coding required!
:::

---

## Performance Best Practices

1. **Use CDN for assets**
   - Host `.glb` files and textures on a CDN
   - Leverage AEM Dispatcher caching for static resources

2. **Lazy loading**
   - Load Needle Engine only when the component is visible
   - Use Intersection Observer API

3. **Optimize 3D content**
   - Keep `.glb` files under 10MB when possible
   - Use texture compression
   - [See optimization guide](/docs/how-to-guides/optimization/)

4. **AEM Dispatcher configuration**
   ```apache
   # Allow caching of Needle Engine assets
   /cache {
       /rules {
           /0001 {
               /glob "*.glb"
               /type "allow"
           }
           /0002 {
               /glob "*.bin"
               /type "allow"
           }
       }
   }
   ```

---

## Security Considerations

1. **Content Security Policy (CSP)**

   Add Needle Engine domains to your AEM CSP:
   ```
   Content-Security-Policy:
       script-src 'self' https://cdn.jsdelivr.net;
       connect-src 'self' https://needle.run https://*.needle.run;
       worker-src 'self' blob:;
   ```

2. **Permissions for XR Features**

   Ensure your AEM pages allow necessary permissions:
   ```html
   <meta http-equiv="Permissions-Policy" content="
       xr-spatial-tracking=*,
       accelerometer=*,
       gyroscope=*,
       camera=*
   ">
   ```

3. **Asset Access Control**
   - Use AEM's built-in authentication if hosting on AEM
   - Consider signed URLs for sensitive 3D content

---

## Troubleshooting

### Component not appearing in edit mode

**Check:**
- Component is added to page template policy
- Component group is correct
- Author has necessary permissions

### 3D content not loading

**Check:**
- Project URL is accessible (open in browser)
- CORS headers are set correctly on hosting server
- CSP allows loading from external domains
- Browser console for errors

### Performance issues

**Check:**
- File sizes of `.glb` files
- Number of polygons in 3D models
- Texture resolutions
- [Run optimization guide](/docs/how-to-guides/optimization/)

---

## Example: Complete Integration

Here's a complete example combining multiple approaches:

```
Your AEM Site
├── Page Template
│   ├── Header (standard AEM)
│   ├── Hero with Needle 3D (Custom Component)
│   ├── Feature Grid (standard AEM)
│   └── Product Showcase (Experience Fragment with Needle)
│
└── Content Structure
    ├── /content/mysite/en/products
    │   ├── product-a (uses inline Needle component)
    │   └── product-b (uses shared Experience Fragment)
    │
    └── /content/experience-fragments/mysite
        └── product-3d-viewer (reusable across site)
```

---

## Next Steps

**Learn More:**
- [Embedding Guide](/docs/how-to-guides/deployment/embedding) – Additional embedding techniques
- [Web Component Attributes](/docs/reference/needle-engine-attributes) – Configure Needle Engine
- [Needle Cloud](/docs/cloud/) – Quick deployment platform

**Get Help:**
- [Forum](https://forum.needle.tools) – Ask questions about AEM integration
- [Discord](https://discord.needle.tools) – Get real-time help
- [Examples](https://needle.tools/samples) – See Needle Engine in action

:::tip Need Help?
Integrating with enterprise CMS platforms can be complex. Reach out on our [forum](https://forum.needle.tools) or [Discord](https://discord.needle.tools) for specific AEM integration questions.
:::
