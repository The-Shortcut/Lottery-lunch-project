const userRouter = require("express").Router();
const models = require("../models");

userRouter.post("/", async function (request, response, next) {
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

userRouter.get("/:email", async (request, response, next) => {
  console.log("data is ", request.params);
  // const username = request.params.name.slice(1);
  // console.log("username ", username);
  // try {
  //   console.log("req data ", request.params);
  //   const res = await models.searchByEmail(username);
  //   response.status(200).send(res);

  //   console.log("res from return ", res);
  // } catch (err) {
  //   console.log(err.stack);
  //   response.status(400).send(err);
  // }
});

userRouter.delete("/:email", async (request, response, next) => {
  console.log("within app");
  console.log("req data ", request.body);
  try {
    const res = await models.deleteByEmail(request.body);
    response.status(200).send(res);

    console.log("res from return ", res);
  } catch (err) {
    console.log(err.stack);
    response.status(400).send(err);
  }
});

userRouter.get("/getHistoryUsers", async (req, resp) => {
  try {
    const res = await models.getHistoryUsers();
    console.log("REs is ", res);
    resp.status(200).send(res);
  } catch (err) {
    console.log(err.stack);
    res.status(400).send(err);
  }
});

userRouter.post("/insertIntoHistory", async (request, response, next) => {
  console.log("body is ", request.body);
  try {
    let res;
    request.body.forEach(async (emailList) => {
       res = await models.insertIntoHistory(emailList);
    });

    response.status(200).send(res);
  } catch (err) {
    console.log(err.stack);
    response.status(400).send(err);
  }
});

module.exports = userRouter;
