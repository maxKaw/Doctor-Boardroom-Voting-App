<?php
if (isset($_POST["passwordInput"])) {
    require_once 'login.php';
    $password = $conn->real_escape_string($_POST["passwordInput"]);
    //hashing the password
    $salt1 = "WEE22A";
    $salt2 = "UI63";
    $salted_password = $salt1 . $password . $salt2;
    $hashed_password = hash('ripemd128', $salted_password);
    $userID = $_SESSION['id'];
    $query = $conn->prepare("SELECT `password` FROM user WHERE userID = ?");
    $query->bind_param('i', $userID);
    $query->execute();
    $query->store_result();
    // checks if the username is free
    if ($query->num_rows > 0) {
        $query->bind_result($database_password);
        $query->fetch();
        if ($hashed_password != $database_password) {
            $query = $conn->prepare("UPDATE `user` SET `password` = ? WHERE userID = ?");
            $query->bind_param('si', $hashed_password, $userID);
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
