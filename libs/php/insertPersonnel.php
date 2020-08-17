<?php
	$executionStartTime = microtime(true);

	include("config.php");

	header('Access-Control-Allow-Headers: *');
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: *');

	header('Content-Type: application/json; charset=UTF-8');

	$method = $_SERVER['REQUEST_METHOD'];
	if ($method == "OPTIONS") {
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: *");
	header("HTTP/1.1 200 OK");
	exit();
	}


	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);	
	}

	$result;

	if (isset($_POST) ) {

		if (empty($_POST['firstName']) || empty($_POST['lastName']) || empty($_POST['email']) || empty($_POST['departmentID'])){
		exit;
		}
		
		$firstName = ucwords(strtolower(mysqli_real_escape_string($conn,$_POST['firstName'])));
		$lastName = ucwords(strtolower(mysqli_real_escape_string($conn,$_POST['lastName'])));
		$email = mysqli_real_escape_string($conn,$_POST['email']);
		$email = strtolower(filter_var($email, FILTER_SANITIZE_EMAIL));
		$jobTitle = ucwords(strtolower(mysqli_real_escape_string($conn,$_POST['jobTitle'])));
		$departmentID = mysqli_real_escape_string($conn,$_POST['departmentID']);

		$query = "INSERT INTO personnel (firstName, lastName, email, jobTitle, departmentID) VALUES('$firstName','$lastName','$email','$jobTitle','$departmentID')";

		$result = $conn->query($query);
	}


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
?>