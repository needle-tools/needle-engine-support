# Customization

## Loading style

The needle-engine loading appearance can use a light or dark skin.  
To change the appearance use the `loading-style` attribute on the `<needle-engine>` web component.  
Options are `light` and `dark` (default):

``<needle-engine loading-style="light"></needle-engine>``

## Custom Loading*  
**Requires Pro License*  

To change the loading appearance the following attributes can be used:

- `loading-background-color`
- `loading-text-color`
- `loading-logo-src`
- `primary-color`
- `secondary-color`

For example:  
``<needle-engine loading-background-color="#444" loading-text-color="#000000" loading-logo-src="yourloog.png" primary-color="#00ff00" secondary-color="#ff0000"></needle-engine>``    

During styling of the loading bar you can append `?debugloadingbarrendering` to your URL to keep the loading overlay visible.