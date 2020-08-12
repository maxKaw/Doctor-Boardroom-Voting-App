<?php

//$userID = $_SESSION['id'];
//$query = $conn->prepare("SELECT boardRoomName, startDateTime, boardroom.endDateTime FROM boardroom");
//$query->bind_param('i', $userID);
require_once 'login.php';
if (isset($_SESSION["id"]) AND isset($_SESSION["userType"]) AND isset($_POST["usersID"])) {
    
    if ($_SESSION["userType"] == 0) {
        $userID = $_SESSION["id"];


        $array = $conn->real_escape_string($_POST["usersID"]);
     
        
        foreach($array AS $value){
            
            $query = $conn->query("INSERT INTO boardroomuserlink (boardRoomID, userID, admin) VALUES (25, $value[1], 0)");
            if($query->execute() == false) {
                echo false;
                break;
            }
        }

        echo true;
        }
}


//$userID = $_SESSION['id'];
//$query = $conn->prepare("SELECT boardRoomName, startDateTime, boardroom.endDateTime FROM boardroom");
//$query->bind_param('i', $userID);
require_once 'login.php';
if (isset($_SESSION["id"]) AND isset($_SESSION["userType"]) AND isset($_POST["usersID"]) AND isset($_POST["boardroomID"])) {

    if ($_SESSION["userType"] == 0) {
        $userID = $_SESSION["id"];

        $userID = $_POST["usersID"];
        $boardroomID = $_POST["boardroomID"];
        if ($query = $conn->query("INSERT INTO boardroomuserlink (boardRoomID, userID, admin) VALUES ($boardroomID, $userID, 0)")) {
            echo true;

        } else {
            echo false;
        }

    }

}

