/* PREMIERE VIS : UNE LIGNE DE 1000 PX */

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
        .key(function(d) { return d.survey; })
        .rollup(function(v) {
            return +(100 * d3.mean(v, d => d.match)).toFixed(2)
        })
        .entries(data);
    
    //>> ajout d'un rectangle de 1000 px
    let canevas = d3.select('body').append('svg');
        canevas.append('rect')
            .attr('x', 10)
            .attr('y', 5)
            .attr('width', 1000)
            .attr('height', 2)
    
    console.log(donnees_groupees);

});

