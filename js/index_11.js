/* CHARGEMENT D'UNE CARTE DU MONDE EN D3 */

// créer le canevas
const canevas = d3.select('body')
  .append('svg')
  .attr('width',window.innerWidth)
  .attr('height',window.innerHeight)
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

// récupérer les coordonnées
// pour dessiner les pays
d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
  .then(donnees => {
  console.log(donnees)
  // dessiner les pays
  const pays = topojson.feature(donnees,donnees.objects.countries);
  const chemins = canevas.selectAll('path').data(pays.features);
  chemins.enter()
    .append('path')
      .attr('class','pays')
      .attr('d',genererChemins)
      .attr('fill','purple')
});