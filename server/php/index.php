$app = new \Slim\Slim();

$config = array(
	'token' => '390919341102414|M7umyjZFedSGfPhQ4QXnOvhMXX4',
	'api' => 'https://graph.facebook.com'
);

$app->get('/api/identifier/', function() use ($app) {

	$id = $_GET['identifier'];
	$endPoint = $_GET['endPoint'];
	$sufix = '';
	$params = '';
	$config = (object)$config;

	if(isset($id)){
		$sufix += '/'+$id;
	}

	if(isset($endPoint) && $endPoint != 'identifier'){
		$sufix += '/'+$endPoint;
	}

	unset($_GET['identifier']);
	unset($_GET['endPoint']);

	$params += '?access_token=' + $config.token + '&';

	foreach ($o in $_GET){
		$params += $o + '=' + $_GET[$o] + '&';
	};

	$params = substr($params, 0, strlen($params)-1);

	$URL = $config.api + $sufix + $params;

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
