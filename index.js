const express = require('express')
const app = express()
const path = require('path')
require("dotenv").config()
const PORT =  process.env.PORT || 3000
// const PORT =   4000 || process.env.PORT 
const mongoose = require('mongoose');
const hubspot = require('./hubspot');
const meet = require('./routes/meet');
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




      


      

app.use('/api/meet',meet);
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
