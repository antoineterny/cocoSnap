let casesCSV, deathsCSV, data;
const promCases = fetch(
  "https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
)
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    casesCSV = data;
  })
  .catch((err) => {
    console.log(err);
  });

const promDeaths = fetch(
  "https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"
)
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    deathsCSV = data;
  })
  .catch((err) => {
    console.log(err);
  });

let selectedCountries = [
    "France",
    "United Kingdom",
    "Germany",
    "Spain",
    "Italy",
    "Portugal",
];

function creationBoutons(selectedCountries) {
    for (let country of selectedCountries) {
        choixPays.innerHTML += `<label><input type="radio" name="choixPays" value="${country}" country="${country}"></input>${country}</label>`;
    }
    document.querySelector('#choixPays input').setAttribute("checked", true);
    document.querySelectorAll('#choixPays input').forEach(radioBtn =>
        radioBtn.addEventListener("click", function(event) {
            processData(event.target.getAttribute("value"), joursAffiches());
            dessinerGraph(valeursX, valeursY, valeursY2);
        })
    )
}

function traitementCSV(casesCSV, deathsCSV) {
    let allCasesLines = casesCSV.split("\n");
    let allDeathsLines = deathsCSV.split("\n");
    let data = {};
    const dates = allCasesLines[0].split(",").slice(4);
    for (i = 1; i < allCasesLines.length; i++) {
        let currentLine = allCasesLines[i].split(",");
        let currentCountry = currentLine[1];
        if (
            selectedCountries.includes(currentCountry) &&
            currentLine[0] === ""
        ) {
            let confirmedCases = currentLine.slice(4);
            data[currentCountry] = [];
            for (j = 0; j < confirmedCases.length; j++) {
            data[currentCountry].push({
                date: dates[j],
                confirmed_cases: confirmedCases[j],
            });
            }
        }
    }
    for (i = 1; i < allDeathsLines.length; i++) {
        let currentLine = allDeathsLines[i].split(",");
        let currentCountry = currentLine[1];
        if (
            selectedCountries.includes(currentCountry) &&
            currentLine[0] === ""
        ) {
            let confirmedDeaths = currentLine.slice(4);
            for (j = 0; j < confirmedDeaths.length; j++) {
            data[currentCountry][j]["deaths"] = confirmedDeaths[j];
            }
        }
    }
    return data;
}

window.onload = function() {
    init();
}
function init() {
    if (!casesCSV || !deathsCSV) {
        console.log("patience...");
        setTimeout(init, 1000);
    } else {
        document.querySelector("#patience").style = "display: none";
        creationBoutons(selectedCountries);
        data = traitementCSV(casesCSV, deathsCSV);
        processData(paysAffiche(), joursAffiches());
        dessinerGraph(valeursX, valeursY, valeursY2);
        updateNbJours();
    }
}

// Convertir les données en 3 arrays 
let valeursX = [], valeursY = [], valeursY2 = [];



// Changement du pays sélectionné
function processData ( country, nbrDays ) {
    valeursX = [];
    valeursY = [];
    valeursY2 = [];
    let decalage = (data[country].length - nbrDays);
    for (i=0; i<nbrDays; i++) {
        valeursX[i] = convertDate((data[country][decalage + i].date));
        valeursY[i] = (parseInt(data[country][decalage + i].confirmed_cases));
        valeursY2[i] = (parseInt(data[country][decalage + i].deaths));
    }
}
function paysAffiche() { 
    let allRadioBoxes = document.querySelectorAll("#choixPays input");
    allRadioBoxes.forEach((input) => {
        if (input.checked) {
            reponse = input.getAttribute("value");
        }
    });
    return reponse
}

function joursAffiches() {
    return parseInt(dateRange.value)
}

function maxCases(data) {
    let cases = [];
    for (let country of Object.keys(data)) {
        let countryNumCases = data[`${country}`]
            .map((x) => parseInt(x.confirmed_cases));
        cases.push(Math.max(...countryNumCases));
    }
    return Math.max(...cases)
}

// Configuration du graphique


