/* CHARGEMENT D'UNE CARTE DU MONDE EN D3 */

// créer le canevas
const canevas = d3.select('body')
  .append('svg')
  //> améliorer le cadrage par l'ajout
  //> d'une viewbox
  .attr("viewBox", "0 0 960 600")
  .style("width", "100%")
  .style("height", "auto");
//> choisir la pojection
const maProjection = d3.geoMercator();
//> la passer en paramètre du
//> générateur de chemins
const genererChemins = d3.geoPath()
    .projection(maProjection);

//> dessiner les chemins
canevas.append('path')
  .attr('class','monde')
  .attr('d',genererChemins({type :'Sphere'}))

//> récupérer les coordonnées
//> pour dessiner les pays
d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
  .then(donnees => {
  console.log(donnees)
  //>> formater les données en pays
  const pays = topojson.feature(donnees,donnees.objects.countries);
  //>> créer les chemins
  const chemins = canevas.selectAll('path')
    //>> passer les données
    .data(pays.features)
    .enter()
    //!! l'élément SVG path demande
    //!! un attribut 'd' contenant
    //!! les coordonnées du chemin
    .append('path')
      .attr('class','pays')
      //> calculer le chemin
      .attr('d',genererChemins)
      .attr('fill','purple')
});