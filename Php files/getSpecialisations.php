<?php
require_once 'login.php';
    $emailAddress = $conn->real_escape_string($_POST["emailAddressInput"]);
    $query = $conn->prepare("SELECT * FROM specialisation");
    $query->bind_param('s',$specID, $spec);
    $array = array();
    while ($query->fetch()) { 
        $array[] = array("SpecID" => $specID, "Spec" => $spec);
    }
    $query->close();
    $conn->close();
    echo json_encode($array);