/*
 * node-acoustid
 * https://github.com/alexu84/node-acoustid
 *
 * Copyright (c) 2014 Alexandru Marian Vasile
 * Licensed under the MIT license.
 */

'use strict';

var request = require('request'),
  fpcalc = require("fpcalc"),
  querystring = require("querystring"),
  defaultMeta = 'recordings recordingids releases releaseids releasegroups releasegroupids tracks compress usermeta sources';

exports.fingerprintLookup = function(audioFile, data, callback) {
  fpcalc(audioFile, function(err, result) {
    if(err){
      callback(err, null);
    }else{
      var post_data = {
        format: data.format || 'json',
        client: data.client,
        duration: result.duration,
        fingerprint: result.fingerprint,
        meta: data.meta || defaultMeta
      };

      request({
        method: 'POST',
        url: 'http://api.acoustid.org/v2/lookup',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: querystring.stringify(post_data),
        json: true
      }, function (error, response, body) {
          if(error){
            callback(error, null);
          }else{
            callback(null, body.results);
          }
        }
      );
    }
  });
};
