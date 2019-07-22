/* CREATION D'UNE BARRE PAR % DE SCHWA PAR TACHE */

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
        //>> grouper par tache
        .key(function(d) { return d.task; })
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

        // ajout des rectangles
        canevas.selectAll('rect')
            // joindre les données
            .data(donnees_groupees)
            // gestion des nouveaux noeuds
            .enter()
            .append('rect')
                .attr('x', 10)
                .attr('y', (d,i) => i*10)
                .attr('width', d => (d.value*1000)/100)
                .attr('height', 8)
    
    console.log(donnees_groupees);
});