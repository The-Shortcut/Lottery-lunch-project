const { Client } = require('pg');
require('dotenv').config()

const connectionString = process.env.CONNECTION_STRING;
const client = new Client({
    connectionString: connectionString
});


const getLotteryParticipants = async ()=> {
    const query='SELECT email FROM lottery_lunch_lotterylunchparticipants ORDER BY random() limit 2'
    
        try{
        
        const connectionResult = await client.connect();
        const res = await client.query(query);
        console.log('res ',res);
        return res;
    }catch(er){
        console.log(er)
    }
        finally {
            client.end();
        }
    
}


const addLotteryParticipant = async (body) => {
    const {email,first_name, last_name, is_active, join_at} = body;   
    const query = `INSERT INTO lottery_lunch_lotterylunchparticipants (email, first_name, last_name, is_active, join_at) VALUES ('${email}','${first_name}','${last_name}','${is_active}','${join_at}')`;
    try{
        await client.connect();
        console.log('query is ', query)
        const res = await client.query(query);
        console.log('res', res)
        return res;

    }catch(er){
        return console.log(er)
    }
        finally {
           return client.end();
        }
}
module.exports = { getLotteryParticipants, addLotteryParticipant}