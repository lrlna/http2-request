# http2-request
[![npm version][1]][2] [![build status][3]][4]
[![downloads][5]][6] [![js-standard-style][7]][8]

# Usage
```js
var request = require('http2-request')

var headers = {
}

var opts = { 
  endStream: true,
  exclusive: true,
  parent: 1,
  weight: 1,
  getTrailers: () => {}
}

var req = request(headers, opts, function (err, res, body) {
  if (err) throw err
  if (res && body) {
    console.log(bod)
  }
})
```

## http2-request 

# Install
```bash
npm install http2-request
```

# Related content
- [pino](https://github.com/pinojs/pino)
- [merry](https://github.com/shipharbor/merry)
- [garnish](https://github.com/mattdesl/garnish)
- [@studio/log](https://github.com/javascript-studio/studio-log)
- [pino-http](https://github.com/pinojs/pino-http)
- [hapi-pino](https://github.com/pinojs/hapi-pino)

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
