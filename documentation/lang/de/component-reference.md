---
title: Needle-Kernkomponenten
---

# Needle-Kernkomponenten

Hier ist eine Übersicht über einige der von uns bereitgestellten Komponenten. Viele davon bilden Komponenten und Funktionen in Unity, Blender oder anderen Integrationen ab.

Eine vollständige Liste finden Sie in unserer [API-Dokumentation](https://engine.needle.tools/docs/api/latest).

Sie können jederzeit eigene Komponenten hinzufügen oder Wrapper für Unity-Komponenten erstellen, die wir noch nicht bereitgestellt haben.

Mehr dazu erfahren Sie im Abschnitt [Skripting](./scripting.md) unserer Dokumentation.

## Audio
| Name | Beschreibung |
| ------------- | ------------- |
| `AudioListener` |  |
| `AudioSource` | Zum Abspielen von Audio |

## Animation
| Name | Beschreibung |
| ------------- | ------------- |
| `Animator` mit `AnimatorController` | Export mit Animations-Zustandsmaschine, Bedingungen, Übergängen |
| `Animation` | Grundlegendste Animationskomponente. Nur der erste Clip wird exportiert |
| `PlayableDirector` mit `TimelineAsset` | Exportieren Sie leistungsstarke Sequenzen zur Steuerung von Animation, Audio, Zustand und mehr |

## Rendering
| Name | Beschreibung |
| ------------- | ------------- |
| `Camera` |  |
| `Light` | DirectionalLight, PointLight, Spotlight. Beachten Sie, dass Sie damit auch Licht backen können (z. B. rechteckige Lichtformen) |
| `XRFlag` | Steuert, wann Objekte sichtbar sind. Z.B. Objekt nur in AR aktivieren |
| `DeviceFlag` | Steuert, auf welchem Gerät Objekte sichtbar sind |
| `LODGroup` |  |
| `ParticleSystem` | Experimentell und derzeit nicht vollständig unterstützt |
| `VideoPlayer` | Wiedergabe von Videos von URL oder referenzierter Videodatei (wird beim Export in den Output kopiert). Der VideoPlayer unterstützt auch Streaming von MediaStream-Objekten oder `M3U8` Livestream-URLs |
| `MeshRenderer` | Wird zur Handhabung des Renderings von Objekten verwendet, einschließlich Lightmapping und Instancing |
| `SkinnedMeshRenderer` | *Siehe MeshRenderer* |
| `SpriteRenderer` | Wird zum Rendern von Sprites und Spriteanimationen verwendet |
| `Volume` mit `PostProcessing` Asset | Siehe [Tabelle unten](#postprocessing) |

### Nachbearbeitung

Nachbearbeitungseffekte verwenden im Hintergrund die [pmndrs postprocessing library](https://www.npmjs.com/package/postprocessing). Das bedeutet, Sie können auch einfach eigene Effekte hinzufügen und erhalten einen automatisch optimierten Nachbearbeitungsdurchgang.

- **Nur Unity**: *Beachten Sie, dass Postprocessing-Effekte, die ein Volume in Unity verwenden, nur mit URP unterstützt werden.*

| Effektname | |
| --- | --- |
| Antialiasing | *zusätzliche Unity Komponente* |
| Bloom | *via Volume asset* |
| Chromatic Aberration | *via Volume asset* |
| Color Adjustments / Color Correction | *via Volume asset* |
| Depth Of Field | *via Volume asset* |
| Vignette | *via Volume asset* |
| ToneMappingEffect | *via Volume asset oder separate Komponente* |
| Pixelation | |
| Screenspace Ambient Occlusion N8 | |
| Screenspace Ambient Occlusion | |
| Tilt Shift Effect | |
| SharpeningEffect | |
| *Ihr eigener Effekt* | [Siehe Beispiel auf stackblitz](https://stackblitz.com/edit/needle-engine-custom-postprocessing-effect) |

## Networking
| Name | Beschreibung |
| ------------- | ------------- |
| `SyncedRoom` | Haupt-Networking-Komponente. Platzieren Sie sie in Ihrer Szene, um Networking zu aktivieren |
| `Networking` | Wird zur Einrichtung des Backend-Servers für Networking verwendet. |
| `SyncedTransform` | Automatische Synchronisierung der Objekttransformation |
| `SyncedCamera` | Automatische Synchronisierung der Kameraposition und -ansicht für andere Benutzer im Raum. Sie können definieren, wie die Kamera gerendert wird, indem Sie ein Objekt referenzieren |
| `WebXRSync` | Synchronisiert WebXR-Avatare (AR und VR) |
| `Voip` | Ermöglicht Voice-Chat |
| `Screensharing` | Ermöglicht Screen-Sharing-Funktionen |

## Interaktion
| Name | Beschreibung |
| ------------- | ------------- |
| `EventSystem` | Behandelt das Auslösen von Pointer- und UI-Events auf Objekten in der Szene |
| `ObjectRaycater` | Erforderlich für DragControls und Duplicatable |
| `GraphicsRaycaster` | Gleiches wie ObjectRaycater, aber für UI-Elemente |
| `DragControls` | Ermöglicht das Ziehen von Objekten in der Szene. Erfordert Raycaster in der Elternhierarchie, z.B. ObjectRaycater |
| `Duplicatable` | Kann zugewiesene Objekte durch Ziehen duplizieren. Erfordert DragControls |
| `Interactable` | Grundlegende Komponente zur Kennzeichnung eines Objekts als interaktionsfähig. |
| `OrbitControls` | Zur Kamera hinzufügen, um die Orbit-Steuerungsfunktionalität der Kamera hinzuzufügen |
| `SmoothFollow` | Ermöglicht die sanfte Interpolation zur Transformation eines anderen Objekts |
| `DeleteBox` | Zerstört Objekte mit der Komponente `Deletable`, wenn sie in die Box eintreten |
| `Deletable` | Das GameObject, an das diese Komponente angehängt ist, wird gelöscht, wenn es in eine `DeleteBox` eintritt oder sich mit ihr überschneidet |
| `DropListener` | Hinzufügen, um Datei-Drop-Events für den Upload zu empfangen |
| `SpatialTrigger` | Wird verwendet, um ein Event auszulösen, wenn ein Objekt einen bestimmten Raum oder Bereich betritt. Sie können auch Physik-Events verwenden |
| `SpatialTriggerReceiver` | Wird verwendet, um Events von SpatialTrigger zu empfangen |

## Physik

Die Physik wird mit [Rapier](https://rapier.rs/) implementiert.

| Name | Beschreibung |
| ------------- | ------------- |
| `Rigidbody` | Hinzufügen, um ein Objekt auf die Schwerkraft reagieren zu lassen (oder kinematisch und statisch zu sein) |
| `BoxCollider` | Eine Box-Collider-Form, mit der Objekte kollidieren oder Trigger-Events auslösen können, wenn sie auf `trigger` gesetzt ist |
| `SphereCollider` | *Siehe BoxCollider* |
| `CapsuleCollider` | *Siehe BoxCollider* |
| `MeshCollider` | *Siehe BoxCollider* |
| Physik-Materialien | Physik-Materialien können verwendet werden, um z. B. die Sprungkraft eines Colliders zu definieren |

## XR / WebXR

[Lesen Sie die XR-Dokumentation](xr.md)

| Name | Beschreibung |
| ------------- | ------------- |
| `WebXR` | Zur Szene hinzufügen für VR-, AR- und Passthrough-Unterstützung sowie zum Rendern von Avatar-Modellen |
| [`USDZExporter`](./everywhere-actions.md) | Hinzufügen, um USD und Quicklook-Unterstützung zu aktivieren |
| `XRFlag` | Steuert, wann Objekte sichtbar sind, z. B. nur in VR oder AR oder nur in der Third-Person-Ansicht |
| `WebARSessionRoot` | Handhabt die Platzierung und Skalierung Ihrer Szene im AR-Modus |
| `WebARCameraBackground` | Hinzufügen, um auf das AR-Kamerabild zuzugreifen und Effekte anzuwenden oder es für das Rendering zu verwenden |
| `WebXRImageTracking` | Bilder zur Verfolgung zuweisen und optional ein Objekt an der Bildposition instanziieren |
| `WebXRPlaneTracking` | Planare Meshes oder Collider für verfolgte Ebenen erstellen |
| `XRControllerModel` | Kann hinzugefügt werden, um Geräte-Controller oder Handmodelle zu rendern (werden standardmäßig erstellt, wenn in der WebXR-Komponente aktiviert) |
| `XRControllerMovement` | Kann hinzugefügt werden, um Standardbewegungs- und Teleportationssteuerungen bereitzustellen |
| `XRControllerFollow` | Kann zu jedem Objekt in der Szene hinzugefügt und so konfiguriert werden, dass es entweder der linken oder rechten Hand oder den Controllern folgt |

## Debugging
| Name | Beschreibung |
| ------------- | ------------- |
| `GridHelper` | Zeichnet ein Gitter |
| `BoxGizmo` | Zeichnet eine Box |
| `AxesHelper` | Zeichnet XYZ-Achsen |
| | Hinweis: Wenn Sie benutzerdefinierten Code schreiben, können Sie die statischen `Gizmos`-Methoden zum Zeichnen von Debugging-Linien und -Formen verwenden | |

## Laufzeit-Datei-Input/Output
| Name | Beschreibung |
| ------------- | ------------- |
| `GltfExport` | Experimentell! Wird zum Exportieren von gltf aus der Web-Laufzeit verwendet. |
| `DropListener` | Empfängt Datei-Drop-Events für den Upload und Networking |

## UI

Räumliche UI-Komponenten werden von Unity UI (Canvas, nicht UI Toolkit) auf [three-mesh-ui](https://github.com/felixmariotto/three-mesh-ui) abgebildet. UI kann animiert werden.

| Name | Beschreibung |
| ------------- | ------------- |
| `Canvas` | Unitys UI-System. Muss derzeit im World Space Modus sein. |
| `Text (Legacy)` | Rendert Text mit Unitys UI Text-Komponente. Benutzerdefinierte Schriftarten werden unterstützt, ein Schriftart-Atlas wird beim Export automatisch generiert. Verwenden Sie die Schriftart-Einstellungen oder die `FontAdditionalCharacters`-Komponente, um zu steuern, welche Zeichen in den Atlas aufgenommen werden.<br/>**Hinweis**: Stellen Sie in Unity sicher, dass Sie die Komponente `Legacy/Text` verwenden (*TextMeshPro* wird derzeit nicht unterstützt) |
| `Button` | Empfängt Klick-Events - verwenden Sie das onClick-Event, um darauf zu reagieren. Es kann auch zu 3D-Szenenobjekten hinzugefügt werden.<br/>**Hinweis**: Stellen Sie sicher, dass Sie die Komponente `Legacy/Text` im Button verwenden (oder erstellen Sie den Button über das Kontextmenü `UI/Legacy/Button` in Unity, da *TextMeshPro* derzeit nicht unterstützt wird) |
| `Image` | Rendert ein Sprite-Bild |
| `RawImage` | Rendert eine Textur |
| `InputField` | Ermöglicht Texteingabe |

**Hinweis**: Je nach Projekt ist oft eine Mischung aus räumlicher und 2D-UI sinnvoll für Cross-Platform-Projekte, bei denen VR, AR und Bildschirme unterstützt werden. Typischerweise würden Sie die 2D-Teile mit HTML für beste Zugänglichkeit erstellen und die 3D-Teile mit geometrischen UIs, die auch Tiefen-Offsets unterstützen (z. B. Button-Hover-States und ähnliches).

## Sonstiges

| Name | Beschreibung |
| ------------- | ------------- |
| `SceneSwitcher` | Handhabt das Laden und Entladen anderer Szenen oder Prefabs / glTF-Dateien. Verfügt über Funktionen zum Vorladen, Wechseln von Szenen durch Wischen, Tastatur-Events oder URL-Navigation |

## Nur Editor
| Name | Beschreibung |
| --- | --- |
| `ExportInfo` | Hauptkomponente zur Verwaltung des/der Webprojekts/e, z. B. zum Installieren oder Starten der Web-App |
| `EditorSync` | Hinzufügen, um die Netzwerk-Synchronisierung von Material- oder Komponentenwertänderungen direkt vom Unity Editor zur laufenden three.js-App zu ermöglichen, ohne neu laden zu müssen |
Seite automatisch mit AI übersetzt