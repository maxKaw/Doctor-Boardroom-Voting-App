<?php
// checkes if the username and password are set
if (isset($_POST["usernameInput"]) and isset($_POST["passwordInput"])) {
    require_once 'login.php';
    $usernameInput = $conn->real_escape_string($_POST['usernameInput']);
    $passwordInput = $conn->real_escape_string($_POST['passwordInput']);
    $query = $conn->prepare("SELECT userID, password, userType FROM user WHERE username LIKE ?");
    $query->bind_param('s', $usernameInput);
    $query->execute();
    $query->store_result();
    // checks if the username is free
    if ($query->num_rows > 0) {
        $query->bind_result($id, $password, $type);
        $query->fetch();
        // hashing the password
        $salt1 = "WEE22A";
        $salt2 = "UI63";
        $salted_password = $salt1 . $passwordInput . $salt2;
        $hashed_password = hash('ripemd128', $salted_password);
        if ($hashed_password == $password) {
            // if the password is correct, then create sessions
            session_regenerate_id();
            $_SESSION['entered'] = true;
            $_SESSION['username'] = $usernameInput;
            $_SESSION['userType'] = $type;
            $_SESSION['id'] = $id;
            echo true;
        } else {
            echo false;
        }
    } else {
        echo false;
    }
    $query->close();
    $conn->close();
} else {
    echo false;
}