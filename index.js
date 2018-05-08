var assert = require('assert')
var http2 = require('http2')
var pump = require('pump')

module.exports = function request (opts, cb) {
  assert.equal(typeof opts, 'object', 'http2-request: opts should be type object')
  assert.ok(opts.ca, 'http2-request: opts.ca should be provided')
  assert.equal(typeof opts.ca, 'object', 'http2-request: opts.ca should be type string')
  assert.ok(opts.url, 'http2-request: opts.url should be provided')

  var clientSession = http2.connect(opts.url, { rejectUnauthorized: false })

  clientSession.on('error', (err) => return cb(err))

  var reqOpts = Object.assign({ ':method': opts.method || 'GET' }, opts.headers)

  var req = clientSession.request(reqOpts)

  req.on('response', function (headers) {
    headers.statusCode = headers[':status']
    headers.isOk = function () {
      return headers[':status'] < 299 
    }
    cb(null, headers, data)
  })

  var data = ''
  req.on('data', function (chunk) {
    data += chunk
  })

  req.on('end', function () {
    clientSession.destroy()
  })

  req.on('error', function (err) {
    return cb(err)
  })
}
