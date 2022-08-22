# Samples and Modules 🔭

Projects can be composed of re-usable pieces that we call [**NpmDef**](./project_structure.md#npm-definition-files) (which stands for Npm Defintion File). 

Below you can find links to other repositories that contain Unity packages. These packages can be installed like any Unity package and used in your own projects. They usually contain eihter examples or modules that we use ourselves, but that are not ready to be part of the core Needle Engine.  

> **Note**: The projects and their components linked below can change at any time. If you want to use these in your own projects, it's currently recommended to copy them and adjust as needed. Once they mature, some of the components will most likely move into the Needle Engine core components.  

## [needle-engine-modules ⇡](https://github.com/needle-tools/needle-engine-modules) 
   - **Custom Timeline Tracks**  
     Video Track (sync video playback to a Timeline)
     CssTrack (control css properties from the Timeline)
     
   - **Splines (for Unity 2022.1+)**  
     Export splines to three.js
     SplineWalker for controlling camera motion based on a spline
     Timeline track to control SplineWalker

   - **Google Drive Integration**  
     Sketches around drag-drop integration of Google Drive, file picking, app integration
     
   ## [needle-engine-samples ⇡](https://github.com/needle-tools/needle-engine-modules)  
  Contains various simple scripts to show things such as:  
  
  - **Clock**  
    sample for a custom component that references other objects
    
  - **RenderTexture**  
    sample for translating a Unity RenderTexture into a three.js RenderTexture
    
  - **TextGeometry**  
    sample for integrating existing three.js components such as 3D text into the scene graph
    
  - **Html Mesh**  
    sample for custom rendering and interaction
