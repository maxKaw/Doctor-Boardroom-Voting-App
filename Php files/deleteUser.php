

<?php
if (isset($_POST["id"])) {
    require_once 'login.php';

   $userID = $conn->real_escape_string($_POST["id"]);

    $query = $conn->prepare(" DELETE FROM boardroomuserlink WHERE userID = ?;");
      $query->bind_param('i', $userID);


  if ($query->execute() == true) {
    $query = $conn->prepare("DELETE FROM votepoll WHERE userID = ?;"); 
      
      $query->bind_param('i', $userID);}


  if ($query->execute() == true) {

    $query = $conn->prepare(" DELETE FROM specialisationuserlink WHERE userID = ?;");

      $query->bind_param('i', $userID );}


      if ($query->execute() == true) {

         $query = $conn->prepare("DELETE FROM user WHERE userID = ?;");

      $query->bind_param('i', $userID );}


    if ($query->execute() == true) {
      $result = true;}
      else {
        $return = false;
      }

      echo $result;

}