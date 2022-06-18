<?php
    include('db.php');
    $user_name = $decodedData['uname'];
    $mobile_no = $decodedData['user_mno'];
    $email = $decodedData['user_email'];
    $pass = ($decodedData['user_pass']); 
    $gen = $decodedData['user_gen'];
    $age = $decodedData['user_age'];
    $prev_med_rec = $decodedData['med_record'];
    $session_no = $decodedData['sess_no'];

    $prof_pic = basename($_FILES['prof_pic']['name']);//profile_pic
    $profpic_Dir = "user_uploads/prof_pics/";
    $profpicFilePath = $profpic_Dir . $prof_pic;
    $profpicURL= "https://sayhey.co.in/backendmobile/".$profpicFilePath;
    $prof_picfileType = pathinfo($profpicFilePath,PATHINFO_EXTENSION);

    $prev_med_rec = basename($_FILES['prev_med_rec']['name']); //prev_med_records
    $prev_med_recDir = "user_uploads/prev_med_rec/";
    $pmr_FilePath = $prev_med_recDir . $prev_med_rec;
    $pmrURL = "https://sayhey.co.in/backendmobile/" . $prev_med_rec;
    $pmr_fileType = pathinfo($pmr_FilePath,PATHINFO_EXTENSION);

    $allowTypes = array('jpg','png','jpeg');
    $allowTypes2 = array('jpg','png','jpeg','pdf');

    $SQL = "SELECT * FROM users WHERE mobile_no = '$mobile_no'";
    $exeSQL = mysqli_query($conn, $SQL);
    $checkmno =  mysqli_num_rows($exeSQL);
    if($){ 
        $Message = "mobile number already exists";
         }else{

        INSERT INTO `users`( `user_name`, `mobile_no`, `user_pic`, `email`, `pass`, `gender`, `age`, `prev_med_rec`, `session_no`) 
          VALUES ('$user_name','$mobile_no','$profpicURL','$email','$pass','$gen','$age','$pmrURL','$session_no')
        if(in_array($prof_picfileType, $allowTypes) && in_array($pmr_fileType, $allowTypes2))
        {
            if(move_uploaded_file($_FILES["prof_pic"]["tmp_name"], $profpicFilePath) && move_uploaded_file($_FILES["prev_med_rec"]["tmp_name"], $pmr_FilePath))
            {
                $insertdata = mysqli_query($conn, $sql);
                if($insertdata){
                    $Message ="Data Entered successfully";
                }
                else{
                    $Message ="Failed to enter data";
                }
            }else{
                $Message ="Failed to store the file";
            }
         }else{
            $Message ="File extension not supported";
         }
        
    }
    $response[] = array("Message" => $Message
                        );
    echo json_encode($response);
    ?>
