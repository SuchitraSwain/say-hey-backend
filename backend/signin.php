<?php
include('db.php');

$UserMno = $decodedData['u_mno'];

$SQL = "SELECT * FROM registers WHERE u_mno ='$UserMno'";
$exeSQL = mysqli_query($conn, $SQL);
$checkMno =  mysqli_num_rows($exeSQL);
$row = mysqli_fetch_assoc($exeSQL);
// $user1 =$row['fname'];
if ($checkMno != 0) {
    
    $Message = "Success ";
    
} else {
    $Message = "No account yet ";
}

$response[] = array("Message" => $Message);
echo json_encode($response);
?>