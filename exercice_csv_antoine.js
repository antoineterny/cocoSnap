const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('confirmed_global.txt'),
  crlfDelay: Infinity
});

let selectedCountries = ["Brazil", "France", "United Kingdom"]

let lineNumber = 1

// Your goal is to fill into this data object the same structure as the data variable in your graph.js file
// "Brazil": [
//      {"date": "3/1/20", "confirmed_cases": "2", "deaths": "0"},

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
  // The code here runs when all lines of the file were processed

  // Here you will replace the console.log for the correct code
  // to write the variable data into a file named data.json
  console.log(data)
  
  fs.writeFile('data.json', (JSON.stringify(data)), err => {
    if (err) {
      console.error(err)
      return
    }
  })

  console.log('Finished processing files')
})