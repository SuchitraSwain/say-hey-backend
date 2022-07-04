const express = require('express')
const router = express.Router();
const multer  = require('multer')
const upload = require('../middleware/multer');
const {updateData,createUser,viewUser}=  require('../controller/user')
const userdata = require('../models/user');

router.route('/').post(createUser).get(viewUser);
router.put('/:id', upload.single('image'),updateData);

module.exports = router;