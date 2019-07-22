/* CREER DES VARIABLES AD HOC : INDEX DE CHAINE */

// importation des donnees
d3.csv("donnees.csv", function(d){
    return {
        //>> création de variables
        //>> conversion numérique avec +
        //>> accès à un caractère avec [n]
        //!! le code est sensible à la casse
        match : +d.Match[0],
        speaker : d.Speaker,
        survey : d.Survey,
        task : d.Task,
        contexte_p : d.Match[2],
        contexte_s : d.Match[3]        
      }    
}).then(function(data) {
    console.log(data[0]);
});