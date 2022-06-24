<?php
function push_notification_android($device_id, $message)
{

    //API URL of FCM
    $url = 'https://fcm.googleapis.com/fcm/send';

    /*api_key available in:
Firebase Console -> Project Settings -> CLOUD MESSAGING -> Server key*/
    $api_key = 'AAAAkibRwTg:APA91bGQY1zG9lwCdJjRtICmACytkKkGhSg6-tFVBsQLB_4HmYHlAhYmlIiAZSXsHf-
                RA-6bbG6DqGoJ_5Qt3Pr0XG-nbRYGqxVAZlRYqJdH9aExC9X1sfJA-07xoEj4Ejoem6YK3v0n';

    $fields = array(
        'registration_ids' => array(
            $device_id
        ),
        'data' => array(
            "message" => $message
        )
    );

    //header includes Content type and api key
    $headers = array(
        'Content-Type:application/json',
        'Authorization:key=' . $api_key
    );

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
    $result = curl_exec($ch);
    if ($result === FALSE) {
        die('FCM Send Error: ' . curl_error($ch));
    }
    curl_close($ch);
    return $result;
}

$device_id="";
$message ="This is a test notif";
push_notification_android($device_id, $message);