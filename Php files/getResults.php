<?php

if (isset($_POST["questionID"])) {
    $questionID = $_POST["questionID"];
//    $userID = $_SESSION['id'];
    require_once 'login.php';
    $query = $conn->prepare("SELECT answer.answer AND answer.answerID FROM (questionlink INNER JOIN answer ON questionlink.answerID = answer.answerID) WHERE questionlink.questionID = ?");
    $query->bind_param('i', $questionID);
    $query->execute();

    $array = array();
    $query->bind_result($answer, $answerID);
    while ($query->fetch()) { 
        $array[] = array($answerID=>$answer);
    }
    $arrayFinal = array();
    foreach($array as $answerIDkey=>$answerV) {
        $result = $conn->query("SELECT voteID FROM votepoll WHERE answerID = '$answerIDkey'");
        $arrayFinal[] = array("AnswerID"=>$answerIDkey, "Answer"=> $answerV, "count"=> $result->num_rows);
    }
    
    $conn->close();
    echo json_encode($arrayFinal);
}