// Récupérer données
let data = {
    "France": [
        {"date": "3/1/20", "confirmed_cases": "130", "deaths": "2"},
        {"date": "3/2/20", "confirmed_cases": "191", "deaths": "3"},
        {"date": "3/3/20", "confirmed_cases": "204", "deaths": "4"},
        {"date": "3/4/20", "confirmed_cases": "285", "deaths": "4"},
        {"date": "3/5/20", "confirmed_cases": "377", "deaths": "6"},
        {"date": "3/6/20", "confirmed_cases": "653", "deaths": "9"},
        {"date": "3/7/20", "confirmed_cases": "949", "deaths": "11"},
        {"date": "3/8/20", "confirmed_cases": "1126", "deaths": "19"},
        {"date": "3/9/20", "confirmed_cases": "1209", "deaths": "19"},
        {"date": "3/10/20", "confirmed_cases": "1784", "deaths": "33"},
        {"date": "3/11/20", "confirmed_cases": "2281", "deaths": "48"},
        {"date": "3/12/20", "confirmed_cases": "2281", "deaths": "48"},
        {"date": "3/13/20", "confirmed_cases": "3661", "deaths": "79"},
        {"date": "3/14/20", "confirmed_cases": "4469", "deaths": "91"},
        {"date": "3/15/20", "confirmed_cases": "4499", "deaths": "91"},
        {"date": "3/16/20", "confirmed_cases": "6633", "deaths": "148"},
        {"date": "3/17/20", "confirmed_cases": "7652", "deaths": "148"},
        {"date": "3/18/20", "confirmed_cases": "9043", "deaths": "148"},
        {"date": "3/19/20", "confirmed_cases": "10871", "deaths": "243"},
        {"date": "3/20/20", "confirmed_cases": "12612", "deaths": "450"},
        {"date": "3/21/20", "confirmed_cases": "14282", "deaths": "562"},
        {"date": "3/22/20", "confirmed_cases": "16018", "deaths": "674"},
        {"date": "3/23/20", "confirmed_cases": "19856", "deaths": "860"},
        {"date": "3/24/20", "confirmed_cases": "22304", "deaths": "1100"},
        {"date": "3/25/20", "confirmed_cases": "25233", "deaths": "1331"},
        {"date": "3/26/20", "confirmed_cases": "29155", "deaths": "1696"},
        {"date": "3/27/20", "confirmed_cases": "32964", "deaths": "1995"},
        {"date": "3/28/20", "confirmed_cases": "37575", "deaths": "2314"},
        {"date": "3/29/20", "confirmed_cases": "40174", "deaths": "2606"},
        {"date": "3/30/20", "confirmed_cases": "44550", "deaths": "3024"},
        {"date": "3/31/20", "confirmed_cases": "52128", "deaths": "3523"},
        {"date": "4/1/20", "confirmed_cases": "56989", "deaths": "4032"},
        {"date": "4/2/20", "confirmed_cases": "59105", "deaths": "5387"},
        {"date": "4/3/20", "confirmed_cases": "64338", "deaths": "6507"},
        {"date": "4/4/20", "confirmed_cases": "89953", "deaths": "7560"},
        {"date": "4/5/20", "confirmed_cases": "92839", "deaths": "8078"},
        {"date": "4/6/20", "confirmed_cases": "98010", "deaths": "8911"},
        {"date": "4/7/20", "confirmed_cases": "109069", "deaths": "10328"},
        {"date": "4/8/20", "confirmed_cases": "112950", "deaths": "10869"},
    ],
    "Brazil": [
        {"date": "3/1/20", "confirmed_cases": "2", "deaths": "0"},
        {"date": "3/2/20", "confirmed_cases": "2", "deaths": "0"},
        {"date": "3/3/20", "confirmed_cases": "2", "deaths": "0"},
        {"date": "3/4/20", "confirmed_cases": "4", "deaths": "0"},
        {"date": "3/5/20", "confirmed_cases": "4", "deaths": "0"},
        {"date": "3/6/20", "confirmed_cases": "13", "deaths": "0"},
        {"date": "3/7/20", "confirmed_cases": "13", "deaths": "0"},
        {"date": "3/8/20", "confirmed_cases": "20", "deaths": "0"},
        {"date": "3/9/20", "confirmed_cases": "25", "deaths": "0"},
        {"date": "3/10/20", "confirmed_cases": "31", "deaths": "0"},
        {"date": "3/11/20", "confirmed_cases": "38", "deaths": "0"},
        {"date": "3/12/20", "confirmed_cases": "52", "deaths": "0"},
        {"date": "3/13/20", "confirmed_cases": "151", "deaths": "0"},
        {"date": "3/14/20", "confirmed_cases": "151", "deaths": "0"},
        {"date": "3/15/20", "confirmed_cases": "162", "deaths": "0"},
        {"date": "3/16/20", "confirmed_cases": "200", "deaths": "0"},
        {"date": "3/17/20", "confirmed_cases": "321", "deaths": "1"},
        {"date": "3/18/20", "confirmed_cases": "372", "deaths": "3"},
        {"date": "3/19/20", "confirmed_cases": "621", "deaths": "6"},
        {"date": "3/20/20", "confirmed_cases": "793", "deaths": "11"},
        {"date": "3/21/20", "confirmed_cases": "1021", "deaths": "15"},
        {"date": "3/22/20", "confirmed_cases": "1546", "deaths": "25"},
        {"date": "3/23/20", "confirmed_cases": "1924", "deaths": "34"},
        {"date": "3/24/20", "confirmed_cases": "2247", "deaths": "46"},
        {"date": "3/25/20", "confirmed_cases": "2554", "deaths": "59"},
        {"date": "3/26/20", "confirmed_cases": "2985", "deaths": "77"},
        {"date": "3/27/20", "confirmed_cases": "3417", "deaths": "92"},
        {"date": "3/28/20", "confirmed_cases": "3904", "deaths": "111"},
        {"date": "3/29/20", "confirmed_cases": "4256", "deaths": "136"},
        {"date": "3/30/20", "confirmed_cases": "4579", "deaths": "159"},
        {"date": "3/31/20", "confirmed_cases": "5717", "deaths": "201"},
        {"date": "4/1/20", "confirmed_cases": "6836", "deaths": "240"},
        {"date": "4/2/20", "confirmed_cases": "8044", "deaths": "324"},
        {"date": "4/3/20", "confirmed_cases": "9056", "deaths": "359"},
        {"date": "4/4/20", "confirmed_cases": "10360", "deaths": "445"},
        {"date": "4/5/20", "confirmed_cases": "11130", "deaths": "486"},
        {"date": "4/6/20", "confirmed_cases": "12161", "deaths": "564"},
        {"date": "4/7/20", "confirmed_cases": "14034", "deaths": "686"},
        {"date": "4/8/20", "confirmed_cases": "16170", "deaths": "819"},
    ],
    "United Kingdom": [
        {"date": "3/1/20", "confirmed_cases": "36", "deaths": "0"},
        {"date": "3/2/20", "confirmed_cases": "40", "deaths": "0"},
        {"date": "3/3/20", "confirmed_cases": "51", "deaths": "0"},
        {"date": "3/4/20", "confirmed_cases": "85", "deaths": "0"},
        {"date": "3/5/20", "confirmed_cases": "115", "deaths": "1"},
        {"date": "3/6/20", "confirmed_cases": "163", "deaths": "2"},
        {"date": "3/7/20", "confirmed_cases": "206", "deaths": "2"},
        {"date": "3/8/20", "confirmed_cases": "273", "deaths": "3"},
        {"date": "3/9/20", "confirmed_cases": "321", "deaths": "4"},
        {"date": "3/10/20", "confirmed_cases": "382", "deaths": "6"},
        {"date": "3/11/20", "confirmed_cases": "456", "deaths": "8"},
        {"date": "3/12/20", "confirmed_cases": "456", "deaths": "8"},
        {"date": "3/13/20", "confirmed_cases": "798", "deaths": "8"},
        {"date": "3/14/20", "confirmed_cases": "1140", "deaths": "21"},
        {"date": "3/15/20", "confirmed_cases": "1140", "deaths": "21"},
        {"date": "3/16/20", "confirmed_cases": "1543", "deaths": "55"},
        {"date": "3/17/20", "confirmed_cases": "1950", "deaths": "55"},
        {"date": "3/18/20", "confirmed_cases": "2626", "deaths": "71"},
        {"date": "3/19/20", "confirmed_cases": "2689", "deaths": "137"},
        {"date": "3/20/20", "confirmed_cases": "3983", "deaths": "177"},
        {"date": "3/21/20", "confirmed_cases": "5018", "deaths": "233"},
        {"date": "3/22/20", "confirmed_cases": "5683", "deaths": "281"},
        {"date": "3/23/20", "confirmed_cases": "6650", "deaths": "335"},
        {"date": "3/24/20", "confirmed_cases": "8077", "deaths": "422"},
        {"date": "3/25/20", "confirmed_cases": "9529", "deaths": "465"},
        {"date": "3/26/20", "confirmed_cases": "11658", "deaths": "578"},
        {"date": "3/27/20", "confirmed_cases": "14543", "deaths": "759"},
        {"date": "3/28/20", "confirmed_cases": "17089", "deaths": "1019"},
        {"date": "3/29/20", "confirmed_cases": "19522", "deaths": "1228"},
        {"date": "3/30/20", "confirmed_cases": "22141", "deaths": "1408"},
        {"date": "3/31/20", "confirmed_cases": "25150", "deaths": "1789"},
        {"date": "4/1/20", "confirmed_cases": "29474", "deaths": "2352"},
        {"date": "4/2/20", "confirmed_cases": "33718", "deaths": "2921"},
        {"date": "4/3/20", "confirmed_cases": "38168", "deaths": "3605"},
        {"date": "4/4/20", "confirmed_cases": "41903", "deaths": "4313"},
        {"date": "4/5/20", "confirmed_cases": "47806", "deaths": "4934"},
        {"date": "4/6/20", "confirmed_cases": "51608", "deaths": "5373"},
        {"date": "4/7/20", "confirmed_cases": "55242", "deaths": "6159"},
        {"date": "4/8/20", "confirmed_cases": "60733", "deaths": "7097"},
    ],
}

