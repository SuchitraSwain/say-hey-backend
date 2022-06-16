<?php
include('db.php');
require "../vendor/autoload.php";
use \Firebase\JWT\JWT;
$UserMno =$decodedData['u_mno'];

$SQL = "SELECT * FROM registers WHERE u_mno ='$UserMno'";
$exeSQL = mysqli_query($conn, $SQL);
$checkMno =  mysqli_num_rows($exeSQL);
$row = mysqli_fetch_assoc($exeSQL);
// $user1 =$row['fname'];
if ($checkMno != 0) {
    $secret_key = "YOUR_SECRET_KEY";
    $token =[
        "iss" => 'localhost',
        "iat" => time(),
        "exp" => time() +60*60,
        "data" =>array(
            'u_id'=> $row['srno'],
            'u_mno' => $row['u_mno']
        )];
        // $Message = "Success ";
        $jwt = JWT::encode($token, $secret_key,'HS256');
        $response[]= json_encode(
            array(
                "Message" => "Success ",
                "jwt" => $jwt
                // "mno"=>$row['u_mno']
                
            ));
    

    
} else {
    $Message = "No account yet ";
    $response[] = array("Message" => $Message);
}
    // $res[]= array("jwt"=> $jwt);

echo json_encode($response);
?>