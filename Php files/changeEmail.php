<?php
if (isset($_POST["emailAddressInput"])) {
    require_once 'login.php';
    $emailAddress = $conn->real_escape_string($_POST["emailAddressInput"]);
    $query = $conn->prepare("SELECT * FROM user WHERE emailAddress LIKE ?");
    $query->bind_param('s', $emailAddress);
    $query->execute();
    $query->store_result();
    // checks if the username is free
    if ($query->num_rows == 0) {
        $userID = $_SESSION['id'];
        $query = $conn->prepare("UPDATE `user` SET emailAddress = ? WHERE userID = ?");
        $query->bind_param('si', $emailAddress, $userID);
        if ($query->execute() == true) {
            $result = true;
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
