<?php
include('db.php');
$FNAME = $decodedData['fname'];
$USERMNO = $decodedData['u_mo'];
$LNAME = $decodedData['lname'];
$UserEmail = $decodedData['u_email'];
$UserPW = ($decodedData['u_pass']); //password is hashed

$SQL = "SELECT * FROM registers WHERE u_mno = '$USERMNO'";
$exeSQL = mysqli_query($conn, $SQL);
$checkmno =  mysqli_num_rows($exeSQL);

if ($checkmno != 0) {
    $Message = "Already registered";
} else {

    $InsertQuerry = "INSERT INTO `registers`( `fname`, `lname`, `u_email`, `u_mno`, `u_pass`) 
    VALUES ('$FNAME','$LNAME','$UserEmail','$SERMNO','$UserPW')";

    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "Complete--!";
    } else {
        $Message = "Error";
    }
}
$response[] = array("Message" => $Message);

echo json_encode($response);