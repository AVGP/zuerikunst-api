/* jshint asi: true */
/* jshint esnext: true */
var pg = require('pg-promise')()
var data = require(process.env.DATA_FILE)

var db = pg(process.env.DATABASE_URL)
console.log('Retrieving plans with address...')

var promises = []

promises[0] = db.query("SET CLIENT_ENCODING TO 'UTF8';")

console.log('Importing ' + data.features.length + ' objects...')
for(var i=0; i<data.features.length; i++) {
  var artObject = data.features[i].properties
  promises[promises.length] = db.query(`INSERT INTO art_pieces(name, artist, date, type, material, location_desc, lat, lng) VALUES(
    '${artObject.TITEL}', '${artObject.KUENSTLER_}', '${artObject.DATIERUNG}',
    '${artObject.GATTUNG}', '${artObject.MATERIAL_T}', '${artObject.STANDORT}',
    ${artObject.Y}, ${artObject.X}
  );`)/*
  console.log('Query: ', `INSERT INTO art_pieces(name, artist, date, type, material, location_desc, lat, lng) VALUES(
    '${artObject.TITEL}', '${artObject.KUENSTLER_}', '${artObject.DATIERUNG}',
    '${artObject.GATTUNG}', '${artObject.MATERIAL_T}', '${artObject.STANDORT}',
    ${artObject.Y}, ${artObject.X},
  );`)*/
}

Promise.all(promises).then(function() {
  console.log('Done!')
}).catch(function(e) {
  console.log('error:', e)
})