// Choix de l'étendu temporelle
const dateRange = document.querySelector('#dateRange');
dateRange.addEventListener("input", () => {
    updateNbJours();
})
dateRange.addEventListener("change", () => {
    processData(paysAffiche(), joursAffiches());
    dessinerGraph(valeursX, valeursY, valeursY2);
})
function updateNbJours() {
    let joursAff = joursAffiches();
    let paysAff = paysAffiche();
    let premierJour = convertDate(
        data[paysAff][data[paysAff]["length"] - joursAff]["date"]
    );
    let dernierJour = convertDate(
        data[paysAff][data[paysAff]["length"] - 1]["date"]
    );
    document.querySelector(
        "output"
    ).innerHTML = `${joursAff} jours<br>(du ${premierJour} au ${dernierJour})`;
}

// Fonction dessiner l'intérieur du graphique
const dessinerGraph = function(valeursX, valeursY, valeursY2) {
    const paper = Snap("#svgout"); 
    let largeurTotale = 1200, hauteurTotale = 600, margeGauche = 55, margeBas = 25, margeDroite = 10, margeHaut = 10, margeTexte = 10;
    let largeurGraphique = largeurTotale - margeGauche - margeDroite;
    let hauteurGraphique = hauteurTotale - margeBas - margeHaut;
    let couleurBarresY = "darkred";
    let couleurBarresY2 = "black";
    
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
    // let ordreDeGrandeur = (maxY < 20000) ? 1000 : 10000;
    let maxY = maxCases(data) - (maxCases(data) % 10000) + 10000;

    let ordreDeGrandeur;
    if (maxY < 20000) { ordreDeGrandeur = 1000}
    else if (maxY > 20000 && maxY <500000) { ordreDeGrandeur = 10000}
    else if (maxY >500000) {ordreDeGrandeur = 100000};

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
                // 0)
                hauteurBarre)
            .attr({
                fill: couleurBarresY,
                "stroke-width": 0,  
            })
            .transform("r180, " + (margeGauche + i * largeurBarre + (largeurBarre / 2)) + "," + (margeHaut + hauteurGraphique))
            // .animate({height: hauteurBarre}, 1000)
            .append( title );
        }
        for (i=0; i<valeursY2.length; i++) {
            let hauteurBarre = valeursY2[i] / etendueY * hauteurGraphique;
            let title2 = Snap.parse('<title>' + valeursY2[i] + ' morts au ' + valeursX[i] + '</title>');
            let barre = paper.rect(
                margeGauche + i * largeurBarre + ((largeurBarre - largeurBarre*proportionBarre) / 2),
                margeHaut + hauteurGraphique,
                proportionBarre * largeurBarre, 
                // 0)
                hauteurBarre)
            .attr({
                fill: couleurBarresY2,
                "stroke-width": 0,  
            })
            .transform("r180, " + (margeGauche + i * largeurBarre + (largeurBarre / 2)) + "," + (margeHaut + hauteurGraphique))
            // .animate({height: hauteurBarre}, 1000)
            .append( title2 );
        }
    }
    dessinerBarres();

    // Dessiner le texte
    // let step = (valeursX.length < 45) ? 1 : 3;
    if (valeursX.length < 35) {
        step = 1
    } else if (valeursX.length >= 35 && valeursX.length < 75) {
        step = 2;
    } else {
        step = Math.floor(valeursX.length / 25);;
    }

    for (let i = 0; i < valeursX.length; i += step) {
    let texteX = paper
        .text(
        margeGauche + i * largeurBarre + largeurBarre / 2,
        margeHaut + hauteurGraphique + margeTexte,
        valeursX[i]
        )
        .attr({
        "font-family": "'Roboto Condensed'",
        "font-size": "12px",
        textAnchor: "middle",
        "baseline-shift": "-1ex",
        });
    }
    for (let i=1; i<=nbrLignes; i++) {
        let texteY = paper.text(
            margeGauche - margeTexte, 
            margeHaut + i*interligne, 
            etendueY*(nbrLignes+1-i)/(nbrLignes+1))
            .attr(
                {"textAnchor": "end", "baseline-shift": "-0.5ex","font-family": "'Roboto Condensed'", "font-size": "12px"}
            );
    }
};

const convertDate = function (dateUS) {
  let array = dateUS.split("/");
  if (array[0] < 10) {
    array[0] = "0" + array[0];
  }
  return array[1] + "/" + array[0];
};