var assert = require('assert')
var http2 = require('http2')
var pump = require('pump')

module.exports = function request (opts, cb) {
  assert.equal(typeof opts, 'object', 'http2-request: opts should be type object')
  assert.ok(opts.url, 'http2-request: opts.url should be provided')

  opts.connectOpts = opts.connectOpts || {}

  // what else do we need to provide for this to work?
  var clientSession = http2.connect(opts.url, opts.connectOpts)

  clientSession.on('error', function (err) {
    return cb(err)
  })

  // need to provide a default :method header 
  // i think i also might need a :path header in here?
  var reqOpts = Object.assign({ ':method': opts.method || 'GET' }, opts.headers)

  // this a stream, and we should also return a stream
  var req = clientSession.request(reqOpts)
  req.on('response', function (headers) {
    console.log('headers', headers)
    var data
    req.on('data', function (chunk){
      data += chunk
    })

    req.on('end', function () {
      console.log('data', data)
      cb(null, headers, req, data)
      client.destroy()
    })
  })
}
