var request = require('../')
var fs = require('fs')

var opts = {
  url: 'https://localhost:8001',
  connectOpts: {
    ca: fs.readFileSync('~/http2-request/cert.pem')
  },
  clientOpts: {},
  headers: {
    ':path': '/'
  }
}

request(opts, function (err, headers, body) {
  if (err) throw err
  if (!headers.isOk()) throw new Error(`statusCode is ${headers.statusCode}`)
  console.log('headers', headers)
  console.log('body', body)
})
