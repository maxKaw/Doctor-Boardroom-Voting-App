<?php

// Checks if patient names, email, phone no, and description were set

if (isset($_POST["firstNameInput"]) and isset($_POST["surnameInput"]) and isset($_POST["emailInput"]) and isset($_POST["phoneNoInput"]) and isset($_POST["descriptionInput"])) {

  require_once 'login.php';

  $firstNameInput = $conn->real_escape_string($_POST['firstNameInput']);

  $surnameInput = $conn->real_escape_string($_POST['surnameInput']);

  $emailInput = $conn->real_escape_string($_POST['emailInput']);

  $phoneNoInput = $conn->real_escape_string($_POST['phoneNoInput']);

  $descriptionInput = $conn->real_escape_string($_POST['descriptionInput']);

  // Prepare patient's details to insert into the database

  $sql = $conn->prepare("INSERT INTO patient (firstName, lastName, emailAddress, phoneNumber, medicalStatus) VALUES (?, ?, ?, ?, ?)");

  $sql->bind_param("sssis", $firstNameInput, $surnameInput, $emailInput, $phoneNoInput, $descriptionInput);

  // Check if any records of the same patient are already in the database

  $existngPatient = "SELECT * FROM patient WHERE firstName ='$firstNameInput' AND lastName ='$surnameInput' AND emailAddress ='$emailInput' AND phoneNumber ='$phoneNoInput'";

  if($existngPatient == null){

    if ($sql->excute() == true){
      $result = true;
    } else {
      $result = false;
    }

  } else {
    $result = false;
  }

  $sql->close();
  $conn->close();
  echo $result;
}




