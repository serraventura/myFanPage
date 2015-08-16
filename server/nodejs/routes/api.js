var express = require('express');
var request = require('request');

var api = require('./includes/config.js');

var router = express.Router();

router.post('/identifier', function(req, res){

  var id = req.body.identifier;
  var endPoint = req.body.endPoint;
  var sufix = '';
  var params = '';

  if(id != undefined){
    sufix += '/'+id;
  }

  if(endPoint != undefined){
    sufix += '/'+endPoint;
  }

  delete req.body.identifier;
  delete req.body.endPoint;

  params += '?access_token=' + config.token + '&';

  for (var o in req.body){
    params += o + '=' + req.body[o] + '&';
  };

  params = params.substring(0,params.length-1);

  var URL = config.api + sufix + params;

  request({
    url: URL,
  }, function(err, cbRes, body){

    if(!err){
      res.status(200);
      res.json(body);
    }else{
      res.status(500);
      res.json(err);
    }

  });

});

module.exports = router;
