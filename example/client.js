var request = require('../')
var fs = require('fs')

var opts = {
  url: 'https://localhost:8001',
  ca: fs.readFileSync('~/http2-request/cert.pem'),
  body: 'butts',
  headers: {
    ':path': '/'
  }
}

request(opts, function (err, headers, body) {
  if (err) throw err
  if (!headers.isOk()) throw new Error(`statusCode is ${headers.statusCode}`)
})
