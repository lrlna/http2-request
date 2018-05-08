# http2-request
[![npm version][1]][2] [![build status][3]][4]
[![downloads][5]][6] [![js-standard-style][7]][8]

# Usage
```js
var request = require('../')
var fs = require('fs')

var opts = {
  url: 'https://localhost:8001',
  ca: fs.readFileSync('/path/to/cert./pem'),
  body: 'bod bod bod bod',
  headers: {
    ':path': '/'
  }
}

request(opts, function (err, headers, body) {
  if (err) throw err
  if (!headers.isOk()) throw new Error(`statusCode is ${headers.statusCode}`)
  console.log(body)
})
```

## http2-request 

# Install
```bash
npm install http2-request
```

# Related content

## License
[Apache-2.0](https://tldrlegal.com/license/mit-license)

[1]: https://img.shields.io/npm/v/http2-request.svg?style=flat-square
[2]: https://npmjs.org/package/http2-request
[3]: https://img.shields.io/travis/lrlna/http2-request/master.svg?style=flat-square
[4]: https://travis-ci.org/lrlna/http2-request
[5]: http://img.shields.io/npm/dm/http2-request.svg?style=flat-square
[6]: https://npmjs.org/package/http2-request
[7]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[8]: https://github.com/feross/standard
