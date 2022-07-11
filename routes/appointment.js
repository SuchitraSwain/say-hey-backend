
const express = require('express')
const router = express.Router();

const {bookAppointment,appointmentDetails,daleteAppoint}=  require('../controller/appointment');
const { route } = require('./doctor');

router.post('/',bookAppointment);
router.get("/getdetails/:id",appointmentDetails);
router.delete("/deleteAppointment/:id",daleteAppoint)

module.exports = router;
