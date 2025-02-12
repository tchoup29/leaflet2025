// Initialiser la carte
var map = L.map('map', {
center: [48.11,-1.64],
zoom: 15 });

// Ajouter une attribution personnalisée directement via la carte
map.attributionControl.addAttribution
('réalsiation: <a href="https://esigat.wordpress.com/" target="_blank">Master SIGAT </a>  Master SIGAT OSM/RennesMétropole');
 

//Appel du fond de carte

var basemaps = {
  OSM: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'),
  OSM2: L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png'),
  OSM3: L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'),
  OrthoRM:L.tileLayer.wms('https://public.sig.rennesmetropole.fr/geoserver/ows?',{layers: 'raster:ortho2021'}),
  PlanRM:L.tileLayer.wms('https://public.sig.rennesmetropole.fr/geoserver/ows?',{layers: 'ref_fonds:pvci_simple_gris'}),
};
basemaps.OSM.addTo(map);


// Ajouter l'echelle cartographique
L.control.scale().addTo(map);

// Ajouter une MiniMap

var miniMapLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png');
var miniMap = new L.Control.MiniMap(miniMapLayer, { toggleDisplay: true,
minimized: false, position: 'bottomright'
}).addTo(map);



// ajouter markeur Rennes2 

var popuprennes2 = '<h1>Université Rennes 2 </h1> <br> <img src="https://www.echosciences-bretagne.bzh/uploads/place/image/attachment/1005216262/lg_Campus_Villejean_-_Rennes.jpg" width="350px">';

var customOptions = {'maxWidth': '500', 'className' : 'custom'}

var rennes2icone = L.icon({
iconUrl: 'https://media.theapolis.de/uploads/organization/655cb49559dee.png',
iconSize: [30, 30] });

var Rennes2 = L.marker([48.119, -1.7013],{icon: rennes2icone}).bindPopup(popuprennes2,customOptions);



// Ajouter un gestionnaire d'événements pour le survol (hover)
Rennes2.on('mouseover', function (e) {
this.openPopup();
});



//ajout du cadastre en wms
var cadastre = L.tileLayer.wms('http://geobretagne.fr/geoserver/cadastre/wms',
{layers: 'CP.CadastralParcel',format: 'image/png',transparent: true});

var bati = L.tileLayer.wms('https://public.sig.rennesmetropole.fr/geoserver/ows?',
{layers: 'ref_cad:batiment',format: 'image/png',transparent: true,opacity :0.5});

var voirie = L.tileLayer.wms('https://public.sig.rennesmetropole.fr/geoserver/ows?',
{layers: 'trp_doux:v_voirie_amenagement_velo',format: 'image/png',transparent: true});

var trafic = L.tileLayer.wms('https://public.sig.rennesmetropole.fr/geoserver/ows?',
{layers: 'trp_rout:v_rva_trafic_fcd',format: 'image/png',transparent: true});



// Ajouter un gestionnaire d'événements pour quitter le survol (hover)
Rennes2.on('mouseout', function (e) {
this.closePopup();
});








// ajouter Marker gare

var popupgare = '<h1> Gare </h1> <br> <img src="https://www.rennes-congres.fr/voy_content/uploads/sites/3/2023/09/fh-Gare-82--1024x593.jpg" width="350px">';

var customOptions = {'maxWidth': '500', 'className' : 'custom'}

var Gareicone = L.icon({
iconUrl: 'https://lesjours.fr/ressources/res840/square/people/sncf.jpeg',
iconSize: [30, 30] });

var Gare = L.marker([48.103, -1.672],{icon: Gareicone}).bindPopup(popupgare,customOptions).addTo(map);


// Gestion des markers 

var marqueurs = {"Université Rennes2": Rennes2, "Gare de Rennes": Gare, "Cadastre" : cadastre, "Batiment": bati,"voirie":voirie, "trafic":trafic};

// Ajouter le controleur de couche 

var menu1 = L.control.layers(basemaps, null, {position: 'topright', collapsed : false }).addTo(map);

var menu2 = L.control.layers(null, basemaps, {position: 'topright', collapsed : false }).addTo(map);

// Fonction pour ajouter un titre à un contrôle de couche
function ajouterTitre(controle, titre) {
    var container = controle.getContainer();
    var titleDiv = document.createElement("div");
    titleDiv.innerHTML = "<strong>" + titre + "</strong>";
    titleDiv.style.textAlign = "center";
    titleDiv.style.padding = "5px";
    titleDiv.style.background = "white";
    titleDiv.style.borderBottom = "1px solid #ccc";
    
    // Insérer le titre avant le contenu du contrôle
    container.insertBefore(titleDiv, container.firstChild);
}

// Ajouter des titres aux contrôles
ajouterTitre(menu1, "Fonds de carte");
ajouterTitre(menu2, "couches thématique");