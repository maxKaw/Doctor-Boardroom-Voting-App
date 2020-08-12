<?php

session_start();
$errors = [];
$user_id = "";

//$db = mysqli_connect($host = 'localhost';
//                     $database = 'votingapp';
//                     $user = 'ivag2ol0ctow';
 //                    $pass = '!broGrammers2!';);
  


    require_once 'login.php';
    
if (isset($_POST['usernameInput'])) {

    $email = $_POST['usernameInput'];
    // ensure that the user exists on our system
    $sql = "SELECT emailaddress, user FROM user WHERE username='$username'";
    $results = $conn->query($sql);

    $errors = "";
    if (empty($username)) {
        $errors = "Your username is required";
        echo $errors;
    } else if($result->num_rows > 1) {
        $errors = "Sorry, no user exists on our system with that username or email";
        echo $errors;
    } else {
        $token = bin2hex(random_bytes(4));
        // store token in the password-reset database table against the user's email
        $sql = "INSERT INTO user (token) VALUES ('$token')";
        $results = $conn->query($sql);

        // Send email to user with the token in a link they can click on
        $email = "D.R.Kocma@2017.ljmu.ac.uk"
        $to = $email;

        $subject = "Reset your password on doctorDashboard";
        $msg = "Hello, here is your CODE: " . $token . " to reset your password on our site";
        $msg = wordwrap($msg,70);
        $headers = "From: info@doctorDashboard.com" . "\r\n";
        $headers .= "X-Mailer: PHP \r\n";
        mail($to, $subject, $msg, $headers);
        echo true;
    }
    
}



