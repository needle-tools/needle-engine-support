<br/>
<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Needle Logo" alt="Needle Logo"/> +
    <span style="font-size: 50px;">✨</span>
</div>

# Integration mit anderen Tools

Needle Engine ist flexibel und erweiterbar konzipiert. Es kann mit anderen Tools und Diensten integriert werden, um Ihren Workflow für die Bereitstellung reichhaltiger, interaktiver 3D-Inhalte im Web von jeder Software aus zu verbessern.

Kernstück einer benutzerdefinierten Integration mit Needle Engine ist das 3D-Format glTF. Dies ist das am weitesten unterstützte Format für 3D im Web und das vielseitigste. Dieses leichtgewichtige Format kann 3D-Modelle, Animationen, Texturen und alle Arten von zusätzlichen Daten speichern. glTF ist erweiterbar, genau deshalb haben wir es als Grundlage für Needle Engine gewählt. Es ermöglicht uns, 3D-Dateien um reichhaltige Funktionen und interaktive Möglichkeiten zu erweitern, darunter besseres Rendering, Physik, Interaktionen, XR, Networking und mehr.

Als Ergebnis der Verwendung des standardisierten glTF-Formats für den Datenaustausch ist eine grundlegende Integration in jede Software einfach – exportieren Sie Ihre 3D-Assets als glTF-Dateien und importieren Sie sie in Needle Engine. Von dort aus können Sie weitere Funktionen zu Ihrer Integration hinzufügen, um unsere Skript-Erweiterungen zu unterstützen. Dies geschieht üblicherweise über ein Plugin, eine Erweiterung oder einen Export-Hook in Ihrer 3D-Software.

## Struktur einer benutzerdefinierten Integration
Die Struktur einer benutzerdefinierten Integration sieht wie folgt aus:

1. Exportieren Sie Ihre 3D-Assets als glTF-Dateien. An dieser Stelle ist Ihre Integration wahrscheinlich so einfach wie das Klicken auf den Export-Button in Ihrer 3D-Software.
2. Verwenden Sie die glTF-Datei in einem Webprojekt mit Needle Engine.
   - Dies kann ein Webprojekt sein, das mit einer anderen Integration erstellt wurde, aus einem Beispiel heruntergeladen wurde oder ein neues Webprojekt, das mit `npx needle-create` erstellt wurde.
   - Exportieren Sie die glTF-Datei in den Ordner `assets`. Ihre Web-App sollte sich automatisch aktualisieren, sobald Sie die glTF-Datei erneut exportieren.
3. An dieser Stelle haben Sie eine grundlegende funktionierende Integration und könnten bereits benutzerdefinierte Funktionalität über TypeScript im Webprojekt hinzufügen.
4. Der nächste Schritt ist das Hinzufügen einer Möglichkeit, Komponenten in Ihrer Software zu erstellen und anzupassen. Je nach Software kann dies über eine benutzerdefinierte UI, ein Skript oder ein Plugin geschehen.
   - Versuchen Sie zunächst eine Komponente wie `DragControls`. Sie hat einige Optionen, aber die Standardeinstellungen sind gut genug für den Anfang.
   - Gehen Sie dann zu Komponenten über, die eine Konfiguration erfordern. Ein guter Ausgangspunkt sind unsere `Everywhere Actions`, da sie es Erstellern ermöglichen, eine breite Palette interaktiver Erlebnisse zu erstellen, ohne Code schreiben zu müssen.
5. Exportieren Sie diese Komponenten als Teil der `NEEDLE_components` glTF-Erweiterung für jeden Node. Dies geschieht üblicherweise durch Hinzufügen einer benutzerdefinierten glTF-Erweiterung oder eines Hooks zum bestehenden glTF-Exporter in Ihrer Software.
6. Integrieren Sie sich in ein Webprojekt, damit eine UI für benutzerdefinierte Komponenten generiert werden kann. Für Unity und Blender nennen wir dies `Component Compiler` – er erstellt automatisch eine UI für die Komponenten in Ihrem Projekt und dient als Brücke zwischen TypeScript-Komponenten und Ihrer 3D-Software.

## Integration des Webprojekt-Workflows

Eine vollwertige Integration könnte auch mehr vom Webprojekt-Workflow verwalten. All diese Operationen können über die Kommandozeile ausgeführt werden, aber zur einfacheren Bedienung können sie ordentlich in einer GUI oder einem benutzerdefinierten Menü in Ihrer 3D-Software zusammengefasst werden. Dazu gehören:

1. Erstellen eines neuen Projekts oder Ändern des Speicherorts des Webprojekts
2. Ausführen des Webprojekts aus Ihrer 3D-Software heraus
   - Unsere [Unity Integration](./../unity/) überschreibt den "Play"-Button, um das Webprojekt auszuführen.
   - Die [Blender Integration](./../blender/) hat einen benutzerdefinierten "Play"-Button, der das Webprojekt ausführt.
3. Erstellen (Building) des Webprojekts in einen Ordner
4. Hochladen des erstellten Projekts zu Needle Cloud oder einer anderen Plattform und Speichern der Project ID und Team ID
   - Unsere Unity Integration zeigt zusätzlich die letzten Uploads für Ihr Team an und ermöglicht Ihnen, zur letzten Bereitstellung eines Projekts zu springen.
5. Hochladen/Herunterladen einzelner Assets zu Needle Cloud oder einer anderen Plattform

:::tip Kontaktieren Sie uns, wenn Sie planen, eine benutzerdefinierte Integration zu erstellen!
Bitte kontaktieren Sie uns, wenn Sie daran interessiert sind, eine benutzerdefinierte Integration zu erstellen. Wir helfen Ihnen gerne bei dem Prozess und erklären Ihnen weitere Details. Für Enterprise Kunden bieten wir auch benutzerdefinierte Integrationen als Service an.
:::

Seite automatisch mit AI übersetzt