# cartracker
###Softwaretechnikprojekt WS 21/22 - GPS-Tracking von Fahrzeugflotten

Dieses Projekt ist von Gruppe 9: [Julia-Sophie Mühleck](https://github.com/Joools1), 
[Marco Diaz Garcia](https://github.com/MarcoDiazGarcia),
[Tim Lennard Debre](https://github.com/DTAlduin) und
[Tim Luca Eggers](https://github.com/freeZe2511).

Mit diesem Uni-Projekt soll eine Software im Team entwickelt werden. 
Dabei sollen die GPS-Daten von mindestens 3 mobilen Geräten,
die Fahrzeuge abbilden, in Echtzeit erfasst werden.

Auf Basis dieser GPS-Daten sollen die Fahrzeuge verfolgbar sein.
Dabei ist der Streckenverlauf zu visualisieren und die Informationen
an das intelligente Verkehrsmanagementsystem (Admin PC) zu übermitteln.

Dazu wurde eine App entwickelt, die die GPS-Daten an das Backend sendet.
Im Backend werden alle Komponenten vernetzt und die Daten mit der Datenbank 
synchronisiert. Das Frontend ruft alle benötigten Daten aus dem Backend 
für den Admin ab.

![Kommunikationsdiagramm](Kommunikationsdiagramm%20SWTP.png)

Umgesetzt wurde dieses Projekt mithilfe folgender Tools und Sprachen:
- Frontend: Angular JS
- Backend: Dart
- Datenbank: MongoDB
- App: Flutter

[Frontend](https://github.com/freeZe2511/cartracker/tree/main/frontend):
Hier findet man die Bedienungshinweise zum Admin-PC und weitere Details.

[Backend](https://github.com/freeZe2511/cartracker/tree/main/backend):
Hier findet man alle CRUD-Routen im Überblick.

[App](https://github.com/freeZe2511/cartracker/tree/main/app):
Hier findet man die Bedienungshinweise zur App und weitere Details.

**Deployed:** <https://freeze2511.github.io/cartracker/>





