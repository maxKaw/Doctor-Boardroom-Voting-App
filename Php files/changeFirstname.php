<?php
if (isset($_POST["firstNameInput"])) {
    require_once 'login.php';
    $firstName = $conn->real_escape_string($_POST["firstNameInput"]);
    $userID = $_SESSION['id'];
    $query = $conn->prepare("SELECT firstName FROM user WHERE userID = ?");
    $query->bind_param('i', $userID);
    $query->execute();
    $query->store_result();
    // checks if the username is free
    if ($query->num_rows > 0) {
        $query->bind_result($database_firstname);
        $query->fetch();
        if ($database_firstname != $firstName) {
            $query = $conn->prepare("UPDATE `user` SET firstName = ? WHERE userID = ?");
            $query->bind_param('si', $firstName, $userID);
            if ($query->execute() == true) {
                $result = true;
            } else {
                $result = false;
            }
        } else {
            $result = false;
        }
    } else {
        $result = false;
    }
    $query->close();
    $conn->close();
    echo $result;
} else {
    echo false;
}
