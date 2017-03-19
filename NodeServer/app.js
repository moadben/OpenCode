var express = require('express')
var app = express()
var path = require('path');

//app.get('/', function (req, res) {
//  res.send('Hello World!')
//})

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
