/* REGROUPER DES DONNEES AVEC D3.NEST */

// importation des donnees
d3.csv("donnees.csv", function(d){
    return {
        match : +d.Match[0],
        speaker : d.Speaker,
        survey : d.Survey,
        task : d.Task           
      }    
}).then(function(data) {
    let donnees_groupees = d3.nest()
        //>> premier groupement
        .key(function(d) { return d.speaker; })
        //>> second groupement
        .key(function(d) { return d.task; })
        .entries(data);
    console.log(donnees_groupees);
});