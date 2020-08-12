<?php
require_once 'login.php';
    //$userID = $_SESSION['id'];
    //$query = $conn->prepare("SELECT boardRoomName, startDateTime, boardroom.endDateTime FROM boardroom");
    //$query->bind_param('i', $userID);
    $currentDateTime = date("Y-m-d H:i:s");
    $query = $conn->prepare("SELECT boardRoomID, boardRoomName, endDateTime FROM boardroom WHERE endDateTime > ?");
    $query->bind_param('s', $currentDateTime);
    $query->execute();
    $query->bind_result($boardRoomID, $boardRoomName, $endDateTime);
   // $query->execute();
    $array = array();
    // checks if the username is free
    while ($query->fetch()) {
        $array[] = array("id"=>$boardRoomID, "name"=>$boardRoomName, "end"=>$endDateTime);
    }

    $arrayA = json_encode($array);
    echo $arrayA;
    $conn->close();
