<?php
// checkes if the username and password are set
if (isset($_POST["firstNameInput"]) and isset($_POST["surnameInput"]) and isset($_POST["phoneNumberInput"]) and isset($_POST["emailInput"]) and isset($_POST["privilegesInput"])) {
    require_once 'login.php';
    $firstNameInput = $conn->real_escape_string($_POST['firstNameInput']);
    $surnameInput = $conn->real_escape_string($_POST['surnameInput']);
    $phoneNumberInput = $conn->real_escape_string($_POST['phoneNumberInput']);
    $emailInput = $conn->real_escape_string($_POST['emailInput']);
    $privilegesInput = $_POST['privilegesInput'];

    //create username based on first name and last name
    function random_username($string) {
        $pattern = " ";
        $firstPart = strstr(strtolower($string), $pattern, true);
        $secondPart = substr(strstr(strtolower($string), $pattern, false), 0,3);
        $nrRand = rand(0, 100);

        $username = trim($firstPart).trim($secondPart).trim($nrRand);
        return $username;
    }

    $username = random_username("$firstNameInput $surnameInput");

    //create temp password for the user
    $bytes = openssl_random_pseudo_bytes(4);

    $password = bin2hex($bytes);
    //hashing the password


    if ($privilegesInput == 'false') {
        $privileges = 0;
    } else {
        $privileges = 1;
    }

    $to = $emailInput;

    $subject = 'DoctorDashboard nickname and password';

    $message= "Your Username and password are $username and $password";

    $headers = "From: DoctorDashboard@hotmail.com";

    mail($to, $subject, $message, $headers);

    $salt1 = "WEE22A";
    $salt2 = "UI63";
    $salted_password = $salt1 . $password . $salt2;
    $hashed_password = hash('ripemd128', $salted_password);

    $query = $conn->prepare("INSERT INTO `user`( firstName, lastName, username, password, phoneNumber, emailAddress, userType) VALUES ( ?, ?, ?, ?, ?, ?, ?)");


    $query->bind_param("ssssssi", $firstNameInput, $surnameInput, $username, $hashed_password, $phoneNumberInput, $emailInput, $privileges);
    if ($query->execute() == true) {
        $result = true;
    } else {
        $result = false;
    }
    $query->close();
    $conn->close();
    echo $result;
}
