const express = require('express')
const router = express.Router();

const {docFile} = require('../middleware/docMulter');
const {createDoc,statAct,statnotAct}=  require('../controller/doctor')


router.post('/addDoc',docFile.any(),createDoc)
router.put('/statAct/:id',statAct)
router.put('/statnotAct/:id',statnotAct);
// router.put('/addslot/:id',addSlots);

module.exports = router;