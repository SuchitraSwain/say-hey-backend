const express = require('express')
const router = express.Router();
const{getmeetdet} = require('../controller/meet')


router.get('/details/:email',getmeetdet);


module.exports = router;