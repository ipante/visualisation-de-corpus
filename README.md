# Carte choroplète de données linguistiques en D3.js

## Description

Ce répertoire contient le matériel de travail pour l'atelier de visualisation cartographique donné par [Isaac Pante](http://isaacpante.net) dans le cadre de la Summer School ["Phonologie de corpus"](https://wp.unil.ch/summerschools/courses2019/phonologie-de-corpus/) dispensée à l'UNIL du 22 au 26 juillet 2019. Il se propose de récupérer et transformer des données extraites de questionnaires documentant la réalisation du schwa en français contemporain et de produire une carte choroplète sommaire de ces données linguistiques grâce à la librairie [D3.js](https://d3js.org/) (cf. ci-dessous). En fin d'atelier (index_21.js), la librairie [tabletop.js](https://github.com/jsoma/tabletop) est utilisée pour charger des données stockées dans une feuille Google Docs publique.

![image](https://i.imgur.com/tVWx2Yr.png)

Le script réalisé durant l'atelier est divisé en une vingtaine d'étapes. Chacune d'elle est numérotée et dispose de son propre fichier dans le répertoire JS. Le répertoire contient également d'autres ressources, rassemblées à titre d'illustration.

## Matériel requis

1. [Visual Studio Code](https://code.visualstudio.com/Download)
2. le [plugin live reload](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

## Charger un script

1. télécharger l'archive
2. ouvrir index.html dans VS Code Editor
3. cliquer sur "Go Live" (dans la barre au bas de VS Code)

Changez de script en modifiant le numéro du fichier javascript à la ligne 18 du fichier "index.html"

## Conventions de notation

- /*    : signale l'objectif du script
- //>>  : signale un commentaire pour l'étape actuelle
- //    : signale un commentaire d'une étape précédente
- //!!  : signale une particularité de la librairie ou de js
- //??  : signale un exercice à réaliser pour vous tester

## Ressources complémentaires

- [Générer vos cartes GeoJSON](https://geojson-maps.ash.ms/)
- [Carte des rongeurs à Boston (copie dans cette archive)](http://duspviz.mit.edu/d3-workshop/mapping-data-with-d3/)
- [Exemple de carte en Leaflet (copie dans cette archive)](http://bl.ocks.org/ramiroaznar/577043744d523efd6ee981887b274d5a)
- [Carte du chômage aux US](https://observablehq.com/@jdev42092/week-10b-intro-to-d3-js-mapping-data-with-d3)
- [Animated state border maps](https://github.com/maptime-ams/animated-borders-d3js)

## Remarque générale

*Le code disponible dans cette archive a été pensé à des fins pédagogiques. A ce titre, il compte un certain nombre de redondances (pour faciliter l'acquisition), une variation syntaxique (pour présenter différents styles de codage) et n'est pas optimisé.*
