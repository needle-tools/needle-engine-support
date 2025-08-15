---
title: Needle Cloud
description: 'Needle Cloud ist ein Online-Dienst. Er hilft Ihnen, 3D-Assets und Apps im Web zu speichern, zu verwalten und zu teilen.
 Es werden verschiedene Dateiformate unterstützt, darunter glTF, USD, FBX, VRM und weitere. Räumliche Web-Apps, die mit Needle erstellt wurden, können direkt aus der Unity-Integration sowie über die Kommandozeile (CLI) in die Cloud bereitgestellt werden.'
---

<br/>
<discountbanner/>


# Needle Cloud

## Überblick

Needle Cloud ist ein Online-Dienst. Er hilft Ihnen, 3D-Assets und Apps im Web zu speichern, zu verwalten und zu teilen.
Es werden verschiedene Dateiformate unterstützt, darunter glTF, USD, FBX, VRM und weitere. Räumliche Web-Apps, die mit Needle erstellt wurden, können direkt aus der [Unity-Integration](#deploy-from-unity) oder unserer Needle Cloud [Kommandozeilenschnittstelle](#deploy-from-the-cli) (CLI) bereitgestellt werden.

Besuchen Sie [Needle Cloud](https://cloud.needle.tools), um ein kostenloses Konto zu erstellen.

![Needle Cloud Überblick](/cloud/cloud-overview-page.webp)

## Funktionen

1.  **Räumliche Web-Apps hosten**
    Mit Needle erstellte Apps können direkt aus unseren Engine-Integrationen in die Cloud bereitgestellt werden. Dies ermöglicht es Ihnen, Ihrem Team und Ihren Kunden einfach öffentlichen Zugriff auf Apps zu ermöglichen, ohne einen eigenen Server einrichten zu müssen. Bei Bedarf können Sie Apps mit einem Passwort schützen.

2.  **3D-Assets privat und sicher verwalten**
    Laden und organisieren Sie Ihre 3D-Dateien ganz einfach. Dank unseres schnellen CDN (Content Delivery Network) werden Ihre Dateien sicher gespeichert und können von überall auf der Welt schnell abgerufen werden.
    Needle Cloud ist kein Marktplatz und kein soziales Netzwerk. Es wurde für Agenturen, Studios und Kreative entwickelt, um ihre Assets privat und sicher zu verwalten.

3.  **3D-Assets aus verschiedenen Formaten optimieren**
    Komprimieren Sie Ihre Dateien automatisch, um deren Größe zu reduzieren und gleichzeitig die visuelle Qualität zu erhalten. Dadurch laden Ihre Dateien schneller und sparen Bandbreite und Speicher auf den Geräten der Nutzer.

4.  **Freigabe und Versionskontrolle**
    Links zu Ihren Dateien können mit anderen geteilt und direkt in Ihren Projekten verwendet werden. Sie können neue Versionen von Assets und Apps hochladen. Einzelne Versionen können gekennzeichnet werden, was flexible Überprüfungs-Workflows ermöglicht: Sie können beispielsweise eine Version als `main` oder `experimental` kennzeichnen. Sie können Kennzeichnungen bei Bedarf auch auf eine frühere Version zurücksetzen.

5.  **Automatisierung und Pipeline-Tools über CLI**
    Die `needle-cloud` CLI (Kommandozeilenschnittstelle) erleichtert die Automatisierung des Hochladens und Optimierens von Dateien. Dies ist nützlich, um Needle Cloud in Ihre bestehende Pipeline zu integrieren oder das Hochladen großer Dateimengen zu automatisieren.

6.  **Lizenzverwaltung**
    Lizenzen für Needle Engine für Einzelkreative und Teams werden über Needle Cloud verwaltet. Dies stellt sicher, dass nur autorisierte Benutzer auf Ihre Dateien und Projekte zugreifen können. Kontaktieren Sie uns für Enterprise- und Edu-Lizenzen.


## Bereitstellen aus Unity

Needle Cloud ist in den Unity Editor integriert. Dies ermöglicht es Ihnen, Ihre Apps direkt aus Unity in Needle Cloud bereitzustellen. Sie können auch Assets direkt in Unity von Needle Cloud hoch- und herunterladen.

1.  **Installieren Sie die Unity-Integration, falls Sie dies noch nicht getan haben.**
    Weitere Infos finden Sie auf [dieser Seite](./../unity/).

2.  **Fügen Sie die Komponente `Needle Engine` (ehemals ExportInfo) zu Ihrer Szene hinzu.**
    Diese Komponente wird verwendet, um die Exporteinstellungen für Ihre App zu konfigurieren.
    Sie können den Menüpunkt `GameObject > Needle Engine > Add Export Info` verwenden oder eine neue Szene aus einer Needle-Vorlage über den Menüpunkt `File > New Scene` erstellen.

3.  **Klicken Sie auf `Upload to Needle Cloud`.**
    Dadurch wird Ihre App erstellt und in Needle Cloud hochgeladen. Sie können auch auswählen, in ein bestimmtes Team und Projekt bereitzustellen. Der _Upload-Name_ des Projekts, der neben der Schaltfläche sichtbar ist, wird in der Szene gespeichert. Zukünftige Uploads verwenden den gleichen Upload-Namen, und alle hochgeladenen Versionen werden auf der Needle Cloud-Website gruppiert.

    ![Needle Cloud Unity Integration](/cloud/cloud-deploy-v1.webp)

## Bereitstellen von der CLI

Needle Cloud bietet eine Kommandozeilenschnittstelle (CLI), mit der Sie Ihre Assets verwalten und Ihre Anwendungen effizient bereitstellen können. Sie können die CLI verwenden, um Aufgaben zu automatisieren und Needle Cloud in Ihre bestehenden Workflows zu integrieren.

Die CLI ist als [npm package](https://www.npmjs.com/package/needle-cloud) verfügbar, was bedeutet, dass Sie Node.js auf Ihrem Computer installiert haben müssen. Sie können überprüfen, ob Sie Node.js installiert haben, indem Sie den folgenden Befehl in Ihrem Terminal ausführen:

```bash
node -v
```
Wenn Sie Node.js nicht installiert haben, können Sie es von der [Node.js website](https://nodejs.org/) herunterladen.

Sie können das `needle-cloud` CLI-Paket global installieren oder es über `npx` verwenden. Dies ermöglicht die Ausführung der CLI-Befehle, ohne diese global installieren zu müssen.

1.  **Verwenden Sie den npx-Befehl (empfohlen)**
    ```bash
    npx needle-cloud deploy '/dist' --team 'My team' --name 'some-project-id'
    ```
2.  **Oder installieren Sie needle-cloud global**
    Eine globale Installation ermöglicht die Verwendung der CLI von überall auf Ihrem System. Um die CLI global zu installieren, führen Sie den folgenden Befehl in Ihrem Terminal aus:
    ```bash
    npm install -g needle-cloud
    ```
    Jetzt können Sie den Befehl `needle-cloud` in Ihrem Terminal verwenden:

    ```bash
    needle-cloud deploy '/dist' --team 'My team' --name 'some-project-id'
    ```

### Automatisierte Bereitstellungen
Um von **Github Actions** oder **Stackblitz** bereitzustellen, können Sie einen Zugriffstoken als `--token <access_token>` bereitstellen. Zugriffstoken können auf [Ihrer Teamseite](https://cloud.needle.tools/team) auf Needle Cloud erstellt werden. Stellen Sie sicher, dass Sie Ihren Token mit `read/write`-Berechtigungen erstellen.

Verwenden Sie die [Needle Cloud Github Action](https://github.com/marketplace/actions/deploy-to-needle-cloud), um ein Update von Github bereitzustellen (z. B. jedes Mal, wenn Sie in das Repository pushen).

#### Beispiel: Needle Cloud Github Action
```yml
      - name: Deploy to Needle Cloud
        uses: needle-tools/deploy-to-needle-cloud-action@v1
        id: deploy
        with:
            token: ${{ secrets.NEEDLE_CLOUD_TOKEN }}
            dir: ./dist
            name: vite-template # optional
```

#### Beispiel: Bereitstellen über einen CLI-Befehl

```bash
# Deploy to Needle Cloud from e.g. a github action
npx needle-cloud deploy '/path/to/output' --team 'My team' --name 'some name or id' --token '<access_token>'
```

### CLI-Hilfe
Verwenden Sie `help`, um alle verfügbaren Kommandozeilenoptionen und Hilfe zu einzelnen Befehlen anzuzeigen.
```bash
# alle verfügbaren Optionen anzeigen
npx needle-cloud help
# Hilfe zu einem bestimmten Befehl erhalten, z.B. deploy
npx needle-cloud help deploy
```


## Bereitstellungs-URLs

Beim Bereitstellen in Needle Cloud erhält jeder Upload eine eindeutige URL. Sie können entweder einen Link zu einer _spezifischen_ Version oder zu einer _gekennzeichneten_ Version mit Ihrem Team oder Kunden teilen.

-----

Im folgenden Beispiel haben wir eine App, die bisher zweimal bereitgestellt wurde. Jede Bereitstellung erhält eine spezifische URL, auch als _gepinnte_ URL bekannt, da sie an eine spezifische Version gepinnt ist.
1.  [collaborativesandbox-zubcks1qdkhy<strong>-1qdkhy</strong>.needle.run](https://collaborativesandbox-zubcks1qdkhy-1qdkhy.needle.run/)
    Dies ist die erste Version, die hochgeladen wurde.
2.  [collaborativesandbox-zubcks1qdkhy<strong>-2e2spt</strong>.needle.run](https://collaborativesandbox-zubcks1qdkhy-2e2spt.needle.run/)
    Dies ist die zweite Version, die hochgeladen wurde.

Die _neueste_ Bereitstellung ist immer unter der folgenden URL verfügbar. Diese URL ist nützlich zum Teilen mit Ihrem Team, da sie immer auf die aktuellste Version der App verweist. Weitere gebräuchliche Namen für diese Version sind _dev_ oder _canary_.
-   [collaborativesandbox-zubcks1qdkhy<strong>-latest</strong>.needle.run](https://collaborativesandbox-zubcks1qdkhy-latest.needle.run/)
    Diese URL zeigt automatisch die neue Version an, wenn Sie eine neue Version der App hochladen.

Die _main_ Bereitstellung ist nützlich zum Teilen mit Kunden, da sie immer auf die aktuellste Version der App verweist, die Sie promotet haben. Weitere gebräuchliche Namen für diese Version sind _production_, _stable_ oder _live_.
-   [collaborativesandbox-zubcks1qdkhy.needle.run](https://collaborativesandbox-zubcks1qdkhy.needle.run/)
    Diese URL ändert sich nicht, wenn Sie eine neue Version hochladen. Sie ändert sich nur, wenn Sie eine neue Version explizit zu _main_ promoten.

Typischerweise laden Sie eine neue Version hoch, überprüfen sie und entscheiden dann, ob Sie sie zu _main_ promoten möchten.

-----

Die Needle Cloud-Website zeigt alle bereitgestellten Versionen der App, einschließlich der latest- und main-Versionen. Labels können verschoben werden, indem Sie auf <kbd>⋮</kbd> klicken und <kbd>Set main label</kbd> oder <kbd>Remove main label</kbd> auswählen.

![Needle Cloud Versionsliste](/cloud/cloud-edit-page.webp)

## Unterstützte 3D-Formate

1.  **glTF und GLB** <a href="https://cloud.needle.tools/view?file=2oAMeWZ1hWL3C-latest-product" target="_blank">Beispiel</a>
    Das glTF-Format ist das am weitesten unterstützte Format für 3D im Web. Es ist ein leichtgewichtiges Format, das 3D-Modelle, Animationen und Texturen speichern kann. GLB-Dateien sind binäre Versionen von glTF-Dateien, bei denen alle Daten in einer einzigen Datei gespeichert sind.
    glTF unterstützt fortschrittliche Komprimierungstechniken wie Draco, KTX2 und Meshopt, die von Needle Cloud und Needle Engine voll unterstützt werden.

2.  **OpenUSD**
    USD ist ein leistungsstarkes Format für den 3D-Datenaustausch. Es ist bekannt für seine Verwendung in der Film- und VFX-Industrie und gewinnt in der Spieleindustrie an Popularität. Needle Cloud unterstützt USDZ- und USD-Dateien nativ durch unsere Arbeit an USD-WASM und konvertiert USD-Dateien auch in glTF zur weiteren Verarbeitung und Optimierung.

3.  **FBX**
    FBX ist seit vielen Jahren ein beliebtes Format für den 3D-Datenaustausch, dem jedoch eine Reihe moderner Funktionen wie PBR-Materialien und Erweiterungen fehlen. Needle Cloud konvertiert FBX-Dateien in glTF zur weiteren Verarbeitung und Optimierung.

4.  **VRM**
    VRM ist ein Format für humanoide Avatare. Es basiert auf glTF mit zusätzlichen Einschränkungen durch die Verwendung von glTF-Erweiterungen. Needle Cloud unterstützt VRM-Dateien nativ und kann sie wie andere glTF-Dateien optimieren, einschließlich komplexer VRM-Erweiterungen wie Phoneme, Toon-Shading und Dynamic Bones.

5.  **OBJ**
    OBJ ist ein einfaches textbasiertes Format für 3D-Modelle. Es unterstützt grundlegende Materialien über MTL-Dateien, Animationen und Objekthierarchien. Needle Cloud konvertiert OBJ-Dateien in glTF zur weiteren Verarbeitung und Optimierung.

:::tip Verwenden Sie glTF oder USD, wenn möglich
Wir empfehlen glTF und USD als primäre Formate für den 3D-Datenaustausch. Sie sind weit verbreitet, verfügen über moderne Funktionen und ein gutes Materialmodell.
:::

## Cloud Assets

### Assets hochladen

Sie können Ihre Dateien ganz einfach hochladen, indem Sie sie auf die Website ziehen oder von Ihrem Computer auswählen.
Nicht-glTF-Dateien werden zur weiteren Verarbeitung automatisch in glTF konvertiert, aber die Originaldateien werden zum Herunterladen und zur Web-Anzeige behalten.

### Asset-Versionen

Wenn Sie die Bearbeitungsseite eines Assets besuchen, können Sie alle Versionen sehen, die bisher von Ihnen oder Ihrem Team hochgeladen wurden. Sie können Versionen auch taggen, um sie als "main" oder "experimental" zu markieren. "Latest" ist das Standard-Tag für die aktuellste Version.

### Links zu Assets teilen

Sie können Links erstellen, um spezifische Dateien oder getaggte Dateien mit Ihrem Team oder Kunden zu teilen. Getaggte Links werden automatisch aktualisiert, wenn Sie das Tag verschieben – so können Sie einen "main"-Link einmal teilen und die Datei weiter aktualisieren, ohne einen neuen Link senden zu müssen.

### Cloud Assets in Needle Engine verwenden

In Needle Cloud gespeicherte Dateien können einfach direkt in Needle Engine-Projekte übernommen werden. Die `Needle Cloud Asset`-Komponente nimmt einen Link zu einem Asset entgegen und lädt es zur Laufzeit. Dies ermöglicht es Ihnen, die Größe Ihres Projekts klein zu halten und Assets bei Bedarf zu laden, die weiterhin in der Cloud aktualisiert werden können.

::: tip Verwenden Sie nach Möglichkeit Progressive Loading
In Needle Cloud gespeicherte Assets werden mithilfe unserer Progressive Loading Technologie automatisch für die ideale Laufzeitnutzung optimiert. Für jedes Mesh und jede Textur werden mehrere Level-of-Detail-Versionen generiert, und nur die benötigten Teile des Assets werden zur Laufzeit geladen.

Dies spart viel Bandbreite und Speicher (typischerweise 90% oder mehr im Vergleich zum Laden des vollständigen Assets).
:::

### Den Cloud Viewer auf Ihrer Website einbetten

Eine schnelle Möglichkeit, 3D auf Ihre eigene Website zu bringen, ist das **Einbetten** des Needle Cloud Viewers.
Gehen Sie dazu auf die Bearbeitungsseite eines Assets und klicken Sie auf <kbd>Embed</kbd>. Sie können dann das `iframe`-Codeschnipsel kopieren und auf Ihrer Website einfügen.

::: tip Spezifische Versionen einbetten
Sie können den Viewer auch mit einem direkten Link zum Asset oder mit einem spezifischen Tag einbetten. Dies ermöglicht es Ihnen, das Asset auf Needle Cloud zu aktualisieren, ohne den Einbettungscode auf Ihrer Website aktualisieren zu müssen.
:::

### Einbetten in andere Frameworks

Die folgenden Einbettungsoptionen sind verfügbar:
1.  **Needle Cloud Viewer**
    Verwenden Sie das `iframe`-Codeschnipsel, um den Needle Cloud Viewer auf Ihrer Website einzubetten.

1.  **Needle Engine**
    Verwenden Sie das bereitgestellte Codeschnipsel, um Needle Engine als [Web-Komponente](./../three/) auf Ihrer Website einzubetten.

1.  **model-viewer**
    Das [model-viewer](https://modelviewer.dev)-Projekt bietet eine Web-Komponente zum Rendern einfacher, nicht-interaktiver 3D-Modelle im Browser.

1.  **three.js**
    Wenn Sie mit three.js vertraut sind, können Sie das bereitgestellte Codeschnipsel als Ausgangspunkt für eine three.js-App verwenden, die Needle Progressive Loading unterstützt und Dateien effizient von Needle Cloud lädt.

1.  **React-Three-Fiber**
    Wenn Sie React-Three-Fiber verwenden, können Sie das bereitgestellte Codeschnipsel als Ausgangspunkt für ein Projekt verwenden, das Needle Progressive Loading unterstützt und Dateien effizient von Needle Cloud lädt.

1.  **Unity**
    Wenn Sie Unity verwenden, können Sie Needle Cloud Assets direkt in Ihre Projekte integrieren, indem Sie die `Needle Cloud Asset`-Komponente für nahtloses Laden und Optimieren verwenden.

### Cloud Assets mit anderen Engines wie Unity oder Unreal verwenden

Es gibt mehrere Möglichkeiten, in Needle Cloud gespeicherte Assets in anderen Engines wie Unity oder Unreal zu verwenden.
1.  **Herunterladen und Importieren**
    Sie können das Asset herunterladen und in Ihr Projekt importieren.

2.  **Direkter Link**
    Sie können den direkten Link zum Asset in Ihrem Projekt verwenden. Auf diese Weise können Sie das Asset auf Needle Cloud aktualisieren, und es wird automatisch in Ihrem Projekt aktualisiert. Welchen Link Sie verwenden, hängt von der Engine und ihren glTF-Funktionen ab:
    -   Unterstützung für **glTF mit Progressive Loading**:
        Verwenden Sie den Link `Progressive-World` oder `Progressive-Product`.
        Weitere Informationen zu Progressive Loading und dessen Aktivierung für Ihre Engine finden Sie unter [npm:@needle-tools/gltf-progressive](https://www.npmjs.com/package/@needle-tools/gltf-progressive).

    -   Unterstützung für **glTF mit Draco und KTX2**:
        Verwenden Sie den Link `Optimized`.
    -   Unterstützung für glTF, aber **keine Komprimierungserweiterungen**:
        Verwenden Sie den Link `Upload` (für gltf/glb-Uploads) oder `Converted` (für andere Uploads).

3.  **Needle Cloud Asset Komponente**
    Wenn Sie Needle Engine verwenden, können Sie die `Needle Cloud Asset`-Komponente verwenden, um Assets zur Laufzeit zu laden. Sie wählt automatisch den besten Link für Ihre Plattform aus und lädt das Asset mit Progressive Loading. Dies wird auch zur Laufzeit in Unity Builds unterstützt.

## CLI für Assets

Die Kommandozeilenschnittstelle (CLI) für Needle Cloud ermöglicht die Automatisierung von Datei-Uploads und Komprimierung. Die CLI kann als Teil eines Build-Schritts verwendet werden (Ersetzen eines Assets durch eine optimierte Version) oder als eigenständiges Tool (für die Stapelverarbeitung von Dateien).

Weitere Informationen zur CLI und ihrer Verwendung finden Sie unter [npm:needle-cloud](https://www.npmjs.com/package/needle-cloud).


## RBAC (Rollenbasierte Zugriffskontrolle)

Teams bestehen aus Mitgliedern, und jedem Mitglied eines Teams kann eine Rolle zugewiesen werden. Diese Rollen definieren, was Sie innerhalb eines Teams auf Needle Cloud tun können und was nicht.

Wenn Ihr Projekt wächst und Sie weitere Teammitglieder hinzufügen, können Sie ihnen Rollen zuweisen, um sicherzustellen, dass sie die richtigen Berechtigungen zur Bearbeitung Ihrer Projekte haben.

| | |
| -- | -- |
| **Owner** | Höchste Berechtigungsstufe. Die Owner-Rolle kann das gesamte Team (einschließlich Abrechnung und Mitgliederrollen) verwalten, alle Projekte, Uploads und Bereitstellungen einsehen. |
| **Manager** | Die Manager-Rolle kann das gesamte Team (einschließlich Abrechnung und Mitgliederrollen) verwalten, alle Projekte, Uploads und Bereitstellungen einsehen. |
| **Billing** | Die Billing-Rolle ist auf Finanzoperationen spezialisiert, kann die Abrechnungsinformationen des Teams überwachen, Projektkosten überprüfen und verwalten sowie Zahlungsoptionen handhaben. <br/>Die Billing-Rolle hat nur Lesezugriff auf Bereitstellungen und Assets und kann keine Bereitstellungen durchführen oder Assets hochladen. <br/>Die Billing-Rolle kann ohne zusätzliche Kosten zugewiesen werden. Die Rolle ist auf ein Mitglied pro Team begrenzt. |
| **Member** | Die Member-Rolle (Entwicklerrolle) kann Bereitstellungen erstellen, Assets zur Optimierung hoch-/herunterladen oder KI-Funktionen nutzen. |

## FAQ

1.  **Was ist Needle Cloud?**
    Es ist ein Online-Dienst zum Hochladen, Komprimieren und Teilen von 3D-Assets und -Szenen.

2.  **Wie lade ich Assets in Needle Cloud hoch?**
    Sie können Dateien hochladen, indem Sie sie auf die Website ziehen oder sie direkt von unterstützten Integrationen hochladen. Wenn Sie viele Dateien haben, können Sie die CLI (Kommandozeilenschnittstelle) oder die API (Programmierschnittstelle) verwenden.

3.  **Wie lade ich optimierte Dateien von Needle Cloud herunter?**
    Sie können Dateien von der Website herunterladen. Klicken Sie auf `Share` und dann auf `Download`. Sie können auch die CLI verwenden, um Dateien herunterzuladen.

4.  **Kann ich meine Dateien mit anderen teilen?**
    Ja, Sie können Links erstellen, um Ihre Dateien zu teilen. Links können entweder direkte Download-Links oder Links zum Needle Cloud Viewer sein.

5.  **Gibt es eine Begrenzung für Dateigrößen?**
    Die Upload-Limits hängen von Ihrem Plan ab. Überprüfen Sie Ihre Kontodetails für weitere Informationen.

6.  **Können Needle Cloud-Dateien mit anderen Tools verwendet werden?**
    Ja, Sie können Ihre Dateien in anderen Programmen verwenden, indem Sie sie als glTF exportieren. USD-Export kommt zu einem späteren Zeitpunkt.

7.  **Was passiert, wenn mir der Speicherplatz ausgeht?**
    Möglicherweise müssen Sie Ihren Plan aktualisieren oder alte Dateien löschen, um Platz zu schaffen.

8.  **Weitere Antworten**
    Besuchen Sie die [Needle Cloud FAQ](https://cloud.needle.tools/faq)

Seite automatisch mit KI übersetzt