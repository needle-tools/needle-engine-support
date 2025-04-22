---
next: features-overview
---

# Unsere Vision 🔮

## Die Zukunft des 3D-Webs

Wir glauben, dass die Nutzung von 3D im Web in den nächsten Jahren erheblich zunehmen wird. Während heute native Apps die Norm sind, werden immer mehr Inhalte als Web-App oder [PWA](https://web.dev/progressive-web-apps/) verfügbar gemacht. Neue VR- und AR-Geräte werden sich [auf das Web ausweiten](https://immersive-web.github.io/webxr-samples/) und ein interessantes Problem schaffen: Responsive bedeutet plötzlich nicht mehr nur "kleiner Bildschirm" oder "großer Bildschirm", sondern man hat es auch mit Räumen, 3D, räumlicher Platzierung und potenziell Brillen und Controllern zu tun!

Hinzu kommt ein Drang zu mehr Interaktivität und Kollaboration, und schon hat man eine interessante Mischung von Herausforderungen.

Bei Needle glauben wir, dass das Ideieren und Erstellen in diesem Bereich einfach sein sollte. Wir haben uns zum Ziel gesetzt, die Dinge zu beschleunigen – indem wir unsere eigene Runtime entwickeln, um diese Ziele zu erreichen. Deshalb integrieren wir die Möglichkeit zur Bereitstellung auf AR und VR direkt in unsere Kernkomponenten und testen kontinuierlich, ob neue Ideen plattformübergreifend funktionieren.

## Warum eine weitere Plattform für 3D im Web? Gibt es nicht schon genug Optionen?

Es gibt zahlreiche Optionen, das stimmt! Wir haben festgestellt, dass aktuelle Systeme<sup>1</sup> grob in zwei Kategorien eingeordnet werden können: einige haben großartige Asset-Behandlung, Tools und künstlerfreundliche Workflows, geben aber eine Art binären Blob aus, und andere sind stärker codebasiert, entwicklerfreundlich und ermöglichen eine hervorragende Integration in moderne Web-Workflows<sup>2</sup>.

Wir wollen diese Welten verbinden und das Beste aus beiden Welten kombinieren: künstlerfreundliche Workflows und moderne Web-Technologien. In Kombination mit modernen Formaten und einem zügigen Workflow glauben wir, dass dies viel mehr Kreativen ermöglichen wird, ihre Inhalte ins Web zu bringen. Wir sahen auch eine Gelegenheit, AR, VR und Kollaboration von Anfang an richtig zu gestalten.

<sup>1</sup>: _Beispiele sind Unity, PlayCanvas, three.js, react-three-fiber, Babylon, A-Frame, Godot und viele mehr._
<sup>2</sup>: _Es gibt mehr Nuancen dazu, als in einen Einleitungsparagraphen passen! Alle Engines und Frameworks haben ihre Stärken und Schwächen und entwickeln sich ständig weiter._

## Einen Workflow schaffen, keinen Editor

Wir glauben, dass die nächste Welle von 3D-Apps im Web mit besseren _Workflows_ kommen wird: Jeder sollte in der Lage sein, eine 3D-Szene, eine Kunstgalerie, ein Produkt oder einen 3D-Scan im Web zusammenzustellen oder einfache Spiele zu erstellen. Das Erreichen dieses Ziels erfordert mehr als nur die Unterstützung eines bestimmten Systems und den Export ins Web von dort aus.

Unser Ziel ist es, Menschen zu ermöglichen, Daten aus _ihren_ kreativen Tools ins Web zu bringen: sei es Unity, Blender, Photoshop oder etwas anderes. Wir sind uns bewusst, dass dies ein großes Ziel ist – aber anstatt alles auf einmal zu tun, wollen wir iterieren und uns gemeinsam Schritt für Schritt nähern.

## Offene Standards statt proprietärer Container

Im Kern von Needle Engine stehen das [glTF](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html)-Format und seine Fähigkeit, mit benutzerdefinierten Extensions erweitert zu werden. Das Ziel ist: Eine einzelne `.glb`-Datei kann die Daten Ihrer gesamten Anwendung enthalten.

Es ist wichtig zu beachten, dass es kein Ziel ist, eigentlichen Code innerhalb von glTF zu versenden; das Versenden und Ausführen von Code ist die Aufgabe moderner Web-Runtimes und Bundling. Wir können uns durchaus vorstellen, dass abstrakte Repräsentationen von Logik (z. B. Graphen, State Machines usw.) bis zu einem gewissen Grad standardisiert werden können und interoperable Welten ermöglichen, aber wir sind noch nicht so weit.

[Mehr über unsere Verwendung von glTF und Erweiterungen erfahren](./technical-overview.md)

# Ziele und Nicht-Ziele

## Ziele
- Iteration sollte schnell und die Bereitstellung sollte zügig sein.
- Die Arbeit an 3D-Webprojekten sollte so einfach sein wie die Arbeit an 2D-Webprojekten.
- Entwickler und Künstler sollten direkt zusammenarbeiten können.
- Responsive Web geht über Bildschirme hinaus – AR und VR sollten eingebaut sein, keine nachträglichen Gedanken.
- Wir wollen zu Open-Source-Projekten beitragen.
- Offene Diskussion über 3D- und Web-Standards.
- Möglichkeit, Ihre Daten in offenen Formaten mitzubringen und mitzunehmen.
- Möglichkeit, das von Ihnen verwendete Web-Framework zu wählen, keine Bindung an bestimmte Frameworks und Anbieter.
- Gängige Anwendungsfälle funktionieren ohne oder mit begrenzter Programmiererfahrung.

## Nicht-Ziele
- Es ist kein Ziel, eine 100%ige Abdeckung aller Kombinationen von Editor-Versionen, Feature Sets, Render Pipelines zu haben.
- Es ist kein Ziel, eine vollständige No-Code-Umgebung bereitzustellen.
- Es ist kein Ziel, den Feature Set, die Fähigkeiten oder die Runtime Performance anderer Engines zu erreichen.

# Beziehung zu anderen Engines und Frameworks

## Needle Engine und Unity WebGL

Aus langjähriger Arbeit mit Unity haben wir festgestellt, dass die WebGL-Ausgabe etwas hinterherhinkt, obwohl die Engine und der Editor in großem Tempo Fortschritte machen. Die Integration von Unity-Playern in webbasierte Systeme ist eher schwierig, das "Sprechen" mit der umgebenden Website erfordert eine Reihe von Workarounds, und vor allem sind die Iterationszeiten sehr langsam, da Unity den gesamten Code über IL2CPP in WebAssembly packt. Diese Technologien sind fantastisch und führen zu großartiger Runtime Performance und viel Flexibilität. Aber sie sind so viel langsamer und abgeschotteter im Vergleich zu modernen Web-Entwicklungs-Workflows, dass wir uns entschieden haben, die Dinge selbst in die Hand zu nehmen.

## Needle Engine und three.js

Needle Engine baut auf three.js auf. Das gesamte Rendering läuft darüber, glTF-Dateien werden über die Erweiterungsschnittstellen von three geladen, und unser Component System dreht sich um three's Object3D und Scene Graph. Wir sind bestrebt, einige unserer Änderungen und Verbesserungen upstream einzubringen, Pull Requests zu erstellen und Probleme auf dem Weg zu melden.

Seite automatisch mit KI übersetzt
