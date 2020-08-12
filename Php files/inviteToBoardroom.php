<?php
        require_once 'login.php';
 if (isset($_SESSION["id"]) AND isset($_SESSION["userType"])) {
     if ($_SESSION["userType"] == 0) {
        $userID = 43;

        
        $query = $conn->prepare("SELECT boardroom.boardRoomID, specialisationboardroomlink.specialisationID FROM ((boardroom INNER JOIN specialisationboardroomlink ON specialisationboardroomlink.boardroomID = boardroom.boardRoomID) INNER JOIN boardroomuserlink ON boardroomuserlink.boardRoomID = boardroom.boardRoomID) WHERE boardroomuserlink.admin = 1 AND boardroomuserlink.userID = ?");
        $query->bind_param('i', $userID);
        $query->execute();
        $query->store_result();
        $query->bind_result($boardRoomID, $specialisationID);
        $query->fetch();
        $boardRoomIDSaved = $boardRoomID;
//Select users with the same specialisation as the boardroom
        $result = $conn->query("SELECT user.firstName AS firstName, user.lastName AS lastName, user.userID AS userID, user.userType AS userType FROM (user INNER JOIN specialisationuserlink ON user.userID = specialisationuserlink.userID) WHERE specialisationuserlink.specialisationID = '$specialisationID'");
           
        $array = array();  
           // gets all the names based on what user typed it
           if ($result->num_rows > 0) {
               while ($row = mysqli_fetch_array($result)) {
                $array[] = array("Name"=>$row["firstName"] . " " . $row["lastName"], "id"=>$row["userID"], "UserType"=>$row["userType"]);
               }
               echo json_encode($array);
           } else {
                echo false;
            }
            $conn->close();
     } else {
         echo false;
     }    
 }
