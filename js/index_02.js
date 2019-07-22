/* RENOMMER ET FILTRER LES DONNEES */

// importation des donnees
d3.csv("donnees/donnees.csv", function(d){
    //>> réduction avec une fonction
    //>> d'accesseur
    //!! par défaut, retourne du texte
    return {
        match : d.Match,
        speaker : d.Speaker,
        survey : d.Survey,
        task : d.Task
      }    
}).then(function(data) {
    console.log(data);
});