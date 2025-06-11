---
lang: de-DE
title: Mercedes-Benz Showcase
editLink: false
---

## Über

Hallo, mein Name ist Kryštof und ich habe ein Forschungsprojekt über Needle durchgeführt. Bei [unserem Unternehmen](https://www.ishowroom.cz/home/) wollten wir herausfinden, wie Needle uns in unserem Workflow helfen kann. Wir haben einen lokalen Kunden, der sich auf den Weiterverkauf von Luxusautos spezialisiert. Wir haben bereits eine mobile App und ein VR-Erlebnis mit Unity geliefert. Wir haben etwa 30 einzigartige Autos in der Engine fertig. Wir planen, die Website des Kunden mit optisch ansprechenden digitalen Klonen mit mehr Konfigurationsoptionen zu erweitern. Needle könnte eine perfekte 1:1-Konvertierung zwischen Unity- und Web-Visuals erreichen. Das wäre ein enormer Vorteil für unseren Workflow. Das hat unsere Forschung ausgelöst.


<sample src="https://engine.needle.tools/demos/mercedes-benz-demo/" />


## Kontext

Ich habe nicht sehr viel Erfahrung mit javascript, typescript oder three.js, daher ist meine Perspektive die eines halb erfahrenen Unity-Entwicklers, der den einfachsten Weg zur Erstellung eines Web-Erlebnisses ausprobiert. Für diejenigen, die Unity WebGL vorschlagen würden: Das funktioniert leider nicht und ist auf mobilen Browsern nicht flexibel. Needle ist 💚


## Beleuchtung

Unser Beleuchtungsmodell basiert auf Reflection Probes in Unity. Wir benötigen keine Directional oder Point Lights, nur Ambient Lighting.


Wir verwenden diese Skybox:

 ![Skybox](/showcase-mercedes/1_skybox.png)

Was auf der Lackierung so aussieht:

![Lackierung](/showcase-mercedes/2_paintjob_simple.jpg)

Um dann ein leichtes Detail hinzuzufügen, habe ich 2 Directional Lights mit einer unwesentlichen Intensität (0.04) hinzugefügt, um Specular Highlights zu erzeugen. Zuvor sah es so aus:

![Specular ausgeschaltet](/showcase-mercedes/3_SpecularHighlights_off.jpg)

Aber mit den hinzugefügten Directional Lights wurde eine bessere Dynamik hinzugefügt. Der Effekt könnte mit höherer Intensität vertieft werden:

![Specular eingeschaltet](/showcase-mercedes/4_SpecularHighlights_on.jpg)



## Hintergrund

Die Szene sieht jetzt so aus:

![Kein Hintergrund](/showcase-mercedes/5_NoBackground.jpg)

Der schwarze Hintergrund ist nicht sehr schön. Um zwischen visuellen und beleuchteten Skyboxes zu unterscheiden, habe ich eine inverse Kugel hinzugefügt, die die gesamte Karte umschließt.

![Mit Hintergrund](/showcase-mercedes/6_MapBackground.png)

Der Gradient verläuft von einem leichten Grau zu einem Weißton..

Dieser Effekt könnte leicht mit einer einfachen UV mapping und einer ein Pixel hohen Textur erzielt werden, die den Gradienten definieren würde.

Ich habe einen unlit shader im Shader Graph erstellt:

![Umgebungs-Shader](/showcase-mercedes/7_EnvShaderGraph.jpg)

Ich habe ein Farbbanding-Problem festgestellt, also habe ich versucht, Dithering zu implementieren. Ehrlich gesagt, hat es die Artefakte nicht behoben, aber ich wette, es gibt eine einfache Lösung für dieses Problem. Der obere Teil des Shaders samplet den Gradienten basierend auf der Y-Achse im object space. Und der untere Teil versucht, das Farbbanding zu negieren.

Durch die Verwendung von Shadern ist die Verwendung und Iteration des Gradienten einfacher. Durch die Verwendung von Needles Shadergraph markdown Asset ist es noch einfacher! 🌵

![Gradient](/showcase-mercedes/8_Gradiant.png)


## Fake-Bewegung des Autos

Die Szene ist momentan statisch, da sich nichts bewegt. Wir können das negieren, indem wir ein falsches Gefühl von Bewegung hinzufügen. Beginnen wir damit, Bewegung zu den Rädern hinzuzufügen.

Mit einer einfachen Komponente namens Rotator definieren wir eine Achse und Geschwindigkeit entlang dieser.

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


Der Benutzer sieht jetzt ein Auto, das in der tiefsten Leere fährt, die Farbe ähnelt nichts und das Erlebnis ist langweilig. Wir wollen das Modell erden, und das geschieht, indem wir ein Raster hinzufügen und es dann verschieben, so dass es scheint, als ob sich das Auto bewegt. Das wollen wir erreichen:

![Bewegung](/showcase-mercedes/10_WheelsAndGrid.png)

Der Shader für das Raster bestand aus zwei Teilen. Eine einfache gekachelte Textur des Rasters, die mit einem kreisförmigen Gradienten multipliziert wird, um die Kanten ausblenden zu lassen.

![Raster](/showcase-mercedes/11_GridShader.jpg)


## Zusätzliche Elemente

Diese Tech-Demo hat das Ziel, die Fähigkeiten des Autos zu präsentieren.

Beginnen wir damit, die Räder hervorzuheben.

![Rad-Highlight](/showcase-mercedes/12_WheelWithText.png)

Das Hinzufügen dieses Shaders zu einer Ebene führt zu einem gestrichelten Kreis, der sich mit einer definierten Geschwindigkeit dreht. In Kombination mit World Space UI mit einer normalen Text-Komponente kann dies einige interessante Fähigkeiten oder Parameter des gegebenen Produkts hervorheben.

![Rad-Shader](/showcase-mercedes/13_WheelShader.jpg)

Nachdem wir die Räder gezeigt haben, wollen wir mit einer umfassenden Information über das Produkt abschließen. In diesem Fall wäre das der vollständige Name des Autos und vielleicht einige verfügbare Konfigurationen.

![UI hinten](/showcase-mercedes/14_RearUI.jpg)



## Zusammenfassung

Durch die Verwendung von Unitys Timeline können wir steuern, wann die Radstriche und der Text angezeigt werden. Dies wird durch die Kameraanimation ergänzt.


## Fazit

Needle Engine scheint ein sehr guter Kandidat für uns zu sein!

Es gibt ein paar Features, die uns fehlen.

Das wäre zum Beispiel die richtige Unterstützung für die Lit Shader Graphs. Aber nichts hindert uns daran, Shader auf three.js-Basis zu erstellen und ähnliche Shader in Unity zu erstellen, damit unser Content-Team die Materialien anpassen kann.

Die Verwendung von Needle hat Spaß gemacht! 🌵


Seite automatisch mit KI übersetzt