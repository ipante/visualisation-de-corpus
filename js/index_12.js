/* JOINDRE LES DONNEES DE PAYS : PROMESSES */

// créer le canevas
const canevas = d3.select('body')
  .append('svg')
  .attr("viewBox", "0 0 960 600")
  .style("width", "100%")
  .style("height", "auto");
// choisir la pojection
const maProjection = d3.geoMercator();
// la passer en paramètre du
// générateur de chemins
const genererChemins = d3.geoPath()
    .projection(maProjection);

// dessiner les chemins
canevas.append('path')
  .attr('class','monde')
  .attr('d',genererChemins({type :'Sphere'}))

//>> chargement des fichiers
Promise.all([
    //>> charger les données propres à chaque pays
    d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/110m.tsv'),
    //>> charger les coordonnées des polygones pour chaque pays
    d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
]).then(([tsv_data,json_data])=>{
    const pays = topojson.feature(json_data,json_data.objects.countries);   
    const chemins = canevas.selectAll('path')
        .data(pays.features)
        .enter()
        .append('path')
        .attr('class','pays')
        .attr('d',genererChemins)
        .attr('fill','purple')
        .append('title')
            .text('hello')

    console.log(json_data);
    console.log(pays);
});
