const express = require('express')
const router = express.Router();
const {sendNotif,notif}=require('../controller/notif');


router.post('/',sendNotif)
router.post('/fbnotif',notif)

module.exports = router;