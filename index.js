const express = require('express');
const { Client } = require('pg');
const models = require('./models')
// require('dotenv').config()

// const connectionString = process.env.CONNECTION_STRING;
// const client = new Client({
//     connectionString: connectionString
// });

var app = express();
app.use(express.static('build'))
app.use(express.urlencoded());
app.use(express.json()); 
//const query=`SELECT email FROM lottery_lunch_lotterylunchparticipants ORDER BY random() limit 2`
app.set('port', process.env.PORT || 4000);


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/generateEmails', async function(request, response, next) {
    try {
        // const connectionResult = await client.connect();
        // const res = await client.query(query);
        // console.log('res ',res);
      const res = await models.getLotteryParticipants()
        response.status(200).send(res.rows)
    } catch (err) {
        console.log(err.stack);
        response.status(400).send(err);
    } 
});


app.post('/api/addLotteryParticipants', async function(request, response, next) {
    console.log('body is ', request.body)
    try {
      
      const res = await models.addLotteryParticipant(request.body)
        response.status(200).send(res)
    } catch (err) {
        console.log(err.stack);
        response.status(400).send(err);
    } 
});

app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});1
