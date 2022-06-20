<?php
    include('db.php');
    $drname = $decodedData['drname'];
    $drmno = $decodedData['dr_mno'];
    $drid = $decodedData['drid'];
    $dremail = $decodedData['dr_email'];
    $drpass = ($decodedData['dr_pass']); 
    $drgen = $decodedData['drgen'];
    $drage = $decodedData['drage'];
    $drloca = $decodedData['drloca'];
    $quali = $decodedData['quali'];
    $exp = $decodedData['exp'];
    $spec = $decodedData['spec'];
    $desc = $decodedData['desc'];

    $prof_pic = basename($_FILES['prof_pic']['name']);// prof pic data
    $profpic_Dir = "uploads/profpic/";
    $profpicFilePath = $profpic_Dir . $prof_pic;
    $profpicURL= "https://sayhey.co.in/backendmobile/".$profpicFilePath;
    $prof_picfileType = pathinfo($profpicFilePath,PATHINFO_EXTENSION);

    $govt_id = basename($_FILES['govt_id']['name']); //govt_id data
    $govt_idDir = "uploads/govt_id/";
    $govt_idFilePath = $govt_idDir . $govt_id;
    $govt_idURL = "https://sayhey.co.in/backendmobile/" . $govt_id;
    $govt_idfileType = pathinfo($govt_idFilePath,PATHINFO_EXTENSION);

    $edu_cert = basename($_FILES['edu_cert']['name']);//edu_cert data
    $edu_certDir = "uploads/edu_cert/";
    $edu_certFilePath = $edu_certDir . $edu_cert;
    $edu_certURL = "https://sayhey.co.in/backendmobile/" . $edu_cert;
    $edu_certfileType = pathinfo($edu_certFilePath,PATHINFO_EXTENSION);

    $exp_cert =basename( $_FILES['exp_cert']['name']); //exp_cert data
    $exp_certtDir = "uploads/exp_cert/";
    $exp_certFilePath = $exp_certDir . $exp_cert;
    $exp_certURL ="https://sayhey.co.in/backendmobile/" . $exp_cert;
    $exp_certfileType = pathinfo($exp_certFilePath,PATHINFO_EXTENSION);

    $allowTypes = array('jpg','png','jpeg');
    $allowTypes2 = array('jpg','png','jpeg','pdf');

    $SQL1 = "SELECT * FROM registers WHERE userid = '$drid'";
    $exeSQL1 = mysqli_query($conn, $SQL1);
    $checkuname =  mysqli_num_rows($exeSQL1);

    $SQL2 = "SELECT * FROM registers WHERE mobile = '$drmno'";
    $exeSQL2 = mysqli_query($conn, $SQL2);
    $checkmno =  mysqli_num_rows($exeSQL2);
    if($checkuname!=0){ 
        $Message = "user id already taken";

    }
    elseif($checkmno!=0){
        $Message = "Account already exist";
    }
    else{

        $sql ="INSERT INTO `doctor`( `name`, `userid`, `pass`, `email`, `mobile`, `gender`, `profile_picture`, `age`,
         `location`, `qualification`, `experience`, `specialist`, `description`, `govt_id`, `edu_cert`, `exp_cert`) 
        VALUES ('$drname','$drid','$drpass','$dremail','$drmno','$drgen','$profpicURL','$drage',
        '$drloca','$quali','$exp','$spec','$desc','$govt_idURL','$edu_certURL','$exp_certURL')";
    
        if(in_array($prof_picfileType, $allowTypes) && in_array($govt_idfileType, $allowTypes2)&&
         in_array($edu_certfileType, $allowTypes2)
        //  &&in_array($exp_certfileType, $allowTypes2)
         ){
            if(move_uploaded_file($_FILES["prof_pic"]["tmp_name"], $profpicFilePath)
            &&
            move_uploaded_file($_FILES["govt_id"]["tmp_name"], $govt_idFilePath)&&
            move_uploaded_file($_FILES["edu_cert"]["tmp_name"], $edu_certFilePath)
            // &&            move_uploaded_file($_FILES["exp_cert"]["tmp_name"], $exp_certFilePath)
            ){
                if(isset( $_FILES['exp_cert']['name'])){
                    if(in_array($exp_certfileType, $allowTypes2) && move_uploaded_file($_FILES["exp_cert"]["tmp_name"], $exp_certFilePath) ){

                        $insertdata = mysqli_query($conn, $sql);
                        if($insertdata){
                            $Message ="Data Entered successfully";
                        }else{
                            $Message ="Failed to enter data";
                        }
                    }else{
                        $Message ="Failed to store the exp certificate";
                    }
                }else{
                    $sqlwithoutexp ="INSERT INTO `doctor`( `name`, `userid`, `pass`, `email`, `mobile`, `gender`, `profile_picture`, `age`,
                    `location`, `qualification`, `experience`, `specialist`, `description`, `govt_id`, `edu_cert`) 
                   VALUES ('$drname','$drid','$drpass','$dremail','$drmno','$drgen','$profpicURL','$drage',
                   '$drloca','$quali','$exp','$spec','$desc','$govt_idURL','$edu_certURL')";
                   $intdata = mysqli_query($conn, $sqlwithoutexp);
                   if($intdata){
                    $Message ="Data Entered successfully";
                }else{
                    $Message ="Failed to enter data";
                }
                }
            }else{
                $Message ="Failed to store the file";
            }
         }else{
            $Message ="File extension not supported";
         }
        
    }
    $response[] = array("Message" => $Message,
                        "pic name"=> $profpicFilePath
                        );
    echo json_encode($response);

    ?>
