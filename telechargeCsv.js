const https = require('https')
const fs = require('fs')

const fileCases = fs.createWriteStream("confirmed_global.txt");
const requestCases = https.get("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv", function(response) {
  response.pipe(fileCases);
});

const fileDeaths = fs.createWriteStream("deaths_global.txt");
const requestDeaths = https.get("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv", function(response) {
  response.pipe(fileDeaths);
});