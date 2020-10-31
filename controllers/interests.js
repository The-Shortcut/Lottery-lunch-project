const interestsRouter = require("express").Router();
const models = require("../models");

interestsRouter.get("/", async function (request, response, next) {
  try {
    const res = await models.getInterests();
    console.log("RES is ", res);

    response.status(200).send(res);
  } catch (err) {
    console.log(err.stack);
    response.status(400).send(err);
  }
});

interestsRouter.post("/", async function (request, response, next) {
  try {
    console.log('body si ',request.body);
    const res = await models.addInterests(request.body);
    console.log("RES is ", res);

    response.status(200).send(res);
  } catch (err) {
    console.log(err.stack);
    response.status(400).send(err);
  }
});

module.exports = interestsRouter;
