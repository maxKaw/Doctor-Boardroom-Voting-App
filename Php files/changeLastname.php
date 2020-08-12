<?php
if (isset($_POST["lastNameInput"])) {
    require_once 'login.php';
    $lastName = $conn->real_escape_string($_POST["lastNameInput"]);
    $userID = $_SESSION['id'];
    $query = $conn->prepare("SELECT lastName FROM user WHERE userID = ?");
    $query->bind_param('i', $userID);
    $query->execute();
    $query->store_result();
    // checks if the username is free
    if ($query->num_rows > 0) {
        $query->bind_result($database_lastname);
        $query->fetch();
        if ($database_lastname != $lastName) {
            $query = $conn->prepare("UPDATE `user` SET lastName = ? WHERE userID = ?");
            $query->bind_param('si', $lastName, $userID);
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
