/* CREER DES VARIABLES AD HOC : VIA EVALUATION */

// importation des donnees
d3.csv("donnees.csv", function(d){
    return {
        match : +d.Match[0],
        speaker : d.Speaker,
        survey : d.Survey,
        task : d.Task,
        contexte_p : d.Match[2],
        contexte_s : d.Match[3],
        //>> noms de variables avec espaces
        //>> règle de transformation
        debut_item : d['Item Start'] > 28 ? true : false            
      }    
}).then(function(data) {
    console.log(data[0]);
});