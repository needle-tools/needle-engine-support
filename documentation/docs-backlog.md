
# Documentation Backlog
This section contains pieces of information that are important, but need to be sorted into their correct categories.

## Recommended Unity configuration

- Unity 2021.3.1f1+  
- Render Pipeline: Universal  
- Color Space: Linear  
- Non-Directional Lightmaps  
- Lightmap Encoding: Normal Quality  

## Supported Unity configurations

- Unity 2020.3+ | Unity 2021.3+ | Unity 2022.1+  
- Render Pipeline: Universal | Built-In<sup>1</sup>  
- Color Space: Linear  

<sup>1</sup>: no custom shader support

## Recommended Lightmap Settings

- Lightmap Encoding: Normal Quality (adjust in `Project Settings > Player`)
- Progressive GPU  
- Non-Directional Lightmaps  
- Max Lightmap Size 2k  
- Compress Lightmaps OFF (otherwise will be compressed again at export time)  

## Recommended scene complexity

> The scene complexity here is recommended to ensure good performance across a range of web-capable devices and bandwidths.  
There's no technical limitation to this beyond the capabilities of your device.  

- Max. 20 MB export size uncompressed (usually ends up ~5-8 MB compressed)  
- Max. 500k vertices (less if you target mobile VR as well)  
- Max. 4 2k lightmaps  

You can split up scenes into multiple glTF files with some limitations, and then load those on demand (only when needed). This keeps loading performance fast and file size small.

# Goals and Non-Goals

## Goals
- Fast iteration and rapid deployment.
- Same ease of working on 3D web projects as on 2D web projects.
- Responsive web extends beyond screens – AR and VR should be built in, not afterthoughts.
- Contributing back to open-source projects
- Open discussion regarding 3D and web standards
- Ability to bring and take your data in open formats
- Ability to choose what web framework you use, not locked into a particular one
- Common usecases work without or with limited coding experience
- 
## Non-Goals
- It's not a goal to have 100% coverage of all combinations of Editor versions, feature sets, render pipelines.
- It's not a goal to provide a no-code environment.
