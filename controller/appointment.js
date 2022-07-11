const appointmentSchema = require('../models/appointment');
const doctorSchema = require('../models/doctor')
const userSchema = require('../models/user')


const bookAppointment = async (req,res)=>{
    // const {id} = req.params;
    try {
        const docdata= await doctorSchema.findOne({"doc_id":req.body.doc});
        const userdata= await userSchema.findOne({"uid":req.body.user});
        // const timeslot = req.body.timeslot;
        const date = new Date(req.body.date)
        const payment_det ={
            paymentMethod: req.body.method,
            cardno: req.body.cardno,
            name: req.body.name,
            expiry: req.body.expiry,
            cvv: req.body.cvv
        }
        const appointment = new appointmentSchema({
            doc_id: docdata._id,
            user_id:userdata._id,
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString(),
            bookingDate: new Date(),
            paymentDetails: payment_det
        })
        if(req.body.saveCard=== true){
             await userSchema.findOneAndUpdate({"uid":req.body.user},{$push:{
                "cardDetails":payment_det
            }});
        }
        const savedAppointment = await appointment.save()
        const userdata2= await userSchema.findOneAndUpdate({uid:req.body.user},{$push:{
            appointments:savedAppointment._id
        }});
        const docdata1= await doctorSchema.findOneAndUpdate({"doc_id":req.body.doc},{$push:{
            "appointments":savedAppointment._id
        }});

        res.json(savedAppointment);


    } catch (error) {
        console.log(error)      
        res.send(error)
    }

}
const appointmentDetails = async (req,res)=>{
const {id} = req.params;
    try {
        const data = await appointmentSchema.find({_id:id}).populate('user_id').populate('doc_id')
        res.json(data)
        console.log(data);
    } catch (error) {
      res.send(error) ; 
    }
}

const daleteAppoint = async (req,res)=>{
    const {id} = req.params
        try {
            // const data = await appointmentSchema.find({_id:id})
            // const userdata = find()
            const userdata =await userSchema.findOneAndUpdate({_id:"62c83500b044b01f5096f13b"},
                {$pull:{
                    appointments: "62c83c9adc1bddb8cc8871f7"
                }})
                await doctorSchema.findOneAndUpdate({_id:"62c835e1b044b01f5096f13d"},
                    {$pull:{
                        appointments: "62c83c9adc1bddb8cc8871f7"
                    }})
                    // data.remove((err,result)=>{
                    //     res.send( (result === 1) ? { msg: 'Deleted' } : { msg: 'error: '+ err } );
                    // })

    
            res.send({userdata})
        } catch (error) {
          res.send(error) ; 
        }
    }




module.exports = {bookAppointment,appointmentDetails,daleteAppoint}; 