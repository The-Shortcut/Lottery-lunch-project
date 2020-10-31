const models = require("./models");

const generatePairs = (users, finalPairs, remainingUsers, duplicateList) => {
  console.log("data is ", users);
  const shuffledArr = getShuffledArr(users);
  createPairsOfTwo(shuffledArr, finalPairs, remainingUsers, duplicateList);
  console.log("duplicates are ", duplicateList);
};
const getShuffledArr = (arr) => {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};

const createPairsOfTwo = (data, finalPairs, remainingUsers, duplicateList) => {
  
   const filteredUsers = data.filter(user => {
     console.log('the current user is ', user.email);
     console.log('The duplicate list is ', duplicateList);
     console.log('is the user found in duplicate list ', duplicateList.includes(user.email));
    return !duplicateList.includes(user.email)
   })
  console.log('filtered useres ', filteredUsers);


  if (filteredUsers && Object.keys(filteredUsers).length > 0) {
    if (filteredUsers.length % 2 === 0) {
      console.log("is even");
      for (let i = 0; i < filteredUsers.length; i = i + 2) {
        finalPairs.push([filteredUsers[i].email, filteredUsers[i + 1].email]);
        duplicateList.push(filteredUsers[i].email);
        duplicateList.push(filteredUsers[i+1].email);
        
      }
      console.log(finalPairs);
    } else {
      console.log("is odd");
      remainingUsers.push(filteredUsers[filteredUsers.length - 1].email);
      for (let i = 0; i < filteredUsers.length - 1; i = i + 2) {
        finalPairs.push([filteredUsers[i].email, filteredUsers[i + 1].email]);
        duplicateList.push(filteredUsers[i].email);
        duplicateList.push(filteredUsers[i+1].email);
        
      }
    }
  }
};

module.exports = { generatePairs };
