const generatePairRouter = require("express").Router();
const helper = require("../helper");
const models = require("../models");

generatePairRouter.get("/", async function (request, response, next) {
  //generates a pair of two randomnly
  let finalResult = [];
  let remainingUsers = [];
  let duplicateList = [];
  let HistoryArray = [];
  try {
    const interestsArr = await models.getInterests();
    const finalPairs = [];
    HistoryArray = await models.getHistoryUsers();
    console.log("History array users are ", HistoryArray);
    for (let interest = 0; interest < interestsArr.length; interest++) {
      console.log("interest is ", interestsArr[interest].interests);
      const res = await models.getLotteryParticipants(
        interestsArr[interest].interests
      );
      console.log("RES is ", res.length);
      if (typeof res !== "undefined" && res !== null && res.length > 0) {
        finalResult = await helper.generatePairs(
          res,
          finalPairs,
          remainingUsers,
          duplicateList,
          HistoryArray
        );
      }
      console.log("remaing users ", remainingUsers);
    }

    console.log("FinalPairs ", finalPairs);
    response.status(200).send(finalPairs);
  } catch (err) {
    console.log(err.stack);
    response.status(400).send(err);
  }
});

module.exports = generatePairRouter;
