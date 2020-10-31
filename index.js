const express = require("express");
const { Client } = require("pg");
const models = require("./models");
const cors = require("cors");
const userRouter = require("./controllers/users");
const generatePairRouter = require('./controllers/generatePairs');
const interestsRouter = require('./controllers/interests');
// require('dotenv').config()

// const connectionString = process.env.CONNECTION_STRING;
// const client = new Client({
//     connectionString: connectionString
// });

var app = express();
app.use(cors());
app.use(express.static("build"));
app.use(express.urlencoded());
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/lunch-pairs', generatePairRouter);
app.use('/api/interests', interestsRouter);
//const query=`SELECT email FROM lottery_lunch_lotterylunchparticipants ORDER BY random() limit 2`
app.set("port", process.env.PORT || 4000);


 app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });



app.get("/api/getLotteryMonthlyPair", async (req, resp) => {
  try {
    const res = await models.getLotteryMonthlyPair();
    console.log("REs is ", res);
    resp.status(200).send(res);
  } catch (err) {
    console.log(err.stack);
    res.status(400).send(err);
  }
});

app.post("/api/insertIntoMonthlyPair", async (request, response, next) => {
  console.log("body is ", request.body);
  try {
    const res = await models.insertIntoMonthlyPair(request.body);
    response.status(200).send(res);
  } catch (err) {
    console.log(err.stack);
    response.status(400).send(err);
  }
});


app.listen(4000, function () {
  console.log("Server is running.. on Port 4000");
});

// (err, data) => {
//       console.log("data is ", data);
//       if (!data) {
//         response.status(400).end();
//       } else {
//         response.json(data.toJSON());
//       }
//     })
