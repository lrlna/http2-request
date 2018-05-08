# http2-request
[![npm version][1]][2] [![build status][3]][4]
[![downloads][5]][6] [![js-standard-style][7]][8]

Super smol HTTP/2 request library.

## Usage
```js
var request = require('http2-request')
var fs = require('fs')

var opts = {
  url: 'https://localhost:8001',
  connectOpts: {
    ca: fs.readFileSync('~/http2-request/cert.pem')
  },
  json: true,
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
```

## API 
### request(opts, cb)
Create a new instance of `http2-request`. Takes a few options to connect to an
HTTP/2 client and create and HTTP/2 session:
- __opts.headers:__ [headers
  object](https://nodejs.org/api/http2.html#http2_headers_object) to pass in
the request.
- __opts.json:__  Boolean, defaults to true. Returns either a JSON object or a
  string when false.
- __opts.url:__ A URL to send a request to.
- __opts.clientOpts:__ HTTP/2 session [request
  opts](https://nodejs.org/api/http2.html#http2_clienthttp2session_request_headers_options).
When none are passed, will use defaults. 
- __opts.connectOpts:__ HTTP/2 [connect
  options](https://nodejs.org/api/http2.html#http2_http2_connect_authority_options_listener).
When none are passed, will use defaults. If you're developing locally, pass in
`{ rejectUnauthorized: false }` to avoid rejections from the server, otherwise
pass in a cert under the `ca` flag.

#### response
Request has a signature of `(err, headers, body)`:
- __err:__ err from either a connection or a request.
- __headers:__ HTTP/2 errors object returned from the response.
- __body:__ Response body. Will return a string if `opts.json` is false,
  otherwise a JSON object.

#### headers.isOK()
A convenience method to see if the response comes back `<=299` for easier error
checking. Returns a boolean.

#### headers.statusCode
A convenience method from HTTP/1.1 to read off the status code. You can also do
so by `headers[:status]`.

# Install
```bash
npm install http2-request
```

## License
[Apache-2.0](https://tldrlegal.com/license/apache-license-2.0-(apache-2.0))

[1]: https://img.shields.io/npm/v/http2-request.svg?style=flat-square
[2]: https://npmjs.org/package/http2-request
[3]: https://img.shields.io/travis/lrlna/http2-request/master.svg?style=flat-square
[4]: https://travis-ci.org/lrlna/http2-request
[5]: http://img.shields.io/npm/dm/http2-request.svg?style=flat-square
[6]: https://npmjs.org/package/http2-request
[7]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[8]: https://github.com/feross/standard
