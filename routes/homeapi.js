const express = require('express')
const router = express.Router();


const {
    viewdoctor,
    getdoc,
    activedoc,
    docRank
}=  require('../controller/homeapi')


router.get('/viewDoctors',viewdoctor);
router.get('/getDoc/:id',getdoc);
router.get('/activeDoc',activedoc);
router.get('/rankDoc',docRank);

module.exports = router;