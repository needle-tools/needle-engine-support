---
title: Assets nach glTF exportieren
---



# Assets, Animationen, Prefabs, Materialien, Lightmaps exportieren...
Fügen Sie Ihrer Unity-Szene eine ``ExportInfo``-Komponente hinzu, um ein neues Webprojekt aus einem Template zu generieren, einen Link zu einem vorhandenen Webprojekt herzustellen, in das Sie exportieren möchten, Abhängigkeiten zu anderen Bibliotheken und Paketen einzurichten und Ihr Projekt bereitzustellen.

Standardmäßig wird Ihre Szene beim Speichern exportiert. Diese Einstellung kann geändert werden, indem ``Auto Export`` in der ``ExportInfo``-Komponente deaktiviert wird.

## 📦 glTF-Dateien exportieren
Um Meshes, Materialien, Animationen, Texturen (...) zu exportieren, erstellen Sie ein neues GameObject in Ihrer Hierarchie und fügen Sie ihm eine ``GltfObject``-Komponente hinzu. Dies ist die Wurzel einer neuen glTF-Datei. Sie wird jedes Mal exportiert, wenn Sie eine Änderung an der Szene vornehmen und speichern.

Nur Skripte und Daten auf und innerhalb dieser Wurzelobjekte werden exportiert. Skripte und Daten außerhalb davon werden nicht exportiert.


