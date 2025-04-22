# Needle Engine auf Ihrer Website

Needle Engine kann verwendet werden, um neue Web-Apps zu erstellen, und kann auch in bestehende Websites integriert werden. In beiden Fällen sollten Sie den Distributionsordner Ihres Projekts auf einen Webhoster _hochladen_, um sie für die Welt zugänglich zu machen.

Es gibt mehrere Möglichkeiten, Needle Engine in Ihre Website zu integrieren. Welche besser ist, hängt von einer Reihe von Faktoren ab, wie der Komplexität Ihres Projekts, ob Sie benutzerdefinierte Skripte oder nur Kernkomponenten verwenden, wie viel Kontrolle Sie über die Zielwebsite haben, wie hoch das "Vertrauensniveau" zwischen Ihnen und der Zielwebsite ist und so weiter.

## Ausprobieren

Wenn Sie schnell ausprobieren möchten, wie mit Needle erstellte Projekte auf Ihrer Website aussehen werden, fügen Sie einfach diese beiden Zeilen zum Testen irgendwo auf Ihrer Seite hinzu:

:::: code-group
::: code-group-item Option 1: Embedding Needle
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"></script>
<needle-engine src="https://cloud.needle.tools/api/v1/public/873a48a/10801b111/MusicalInstrument.glb"></needle-engine>
```
:::
::: code-group-item Option 2: Using an iframe
```html
<iframe src="https://engine.needle.tools/samples-uploads/musical-instrument/"
    allow="xr; xr-spatial-tracking; fullscreen;" width="100%" height="500px">
</iframe>
```
:::
::: code-group-item Resulting Website
<iframe src="https://engine.needle.tools/samples-uploads/musical-instrument/"
    allow="xr; xr-spatial-tracking; fullscreen;" width="100%" height="500px" style="border:0; outline: 0;">
</iframe>
::::

# Möglichkeiten zur Erstellung von Web-Apps mit Needle

Die häufigsten Workflows, um Needle Engine auf Ihre Website zu bringen, sind:
1. [Verwenden der "Deploy to ..." Komponenten](#verwendung-der-deploy-to-...-komponenten)
2. [Hochladen Ihrer Web-App in einen Ordner](#hochladen-ihrer-web-app-in-einen-ordner)
3. [Einbetten eines Needle-Projekts in eine bestehende Website](#einbetten-eines-needle-projekts-in-eine-bestehende-website)

## Verwendung der "Deploy to ..." Komponenten

Unsere Needle Engine Integrationen enthalten integrierte Deployment-Optionen. Sie können Ihr Projekt mit wenigen Klicks auf Needle Cloud, FTP Server, Glitch, Itch.io, GitHub Pages und mehr deployen.

Weitere Informationen zu jeder dieser Optionen finden Sie im Abschnitt [Deployment](./deployment.md).

1. Fügen Sie die "Deploy to ..." Komponente, die Sie verwenden möchten, Ihrer Szene in Unity oder Blender hinzu.
2. Konfigurieren Sie die notwendigen Optionen und klicken Sie auf "Deploy".
3. Das ist alles! Ihr Projekt ist jetzt live.

:::tip Empfohlener Workflow
Dies ist die einfachste Option und für die meisten Workflows empfohlen – es ist sehr schnell! Sie können iterativ an Ihrem Projekt auf Ihrem Computer arbeiten und dann in Sekundenschnelle eine neue Version ins Web hochladen.
:::

## Hochladen Ihrer Web-App in einen Ordner

Wenn Sie unsere "Deploy to..." Komponenten nicht verwenden möchten oder keine Komponente für Ihren speziellen Workflow existiert, können Sie denselben Prozess manuell durchführen. Die resultierende Web-App wird identisch sein mit dem, was Sie auf Ihrem lokalen Server während der Arbeit am Projekt sehen.

1. Erstellen Sie einen Production Build Ihres Webprojekts. Dadurch wird ein Ordner `dist/` mit allen notwendigen Dateien erstellt, bereit zur Verteilung. Er enthält alle notwendigen Dateien, einschließlich des JavaScript Bundle, der HTML-Datei und aller anderen Assets wie Texturen, Audio- oder Videodateien.

2. Laden Sie den Inhalt des `dist/` Ordners von Ihrem Webprojekt auf Ihren Webhoster hoch. Sie können dies über FTP, SFTP oder jede andere Dateitransfermethode tun, die Ihr Hoster bereitstellt. Sehen Sie sich die Dokumentation Ihres Webhosters für Details an.

3. Das ist alles! Ihre Web-App ist jetzt live.

::: tip Der Speicherort des Ordners beeinflusst die URL Ihrer Web-App.
Abhängig von den Einstellungen Ihres Hosters bestimmt der Ordnerstandort und -name die URL Ihrer Web-App. Hier ist ein Beispiel:
- Ihre Domain `https://your-website.com/` zeigt auf den Ordner `/var/www/html` auf Ihrem Webspace.
- Sie laden Ihre Dateien in `/var/www/html/my-app` hoch, so dass die `index.html` Datei unter `/var/www/html/my-app/index.html` liegt.
- Die URL Ihrer Web-App ist nun `https://your-website.com/my-app/`.
:::

