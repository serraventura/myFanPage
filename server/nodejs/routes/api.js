var express = require('express');
var request = require('request');

var c = require('../includes/config.js');

var router = express.Router();

router.get('/identifier', function(req, res){

  var id = req.query.identifier;
  var endPoint = req.query.endPoint;
  var sufix = '';
  var params = '';

  if(id != undefined){
    sufix += '/'+id;
  }

  if(endPoint != undefined && endPoint != 'identifier'){
    sufix += '/'+endPoint;
  }

  // console.log('query: ', req.query);

  delete req.query.identifier;
  delete req.query.endPoint;

  params += '?access_token=' + c.config.token + '&';

  for (var o in req.query){
    params += o + '=' + req.query[o] + '&';
  };

  params = params.substring(0,params.length-1);

  var URL = c.config.api + sufix + params;

  // console.log('URL: ', URL);
  // return

  request({
    url: URL,
  }, function(err, cbRes, body){

    var data;

    try{
        data = JSON.parse(body);
    }catch(err){
        data = err;
    };

    if(!err){

      console.log('success');

      if (cbRes.statusCode == 200) {
        res.status(200);
        res.json(data);
      }else{
        res.status(cbRes.statusCode);
        res.json(data);
      }

    }else{
      console.log('Err: ', err);
      res.status(500);
      res.json(data);
    }

  });

});

module.exports = router;
