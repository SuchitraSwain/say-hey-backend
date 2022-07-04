const express = require('express')
const app = express()
const path = require('path')
const PORT =  process.env.PORT || 3000
// const PORT =   4000 || process.env.PORT 
const mongoose = require('mongoose');
const user = require('./routes/user');


app.use(express.urlencoded({extended:false}));
app.use(express.json());
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

const url ='mongodb+srv://sayheyofficial21:Sayhey2021@cluster0.iwhcj.mongodb.net/sayhey';
mongoose.connect(url, 
  { useNewUrlParser: true},
  ()=>{console.log('connected to db')}
);
// app.get('/',(req,res)=>{
//   // console.log("User hait"); 
//   res.send("hello world");
// })
app.use('/api/user',user);



app
.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.get('/', (req, res) => res.render('pages/index'))
.listen(PORT, () => console.log(`Listening on ${ PORT }`))
