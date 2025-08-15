---
title: WebXR Image Tracking mit Needle Engine
---

## Was ist WebXR Image Tracking
**WebXR Image Tracking ermöglicht es Browsern, spezifische Bilder in der realen Welt** über die Kamera eines Geräts zu erkennen und zu verfolgen. Es liefert Echtzeit-Positions- und Orientierungsdaten, um virtuelle Inhalte präzise an physischen Markern wie Postern, Verpackungen oder Kunstwerken zu verankern.

Indem die Kamera auf ein erkanntes Bild gerichtet wird, aktualisiert die Image Tracking API kontinuierlich die räumliche Beziehung zwischen den virtuellen und physischen Elementen, um eine korrekte Ausrichtung zu gewährleisten, selbst wenn sich das Gerät oder Bild bewegt.

Image Tracking verwandelt statische Bilder in interaktive AR-Trigger – so können Museumsgemälde überlagerte Informationen anzeigen, Produktverpackungen 3D-Animationen enthüllen oder Visitenkarten schwebende Kontaktdetails zeigen – alles über Webstandards, ohne dass Benutzer dedizierte Apps herunterladen müssen, wodurch AR-Erlebnisse über jeden kompatiblen Webbrowser sofort zugänglich werden.

## Demo

Needle Engine unterstützt **WebXR Image Tracking** ([Live Demo](https://engine.needle.tools/samples/image-tracking?utm_source=docs&utm_content=xr)) auf Android und **QuickLook Image Tracking** auf iOS.

Starten Sie die untenstehende Szene in AR und richten Sie die Kamera Ihres Telefons auf den Bildmarker auf einem Bildschirm oder drucken Sie ihn aus.

:::info WebXR Image Tracking auf Android
**Auf Android** aktivieren Sie bitte "WebXR Incubations" in den Chrome Flags. Sie finden diese, indem Sie [chrome://flags/#webxr-incubations](chrome://flags/#webxr-incubations) in die Adressleiste des Chrome-Browsers Ihres Android-Telefons einfügen.
:::


<img src="https://engine.needle.tools/samples-uploads/image-tracking/assets/needle-marker.png" alt="Bildmarker" width=300 />

<sample src="https://engine.needle.tools/samples-uploads/image-tracking" />


## Erläuterung


:::warning WebXR Image Tracking befindet sich noch in der "Draft"-Phase und ist nicht allgemein verfügbar
Bisher konnten sich die Browserhersteller nicht auf die finale Image Tracking API für WebXR einigen. Solange die Spezifikation in der "Draft"-Phase ist ([Marker Tracking Explainer](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md)),
müssen Sie und die Benutzer Ihrer App die folgenden Schritte ausführen, um WebXR ImageTracking auf Android-Geräten zu aktivieren:
1. Besuchen Sie ``chrome://flags`` in Ihrem Android Chrome-Browser
2. Suchen und aktivieren Sie die Option `WebXR Incubations`
:::

Ohne diese Spezifikation kann man trotzdem den Kamerabildzugriff anfordern und benutzerdefinierte Algorithmen zur Bestimmung der Gerätestellung ausführen. Der Nachteil ist, dass Benutzer zusätzliche Berechtigungen wie den Kamerazugriff akzeptieren müssen und die Verfolgung nicht so genau sein wird wie mit den nativen Funktionen des Geräts.

Hier sind einige Bibliotheken, um Image Tracking basierend auf Kamerazugriff und lokalen Computer-Vision-Algorithmen hinzuzufügen:
- [Experimental AR.js integration with Needle Engine](https://github.com/FireDragonGameStudio/NeedleAndARjs) von FireDragonGameStudio
- [AR.js](https://github.com/AR-js-org/AR.js) (Open Source)
- [Mind AR](https://github.com/hiukim/mind-ar-js) (Open Source)


### Integrationen
Image Tracking kann sowohl in Unity als auch in Blender eingerichtet werden, indem ein WebXRImageTracking-Komponente zu einem Objekt hinzugefügt wird. Fügen Sie dann Ihre Bilder dem `Tracked Images`-Array hinzu.

![unity screenshot](/imgs/webxr-image-tracking-unity-component.jpg)
*Image Tracking Komponente in Unity*

![blender screenshot](/imgs/webxr-image-tracking-blender-component.jpg)
*Image Tracking Komponente in Blender*

## Referenzen

- [WebXR Marker Tracking Explainer](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md)
- [WebXR Device API](https://www.w3.org/TR/webxr/)
- [caniuse: WebXR](https://caniuse.com/webxr)
- [Apple's Preliminary USD Behaviours](https://developer.apple.com/augmented-reality/quick-look/)


## Weiterführende Lektüre
- [Needle Everywhere Actions](./everywhere-actions.md) *Erlebnisse, die überall laufen*
- [XR documentation](./xr.md)

Seite automatisch mit KI übersetzt