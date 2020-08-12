<?php
if (isset($_POST["phoneNumberInput"])) {
    require_once 'login.php';
    $phoneNumber = $conn->real_escape_string($_POST["phoneNumberInput"]);
    $userID = $_SESSION['id'];
    $query = $conn->prepare("SELECT phoneNumber FROM user WHERE userID = ?");
    $query->bind_param('i', $userID);
    $query->execute();
    $query->store_result();
    // checks if the username is free
    if ($query->num_rows > 0) {
        $query->bind_result($database_phoneNumber);
        $query->fetch();
        if ($database_phoneNumber != $phoneNumber) {
            $query = $conn->prepare("UPDATE `user` SET phoneNumber = ? WHERE userID = ?");
            $query->bind_param('si', $phoneNumber, $userID);
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
