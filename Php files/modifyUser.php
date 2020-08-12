<?php

  require_once 'login.php';


$sql = "SELECT userID, firstName, lastName FROM user";

$result = $conn->query($sql);


    $array = array();

	


if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
	$name = $row["firstName"] . " " . $row["lastName"];
	$array[] = array("name"=>$name, "id"=>$row["userID"]);
    }
} 
$arrayA = json_encode($array);
echo $arrayA;
$conn->close();

  
