<?php
require "../vendor/autoload.php";


    include('db.php');
    $drid = $_GET['drid'];
    $SQL1 = "SELECT * FROM `doctor` WHERE userid = '$drid'";
    $exeSQL1 = mysqli_query($conn, $SQL1);
    $checkuid =  mysqli_num_rows($exeSQL1);
    if($checkuid!=0){ 
        $row = mysqli_fetch_assoc($exeSQL1);
        $drname = $row['name'];
        $drmno = $row['mobile'];
        $drid = $row['userid'];
        $dremail = $row['email'];
        $drpass = ($row['pass']); 
        $drgen = $row['gender'];
        $drage = $row['age'];
        $drloca = $row['location'];
        $quali = $row['qualification'];
        $exp = $row['experience'];
        $spec = $row['specialist'];
        $desc = $row['desciption'];
        $prof_pic =$row['profile_picture'];
        $govt_id =$row['govt_id'];
        $edu_cert =$row['edu_cert'];
        $exp_cert =$row['exp_cert'];
        $Message= "Success";
        $response[]= 
        array(
            "Message" => $Message,
            "drmno"=> $drmno,
            "dr name" => $drname
            
            
        );
    }else{
        $Message= "No data found";
        $response[]= 
        array(
            "Message" => $Message);
    }
    echo json_encode($response);

?>