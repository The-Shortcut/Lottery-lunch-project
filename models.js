require("dotenv").config();

const pg = require("pg");

const connectionString = process.env.CONNECTION_STRING;
const pool = new pg.Pool({
  connectionString: connectionString,
});

const getLotteryParticipants = async () => {
  const query =
    "SELECT email FROM lottery_lunch_lotterylunchparticipants ORDER BY random() limit 2";

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

const addLotteryParticipant = async (body) => {
  const { email, first_name, last_name, is_active, join_at } = body;
  const query = `INSERT INTO lottery_lunch_lotterylunchparticipants (email, first_name, last_name, is_active, join_at) VALUES ('${email}','${first_name}','${last_name}','${is_active}','${join_at}')`;
  
    const client = await pool.connect();

    console.log("connection is ", client);
    const res = await client.query(query);
    console.log("res", res);
    client.release(true);

    return res;
 
};



module.exports = { getLotteryParticipants, addLotteryParticipant };
