<?php
    $conn = mysqli_connect('localhost', 'root', '');
    $database = mysqli_select_db($conn, 'sayhey-app');

    $encodedData = file_get_contents('php://input');  // take data from react native fetch API
    $decodedData = json_decode($encodedData, true);
?>