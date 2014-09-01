var t = require('./');
var fs = require('fs');
var file = process.argv[2];

console.log(t.parse(fs.readFileSync(file,{encoding: 'ascii'})));
