<?php
    include('db.php');

    $session_id = $_GET['session_id'];
    $sessionSearch = "SELECT  *  
from review 
JOIN session ON review.session_id = session.session_id
JOIN doctor ON session.doc_id=doctor.userid
WHERE review.session_id = '$session_id'";
        $searchAction = mysqli_query($conn, $sessionSearch);
        $totalSessRev = mysqli_num_rows($searchAction);
        if($totalSessRev!=0){
            $row = mysqli_fetch_assoc($searchAction);
            $review =$row['review'];
            $rating = $row['rating'];
            $doc_name =$row['name'];
            $Message ="Sucess";
            $response[] = array("Message" => $Message,
                        "review"=> $review,
                        "rating"=> $rating,
                        "Dr name" => $doc_name
                        );
        }
        else{
            $Message ="So such session";
            $response[] = array("Message" => $Message,
            "sess"=> $totalSessRev);
        }
        echo json_encode($response);

?>