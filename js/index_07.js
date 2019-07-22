/* RESUMER DES DONNEES GROUPEES : MOYENNE */

// importation des donnees
d3.csv("donnees/donnees.csv", function(d){
    return {
        match : +d.Match[0],
        speaker : d.Speaker,
        survey : d.Survey,
        task : d.Task           
      }    
}).then(function(data) {
    let donnees_groupees = d3.nest()
        .key(function(d) { return d.survey; })
        .rollup(function(v) {
            //>> calcul de la moyenne
            //>> transformation en %
            //>> limitation à 2 décimales
            return +(100 * d3.mean(v, d => d.match)).toFixed(2)
        })
        .entries(data);
    console.log(donnees_groupees);    
});