/* RESUMER DES DONNEES GROUPEES AVEC ROLLUP */

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
        .key(function(d) { return d.match; })
        //>> récupérer le nombre avec Rollup
        .rollup(function(v) { return v.length; })
        .entries(data);
    console.log(donnees_groupees);    
});