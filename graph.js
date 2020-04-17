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

// Choix de l'étendue temporelle
let nombreJours = document.querySelector("#dateRange"),
    lectureJours = document.querySelector("output");

lectureJours.innerHTML = nombreJours.value + " jours";

nombreJours.addEventListener("input", function () {
    lectureJours.innerHTML = nombreJours.value + " jours";
}, false);

// Changement du pays sélectionné
function processData ( country, nbrDays ) {
    nbrDays = nombreJours.value;
    let decalage = (data[country].length - nbrDays);
    for (i=0; i<nbrDays; i++) {
        valeursX[i] = convertDate((data[country][decalage + i].date));
        valeursY[i] = (parseInt(data[country][decalage + i].confirmed_cases));
        valeursY2[i] = (parseInt(data[country][decalage + i].deaths));
    }
}
processData("France");

// Configuration du graphique
let largeurTotale = 1200, hauteurTotale = 600, 
margeGauche = 55, margeBas = 55, margeDroite = 10, margeHaut = 10, margeTexte = 10;
let largeurGraphique = largeurTotale - margeGauche - margeDroite;
let hauteurGraphique = hauteurTotale - margeBas - margeHaut;
let paper = Snap("#svgout"); 
let degradeFond = paper.gradient("l(0, 1, 1, 0)#64B5F6-#FFF");
let degradeBarresY = paper.gradient("l(1,0,0,1)#b71c1c-#e57373");
let degradeBarresY2 = paper.gradient("l(1,0,0,1)#000000-#640000");

// Choix de la présentation À FAIRE !!!
let choixPresentation = document.getElementsByName("choixPres").value;

// Initialisation couleur par défaut dans le HTML
let entreeCouleurCas = document.getElementById("couleurCas");
let couleurCas = entreeCouleurCas.value;
entreeCouleurCas.addEventListener("input", function() {
    couleurBarresY = entreeCouleurCas.value;
    dessinerGraph();
    }, false);
    
let entreeCouleurMorts = document.getElementById("couleurMorts");
let couleurMorts = entreeCouleurMorts.value;
entreeCouleurMorts.addEventListener("input", function() {
    couleurBarresY2 = entreeCouleurMorts.value;
    dessinerGraph();
    }, false);

let couleurBarresY = couleurCas;
let couleurBarresY2 = couleurMorts;


// Dessin du fond du graphique
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
let maxY = Math.max(...valeursY)
let ordreDeGrandeur ;
if (maxY < 20000) {ordreDeGrandeur = 1000;}
else {ordreDeGrandeur = 10000;}
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
let proportionBarre = 0.7;

// Fonction dessiner l'intérieur du graphique
const dessinerGraph = function() {
    dessinerFond();
    dessinerLignes();

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
            .animate({height: hauteurBarre}, 800)
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
            .animate({height: hauteurBarre}, 800)
            .append( title2 );
        }
    }

    const dessinerCourbes = function() {
        let pathY = "M" + (margeGauche + largeurGraphique) + "," + (margeHaut + hauteurGraphique)
            + "l-" + largeurGraphique + ",0" 
            + "l0,-" + (valeursY[0] / etendueY * hauteurGraphique);
        
        for (i=0; i<valeursY.length; i++) {
            let hauteurBarre = valeursY[i] / etendueY * hauteurGraphique;
            let title = Snap.parse('<title>' + valeursY[i] + ' cas confirmés au ' + valeursX[i] + '</title>');
            let pointsY = paper.circle(
                margeGauche + i * largeurBarre + largeurBarre / 2,
                margeHaut + hauteurGraphique - hauteurBarre,
                4)
            .attr( {fill: couleurBarresY} )
            .append( title );

            pathY += "L" + (margeGauche + i * largeurBarre + largeurBarre / 2) + "," + (margeHaut + hauteurGraphique - hauteurBarre);
        }

        let courbeY = paper
                .path(pathY 
                    + "l" + (largeurBarre / 2) + "," + "0 " + "Z")
                .attr({"stroke-width": 0, fill: couleurBarresY, "fill-opacity": "60%"});
                
        let pathY2 = "M" + (margeGauche + largeurGraphique) + "," + (margeHaut + hauteurGraphique)
            + "l-" + largeurGraphique + ",0" 
            + "l0,-" + (valeursY2[0] / etendueY * hauteurGraphique);
        
        for (i=0; i<valeursY2.length; i++) {
            let hauteurBarre = valeursY2[i] / etendueY * hauteurGraphique;
            let title = Snap.parse('<title>' + valeursY2[i] + ' morts au ' + valeursX[i] + '</title>');
            let pointsY = paper.circle(
                margeGauche + i * largeurBarre + largeurBarre / 2,
                margeHaut + hauteurGraphique - hauteurBarre,
                4)
            .attr( {fill: couleurBarresY2} )
            .append( title );

            pathY2 += "L" + (margeGauche + i * largeurBarre + largeurBarre / 2) + "," + (margeHaut + hauteurGraphique - hauteurBarre);
        }
        
        let courbeY2 = paper
                .path(pathY2 
                    + "l" + (largeurBarre / 2) + "," + "0 " + "Z")
                .attr({"stroke-width": 0, fill: couleurBarresY2, "fill-opacity": "60%"});
    }
    
    dessinerBarres();
    // dessinerCourbes();

    // Dessiner le texte
    for (i=0; i<valeursX.length; i++) {
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

dessinerGraph();

// Incorporation des drapeaux
let drapeauFrance = paper.svg()

function changeEventHandler(event) {
    processData(event.target.getAttribute("country"), (Number(nombreJours.value)));
   
    dessinerGraph();
 }
