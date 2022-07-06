const express = require('express')
const router = express.Router();

const {docFile} = require('../middleware/docMulter');
const {createDoc,statAct,statnotAct}=  require('../controller/doctor')


router.post('/addDoc',docFile.any(),createDoc)
router.put('/statAct/:id',statAct)
router.put('/statnotAct/:id',statnotAct)
// .get(viewUDoc);
// router.put('/:id', upload.single('image'),updateData);

module.exports = router;