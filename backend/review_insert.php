<?php
    include('db.php');

    $session_id = $_POST['sesssion_id'];
    $review = $_POST['review'];
    $rating = $_POST['rating'];

    $checkSes = "SELECT * FROM `session` WHERE `session_id` = '$session_id";
    $checkAct = mysqli_query($conn, $checkSes);
    $totalSess = mysqli_num_rows($checkAct);
    if($totalSess!=0){

        $sessionSearch = "SELECT * FROM `review` WHERE `session_id` = '$session_id";
        $searchAction = mysqli_query($conn, $sessionSearch);
        $totalSessRev = mysqli_num_rows($searchAction);
        if($totalSessRev!=0){
            $Message ="Cannot review again";
        }else{
            $insertSql ="INSERT INTO `review`(`session_id`, `rating`, `review`) VALUES ('$session_id','$rating','$review')";
            $executeInsert= mysqli_query($conn, $insertSql);
            if($executeInsert){
                $Message="Review added";
            }
            else{
                $Message = "Failed to review";
            }
        }
    }
    else{
        $Message ="No such Session id. Please check session id inserted correctly";
    }

    $response[]= array("Message" => $Message);
    echo json_encode($response);


?>