## Einbetten eines Needle-Projekts in eine bestehende Website

In einigen Fällen möchten Sie ein Needle Engine Projekt als Teil einer bestehenden Website haben, zum Beispiel als Teil eines Blogbeitrags, einer Produktseite oder eines Portfolios. Der Prozess ist sehr ähnlich, aber anstatt die Dateien im Root Ihres Webspace hochzuladen, _betten_ Sie das Projekt mit wenigen Codezeilen in eine bestehende Website ein.

1. Erstellen Sie einen Production Build Ihres Webprojekts. Dadurch wird ein Ordner `dist/` mit allen notwendigen Dateien erstellt, bereit zur Verteilung. Er enthält alle notwendigen Dateien, einschließlich des JavaScript Bundle, der HTML-Datei und aller anderen Assets wie Texturen, Audio- oder Videodateien.

2. Laden Sie den `dist/` Ordner von Ihrem Webprojekt auf Ihren Webhoster hoch.
    ::: tip Der Ordner kann überall gehostet werden!
    Wenn Sie keinen Zugriff auf das Dateisystem Ihres Webhosters haben oder keine Möglichkeit, Dateien dorthin hochzuladen, können Sie den Ordner auf einen beliebigen anderen Webspace hochladen und dessen öffentliche URL im nächsten Schritt verwenden.
    :::

3. In Ihrem `dist` Ordner finden Sie eine `index.html` Datei. Wir möchten einige Zeilen aus diesem Ordner kopieren, also öffnen Sie die Datei in einem Texteditor. Typischerweise sieht sie so aus:
    ```html
    <head>
        ...
        <script type="module" crossorigin src="./assets/index-732f0764.js"></script>
        ...
    </head>
    <body>
        <needle-engine src="assets/scene.glb"></needle-engine>
    </body>
    ```

    Hier sind zwei wichtige Zeilen:
    - das JavaScript Bundle innerhalb von `<script>`,
    - der `<needle-engine>` HTML-Tag.

4. Fügen Sie auf der Zielwebsite ebenfalls die `<script...>` und `<needle-engine...>` Tags hinzu. Stellen Sie sicher, dass die Pfade auf den Speicherort zeigen, an dem Sie die Dateien hochgeladen haben.
    ```html
    <script type="module" src="/your-upload-folder/assets/index-732f0764.js"></script>
    <needle-engine src="/your-upload-folder/assets/scene.glb"></needle-engine>
    ```

5. Das ist alles! Die Szene sollte nun auf Ihrer Website angezeigt werden.

## Einbetten eines Needle-Projekts als iframe

Wenn Sie nur eingeschränkten Zugriff auf eine Website haben, zum Beispiel wenn Sie ein CMS wie WordPress verwenden, können Sie einen iframe verwenden, um eine Needle Engine Szene in Ihre Website einzubetten. Diesen Workflow kennen Sie vielleicht vom Einbetten von YouTube Videos oder Sketchfab Modellen.

1. Erstellen Sie einen Production Build Ihres Webprojekts. Dadurch wird ein Ordner `dist/` mit allen notwendigen Dateien erstellt, bereit zur Verteilung.

2. Laden Sie den `dist/` Ordner von Ihrem Webprojekt auf Ihren Webhoster hoch.
    ::: tip Der Ordner kann überall gehostet werden!
    Wenn Sie keinen Zugriff auf das Dateisystem Ihres Webhosters haben oder keine Möglichkeit, Dateien dorthin hochzuladen, können Sie den Ordner auf einen beliebigen anderen Webspace hochladen und dessen öffentliche URL im nächsten Schritt verwenden.
    :::

