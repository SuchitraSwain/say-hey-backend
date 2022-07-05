const express = require('express')
const router = express.Router();
const multer  = require('multer')
const {upload,records}= require('../middleware/multer');
const {updateData,createUser,viewUser,getUser,addrecords}=  require('../controller/user')
const userdata = require('../models/user');

router.route('/').post(createUser).get(viewUser);
router.put('/:id', upload.single('image'),updateData);
router.get("/:id",getUser);
router.post("/addrecords/:id",records.any(),addrecords);


module.exports = router;