Fügen Sie Ihrem Wurzelobjekt einen Würfel als Kind hinzu und speichern Sie Ihre Szene. Beachten Sie, dass der Ausgabeordner ``assets/`` (siehe [Projektstruktur](#vite-project-structure)) nun eine neue ``.glb``-Datei mit demselben Namen wie Ihr Wurzel-GameObject enthält.

Sie können die Einstellung ``Smart Export`` (über `Edit/Project Settings/Needle`) aktivieren, um nur zu exportieren, wenn eine Änderung in der Hierarchie dieses Objekts erkannt wird.

:::details Wie man verhindert, dass bestimmte Objekte exportiert werden
Objekte mit dem Tag `EditorOnly` werden beim Export ignoriert, einschließlich ihrer Kindhierarchie.
Beachten Sie, dass dies dem Deaktivieren von Objekten vorzuziehen ist, da deaktivierte Objekte weiterhin exportiert werden, falls sie später wieder eingeschaltet werden.
:::

### Lazy Loading und mehrere Level / Szenen

Wenn Sie Ihre Anwendung in mehrere Level oder Szenen aufteilen möchten, können Sie einfach die Komponente `SceneSwitcher` verwenden. Sie können Ihre Anwendung dann in mehrere Szenen oder Prefabs strukturieren und diese dem SceneSwitcher-Array hinzufügen, um zur Laufzeit geladen und entladen zu werden. Dies ist eine großartige Möglichkeit, um nicht alle Inhalte auf einmal laden zu müssen und die Ladezeiten gering zu halten (zum Beispiel haben wir das bei [needle.tools](https://needle.tools?utm_source=needle_docs&utm_content=export_scenes) gemacht, indem wir jeden Abschnitt unserer Website in eine eigene Szene unterteilt und diese nur bei Bedarf geladen haben).

### Empfohlene Komplexität pro glTF

- Max. 50 MB Exportgröße unkomprimiert (endet normalerweise bei ~10-20 MB komprimiert)
- Max. 500.000 Vertices (weniger, wenn Sie auch mobiles VR anvisieren)
- Max. 4x 2k Lightmaps

Sie können Szenen und Prefabs in mehrere glTF-Dateien aufteilen und diese dann bei Bedarf laden (nur wenn benötigt). Dies hält die Ladeleistung schnell und die Dateigröße klein. Siehe den Abschnitt [AssetReference in den Scripting-Docs](scripting.md#assetreference-and-addressables).

Die hier empfohlene Szenenkomplexität soll eine gute Leistung auf einer Reihe von webfähigen Geräten und Bandbreiten gewährleisten. Es gibt keine technische Einschränkung darüber hinaus, als die Fähigkeiten Ihres Geräts.

### Prefabs
Prefabs können als einzelne glTF-Dateien exportiert und zur Laufzeit instanziiert werden. Um ein Prefab als glTF zu exportieren, referenzieren Sie einfach ein Prefab-Asset (aus dem Projektbrowser und nicht in der Szene) [aus einem Ihrer Skripte](https://fwd.needle.tools/needle-engine/docs/addressables).

Das Exportieren von Prefabs funktioniert auch mit Verschachtelung: Eine Komponente in einem Prefab kann ein anderes Prefab referenzieren, das dann ebenfalls exportiert wird.
Dieser Mechanismus ermöglicht es, Szenen so leichtgewichtig wie möglich zu gestalten und zuerst die wichtigsten Inhalte zu laden und das Laden zusätzlicher Inhalte zu verzögern.

### Scene Assets
Ähnlich wie Prefab Assets können Sie andere Scene Assets referenzieren.
Erstellen Sie dazu in Unity eine Komponente mit einem Feld ``UnityEditor.SceneAsset`` und fügen Sie diese einem Ihrer GameObjects innerhalb eines GltfObject hinzu. Die referenzierte Szene wird nun als separate glTF-Datei exportiert und kann als ``AssetReference`` aus TypeScript geladen/deserialisiert werden.

Sie können weiterhin in einer referenzierten Szene arbeiten und Ihre Haupt-Exporter-Szene/Website aktualisieren. Beim Speichern der Szene oder beim Wechsel des Play-Modus erkennen wir, ob die aktuelle Szene von Ihrem derzeit laufenden Server verwendet wird, und lösen dann einen erneuten Export nur für dieses glb aus. (Diese Prüfung erfolgt anhand des Namens - wenn eine glb in Ihrem Ordner ``<web_project>/assets/`` existiert, wird sie erneut exportiert und die Hauptszene lädt sie neu.)

Ein Beispiel auf [unserer Website](https://needle.tools?utm_source=needle_docs&utm_content=export_sceneassets): Jeder Abschnitt ist als separate Szene eingerichtet und wird beim Export in mehrere glb-Dateien gepackt, die wir bei Bedarf laden:

![2022-08-22-172605_Needle_Website_-_Website_-_Windows,_Mac,_Linux_-_U](https://user-images.githubusercontent.com/5083203/185958983-71913c97-5eec-4cfd-99f5-76798582373e.png)

#### Laden eines Prefabs oder einer Szene aus einem benutzerdefinierten Skript
Wenn Sie ein Prefab aus einem Ihrer Skripte referenzieren und laden möchten, können Sie einen Typ `AssetReference` deklarieren.
Hier ist ein minimales Beispiel:

@[code ts twoslash](@code/component-prefab.ts)

## 🏇 Animationen exportieren
Needle Engine unterstützt eine beträchtliche und leistungsstarke Untermenge von Unitys Animationsfunktionen:

- **Timeline** inkl. Aktivierungs-Tracks, Animations-Tracks, Track-Offsets
- **Animator** inkl. Übergänge zwischen Top-Level-States
  - Blend Trees werden derzeit nicht unterstützt.
  - Sub State Machines werden derzeit nicht unterstützt.
- **AnimationClips** inkl. Loop-Modi
- **Prozedurale Animationen** können per Skripting erstellt werden

Needle Engine ist einer der Ersten, die die neue [glTF-Extension KHR_ANIMATION_POINTER](https://github.com/ux3d/glTF/tree/extensions/KHR_animation_pointer/extensions/2.0/Khronos/KHR_animation_pointer) unterstützen.
Das bedeutet, dass fast alle Eigenschaften, einschließlich Skriptvariablen, animierbar sind.

Eine aktuelle Einschränkung ist, dass Materialien beim Export nicht dupliziert werden – wenn Sie dasselbe Material mit unterschiedlichen Farben animieren möchten, müssen Sie das Material derzeit in zwei Teile aufteilen.

## 🌍 Skybox exportieren
Die Unity Skybox und benutzerdefinierte Reflexionen (falls vorhanden) werden beim Export in eine Textur gebacken und automatisch innerhalb der Extension ``NEEDLE_lightmaps`` exportiert.

Um die Skybox-Auflösung zu ändern, können Sie Ihrer Szene eine Komponente ``SkyboxExportSettings`` hinzufügen.

![image](https://user-images.githubusercontent.com/5083203/196030839-170a9496-9ed9-4ebc-bc1d-2df6c746f8c8.png)


Wenn Sie nicht möchten, dass die Skybox überhaupt in einer glb-Datei exportiert wird, können Sie die Option ``Embed Skybox`` auf Ihrer ``GltfObject``-Komponente deaktivieren.

![image](https://user-images.githubusercontent.com/5083203/196030825-8a05037f-5acc-4795-9128-2bdacedd0d49.png)


## ✨ Materialien exportieren

### Physically Based Materials (PBR)
Standardmäßig werden Materialien beim Export in glTF-Materialien konvertiert. glTF unterstützt ein physikalisch basiertes Materialmodell und verfügt über eine Reihe von Extensions, die helfen, komplexe Materialien darzustellen.

Für volle Kontrolle darüber, was exportiert wird, wird dringend empfohlen, die von UnityGltf bereitgestellten glTF-Materialien zu verwenden:
- PBRGraph
- UnlitGraph

::: tip Im Zweifelsfall den PBRGraph Shader verwenden
Das PBRGraph-Material bietet viele Funktionen, weitaus mehr als Standard oder URP/Lit. Dazu gehören erweiterte Funktionen wie Brechung, Irisieren, Sheen und mehr. Darüber hinaus werden Materialien, die PBRGraph und UnlitGraph verwenden, unverändert exportiert, ohne dass eine Konvertierung erforderlich ist.
:::

Materialien, die out-of-the-box konvertiert werden können:
- BiRP/Standard
- BiRP/Autodesk Interactive
- BiRP/Unlit
- URP/Lit
- URP/Unlit

Andere Materialien werden über eine Eigenschaftsnamen-Heuristik konvertiert. Das bedeutet, dass Sie je nach den Eigenschaftsnamen, die Ihre Materialien und Shader verwenden, entweder die Eigenschaften Ihres benutzerdefinierten Shaders umbenennen müssen, um die Eigenschaftsnamen von URP/Lit oder PBRGraph zu verwenden, oder das Material als [Custom Shader](#custom-shaders) exportieren müssen.

### Custom Shaders
Um benutzerdefinierte Unlit-Shader (z. B. mit ShaderGraph erstellt) zu exportieren, fügen Sie dem Shader, den Sie exportieren möchten, ein ``ExportShader`` Asset Label hinzu. Asset Labels sind am unteren Rand des Inspektors zu sehen.

![2022-08-22-172029_Needle_Website_-_CustomShaders_-_Windows,_Mac,_Lin](https://user-images.githubusercontent.com/5083203/185957781-9fae18c5-09ff-490f-8958-57e138aa0003.png)

#### Einschränkungen
- Wir unterstützen derzeit nur benutzerdefinierte **Unlit**-Shader – die Konvertierung von Lit-Shadern wird nicht offiziell unterstützt.
- Benutzerdefinierte Lit-Shader sind derzeit experimentell. Nicht alle Rendering-Modi werden unterstützt.
- Der Empfang von Schatten auf benutzerdefinierten Shadern wird nicht unterstützt.
- Skinned Meshes mit benutzerdefinierten Shadern werden nicht unterstützt.
- Da es beim Übergang von Unity zu three.js und glTF mehrere Koordinatensystemänderungen gibt, können einige Änderungen erforderlich sein, damit erweiterte Effekte funktionieren. Wir versuchen, Daten beim Export zu konvertieren, erfassen aber möglicherweise nicht alle Fälle, in denen Konvertierungen erforderlich sind.
  - UV-Koordinaten beginnen in Unity unten links; in glTF beginnen sie oben links.
  - X-Achsenwerte sind in glTF im Vergleich zu Unity gespiegelt. Dies ist eine Variante einer Änderung von einem linkshändigen zu einem rechtshändigen Koordinatensystem. Daten, die in Shadern verwendet werden, müssen möglicherweise auf der X-Achse gespiegelt werden, um korrekt angezeigt zu werden.

::: note Nicht Teil der glTF-Spezifikation
Beachten Sie, dass **Custom Shaders** nicht offiziell Teil der glTF-Spezifikation sind. Unsere Implementierung von Custom Shadern verwendet eine Extension namens KHR_techniques_webgl, die den WebGL-Shadercode direkt in der glTF-Datei speichert. Die resultierenden Assets funktionieren in Viewern, die auf Needle Engine basieren, werden aber in anderen Viewern möglicherweise nicht korrekt angezeigt.
:::

## 💡 Lightmaps exportieren
![2022-08-22-171650_Needle_-_Google_Chrome](https://user-images.githubusercontent.com/5083203/185957005-d04c9530-07eb-40f5-b305-9822d13b79ab.png)


Um Lightmaps zu exportieren, [generieren Sie einfach Lightmaps](https://docs.unity3d.com/Manual/Lightmapping.html) in Unity. Lightmaps werden automatisch exportiert.

Beim Arbeiten an mehreren Szenen deaktivieren Sie "Auto Generate" und backen Sie Lightmaps explizit. Andernfalls verwirft Unity temporäre Lightmaps beim Szenenwechsel.

### Empfohlene Lightmap-Einstellungen
- Lightmap Encoding: Normal Quality (anpassen unter Project Settings > Player)
- Progressive GPU (schneller und meist genau genug für kleine Szenen)
- Non-Directional Lightmaps
- Max Lightmap Size 2k (Sie können höher gehen, aber rechnen Sie mit großen Dateien)
- Max 4x 2k Lightmaps pro Szene (Sie können höher gehen, aber rechnen Sie mit großen Dateien)
- Compress Lightmaps AUS (erhöht die Qualität; wird sonst beim Export erneut komprimiert)

![2022-08-22-171356_Needle_Website_-_Lightmaps_-_Windows,_Mac,_Linux_-](https://user-images.githubusercontent.com/5083203/185956392-f4031f45-ad13-4e6d-a14c-c8ec5c1fcfd4.png)

### Mischen von Baked und Non-Baked Objekten

Es gibt keine 100%ige Übereinstimmung zwischen der Art und Weise, wie Unity Lichter und Umgebung handhabt, und wie three.js dies tut. Zum Beispiel hat Unity völlig separate Codepfade für lichtgemappte und nicht-lichtgemappte Objekte (lichtgemappte Objekte erhalten kein Umgebungslicht, da dies bereits in ihre Maps gebacken ist), und three.js unterscheidet in dieser Weise nicht.

Das bedeutet, um beste Ergebnisse zu erzielen, empfehlen wir derzeit spezifische Einstellungen, wenn Sie gebackene und nicht-gebackene Objekte in einer Szene mischen:
```
Environment Lighting: Skybox
Ambient Intensity: 1
Ambient Color: black
```

**2021.3+**
![20220826-175324-SqBL-Unity_pMXa-needle](https://user-images.githubusercontent.com/2693840/186947184-2446672f-420c-47e8-8f7d-970a7d52bf35.png)

**2020.3+**
![20220826-175514-tnGc-Unity_mycs-needle](https://user-images.githubusercontent.com/2693840/186947203-2d7d96c3-f566-44b4-889c-4103fac505d4.png)

Wenn Sie keine gebackenen Objekte in Ihrer Szene haben, sollten auch die folgenden Einstellungen korrekte Ergebnisse liefern:
```
Environment Lighting: Color
Ambient Color: any
```

Seite automatisch übersetzt mit AI