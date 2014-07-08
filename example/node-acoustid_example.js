'use strict';

var nodeAcoustid = require('../lib/node-acoustid.js'),
  appKey = '8XaBELgH',
  userkey = '2u4lN5Pp';

nodeAcoustid.fingerprintLookup('example.mp3', {
  client: appKey
}, function (err, res) {
  console.log(err, res);
});

nodeAcoustid.trackIdLookup({
  client: appKey,
  trackid: '9ff43b6a-4f16-427c-93c2-92307ca505e0'
}, function (err, res) {
  console.log(err, res);
});

nodeAcoustid.submit('example.mp3', {
  client: appKey,
  user: userkey,
  artist: 'Test Artist',
  track: 'Test Track'
}, function (err, res) {
  console.log(err, res);
});

nodeAcoustid.submisionStatus({
  client: appKey,
  id: '94489095'
}, function (err, res) {
  console.log(err, res);
});