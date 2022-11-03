---
lang: en-US
title: Mercedes-Benz Showcase
editLink: false
---

## About

Hello, my name is Kryštof and i did a research project about Needle. At our company, we wanted to determine how Needle can help us in our workflow. We have one local client which focuses on reselling luxury cars. We already delivered a mobile app and VR experience using Unity. We have around 30 unique cars ready in the engine. We plan to expand the client's website with visually pleasing digital clones with more configuration options. Needle could achieve a perfect 1:1 conversion between unity and web visuals. It would be a massive benefit to our workflow. So that's what sparked our research.


<sample src="https://engine.needle.tools/demos/mercedes-benz-demo/" />


## Context

I'm not very well experienced with javascript, typescript or three.js, so my point of view is as a semi-experienced Unity developer trying out the simplest way how to create a web experience. For those who would suggest Unity WebGL, that sadly doesn't work and isn't flexible on mobile browsers. Needle is 💚


## Lighting

Our lighting model is based on reflection probes in unity. We do not need any directional or point lights, only ambient lighting. 

Needle uses the skybox as an source of lighting, it currently doesn't support any other source of "Environment Lighting". So we have to choose a source of reflections and lighting accordingly.


We're using this skybox:

 ![Skybox](/showcase-mercedes/1_skybox.png)

Which looks like this on the paint job:

![Paintjob](/showcase-mercedes/2_paintjob_simple.png)

Then to add a slight detail, i've added 2 directional lights with an insignificant intensity (0.04) to create specular highlights. So before it looked like this:

![Specular off](/showcase-mercedes/3_SpecularHighlights_off.png)

But with the added directional lights it added a better dynamic. The effect could be deepened with higher intensity:

![Specular on](/showcase-mercedes/4_SpecularHighlights_on.png)



## Background

The scene now looks like this:

![No background](/showcase-mercedes/5_NoBackground.jpg)

The black background isn't very pretty. So to differentiate between visual and lighting skyboxes i've added an inverse sphere which wraps the whole map.

![With background](/showcase-mercedes/6_MapBackground.png)

Regarding the gradient goes from a slight gray to a white color..

This effect could be easily made with just a proper UV mapping and a single pixel high texture which would define the gradient.

I've made an unlit shader in the shader graph:

![Evironemnt shader](/showcase-mercedes/7_EnvShaderGraph.jpg)

I've noticed a color banding issue, so i've tried to implement dithering. Frankly, it didn't help the artefacts but i bet there's a simple solution to that issue. So the upper part of the shader does sample the gradient based on the Y axis in object space. And the lower part tries to negate the color banding.

By using shaders it's simpler to use and iterate the gradiant. By using Needle's Shadergraph markdown asset, it's even simpler! 🌵

![Gradiant](/showcase-mercedes/8_Gradiant.png)


## Car fake movement

The scene right now is static since nothing moves. We can negate that by adding a fake feeling of motion. Let's start by adding motion to the wheels.

With a simple component called Rotator, we define an axis and speed along it.

![Rotator](/showcase-mercedes/9_Rotator.png)
```ts
import { Behaviour, serializeable } from "@needle-tools/engine";

export enum RotationAxis {
    X, Y, Z
}

export class Rotator extends Behaviour {
    //@type RotationAxis
    @serializeable()
    axis : RotationAxis = RotationAxis.X;

    @serializeable()
    speed : number = 1;

    update() {
        const angle = this.speed * this.context.time.deltaTime;
        switch(this.axis) {
            case RotationAxis.X:
                this.gameObject.rotateX(angle);
                break;
            case RotationAxis.Y:
                this.gameObject.rotateY(angle);
                break;
            case RotationAxis.Z:
                this.gameObject.rotateZ(angle);
                break;
        }
    }
}
```


The user now sees a car driving in deep nothingness, the color doesn't resemble anything and the experience is dull. We want to ground the model and that's done by adding a grid and then shifting it so it seems the car is moving. This is what we want to achieve:

![Motion](/showcase-mercedes/10_WheelsAndGrid.png)

The shader for the grid was comprised of two parts. A simple tiled texture of the grid that's being multipled by a circular gradient to make the edges fade off.

![Grid](/showcase-mercedes/11_GridShader.jpg)


## Extra elements

This tech demo takes it's goal to showcase the car's capabilities.

Let's start by highlighting the wheels.

![Wheel highlight](/showcase-mercedes/12_WheelWithText.png)

Adding this shader to a plane will result in a dashed circle which is rotating by a defined speed. Combined with world space UI with a normal Text component this can highlight some interesting capabilities or parameters of the given product.

![Wheel shader](/showcase-mercedes/13_WheelShader.jpg)

After showcasing the wheels we want to finish with a broad information about the product. In this case, that would be the car's full name and perhaps some available configurations.

![Rear UI](/showcase-mercedes/14_RearUI.jpg)



## Wrap up

By using the Unity's timeline we can control when the wheel dashes and text will be shown. This is complemented by the camera animation.


## Conclusion

Needle Engine seems to be a very good candidate for us! 

There are a few features which we miss. 

That would be for example proper support for the Lit Shader Graphs. But nothing stops us to create shaders the three.js way and create simmilar shaders in Unity for our content team to tweak the materials.

Using Needle was a blast! 🌵