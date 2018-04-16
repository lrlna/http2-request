var request = require('../')

var opts = {
  url: 'https://localhost:8001',
  headers: {
    path: '/'
  }
}

request(opts, function (err, headers, stream, data) {
  console.log('running requet')
  console.log(headers)
})
