// PREMIERE VISUALISATION
// AJOUTER NOS DIFFERENTES
// PROPORTIONS DE SCHWA
// PAR NOMBRE DE LOCUTEURS

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
        .key(function(d) { return d.speaker; })
        .rollup(function(v) {
            return +(100 * d3.mean(v, d => d.match)).toFixed(2)
        })
        .entries(data);

    let canevas = d3.select('body').append('svg');
        canevas.append('rect')
            .attr('x', 10)
            .attr('y', 5)
            .attr('width', 1000)
            .attr('height', 2)

        canevas.selectAll('rect')
            .data(donnees_groupees)
            .enter()
            .append('rect')
                .attr('x', 10)
                .attr('y', (d,i) => i*10)
                .attr('width', d => (d.value*1000)/100)
                .attr('height', 8)
    
    console.log(donnees_groupees);
});