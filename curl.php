<?php

public function sendNotification()
    {                              
        
// Multiple Values in Single Variable
        // foreach ($results as $result) {
        //     $registrationIds[] = $result->webtoken;
        //   }            
        // $registrationIds[]=$influencer_webtoken;
        
        $msg = [
            'title' => 'Demo Notification',
            'body' => "Demo Web-Push Notification",
            'icon' => 'images/favicon.png',           
            'sound' => 'default',
          ];
        $fields = array (
            'registration_ids' => 'browser token',
            'notification' => $msg
        );        
        
        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => "https://fcm.googleapis.com/fcm/send",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS =>json_encode($fields),
        CURLOPT_HTTPHEADER => array(
            "Authorization: key= firebase_key",
            "Content-Type: application/json"
        ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        echo $response;
    }
