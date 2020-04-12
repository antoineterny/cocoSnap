const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('confirmed_global.txt'),
  crlfDelay: Infinity
});

const rl2 = readline.createInterface({
  input: fs.createReadStream('deaths_global.txt'),
  crlfDelay: Infinity
});

let selectedCountries = ["Brazil", "France", "United Kingdom"]
let lineNumber = 1
let data = {}

rl.on('line', (line) => {
  let lineArray = line.split(","); 

  if (lineNumber === 1) {
    dates = lineArray.slice(4);
  }

  else {
    let provinceOfLine = lineArray[0], countryOfLine = lineArray[1];
    let confirmedCases = lineArray.slice(4);
    
    if (selectedCountries.includes(countryOfLine) && provinceOfLine === "") { 
      data[countryOfLine] = [];
      for (i=0; i<confirmedCases.length; i++){
        data[countryOfLine].push( {"date": dates[i], "confirmed_cases": confirmedCases[i]} );
      }
    }
  }

  lineNumber += 1
});

rl.on('close', () => {
  console.log('Finished processing confirmed_global.txt ')
})

rl2.on('line', (line) => {
  let lineArray = line.split(","); 

  if (lineNumber === 1) {
    dates = lineArray.slice(4);
  }

  else {
    let provinceOfLine = lineArray[0], countryOfLine = lineArray[1];
    let deaths = lineArray.slice(4);

    if (selectedCountries.includes(countryOfLine) && provinceOfLine === "") { 
      for (i=0; i<deaths.length; i++){
        data[countryOfLine][i]["deaths"] = deaths[i];
      }
    }
  }

  lineNumber += 1
});


rl2.on('close', () => {
  fs.writeFile('data.json', (JSON.stringify(data)), err => {
    if (err) {
      console.error(err)
      return
    }
  })
  console.log(data);
  console.log('Finished processing files')
})