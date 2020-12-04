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
  { fr: "France", en: "France", population: 64.81 },
  { fr: "Royaume-Uni", en: "United Kingdom", population: 66.65 },
  { fr: "Allemagne", en: "Germany", population: 83.02 },
  { fr: "Italie", en: "Italy", population: 60.36 },
  { fr: "Espagne", en: "Spain", population: 46.94 },
  { fr: "Pologne", en: "Poland", population: 38 },
  { fr: "Roumanie", en: "Romania", population: 19.86 },
  { fr: "Pays-Bas", en: "Netherlands", population: 16.9 },
  { fr: "Belgique", en: "Belgium", population: 11.5 },
  { fr: "Grèce", en: "Greece", population: 10.81 },
  { fr: "Tchéquie", en: "Czechia", population: 10.53 },
  { fr: "Portugal", en: "Portugal", population: 10.28 },
  { fr: "Hongrie", en: "Hungary", population: 9.85 },
  { fr: "Suède", en: "Sweden", population: 10.23 },
  { fr: "Autriche", en: "Austria", population: 8.58 },
  { fr: "Suisse", en: "Switzerland", population: 8.24 },
  { fr: "Bulgarie", en: "Bulgaria", population: 7.2 },
  { fr: "Danemark", en: "Denmark", population: 5.66 },
  { fr: "Finlande", en: "Finland", population: 5.47 },
  { fr: "Norvège", en: "Norway", population: 5.16 },
  { fr: "Turquie", en: "Turkey", population: 77.7 },
  //   { fr: "Brésil", en: "Brazil", population: 209.5 },
  //   { fr: "Russie", en: "Russia", population: 144.5 },
  //   { fr: "États-Unis", en: "US", population: 328.2 },
  //   { fr: "Japon", en: "Japan", population: 126.5 },
]

function creationBoutons(selectedCountries) {
    for (let country of selectedCountries) {
        choixPays.innerHTML += `<label><input type="radio" name="choixPays" value="${country.en}" country="${country.en}"></input>${country.fr}</label>`;
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
    const selectedCountriesArray = selectedCountries.map(x => x.en);
    const dates = allCasesLines[0].split(",").slice(4);
    for (i = 1; i < allCasesLines.length; i++) {
        let currentLine = allCasesLines[i].split(",");
        let currentCountry = currentLine[1];
        if (
          selectedCountriesArray.includes(currentCountry) &&
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
          selectedCountriesArray.includes(currentCountry) &&
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
    if (modeCalcul.checked) {
        let facteur;
        selectedCountries.forEach((x) => {
          if (x.en === country) {
            facteur = x.population;
          }
        });
        valeursY = valeursY.map(x => x / facteur);
        valeursY2 = valeursY2.map(x => x / facteur);
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
function maxCasesPerMillion() {
    let cases = [];
    for (let country of Object.keys(data)) {
      let population;
      selectedCountries.forEach(x => {
          if (x.en === country) {
              population = x.population;
          }
      })
      let countryNumCases = data[`${country}`]
      .map( x => parseInt(x.confirmed_cases))
      .map( x => x / population );
      
      cases.push(Math.max(...countryNumCases));
    }
    return Math.max(...cases);
}

// Choix de l'affichage par million d'habitants
const modeCalcul = document.querySelector('#modeCalcul');
modeCalcul.addEventListener("change", () => {
    processData(paysAffiche(), joursAffiches());
    dessinerGraph(valeursX, valeursY, valeursY2);
})

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
    let largeurTotale = 1200, hauteurTotale = 600, margeGauche = 75, margeBas = 35, margeDroite = 10, margeHaut = 10, margeTexte = 10;
    let largeurGraphique = largeurTotale - margeGauche - margeDroite;
    let hauteurGraphique = hauteurTotale - margeBas - margeHaut;
    let couleurBarresY = modeCalcul.checked ? "DarkOrchid" : "darkred";
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
    let maxY;
    if (modeCalcul.checked) {
        maxY = maxCasesPerMillion(data) - (maxCasesPerMillion(data) % 1000) + 1000;
    } else {
        maxY = maxCases(data) - (maxCases(data) % 10000) + 10000;
    }

    let ordreDeGrandeur;
    if (maxY <= 20000) { ordreDeGrandeur = 1000}
    else if (maxY > 20000 && maxY <=500000) { ordreDeGrandeur = 10000}
    else if (maxY >500000 && maxY <=1000000) {ordreDeGrandeur = 100000}
    else {ordreDeGrandeur = 500000};

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
            let title = (!modeCalcul.checked) ?
                Snap.parse('<title>' + valeursY[i] + ' cas confirmés au ' + valeursX[i] + '</title>') :
                Snap.parse('<title>' + Math.round(valeursY[i]) + ' cas par million d\'habitants au ' + valeursX[i] + '</title>');
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
            let title2 = (!modeCalcul.checked) ?
                Snap.parse('<title>' + valeursY2[i] + ' morts au ' + valeursX[i] + '</title>') :
                Snap.parse('<title>' + Math.round(valeursY2[i]) + ' morts par million d\'habitants au ' + valeursX[i] + '</title>');
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