var xmlhttp = new XMLHttpRequest();
let data = {}; // sera rempli après la requête
xmlhttp.open('GET', 'data.json', false);
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
        if(xmlhttp.status == 200) {
            data = JSON.parse(xmlhttp.responseText);
         }
    }
};
xmlhttp.send(null);

// Convertir les données en 3 arrays 
let valeursX = [], valeursY = [], valeursY2 = [];

const convertDate = function(dateUS) {
    let array = dateUS.split("/");
    if (array[0] < 10) {array[0] = "0" + array[0]};
    return array[1] + "/" + array[0]
};

// Changement du pays sélectionné
function processData ( country, nbrDays ) {
    let decalage = (data[country].length - nbrDays);
    for (i=0; i<nbrDays; i++) {
        valeursX[i] = convertDate((data[country][decalage + i].date));
        valeursY[i] = (parseInt(data[country][decalage + i].confirmed_cases));
        valeursY2[i] = (parseInt(data[country][decalage + i].deaths));
    }
}
processData("France", 61);

// Déterminer la valeur maximale de la dernière donnée "confirmed_cases" (marche pour le moment car ce ne sont que des courbes ascendantes, mais ne marchera plus quand ça commencera à descendre)
const maxConf = [];
for (const pays in data) {
    let max = Number(data[pays][data[pays].length-1]["confirmed_cases"]);
    maxConf.push( {pays, max} );
}
let maxConfCountry = maxConf[0];
for (let i=0; i<maxConf.length; i++) {
    if (maxConf[i]["max"] > maxConfCountry.max) {
        maxConfCountry = maxConf[i];
    }
}
let maxY = maxConfCountry.max - maxConfCountry.max%10000 + 10000;

// Configuration du graphique
let paper = Snap("#svgout"); 

// TODO Choix de la présentation 
let choixPresentation = document.getElementsByName("choixPres").value;

// Initialisation couleur par défaut dans le HTML
let entreeCouleurCas = document.getElementById("couleurCas");
let couleurCas = entreeCouleurCas.value;
let couleurBarresY = couleurCas;
entreeCouleurCas.addEventListener("input", function() {
    couleurBarresY = entreeCouleurCas.value;
    dessinerGraph(paper, valeursX, valeursY, valeursY2, couleurBarresY, couleurBarresY2);
    }, false);
let entreeCouleurMorts = document.getElementById("couleurMorts");
let couleurMorts = entreeCouleurMorts.value;
let couleurBarresY2 = couleurMorts;
entreeCouleurMorts.addEventListener("input", function() {
    couleurBarresY2 = entreeCouleurMorts.value;
    dessinerGraph(paper, valeursX, valeursY, valeursY2, couleurBarresY, couleurBarresY2);
    }, false);



// Fonction dessiner l'intérieur du graphique
const dessinerGraph = function(paper, valeursX, valeursY, valeursY2, couleurBarresY, couleurBarresY2) {
    let largeurTotale = 1200, hauteurTotale = 600, margeGauche = 55, margeBas = 55, margeDroite = 10, margeHaut = 10, margeTexte = 10;
    let largeurGraphique = largeurTotale - margeGauche - margeDroite;
    let hauteurGraphique = hauteurTotale - margeBas - margeHaut;
    
    // Dessin du fond du graphique
    let degradeFond = paper.gradient("l(0, 1, 1, 0)#64B5F6-#FFF");
    const dessinerFond = function () {
        let cadre = paper.rect(0,0,largeurTotale,hauteurTotale).attr({fill: "white"});
        let fond = paper.rect(margeGauche, margeHaut, largeurGraphique, hauteurGraphique)
            .attr({ 
                fill: degradeFond,  
                "stroke-width": 0 
            }); 
    }
    dessinerFond();

    // Dessiner les lignes horizontales en fonction du tableau
    let ordreDeGrandeur = (maxY < 20000) ? 1000 : 10000;
    let etendueY = (Math.ceil(maxY/ordreDeGrandeur))*ordreDeGrandeur;
    let nbrLignes = (etendueY/ordreDeGrandeur) - 1;
    let interligne = hauteurGraphique / (nbrLignes + 1);

    const dessinerLignes = function () {
        for (i=1; i<=nbrLignes; i++) {
            let ligne = paper
            .path("M" + margeGauche + "," + (margeHaut + i*interligne) + "l" + largeurGraphique + ",0")
            .attr({"stroke-width": 1, stroke: "white"});
        }
    }
    dessinerLignes();    
    let largeurBarre = largeurGraphique / valeursX.length;
    let proportionBarre = .7;

    const dessinerBarres = function() {
        for (i=0; i<valeursY.length; i++) {
            let hauteurBarre = valeursY[i] / etendueY * hauteurGraphique;
            let title = Snap.parse('<title>' + valeursY[i] + ' cas confirmés au ' + valeursX[i] + '</title>');
            let barre = paper.rect(
                margeGauche + i * largeurBarre + ((largeurBarre - largeurBarre*proportionBarre) / 2),
                margeHaut + hauteurGraphique,
                proportionBarre * largeurBarre, 
                0)
            .attr({
                fill: couleurBarresY,
                "stroke-width": 0,  
            })
            .transform("r180, " + (margeGauche + i * largeurBarre + (largeurBarre / 2)) + "," + (margeHaut + hauteurGraphique))
            .animate({height: hauteurBarre}, 1000)
            .append( title );
        }
        for (i=0; i<valeursY2.length; i++) {
            let hauteurBarre = valeursY2[i] / etendueY * hauteurGraphique;
            let title2 = Snap.parse('<title>' + valeursY2[i] + ' morts au ' + valeursX[i] + '</title>');
            let barre = paper.rect(
                margeGauche + i * largeurBarre + ((largeurBarre - largeurBarre*proportionBarre) / 2),
                margeHaut + hauteurGraphique,
                proportionBarre * largeurBarre, 
                0)
            .attr({
                fill: couleurBarresY2,
                "stroke-width": 0,  
            })
            .transform("r180, " + (margeGauche + i * largeurBarre + (largeurBarre / 2)) + "," + (margeHaut + hauteurGraphique))
            .animate({height: hauteurBarre}, 1000)
            .append( title2 );
        }
    }
    dessinerBarres();

    // Dessiner le texte
    for (i=0; i<valeursX.length; i+=2) {
        let texteX = paper.text(
            margeGauche + i * largeurBarre + largeurBarre / 2, 
            margeHaut + hauteurGraphique + margeTexte, 
            valeursX[i])
            .attr(
                {"font-family": "'Roboto Condensed'", "font-size": "12px", "textAnchor": "middle", "baseline-shift": "-1ex"}
            );
    }
    for (i=1; i<=nbrLignes; i++) {
        let texteY = paper.text(
            margeGauche - margeTexte, 
            margeHaut + i*interligne, 
            etendueY*(nbrLignes+1-i)/(nbrLignes+1))
            .attr(
                {"textAnchor": "end", "baseline-shift": "-0.5ex","font-family": "'Roboto Condensed'", "font-size": "12px"}
            );
    }
};

dessinerGraph(paper, valeursX, valeursY, valeursY2, couleurBarresY, couleurBarresY2);

function changeEventHandler(event) {
    processData(event.target.getAttribute("country"), 61);
   
    dessinerGraph(paper, valeursX, valeursY, valeursY2, couleurBarresY, couleurBarresY2);
 }