3. Fügen Sie einen iframe zu Ihrer Website hinzu, der auf die `index.html` Datei im `dist/` Ordner verweist.
    ```html
    <iframe
        src="https://your-website.com/needle-files/dist/index.html"
        allow="xr; xr-spatial-tracking; fullscreen;">
    </iframe>
    ```

    ::: tip Berechtigungen innerhalb von iframes
    Die Liste innerhalb von `allow=` hängt von den Features ab, die Ihre Web-App verwendet. Zum Beispiel benötigen XR-Anwendungen `xr` und `xr-spatial-tracking`, um innerhalb von iframes zu funktionieren.

    Es können zusätzliche Features benötigt werden, zum Beispiel `camera; microphone; display-capture; geolocation`. Siehe [die vollständige Liste der iframe Permissions Policy Direktiven auf MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy#directives).
    :::

4. Das ist alles! Die Szene sollte nun auf Ihrer Website angezeigt werden.

## Einbetten von Szenen, die keine benutzerdefinierten Skripte verwenden

Wenn Ihr Projekt nur Kernkomponenten und keine benutzerdefinierten Skripte verwendet, können Sie Needle Engine direkt von einem CDN (Content Delivery Network) verwenden.

1. Fügen Sie das folgende Snippet zu Ihrer Website hinzu, zum Beispiel als "HTML Block" in Ihrem CMS:
    ```html
    <script type="module" src="https://cdn.jsdelivr.net/npm/@needle-tools/engine/dist/needle-engine.min.js"></script>
    <needle-engine src="https://cloud.needle.tools/api/v1/public/873a48a/10801b111/MusicalInstrument.glb" background-blurriness="0.8"></needle-engine>
    ```
2. Laden Sie den Ordner `assets/` von Ihrem Webprojekt auf Ihren Webhoster hoch. Abhängig von Ihren Projekteinstellungen enthält dieser Ordner eine oder mehrere `.glb` Dateien und eine beliebige Anzahl anderer Dateien wie Audio, Video, Skybox und mehr.

3. Ändern Sie das `src=` Attribut des `needle-engine` Tags auf die URL der `.glb` Datei, die Sie anzeigen möchten. Typischerweise wird dies ein Pfad wie `https://your-website.com/assets/MyScene.glb` sein.

4. Das ist alles! Die Szene sollte nun auf Ihrer Website angezeigt werden.

## Einbetten einer Needle Cloud Web-App als iframe

Wenn Sie Ihr Projekt auf Needle Cloud deployt haben, können Sie es ganz einfach mit einem iframe auf Ihrer eigenen Website anzeigen.

::: warning <b>In Bearbeitung.</b> Dieser Abschnitt ist noch nicht vollständig.
:::

# Häufige Workflows

## Erstellen einer Web-App für die Website eines Kunden

1. **Verstehen Sie, welche Art von App Sie erstellen**, und ob und wie sie mit einer bestehenden Website verbunden ist.
   Oft erstellen Sie eine eigenständige App, die über einen Link auf der Domain des Kunden zugänglich ist.
   Es könnten aber auch andere serverseitige und clientseitige Komponenten involviert sein.

2. **Verstehen Sie, unter welcher URL die Web-App zugänglich sein soll.**
  Dies könnte sein

    - Eine Seite auf **[Needle Cloud](./cloud/)**
      `collaborativesandbox-zubcks1qdkhy.needle.run`

    - Eine **Unterseite** auf der Website des Kunden
      `my-page.com/app`

    - Eine neue **Subdomain**
      `app.my-page.com`
    - Eine neue oder bestehende **Domain**
      `my-app.com`

    ::: tip Hier gibt es kein "gut" oder "schlecht".
    Ein typischer Ansatz ist, für anfängliche Prototypen und während der Entwicklung auf [Needle Cloud](./cloud/) zu beginnen und für die finale Version auf den Webspace und die Domain des Kunden zu wechseln.

    Die Wahl hängt meist von den Anforderungen des Kunden bezüglich Branding, SEO und technischem Setup ab. Oft müssen Sie dies mit der IT-Abteilung oder dem Webmaster des Kunden besprechen.
    :::

1. **Verstehen Sie, wie die Web-App deployed und gewartet wird.**
    - Werden Sie Zugriff auf einen Ordner auf dem Webserver des Kunden haben, so dass Sie die neueste Version hochladen können, oder möchten sie das Deployment selbst verwalten?
      ::: tip Ein einfacher Ansatz: FTP-Zugang
      Oft können Sie nach FTP- oder SFTP-Zugang zu einem Ordner auf dem Webserver des Kunden fragen. Sie erhalten eine URL, einen Benutzernamen und ein Passwort, und dann können Sie Ihre Dateien in diesen Ordner hochladen. Wir stellen eine "Deploy to FTP"-Komponente bereit, die dies besonders einfach macht. Die IT-Abteilung des Kunden wird einrichten, unter welcher URL der Ordner zugänglich ist.
        :::

    - Gibt es viele Inhalte, die regelmäßig aktualisiert werden müssen, oder ist die App größtenteils statisch?
        ::: tip Statische vs. dynamische Inhalte
        Bei größtenteils statischen Inhalten reicht es oft aus, von Zeit zu Zeit einen neuen Build hochzuladen. Für dynamische Inhalte benötigen Sie möglicherweise ein CMS (Content Management System) oder eine Datenbankverbindung.
        :::
    - Welche Geräte und Browser verwendet die Zielgruppe?
        ::: tip Browserkompatibilität und Testing
        Obwohl Needle Engine auf allen modernen Geräten und Browsern funktioniert, ist es immer eine gute Idee, Ihre App auf den Geräten und Browsern zu testen, die Ihre Zielgruppe verwendet, um sicherzustellen, dass alles wie erwartet funktioniert. Wenn Sie zum Beispiel eine AR-App für Telefone erstellen, sollten Sie auf Android- und iOS-Geräten testen.
        :::

2. **Richten Sie das Projekt, ein Test-Deployment und das Kunden-Deployment ein.**
   Es ist oft eine gute Idee, den Deployment-Prozess frühzeitig zu testen, um sicherzustellen, dass Sie verstehen, wie er funktioniert und welche Anforderungen bestehen. Wenn Sie sich zum Beispiel für die Verwendung von FTP entschieden haben, könnten Sie einen Testordner auf Ihrem eigenen Webserver einrichten und den Deployment-Prozess dort testen. Sobald Änderungen vom Kunden genehmigt sind, können Sie dann auf den Server des Kunden deployen.

3. **Fangen Sie an zu erstellen!**
   Sobald die Anforderungen und das Deployment geklärt sind, fangen Sie an, Ihr Projekt zu erstellen! Normalerweise werden Sie lokal iterieren, dann zur Genehmigung auf Ihren Testserver deployen und anschließend auf den Server des Kunden.

## Wordpress

1. Entscheiden Sie sich für die Methode, die Sie zum Einbetten Ihres Needle Engine Projekts verwenden möchten. Sie können entweder die Methode "Einbetten eines Needle-Projekts in eine bestehende Website" oder die Methode "Einbetten eines Needle-Projekts als iframe" verwenden.

2. Laden Sie den Inhalt des `dist/` Ordners von Ihrem Webprojekt auf Ihren Webhoster hoch. Normalerweise befindet sich das Wordpress Uploads Verzeichnis unter `wp-content/uploads/`.

    ::: tip Wordpress Backups
    Sie können entscheiden, ob Ihr neues Projekt unter `wp-content/uploads/my-project/` liegen soll oder an einem anderen Ort wie `my-projects/my-project`. Dies beeinflusst, ob und wie Ihr Projekt in Wordpress Backups enthalten sein wird.
    :::

3. Fügen Sie auf der Seite, zu der Sie Needle Engine hinzufügen möchten, einen `HTML` Block hinzu und fügen Sie das Code-Snippet wie oben beschrieben ein – entweder als Script-Embed oder als iframe.

## Shopify

::: warning <b>In Bearbeitung.</b> Muss noch dokumentiert werden.
:::

## Wix

::: warning <b>In Bearbeitung.</b> Muss noch dokumentiert werden.
:::

## Webflow

::: warning <b>In Bearbeitung.</b> Muss noch dokumentiert werden.
:::

Seite automatisch mit AI übersetzt