var parse = require('fast-json-parse')
var concat = require('concat-stream')
var assert = require('assert')
var http2 = require('http2')
var URL = require('url').URL
var pump = require('pump')

module.exports = function request (opts, cb) {
  assert.equal(typeof opts, 'object', 'http2-request: opts should be type object')
  assert.ok(opts.url, 'http2-request: opts.url should be provided')

  if (!opts.connectOpts) opts.connectOpts = {}

  var url = new URL(opts.url)
  var clientSession = http2.connect(url.origin, opts.connectOpts)

  clientSession.on('error', function (err) {
    return cb(err)
  })

  if (!opts.clientOpts) opts.clientOpts = {}
  opts.json = !!opts.json

  var reqHeaders = Object.assign({ ':method': opts.method || 'GET' }, opts.headers)

  var req = clientSession.request(reqHeaders, opts.clientOpts)

  req.on('response', function (headers) {
    headers.statusCode = headers[':status']
    headers.isOk = function () {
      return headers[':status'] < 299
    }

    flush(null, headers)
  })

  req.on('error', function (err) {
    flush(err)
  })

  function flush (err, headers) {
    if (err) return cb(err)

    if (!opts.body || typeof opts.body === 'string') {
      req.end(opts.body)
    } else if (opts.body.pipe) {
      pump(opts.body, req)
    }

    pump(req, concat(end))

    function end (buf) {
      clientSession.destroy()
      if (opts.json) {
        var body = parse(buf.toString('utf8'))
        if (body.err) cb(body.err)
        return cb(null, headers, body.value)
      }

      cb(null, headers, buf.toString('utf8'))
    }
  }
}
