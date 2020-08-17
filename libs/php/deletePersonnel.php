<?php
	$executionStartTime = microtime(true);

	include("config.php");

	
	header('Access-Control-Allow-Headers: *');
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: *');

	header('Content-Type: application/json; charset=UTF-8');
	

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;
	}	


    $result;

    if (isset($_POST) ) {
		if (empty($_POST['id'])){
		exit;
        }

        $id = mysqli_real_escape_string($conn,$_POST['id']);
        $query = "DELETE FROM personnel WHERE id = $id";
        $result = $conn->query($query);
		
	
	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;
	}

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = [];
	
	mysqli_close($conn);

	echo json_encode($output); 
}
?>