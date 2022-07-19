const express = require('express')
const app = express()
const path = require('path')
require("dotenv").config()
const PORT = process.env.PORT || 3000
// const PORT =   4000 || process.env.PORT 
const mongoose = require('mongoose');
// const hubspot = require('./hubspot');
const meet = require('./routes/meet');
const user = require('./routes/user');
const doc = require('./routes/doctor');
const home = require('./routes/homeapi');
const payment = require('./routes/payment');
const notification = require('./routes/noti');
const appointment = require('./routes/appointment');

var axios = require("axios");




app.use(express.urlencoded({ extended: false }));
app.use(express.json());



const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.iwhcj.mongodb.net/sayhey`;
mongoose.connect(url,
  { useNewUrlParser: true },
  () => { console.log('connected to db') }
);

const hubspot = require('@hubspot/api-client');

app.get('/api/hub', (req, res) => {
  const hubspotClient = new hubspot.Client({ "apiKey": process.env.YOUR_HUBSPOT_API_KEY });

  const email = "sayheyofficial21@gmail.com";
  const after = undefined;
  const limit = 100;
  const archived = false;

  try {
    hubspotClient.crm.owners.ownersApi.getPage(email, after, limit, archived)
      .then((data) => {

        //  res.json(data.results)
        const ownerid = data.results[0].id
        console.log(data.results[0].id);
        console.log(respon);

      })
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }

})




app.use('/api/meet', meet);
app.use('/api/user', user);
app.use('/api/doctor', doc);
app.use('/api/home', home);
app.use('/api/payment', payment);
app.use('/api/notify', notification);
app.use('/api/appointment',appointment);



app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