// Convertir les données en 3 arrays 
let valeursX = [], valeursY = [], valeursY2 = [];

const convertDate = function(dateUS) {
    let array = dateUS.split("/");
    if (array[0] < 10) {array[0] = "0" + array[0]};
    return array[1] + "/" + array[0]
};

for (i=0; i<data.France.length; i++) {
    valeursX[i] = convertDate((data.France[i].date));
    valeursY[i] = (parseInt(data.France[i].confirmed_cases));
    valeursY2[i] = (parseInt(data.France[i].deaths));
}

// Configuration du graphique
let largeurTotale = 1200, hauteurTotale = 600, 
margeGauche = 45, margeBas = 200, margeDroite = 10, margeHaut = 10, margeTexte = 10;
let largeurGraphique = largeurTotale - margeGauche - margeDroite;
let hauteurGraphique = hauteurTotale - margeBas - margeHaut;
let paper = Snap("#svgout"); 
let degradeFond = paper.gradient("l(0, 1, 1, 0)#64B5F6-#FFF");
let degradeBarresY = paper.gradient("l(1,0,0,1)#b71c1c-#e57373");
let degradeBarresY2 = paper.gradient("l(1,0,0,1)#000000-#640000");

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

console.log(valeursY);
// // Fonction dessiner l'intérieur du graphique
const dessinerGraph = function() {
    dessinerFond();
    dessinerLignes();

    // Dessiner les barres
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

    // Dessiner le texte
    for (i=0; i<valeursX.length; i++) {
        let texteX = paper.text(
            margeGauche + i * largeurBarre + ((largeurBarre - largeurBarre*proportionBarre) / 2), 
            margeHaut + hauteurGraphique + margeTexte, 
            valeursX[i])
            .attr(
                {"font-family": "'Teko'", "font-size": "12px", "text-align": "center"}
            );
    }
    for (i=1; i<=nbrLignes; i++) {
        let texteY = paper.text(
            margeGauche - margeTexte, 
            margeHaut + i*interligne +3, 
            etendueY*(nbrLignes+1-i)/(nbrLignes+1))
            .attr(
                {"text-anchor": "end", "font-family": "'Teko'", "font-size": "12px"}
            );
    }
};

