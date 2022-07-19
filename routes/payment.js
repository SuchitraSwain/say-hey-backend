const express = require('express')
const router = express.Router();
const{createorder, verifyorder} = require('../controller/payment')

router.post('/order',createorder);
router.post('/verify',verifyorder);





module.exports = router;