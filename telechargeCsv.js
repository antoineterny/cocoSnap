const https = require('https')
const fs = require('fs')

const options = {
  hostname: 'raw.githubusercontent.com',
//   port: 443,
  path: '/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv',
  method: 'GET'
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', contenu => {
    fs.writeFile('confirmed_global.txt', contenu, err => {
        if (err) {
          console.error(err)
          return
        }
      })
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()