dessinerGraph();

// Incorporation des drapeaux
let drapeauFrance = paper.svg()


// Changement du pays sélectionné
function changeEventHandler(event) {
    if (event.target.value == "France" ) {
        for (i=0; i<data.France.length; i++) {
            valeursX[i] = convertDate((data.France[i].date));
            valeursY[i] = (parseInt(data.France[i].confirmed_cases));
            valeursY2[i] = (parseInt(data.France[i].deaths));
        }
    }
    else if (event.target.value == "Brésil" ) {
        for (i=0; i<data.Brazil.length; i++) {
            valeursX[i] = convertDate((data.Brazil[i].date));
            valeursY[i] = (parseInt(data.Brazil[i].confirmed_cases));
            valeursY2[i] = (parseInt(data.Brazil[i].deaths));
        }
    }
    else if (event.target.value == "Royaume-Uni" ) {
        for (i=0; i<data["United Kingdom"].length; i++) {
            valeursX[i] = convertDate((data["United Kingdom"][i].date));
            valeursY[i] = (parseInt(data["United Kingdom"][i].confirmed_cases));
            valeursY2[i] = (parseInt(data["United Kingdom"][i].deaths));
        }
    }
    dessinerGraph();
 }




// Des petits carré pour la légende
// let paperCarre1 = Raphael("carre1", "1em", "1em");
// let rectangleCarre1 = paperCarre1.rect(0,0,"1em","1em").attr({
//     gradient: monDegrade(couleur1),
//     "stroke-width": 0
// });

// let paperCarre2 = Raphael("carre2", "1em","1em");
// let rectangleCarre2 = paperCarre2.rect(0,0,"1em","1em").attr({
//     gradient: monDegrade(couleur2),
//     "stroke-width": 0
// });