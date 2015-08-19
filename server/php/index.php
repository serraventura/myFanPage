<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();

error_reporting(-1);
ini_set('display_errors', 'On');

$app = new \Slim\Slim();

$app->get('/identifier/', function() use ($app) {

	$req = $app->request();
	$TOKEN = '390919341102414|M7umyjZFedSGfPhQ4QXnOvhMXX4';
	$API = 'https://graph.facebook.com';
	$GETPARAMS = $req->params();
	
	$id = $req->params('identifier');
	$endPoint = $req->params('endPoint');

	$sufix = '';
	$params = '';

	if(isset( $id )){
		$sufix = $sufix . '/' . $id;
	}

	if(isset($endPoint) && $endPoint != 'identifier'){
		$sufix = $sufix . '/' . $endPoint;
	}

	unset($GETPARAMS['identifier']);
	unset($GETPARAMS['endPoint']);

	$params = $params . '?access_token=' . $TOKEN . '&';

	foreach ($GETPARAMS as $key => $value) {
		$params = $params . $key . '=' . $value . '&';
	};

	$params = substr($params, 0, strlen($params)-1);

	$URL = $API . $sufix . $params;

	$curl_handle = curl_init();
	curl_setopt($curl_handle, CURLOPT_URL,$URL);
	curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT, 2);
	curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl_handle, CURLOPT_USERAGENT, 'Your application name');
	$res = curl_exec($curl_handle);
	curl_close($curl_handle);

	$response = $app->response();
	$response['Content-Type'] = 'application/json';
	$response->status(200);
	$response->body( $res );

});

$app->run();

?>
