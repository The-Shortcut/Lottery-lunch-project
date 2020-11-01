require("dotenv").config();

const pg = require("pg");

const connectionString = process.env.CONNECTION_STRING;
const pool = new pg.Pool({
  connectionString: connectionString,
});

const getLotteryParticipants = async (interest) => {
  const query = `SELECT email FROM lottery_lunch_user_interests where interests='${interest}';`;

  try {
    const client = await pool.connect();
    const res = await client.query(query);
    console.log("res ", res.rows);
    client.release(true);

    return res.rows;
  } catch (er) {
    console.log(er);
  }
};
const getInterests = async () => {
  const query = "select * from lottery_lunch_interests;";
  try {
    const client = await pool.connect();
    const res = await client.query(query);
    console.log("interets are ", res.rows);
    client.release(true);

    return res.rows;
  } catch (er) {
    console.log(er);
  }
};
const addInterests = async (body) => {
  const { interest } = body;
  const query = `INSERT INTO lottery_lunch_interests (interests) VALUES ('${interest}');`;
  try {
    const client = await pool.connect();
    const res = await client.query(query);
    console.log("interets added ", res);
    client.release(true);

    return res;
  } catch (er) {
    console.log(er);
  }
};

const getHistoryUsers = async () => {
  console.log("within func");
  const query = "SELECT * FROM lottery_lunch_history_user_pairs;";
  try {
    const client = await pool.connect();
    const res = await client.query(query);
    console.log("res ", res);
    client.release(true);
    return res.rows;
  } catch (er) {
    console.log(er);
  }
};

const insertIntoHistory = async (body) => {
  
  const query = `INSERT INTO lottery_lunch_history_user_pairs(email1, email2) values('${body[0]}','${body[1]}')`;
  const client = await pool.connect();

  // console.log("connection is ", client);
  const res = await client.query(query);
  console.log("res", res);
  client.release(true);

  return res;
};
const addLotteryParticipant = async (body) => {
  const { email, first_name, last_name, join_at } = body;
  const query = `INSERT INTO lottery_lunch_users (email, first_name, last_name, joined_at) VALUES ('${email}','${first_name}','${last_name}','${join_at}')`;

  const client = await pool.connect();

  // console.log("connection is ", client);
  const res = await client.query(query);
  console.log("res", res);
  client.release(true);

  return res;
};

const searchByEmail = async (username) => {
  const query = `SELECT *  FROM lottery_lunch_lotterylunchparticipants where first_name='${username}' `;
  const client = await pool.connect();

  // console.log("connection is ", client);
  const res = await client.query(query);
  console.log("res", res);
  client.release(true);

  return res;
};

const deleteByEmail = async (body) => {
  const { email } = body;
  console.log("email ", email);

  const query1 = `DELETE FROM lottery_lunch_user_interests WHERE email='${email}';DELETE FROM lottery_lunch_users WHERE email='${email}';`;

  try {
    const client = await pool.connect();

    const res = await client.query(query1);

    client.release(true);
    return res;
  } catch (er) {
    console.log(er);
  }
};
module.exports = {
  getLotteryParticipants,
  getInterests,
  addInterests,
  addLotteryParticipant,
  getHistoryUsers,
  insertIntoHistory,
  searchByEmail,
  deleteByEmail,
};
