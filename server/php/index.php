<?php

require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();

error_reporting(-1);
ini_set('display_errors', 'On');

$app = new \Slim\Slim();

$app->get('/identifier/', function() use ($app) {

	$TOKEN = '390919341102414|M7umyjZFedSGfPhQ4QXnOvhMXX4';
	$API = 'https://graph.facebook.com';

	$req = $app->request();
	
	$id = $req->params('identifier');
	$endPoint = $req->params('endPoint');

	$sufix = '';
	$params = '';

	if(isset( $id )){
		$sufix += '/'+$id;
	}

	if(isset($endPoint) && $endPoint != 'identifier'){
		$sufix += '/'+$endPoint;
	}

	// unset($req->params('identifier'));
	// unset($req->params('endPoint'));

	$params += '?access_token=' + $TOKEN + '&';



var_dump($URL);
// var_dump($req->params('endPoint'));
 // echo $req->get('endPoint');



	foreach ($req->params() as $key => $value) {
		$params += $value + '=' + $key[$value] + '&';
	};

	$params = substr($params, 0, strlen($params)-1);

	$URL = $API + $sufix + $params;


return;



	$opts = array(
		'http' => array(
			'method' => 'GET'
		)
	);

	$context = stream_context_create($opts);
	$res = file_get_contents($URL, false, $context);

	$response = $app->response();
	$response['Content-Type'] = 'application/json';
	$response->status(200);
	$response->body(json_encode( $res ));

});

$app->run();

?>
