<?php

    //$userID = $_SESSION['id'];
    //$query = $conn->prepare("SELECT boardRoomName, startDateTime, boardroom.endDateTime FROM boardroom");
    //$query->bind_param('i', $userID);
if (isset($_POST["boardroom"])) {
    $id = $_POST["boardroom"];

    require_once 'login.php';
    $query = $conn->prepare("SELECT question.questionText, patient.medicalStatus , question.questionID FROM ((question INNER JOIN boardroomlink ON question.questionID = boardroomlink.questionID) INNER JOIN patient ON question.patientID = patient.patientID) WHERE boardroomlink.boardRoomID = ?");
    $query->bind_param('i', $id);
    $query->execute();
    
    $query->bind_result($question, $medicalStatus, $id);
    $array = array();
    while ($query->fetch()) { 
        $array[] = array("Question"=>$question, "MedicalStatus"=> $medicalStatus, "QuestionID"=> $id);
    }

    $arrayA = json_encode($array);
    echo $arrayA;
    
   // $query->execute();
    // checks if the username is free
    
    
    $conn->close();
}