<?php

use Twilio\Http\Response;

    include('db.php');
    $drid = $_GET['drid'];
    $SQL1 = "SELECT * FROM registers WHERE userid = '$drid'";
    $exeSQL1 = mysqli_query($conn, $SQL1);
    $checkuname =  mysqli_num_rows($exeSQL1);
    if($checkuname!=0){ 
        $row = mysqli_fetch_assoc($exeSQL1);
        $drname = $row['drname'];
        $drmno = $row['dr_mno'];
        $drid = $row['drid'];
        $dremail = $row['dr_email'];
        $drpass = ($row['dr_pass']); 
        $drgen = $row['drgen'];
        $drage = $row['drage'];
        $drloca = $row['drloca'];
        $quali = $row['quali'];
        $exp = $row['exp'];
        $spec = $row['spec'];
        $desc = $row['desc'];
        $prof_pic =$row['profile_picture'];
        $govt_id =$row['govt_id'];
        $edu_cert =$row['edu_cert'];
        $exp_cert =$row['exp_cert'];
        $Message= "Sucess";
        $response[]= 
        array(
            "Message" => $Message,
            "Name" => $drname
            
            
        );
    }else{
        $Message= "No data found";
        $response[]= 
        array(
            "Message" => $Message);
    }
    json_encode($response);

?>