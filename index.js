/* jshint asi: true */
/* jshint esnext: true */

var restify = require('restify')
var pg = require('pg-promise')()

var server = restify.createServer()
var db = pg(process.env.DATABASE_URL)

server.get('/nearby/:lat/:lng', function(req, res, next) {
  db.query(`select name, type, artist, date, lat, lng,
    earth_distance(ll_to_earth( ${parseFloat(req.params.lat)}, ${parseFloat(req.params.lng)} ), ll_to_earth(art_pieces.lat, art_pieces.lng)) as distance
    from art_pieces order by distance ASC LIMIT 10;
  `).then(function(result) {
    console.log(result)
    res.send(200, result)
    return next()
  })
})

server.listen(process.env.PORT || 8080, function() {
  console.log('%s listening at %s', server.name, server.url)
});
