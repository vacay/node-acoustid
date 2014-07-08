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
  _ = require('underscore'),
  defaultMeta = 'recordings recordingids releases releaseids releasegroups releasegroupids tracks compress usermeta sources';

exports.fingerprintLookup = function (audioFile, data, callback) {
  fpcalc(audioFile, function(err, result) {
    if(err){
      callback(err, null);
    }else{
      var post_data = _.extend(data, {
        format: data.format || 'json',
        duration: result.duration,
        fingerprint: result.fingerprint,
        meta: data.meta || defaultMeta
      });

      makeRequests('lookup', post_data, callback);
    }
  });
};

exports.trackIdLookup = function (data, callback) {
  var post_data = _.extend(data, {
    format: data.format || 'json',
    trackid: data.trackid,
    meta: data.meta || defaultMeta
  });

  makeRequests('lookup', post_data, callback);
}

exports.submit = function (audioFile, data, callback) {
  fpcalc(audioFile, function(err, result) {
    if(err){
      callback(err, null);
    }else{
      var post_data = _.extend(data, {
        format: data.format || 'json',
        duration: result.duration,
        fingerprint: result.fingerprint
      });

      makeRequests('submit', post_data, callback);
    }
  });
}

exports.submisionStatus = function (data, callback) {
  var post_data = _.extend(data, {
    format: data.format || 'json'
  });

  makeRequests('submision_status', post_data, callback);
}

exports.listByMbid = function (data, callback) {
  var post_data = _.extend(data, {
    format: data.format || 'json'
  });

  makeRequests('track/list_by_mbid', post_data, callback);
}

function makeRequests (endpoint, post_data, callback) {
  request({
    method: 'POST',
    url: 'http://api.acoustid.org/v2/'+endpoint,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: querystring.stringify(post_data),
    json: true
  }, function (error, response, body) {
      if(error){
        callback(error, null);
      }else{
        callback(null, body);
      }
    }
  );
}