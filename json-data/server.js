var jsonServer = require('json-server')
var clone = require('clone')
var data = require('./db.json')

var port = process.env.PORT || 3000

var app = jsonServer.create()
var router = jsonServer.router(data)

app.all('*', function(req, res, next) {
  router.db.object = clone(data)
  next()
})

app.use(jsonServer.defaults())
app.use('/api', router)

app.listen(port, function() {
  console.log('JSONPlaceholder listening on http://localhost:' + port)
})