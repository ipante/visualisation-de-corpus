/* IMPORTER DES DONNEES CSV */

//>> importation brute des données
d3.csv("donnees.csv").then(function(data) {
    console.log(data);
});