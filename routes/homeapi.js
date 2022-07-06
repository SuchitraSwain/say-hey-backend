const express = require('express')
const router = express.Router();


const {
    viewdoctor,
    getdoc,
    activedoc
}=  require('../controller/homeapi')


router.get('/viewDoctors',viewdoctor);
router.get('/getDoc/:id',getdoc);
router.get('/activeDoc',activedoc);

module.exports = router;