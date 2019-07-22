/* IMPORTATION DE DONNEES EN LIGNE AVEC TABLETOP.js */

//>> un exemple de ce code est disponible sur Codepen
//>> https://codepen.io/isaacpante/pen/OKyOZQ
//!! des librairies sont importées dans l'encart JS
//!! pensez à claiquer sur la petite roue crantée

//>> injection de l'url publique du fichier
//!! la procédure de création de cette url
//!! est disponible dans la documentation
//!! de tabletop.js : https://github.com/jsoma/tabletop
const url_publique_gdocs = 'https://docs.google.com/spreadsheets/d/1L1k85pJ4S75CIThBsbkhSw9VGnEow2bdxua7y590Ir4/edit?usp=sharing';

//>> initialisation de tabletop.js
//!! cf. documentation
function init() {
  Tabletop.init({
    key: url_publique_gdocs,
    callback: principale,
    simpleSheet: true } )
}

function principale(data){
  
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

  // créer une fonction pour convertir
  // les codes questionnaies en pays
  const convertir_en_pays = code_q => {
      switch(code_q){
          case 'SVA':
          case 'SCA':
              return 'Switzerland';
          case 'CQA':
          case 'CAA':
              return 'Canada'; 
          case 'RCA': 
              return 'Central African Rep.';
          case 'CIA':
              return "Côte d'Ivoire";
          case '81A':
          case '13B':
              return 'France';                   
      }
  }

  Promise.all([
      // Joindre les données topojson
      d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/110m.tsv'),
      d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')      
  ]).then(([tsv_data,json_data])=>{
      //>> préparation des données
      //>> création d'un tableau identique
      //>> à celui importé via d3.csv
      let donnees = [];
      data.forEach(d => {
        donnees.push({
            match : +d.Match[0],
            locuteur : d.Speaker,
            pays : convertir_en_pays(d.Survey),
            tache : d.Task 
        })
      }) 
    
      let donnees_groupees = d3.nest()
          //>>  groupement par pays
          .key(function(d) { return d.pays; })
          //>> pourcentage
          .rollup(function(v) {
              return +(100 * d3.mean(v, d => d.match)).toFixed(2)
          })
          .entries(donnees);
      console.log(donnees);    

      // créer un set de valeurs
      let set_schwa = new Set();
      // extraire les valeurs
      for(let {value} of donnees_groupees){
          set_schwa.add(value)
      }
      // convertir le set en tableau
      let tab_schwa = [...set_schwa];
      // créer une échelle de couleur
      const echelle_couleur = d3.scaleLinear()
          // définir le domaine des données
          .domain([0,d3.max(tab_schwa)])
          // définir les couleurs retenues
          .range(['blue','red']);

      // créer un objet pour les noms
      const noms_pays = {};
      // parcourir les données TSV
      tsv_data.forEach(d => {
          // créer des paires
          // id de pays : nom de pays
          noms_pays[d.iso_n3] = d.name;
      });
      const pays = topojson.feature(json_data,json_data.objects.countries);
      const chemins = canevas.selectAll('path')
          .data(pays.features)
          .enter()
          .append('path')
          .attr('class','pays')
          .attr('d',genererChemins)
          //>> ajout de la couleur
          .attr('fill', d => {
              let couleur = 'blue';
              donnees_groupees.forEach(v => {
                  if(noms_pays[d.id] == v.key){
                      couleur = echelle_couleur(v.value)
                  }
              })
              return couleur; 
          })
          // ajout du nom
          .append('title')
              // obtenir le nom de l'id
              // l'ajouter au contenu
              .text(d => noms_pays[d.id])
  });  
}
//>> initialisation une fois la page chargée
window.addEventListener('DOMContentLoaded', init);