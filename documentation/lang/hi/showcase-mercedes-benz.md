---
lang: en-US
title: मर्सिडीस-बेंज़ शोकेस
editLink: false
---

## परिचय

नमस्ते, मेरा नाम Kryštof है और मैंने Needle के बारे में एक research project किया है। [हमारी company](https://www.ishowroom.cz/home/) में, हम यह determine करना चाहते थे कि Needle हमारे workflow में कैसे मदद कर सकता है। हमारे पास एक local client है जो luxury cars के reselling पर ध्यान केंद्रित करता है। हमने already एक mobile app और VR experience using Unity deliver किया है। हमारे पास engine में around 30 unique cars ready हैं। हम client की website को visually pleasing digital clones with more configuration options के साथ expand करने की plan कर रहे हैं। Needle एक perfect 1:1 conversion between Unity और web visuals achieve कर सकता है। यह हमारे workflow के लिए एक massive benefit होगा। So that's what sparked our research।


<sample src="https://engine.needle.tools/demos/mercedes-benz-demo/" />


## संदर्भ

मुझे javascript, typescript या three.js का very well experience नहीं है, so my point of view is as a semi-experienced Unity developer trying out the simplest way how to create a web experience। For those who would suggest Unity WebGL, that sadly doesn't work and isn't flexible on mobile browsers। Needle is 💚


## लाइटिंग

हमारा lighting model Unity में reflection probes पर based है। हमें किसी भी directional या point lights की need नहीं है, only ambient lighting की need है।


हम यह skybox use कर रहे हैं:

 ![Skybox](/showcase-mercedes/1_skybox.png)

Which looks like this on the paint job:

![Paintjob](/showcase-mercedes/2_paintjob_simple.jpg)

Then to add a slight detail, i've added 2 directional lights with an insignificant intensity (0.04) to create specular highlights। So before it looked like this:

![Specular off](/showcase-mercedes/3_SpecularHighlights_off.jpg)

But with the added directional lights it added a better dynamic। The effect could be deepened with higher intensity:

![Specular on](/showcase-mercedes/4_SpecularHighlights_on.jpg)



## बैकग्राउंड

The scene now looks like this:

![No background](/showcase-mercedes/5_NoBackground.jpg)

The black background isn't very pretty। So to differentiate between visual और lighting skyboxes i've added an inverse sphere which wraps the whole map।

![With background](/showcase-mercedes/6_MapBackground.png)

Regarding the gradiant goes from a slight gray to a white color..

This effect could be easily made with just a proper UV mapping and a single pixel high texture which would define the gradiant।

I've made an unlit shader in the shader graph:

![Evironemnt shader](/showcase-mercedes/7_EnvShaderGraph.jpg)

I've noticed a color banding issue, so i've tried to implement dithering। Frankly, it didn't help the artefacts but i bet there's a simple solution to that issue। So the upper part of the shader does sample the gradiant based on the Y axis in object space। And the lower part tries to negate the color banding।

By using shaders it's simpler to use and iterate the gradiant। By using Needle's Shadergraph markdown asset, it's even simpler! 🌵

![Gradiant](/showcase-mercedes/8_Gradiant.png)


## कार की नकली गति

The scene right now is static since nothing moves। We can negate that by adding a fake feeling of motion। Let's start by adding motion to the wheels।

With a simple component called Rotator, we define an axis and speed along it।

![Rotator](/showcase-mercedes/9_Rotator.png)
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";

export enum RotationAxis {
    X, Y, Z
}

export class Rotator extends Behaviour {
    //@type RotationAxis
    @serializable()
    axis : RotationAxis = RotationAxis.X;

    @serializable()
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


The user now sees a car driving in deep nothingness, the color doesn't resemble anything and the experience is dull। We want to ground the model and that's done by adding a grid and then shifting it so it seems the car is moving। This is what we want to achieve:

![गति](/showcase-mercedes/10_WheelsAndGrid.png)

The shader for the grid was comprised of two parts। A simple tiled texture of the grid that's being multipled by a circular gradient to make the edges fade off।

![Grid](/showcase-mercedes/11_GridShader.jpg)


## अतिरिक्त तत्व

This tech demo takes it's goal to showcase the car's capabilities।

Let's start by highlighting the wheels।

![पहिए को उजागर करना](/showcase-mercedes/12_WheelWithText.png)

Adding this shader to a plane will result in a dashed circle which is rotating by a defined speed। Combined with world space UI with a normal Text component this can highlight some interesting capabilities or parameters of the given product।

![पहिए का shader](/showcase-mercedes/13_WheelShader.jpg)

After showcasing the wheels we want to finish with a broad information about the product। In this case, that would be the car's full name and perhaps some available configurations।

![पीछे का UI](/showcase-mercedes/14_RearUI.jpg)



## सारांश

By using the Unity's timeline we can control when the wheel dashes and text will be shown। This is complemented by the camera animation।


## निष्कर्ष

Needle Engine seems to be a very good candidate for us!

There are a few features which we miss।

That would be for example proper support for the Lit Shader Graphs। But nothing stops us to create shaders the three.js way and create simmilar shaders in Unity for our content team to tweak the materials।

Using Needle was a blast! 🌵


पेज का अनुवाद AI द्वारा स्वतः किया गया है।