<?php
    include('db.php');
    $docid = $_POST['doc_id'];
    $User_mno = $_POST['user_mno'];
    $schedule = $_POST['schedule'];
   

    $docchecksql = "SELECT * FROM doctor WHERE userid = '$docid'";
    $doccheck = mysqli_query($conn,$docchecksql);
    $totdoc = mysqli_num_rows($doccheck);
    if($totdoc != 0){
        $userchecksql = "SELECT * FROM registers WHERE u_mno = '$User_mno'";
        $usercheck = mysqli_query($conn,$userchecksql);
        $totuser = mysqli_num_rows($usercheck);
        if($totuser!=0){
            if($_POST['prev_ses']!= NULL){

                $prev_ses = $_POST['prev_ses'];
                $seschecksql = "SELECT * FROM `session` WHERE `session_id` = '$prev_ses'";
                $sescheck = mysqli_query($conn,$seschecksql);
                $totses = mysqli_num_rows($sescheck);
                if($totses!=0){
    
                    $insertsql = "INSERT INTO `session`( `doc_id`, `user_mno`, `schedule`, `prev_ses`)
                    VALUES ('$docid','$User_mno','$schedule','$prev_ses')";
                    $insert = mysqli_query($conn,$insertsql);
                    if($insert){
                        $Message = "Sucess session created";
                    }else{
                        $Message ="No data can be inserted";
                    }
                }else{
                    $Message = "NO such session";
                }
            }else{
                $insertsql = "INSERT INTO `session`( `doc_id`, `user_mno`, `schedule`)
                VALUES ('$docid','$User_mno','$schedule')";
                $insert = mysqli_query($conn,$insertsql);
                if($insert){
                    $Message = "Sucess session created";
                }else{
                    $Message ="No data can be inserted";
                } 
            }
        }else{
            $Message = "NO such user";
        }

    }else{
        $Message = "No such doctor";
    }
    $response = array(
        "Message" => $Message,
        "doc" => $prev_ses
    );
    echo json_encode($response);
?>