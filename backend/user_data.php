<?php
require "../vendor/autoload.php";

    include('db.php');
    $mobile_no = $_GET['mobile_no'];
    $SQL = "SELECT * FROM `users` WHERE mobile_no = '$mobile_no'";
    $q = mysqli_query($conn, $SQL);
    $rows =  mysqli_num_rows($q);
    if($rows!=0){ 
        $row = mysqli_fetch_assoc($q);
        $user_id=$row['user_id'];
        $user_name=$row['user_name'];
        $user_pic=$row['user_pic'];
        $email=$row['email'];
        $gen=$row['gen'];
        $age=$row['age'];
        $prev_med_rec=$row['prev_med_rec'];
        $session_no=$row['session_no'];
        $Message= "data retrieved";
        $response[]= 
        array(
            "Message" => $Message,
            "user name"=> $user_name,
        );
    }else{
        $Message= "No data found";
        $response[]= 
        array(
            "Message" => $Message);
    }
    echo json_encode($response);

?>
