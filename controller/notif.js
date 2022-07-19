const fetch = require('node-fetch');


const sendNotif = (req, res) => {

    var notification = {
        'title': 'Title of notification',
        'text': 'Subtitle'
    };
    var fcm_tokens = req.body.fcm_tokens;
    var notification_body = {

        'notification': notification,
        'registration': fcm_tokens,

    }

    fetch('https://fcm.googleapis.com/fcm/send', {
        'method': 'POST',
        'header': {
            'Authorization': 'key=' +
                `AAAAm9Z4joU:APA91bFyq7290FjBmd15u_9Daq0eOwba5DevBaS_d0U4KftSWMOmh
            gYMllL1NcGrWZ6dnOBMjj9iv56Tjmf7fqDjrsWURQDlPSoHO2BFhN2osnPJzKR_y9NDKoG
            ctu0DRoFbyffHhzsB`,
            'Content-Type': 'application/json'

        },
        'body': JSON.stringify(notification_body)
    }).then(() => {
        res.status(200).send('Notification send successfully');
    }).catch((err) => {
        res.status(200).send('Something went wrong!')
        console.log(err);
    })


}
var {admin} = require("../notification");


const notif = (req, res) => {

    // console.log(req.body.fcm_tokens);

    var registrationToken =req.body.fcm_tokens ;
    var payload = {
        data: {
            mykey: "Hello"
        }
    };
    var options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };
    
    admin.messaging().sendToDevice(registrationToken, payload, options)
        .then(function (response) {
            res.status(200).send({response})
            console.log("Successfully sent message:", response);
        })
        .catch(function (error) {
            res.status(400).send("Error sending message")
            console.log("Error sending message:", error);
        });
}


module.exports = { sendNotif,notif }