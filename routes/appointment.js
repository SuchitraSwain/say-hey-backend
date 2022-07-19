
const express = require('express')
const router = express.Router();

const {docData}=  require('../controller/appointment');


router.get('/doctor',docData);


module.exports = router;
