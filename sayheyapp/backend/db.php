<?php
    $conn = mysqli_connect('localhost', 'u819537982_root', 'Rootpass123');
    $database = mysqli_select_db($conn, 'u819537982_sayheydb');

    $encodedData = file_get_contents('php://input');  // take data from react native fetch API
    $decodedData = json_decode($encodedData, true);
?>