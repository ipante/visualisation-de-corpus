/* AJOUTER UN EFFET DE ZOOM */

// créer le canevas
const canevas = d3.select('body')
  .append('svg')
  .attr('width',window.innerWidth)
  .attr('height',window.innerHeight)
  //>> ajout du Zoom
  .call(d3.zoom().on("zoom", function(){
    canevas.attr("transform", d3.event.transform)
  }))
  .append("g")

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
        case 'CQE':
            return 'Canada'; 
        case 'RCA': 
            return 'Central African Rep.';
        case 'CIA':
            return "Côte d'Ivoire";
        case '81A':
        case '13B':
        case '75C':
        case '61A':              
            return 'France';                   
    }
}

Promise.all([
    // Joindre les données topojson
    d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/110m.tsv'),
    d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json'),
    // Joindre les données CSV
    d3.csv('donnees/donnees.csv', function(d){
        return {
            match : +d.Match[0],
            locuteur : d.Speaker,
            pays : convertir_en_pays(d.Survey),
            tache : d.Task           
          }
    })
    // Nommer les données CSV       
]).then(([tsv_data,json_data,donnees])=>{
    // préparation des données
    let donnees_groupees = d3.nest()
        //  groupement par pays
        .key(function(d) { return d.pays; })
        // pourcentage
        .rollup(function(v) {
            return +(100 * d3.mean(v, d => d.match)).toFixed(2)
        })
        .entries(donnees);
    console.log(donnees_groupees);    
    
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
        .attr('fill', d => {
            let couleur = 'lightgray';
            donnees_groupees.forEach(v => {
                if(noms_pays[d.id] == v.key){
                    couleur = echelle_couleur(v.value)
                }
            })
            return couleur; 
        })
        // ajout du nom
        .append('title')
            // refaire le même calcul
            .text(d => {
                let valeur = 'Non étudié'
                donnees_groupees.forEach(v =>{
                    if(noms_pays[d.id] == v.key){
                        valeur = v.value + '%';
                    }
                })
                return valeur;
            })
});