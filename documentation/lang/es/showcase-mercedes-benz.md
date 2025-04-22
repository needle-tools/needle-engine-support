---
lang: en-US
title: Muestra de Mercedes-Benz
editLink: false
---

## Acerca de

Hola, mi nombre es Kryštof e hice un proyecto de investigación sobre Needle. En [nuestra empresa](https://www.ishowroom.cz/home/), queríamos determinar cómo Needle puede ayudarnos en nuestro flujo de trabajo. Tenemos un cliente local que se centra en la reventa de coches de lujo. Ya entregamos una aplicación móvil y una experiencia de RV usando Unity. Tenemos alrededor de 30 coches únicos listos en el motor. Planeamos ampliar el sitio web del cliente con clones digitales visualmente atractivos con más opciones de configuración. Needle podría lograr una conversión perfecta 1:1 entre los visuales de Unity y web. Sería un beneficio enorme para nuestro flujo de trabajo. Así que eso es lo que motivó nuestra investigación.


<sample src="https://engine.needle.tools/demos/mercedes-benz-demo/" />


## Contexto

No tengo mucha experiencia con javascript, typescript o three.js, así que mi punto de vista es el de un desarrollador de Unity semi-experimentado probando la forma más sencilla de crear una experiencia web. Para aquellos que sugieran Unity WebGL, tristemente eso no funciona y no es flexible en navegadores móviles. Needle es 💚


## Iluminación

Nuestro modelo de iluminación se basa en reflection probes en Unity. No necesitamos directional lights ni point lights, solo ambient lighting.


Estamos usando este skybox:

 ![Skybox](/showcase-mercedes/1_skybox.png)

Que se ve así en la pintura:

![Pintura](/showcase-mercedes/2_paintjob_simple.jpg)

Luego, para añadir un ligero detalle, he añadido 2 directional lights con una intensidad insignificante (0.04) para crear specular highlights. Así que antes se veía así:

![Specular desactivado](/showcase-mercedes/3_SpecularHighlights_off.jpg)

Pero con los directional lights añadidos, le dio una mejor dinámica. El efecto podría profundizarse con mayor intensidad:

![Specular activado](/showcase-mercedes/4_SpecularHighlights_on.jpg)



## Fondo

La escena ahora mismo se ve así:

![Sin fondo](/showcase-mercedes/5_NoBackground.jpg)

El fondo negro no es muy bonito. Así que, para diferenciar entre skyboxes visuales y de iluminación, he añadido una inverse sphere que envuelve todo el mapa.

![Con fondo](/showcase-mercedes/6_MapBackground.png)

En cuanto al gradient, va de un ligero gris a un color blanco..

Este efecto podría hacerse fácilmente con un UV mapping adecuado y una textura de un solo píxel de alto que definiría el gradient.

He hecho un unlit shader en el shader graph:

![Shader de entorno](/showcase-mercedes/7_EnvShaderGraph.jpg)

He notado un problema de color banding, así que he intentado implementar dithering. Francamente, no ayudó con los artefactos, pero apuesto a que hay una solución sencilla para ese problema. Así que la parte superior del shader samplea el gradient basándose en el eje Y en object space. Y la parte inferior intenta anular el color banding.

Usando shaders es más sencillo usar e iterar el gradient. ¡Usando el Shadergraph markdown asset de Needle, es aún más sencillo! 🌵

![Gradient](/showcase-mercedes/8_Gradiant.png)


## Movimiento falso del coche

La escena ahora mismo es estática ya que nada se mueve. Podemos anular eso añadiendo una sensación falsa de movimiento. Empecemos añadiendo movimiento a las ruedas.

Con un simple component llamado Rotator, definimos un eje y velocidad a lo largo de él.

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


El usuario ahora ve un coche conduciendo en la profunda nada, el color no se parece a nada y la experiencia es aburrida. Queremos dar una base al modelo y eso se hace añadiendo una grid y luego desplazándola para que parezca que el coche se está moviendo. Esto es lo que queremos conseguir:

![Movimiento](/showcase-mercedes/10_WheelsAndGrid.png)

El shader para la grid se componía de dos partes. Una simple textura tiled de la grid que se multiplica por un gradient circular para que los bordes se desvanezcan.

![Grid](/showcase-mercedes/11_GridShader.jpg)


## Elementos extra

Esta demo técnica tiene como objetivo mostrar las capacidades del coche.

Empecemos destacando las ruedas.

![Resalte de rueda](/showcase-mercedes/12_WheelWithText.png)

Añadir este shader a un plane resultará en un círculo discontinuo que gira a una velocidad definida. Combinado con world space UI con un Text component normal, esto puede resaltar algunas capacidades o parámetros interesantes del producto dado.

![Shader de rueda](/showcase-mercedes/13_WheelShader.jpg)

Después de mostrar las ruedas, queremos terminar con información general sobre el producto. En este caso, sería el nombre completo del coche y quizás algunas configuraciones disponibles.

![UI trasera](/showcase-mercedes/14_RearUI.jpg)



## Resumen

Usando la timeline de Unity, podemos controlar cuándo se mostrarán las líneas discontinuas de la rueda y el texto. Esto se complementa con la animación de la cámara.


## Conclusión

¡Needle Engine parece ser un muy buen candidato para nosotros!

Hay algunas características que echamos de menos.

Eso sería, por ejemplo, un soporte adecuado para los Lit Shader Graphs. Pero nada nos impide crear shaders al estilo three.js y crear shaders similares en Unity para que nuestro equipo de contenido ajuste los materiales.

¡Usar Needle fue genial! 🌵


Página traducida automáticamente usando IA