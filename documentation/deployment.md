# Deployment ⚒
To deploy your threejs project you can click ``Build Development Dist`` or ``Build Production Dist`` on your ``ExportInfo`` component.   
You can also access these functions from the menu at ``Needle/Tiny/Build Dist``.

### Deploying for development
See notes above on how to access. The main difference to a production build is that it does not perform [``ktx2`` ⇡](https://github.khronos.org/KTX-Specification/) and [``draco`` ⇡](https://google.github.io/draco/) compression. Both can reduce file-size drastically. We generally recommend making builds using the ``production`` option.

### Deploying for production (optimized and compressed)
To make a production build you need to have [toktx ⇡](https://github.com/KhronosGroup/KTX-Software/releases) to be installed (for compressing your files). Please go to the [github releases ⇡](https://github.com/KhronosGroup/KTX-Software/releases) and download and install the latest version of toktx. You may need to restart Unity after installing it. 

NOTE: when building for production using custom extensions make sure to handle those in ``gltf-transform``, see ``needle.tiny.engine/plugins/gltf-packer`` for reference.

## Deploy to glitch 🐟
Add the ``Deployment`` component (next to ``ExportInfo``) and follow the instructions on the component.