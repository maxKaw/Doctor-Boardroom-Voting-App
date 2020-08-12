<?php
// Checks if patient names, email, phone no, and description were set
if (isset($_POST["boardRoomNameInput"]) and isset($_POST["startDateTimeInput"]) and isset($_POST["endDateTimeInput"])) {
  require_once 'login.php';
  $boardroomName = $conn->real_escape_string($_POST['boardRoomNameInput']);
  $startDateTime = date("Y-m-d", strtotime($_POST['startDateTimeInput']));
  $endDateTime = date("Y-m-d", strtotime($_POST['endDateTimeInput']));
  $userID = $_SESSION["id"];
  $specID =$_SESSION['specID'];
  // Inserts patient details into database

  $query = $conn->prepare("INSERT INTO boardroom (boardroomName, startDateTime, endDateTime) VALUES ( ?, ?, ?)");
  $query->bind_param("sss", $boardroomName, $startDateTime, $endDateTime);

 if ($query->execute() == true) {
    $last_id = $conn->insert_id;

    if ($query = $conn->query("INSERT INTO boardroomuserlink (boardroomID, userID, `admin`) VALUES ($last_id, $userID, 1)")) {
      if ($query = $conn->query("INSERT INTO specialisationboardroomlink (specialisationID, boardroomID) VALUES ($specID, $last_id)")) {
        $result = true;
      } else {
        $result = false;
      }
    } else {
      $result = false;
    }

    $conn->close();
    echo $result;
  }
} 
