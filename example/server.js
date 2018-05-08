var keygen = require('tls-keygen').keygen
var mkdirp = require('mkdirp')
var http2 = require('http2')
var path = require('path')
var fs = require('fs')
var os = require('os')

;(async function main () {
  var dir = path.join(os.homedir(), './http2-request')
  mkdirp.sync(dir)
  var keyPath = path.join(dir, 'key.pem')
  var certPath = path.join(dir, 'cert.pem')
  var { key, cert } = await keygen({
    key: keyPath,
    cert: certPath
  })

  key = fs.readFileSync(key, 'utf8')
  cert = fs.readFileSync(cert, 'utf8')

  var server = http2.createSecureServer({ key, cert, allowHTTP1: true })
  server.on('error', (err) => console.error(err))

  server.on('request', function (req, res) {
    console.log(req)
  })

  server.on('stream', function (stream, headers) {
    console.log(headers)
    stream.respond({
      ':status': 200,
      'message': 'hiya'
    })
    var endObject = {
      price: 25,
      category: 'socks'
    }
    stream.end(JSON.stringify(endObject))
  })

  server.listen(8001)
})()
