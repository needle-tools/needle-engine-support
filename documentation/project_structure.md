# Project structure 📚

## Unity project structure
You can organize your assets like in any typical Unity project. If you are not familiar with Unity you may follow [this guide ⇡](https://learn.unity.com/tutorial/project-organization-2019-3#5f68a346edbc2a002004052b) for a first overview. In general Unity assets are organized in two main parts: ``Assets`` and ``Packages``.

- ``Assets`` - this is where project specific/exclusive assets live.
- ``Packages`` - this is where packages installed for this project live. A package can contain any asset type. The main difference is that it can be added to multiple Unity projects. It therefor is a great method to share code or assets. To learn more about packages see [the Unity documentation about packages ⇡](https://docs.unity3d.com/Manual/PackagesList.html).

**Builtin-runtime components** added specifically for our runtime engine can be found in ``Packages/Needle Unity Threejs/Runtime/Components`` in the [Unity Project window ⇡](https://docs.unity3d.com/Manual/ProjectView.html).

## Vite project structure
- ``assets/`` - The asset folder contains exported assets from Unity. E.g. generated ``gltf`` files, audio or video files. It is not recommended to manually add files to ``assets`` as it will get cleared on building the distribution for the project.
- ``include/`` (optional) - If you have custom assets that you need to reference/load add them to the include directory. On build this directory will be copied to the output folder.
- ``src/`` - This is where all the source code goes
    - ``src/generated/`` - The generated javascript code. Do not edit manually.
    - ``src/scripts/`` - Your project specific scripts / components.
    - ``src/styles/`` - Stylesheets
- ``index.scriban`` (optional) - The project template index file. Add an ``index`` component to your Unity scene to automatically generate the ``index.html`` from this file using the [scriban ⇡](https://github.com/scriban/scriban) templating engine.
- ``vite.config`` - The default template uses [vite ⇡](https://vitejs.dev/). Settings for building the distribution and hosting the development server are made here. It is usually not necessary to edit these settings.

**Note**: Our exporter can be used with other project structures as well, vite is just our go to frontend bundling tool because of its speed but feel free to setup your javascript project as you like. It is important to note tho that component names **must not be removed** for ``getComponent`` calls to work. See [scripting documentation](./scripting.md) for more info.