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
  console.log("name ", request.params.searchterm);
  const username = request.params.name.slice(1);
  console.log("username ", username);
  try {
    console.log("req data ", request.params);
    const res = await models.searchByEmail(username);
    response.status(200).send(res);

    console.log("res from return ", res);
  } catch (err) {
    console.log(err.stack);
    response.status(400).send(err);
  }
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

module.exports = userRouter;
