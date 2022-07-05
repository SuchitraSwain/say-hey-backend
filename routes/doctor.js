const express = require('express')
const router = express.Router();
const multer  = require('multer')
const upload = require('../middleware/multer');
const {updateData,createUser,viewUser}=  require('../controller/doctor')


router.route('/').post(createUser).get(viewUser);
router.put('/:id', upload.single('image'),updateData);

module.exports = router;