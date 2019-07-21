/* RENOMMER ET FILTRER LES DONNEES */

// importation des donnees
d3.csv("donnees.csv", function(d){
    //>> réduction avec une fonction
    //>> d'accesseur
    return {
        match : d.Match,
        speaker : d.Speaker,
        survey : d.Survey,
        task : d.Task
      }    
}).then(function(data) {
    console.log(data);
});
