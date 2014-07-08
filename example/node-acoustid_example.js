'use strict';

var nodeAcoustid = require('../lib/node-acoustid.js');

nodeAcoustid.fingerprintLookup('example.mp3', {
  client: '8XaBELgH'
}, function (err, res) {
  console.log(err, res);
});