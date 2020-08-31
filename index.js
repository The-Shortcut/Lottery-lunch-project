const express = require("express");
const { Client } = require("pg");
const models = require("./models");
const cors = require("cors");
// require('dotenv').config()

// const connectionString = process.env.CONNECTION_STRING;
// const client = new Client({
//     connectionString: connectionString
// });

var app = express();
app.use(express.static("build"));
app.use(express.urlencoded());
app.use(express.json());
//const query=`SELECT email FROM lottery_lunch_lotterylunchparticipants ORDER BY random() limit 2`
app.set("port", process.env.PORT || 4000);

app.use(cors());
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.get("/api/generateEmails", async function (request, response, next) {
  try {
    // const connectionResult = await client.connect();
    // const res = await client.query(query);
    // console.log('res ',res);
    const res = await models.getLotteryParticipants();
    console.log("RES is ", res);
    response.status(200).send(res);
  } catch (err) {
    console.log(err.stack);
    response.status(400).send(err);
  }
});

app.post("/api/addLotteryParticipants", async function (
  request,
  response,
  next
) {
  console.log("body is ", request.body);
  try {
    const res = await models.addLotteryParticipant(request.body);
    response.status(200).send(res);
  } catch (err) {
    if (err.stack.includes("password authentication failed for user")) {
      console.log("problem with password");
      response.status(500).send(err);
    } else {
      console.log(err.stack);
      response.status(400).send(err);
    }
  }
});

app.listen(4000, function () {
  console.log("Server is running.. on Port 4000");
});
1;
