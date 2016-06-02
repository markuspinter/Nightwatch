# Nightwatch

Einleitung: 

Unterstützte Browser: Chrome, Firefox. -- ECMAScript 6 muss unterstützt werden.

Die Nightwatch Engine ist komplett objektorientiert programmiert.
    

Dies ist noch kein fertig programmiertes Spiel,
es ist eher eine Demo der Engine und des Netwerk Protokolls.

Für den Client wurde nur jQuery als Library verwendet.
Als Websocket Library haben wir uns für "ws" entschieden, da sie
eine recht kleine und performante Library ist. (https://github.com/websockets/ws)

Sie benötigen keine Internet verbindung für diese Demo, da alles Lokal
mitgeliefert wird.

Starten der Demo:

1. Starten Sie den Server mit folgendem Script: Nightwatch/Server/Server.js
2. Öffnen Sie die index.html in einem der unterstützten Browser.
3. Es sollte eine Nachricht am Server angezeigt werden, dass ein Client
        sich für ein Match angemeldet hat.
4. Öffnen Sie nun die index.html noch einmal.
5. Nun sollte am Server eine Nachricht erscheinen: Match found.
6. Kurz darauf sollten auf beiden Clients das Level angezeigt werden.

Zusätliche Features:

1. Sie können die Render Buffer Demo aktivieren. Hierbei sollte sich 
   die Hintergrundfarbe zeitlich verändern.
2. Bewegen Sie die beiden Slider um die Geschwindigkeit des Farbwechsels
    zu regulieren. 
    GlobalTime bestimmt die Geschwindigkeit des Spieles
    LocalTime kann für ein bestimmtes Objekt definiert werden.
    LocalTime wird von GlobalTime beeinflusst. Somit können die 
    Geschwindigkeiten zukünftiger Animationen individuell geregelt werden.

3. Sie können den Renderer komplett stoppen indem Sie auf Render checkbox
    clicken.
    
Die komplette Dokumentation finden Sie in der Documentation.md in diesem
Verzeichnis.