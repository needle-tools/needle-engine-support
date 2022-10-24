
# Documentation Backlog
This section contains pieces of information that are important, but need to be sorted into their correct categories.

## Recommended Unity configuration

- Unity 2020.3.8f1+ or 2022.1+
- Render Pipeline: Universal  
- Color Space: Linear  
- Non-Directional Lightmaps  
- Lightmap Encoding: Normal Quality  

## Supported Unity configurations

- Unity 2020.3+ | Unity 2021.3+ | Unity 2022.1+  
- Render Pipeline: Universal | Built-In<sup>1</sup>  
- Color Space: Linear  

<sup>1</sup>: no custom shader support

## Source Control

Generated Projects can either be added to source control or kept dynamic. Adding them to source control unlocks being able to adjust HTML, CSS, etc very flexible.  
To generate dynamic projects, change their path to `../Library/MyScene`. They will be regenerated if needed.

*Please follow the instructions in the Authentication section if this is your first time accessing packages by needle on this machine.*

# Licensing Setup

> **Note**: This section is deprecated. Needle Engine is currently on Open Beta, and there's no need to authenticate against our registry at this point.

## Authentication  

Make sure you have a Needle Engine and Exporter license, otherwise the following steps will fail (you'll not be able to get authenticated package access).  

*Needs to be setup once per machine.*  

1) Clone this repository and open ``starter/Authenticate`` with Unity 2020.3.x
2) Open [https://packages.needle.tools ⇡](https://packages.needle.tools) in your browser and login (top right corner) with your github account. 
3) Return to [packages.needle.tools ⇡](https://packages.needle.tools) and click the ``i`` icon in the top right corner opening the ``Registry Info`` window.
4) Copy the line containing ``_authToken`` (see the video below)  
   <video src="https://user-images.githubusercontent.com/5083203/166433857-a0c9e29f-9413-4e10-a1a1-2029e3d3ab06.mp4" autoplay></video>
6) Focus Unity - a notification window should open that the information has been added successfully from your clipboard.
7) Click save and close Unity. You should now have access rights to the needle package registry.
