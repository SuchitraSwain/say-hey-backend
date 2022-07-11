const express = require('express')
const app = express()
const path = require('path')
const PORT =  process.env.PORT || 3000
// const PORT =   4000 || process.env.PORT 
const mongoose = require('mongoose');



const user = require('./routes/user');
const doc = require('./routes/doctor');
const home = require('./routes/homeapi');
const book = require('./routes/appointment');


app.use(express.urlencoded({extended:false}));
app.use(express.json());



const url ='mongodb+srv://sayheyofficial21:Sayhey2021@cluster0.iwhcj.mongodb.net/sayhey';
mongoose.connect(url, 
  { useNewUrlParser: true},
  ()=>{console.log('connected to db')}
);


var Calendly = require('node-calendly-sdk')
 
calendly_client = new Calendly("S6OE4W3VIYJQDWJJXDOJFTDYWJWIR3SX")
 
// Create a webhook
calendly_client.webhooks.create("https://mycallbackurl.com/event_types")
    .then(function(result) {
        console.log(JSON.stringify(result, "\t", null))
        /**
            {
                "id": <hook_id>
            }
        */
    }).catch((err) => console.log(err));


app.use('/api/user',user);
app.use('/api/doctor',doc);
app.use('/api/home',home);
app.use('/api/book',book);


app
.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.get('/', (req, res) => res.render('pages/index'))
.listen(PORT, () => console.log(`Listening on ${ PORT }`))
