<?php

//$user_id = "";


session_start();
$errors = [];
$user_id = "";

$db = mysqli_connect($host = 'localhost';
                     $database = 'votingapp';
                     $user = 'ivag2ol0ctow';
                     $pass = '!broGrammers2!';);

if (isset($_POST['emailInput'])) {

    $email = $_POST['emailInput'];
    // ensure that the user exists on our system
    $sql = "SELECT emailAddress FROM user WHERE emailAddress='$email'";
    $results = $conn->query($sql);

    $errors = "";
    if (empty($email)) {
        $errors = "Your email is required";
        echo $errors;
    } else if($result->num_rows > 1) {
        $errors = "Sorry, no user exists on our system with that email";
        echo $errors;
    } else {
        $token = bin2hex(random_bytes(20));
        // store token in the password-reset database table against the user's email
        $sql = "UPDATE `user` SET `token` = '$token' WHERE emailAddress = '$email'";
        $results = $conn->query($sql);

        // Send email to user with the token in a link they can click on
        $to = $email;

        $subject = "Reset your password on doctorDashboard";
        $msg = "Hello ".@email@. ", here is your CODE to resset your password: " . $token . "\">link</a> to reset your password on our site";
        $msg = wordwrap($msg,70);
        $headers = "From: info@doctorDashboard.com" . "\r\n";
        $headers .= "X-Mailer: PHP \r\n";
        mail($to, $subject, $msg, $headers);
        echo true;
    }
}



// ENTER A NEW PASSWORD
if (isset($_POST['new_password'])) {
    $new_pass = mysqli_real_escape_string($db, $_POST['new_pass']);
    $new_pass_c = mysqli_real_escape_string($db, $_POST['new_pass_c']);

    // Grab to token that came from the email link
    $token = $_GET['token'];
    if (empty($new_pass) || empty($new_pass_c)) array_push($errors, "Password is required");
    if ($new_pass !== $new_pass_c) array_push($errors, "Password do not match");
    if (count($errors) == 0) {
        // select email address of user from the password_reset table
        $sql = "SELECT email FROM password_reset WHERE token='$token' LIMIT 1";
        $results = mysqli_query($db, $sql);
        $email = mysqli_fetch_assoc($results)['email'];

        if ($email) {
            $new_pass = md5($new_pass);
            $sql = "UPDATE user SET password='$new_pass' WHERE email='$email'";
            $results = mysqli_query($db, $sql);
            header('location: index.php');
        }
    }
}
