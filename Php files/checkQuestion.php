<?php

if (isset($_POST["questionID"])) {
    $questionID = $_POST["questionID"];
//    $userID = $_SESSION['id'];
    require_once 'login.php';
    $query = $conn->prepare("SELECT answer.answerID FROM (questionlink INNER JOIN answer ON questionlink.answerID = answer.answerID) WHERE questionlink.questionID = ?");
    $query->bind_param('i', $questionID);
    $query->execute();

    $array = array();
    $query->bind_result($answerID);
    while ($query->fetch()) { 
        $array[] = $answerID;
    }
    $count = 0;
    foreach($array as $item) {
        $result = $conn->query("SELECT voteID FROM votepoll WHERE answerID = '$item'");

        if ($result->num_rows > 0) {
            $count = $count + 1;
        }
    }

    if($count > 0) {
        echo 1;
    } else {
        echo 2;
    }
    $conn->close();
}