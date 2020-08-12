<?php
// Checks if patient names, email, phone no, and description were set
if (isset($_POST["firstNameInput"]) and isset($_POST["surnameInput"]) and isset($_POST["emailInput"]) and isset($_POST["phoneNoInput"]) and isset($_POST["descriptionInput"])) {
  require_once 'login.php';
  $firstNameInput = $conn->real_escape_string($_POST['firstNameInput']);
  $surnameInput = $conn->real_escape_string($_POST['surnameInput']);
  $emailInput = $conn->real_escape_string($_POST['emailInput']);
  $phoneNoInput = $conn->real_escape_string($_POST['phoneNoInput']);
  $descriptionInput = $conn->real_escape_string($_POST['descriptionInput']);

  // Inserts patient details into database
  $sql = $conn->prepare("INSERT INTO patient (firstName, lastName, emailAddress, phoneNumber, medicalStatus) VALUES
                  (?, ?, ?, ?, ?)");
  $sql->bind_param("sssis", $firstNameInput, $surnameInput, $emailInput, $phoneNoInput, $descriptionInput);

  //these 3 line should variables where the firstName, lastName, and phoneNo are equal to existing patients
  $sql_fn = "SELECT * FROM patient WHERE firstName ='$firstNameInput'";
  $sql_ln = "SELECT * FROM patient WHERE lastName ='$surnameInput'";
  $sql_pn = "SELECT * FROM patient WHERE phoneNumber ='$phoneNoInput'";

  //these lines should a final variable if all 3 contain the same 1 existing patient
  $sql_n = "SELECT * FROM '$sql_fn' LEFT JOIN '$sql_ln' ON '$sql_fn'.firstName = '$sql_ln'.firstName";
  $sql_f = "SELECT * FROM '$sql_n' LEFT JOIN '$sql_pn' ON '$sql_n'.phoneNumber = '$sql_pn'.phoneNumber";

  //checks if patient details already exist in database if not, adds to database
  if($sql_f = null){
    $result = false;
  }
  elseif ($sql->excute() == true){
    $result = true;
  }
  else {
    $result = false;
  }
  $sql->close();
  $conn->close();
  echo $result;
}
else {
  $result = false;
  echo $result;
}
