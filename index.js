const express = require('express');
const { Client } = require('pg');
require('dotenv').config()

const connectionString = process.env.CONNECTION_STRING;
const client = new Client({
    connectionString: connectionString
});

var app = express();
app.use(express.static('build'))
const query=`SELECT email FROM lottery_lunch_lotterylunchparticipants ORDER BY random() limit 2`
app.set('port', process.env.PORT || 4000);
app.get('/api/generateEmails', async function(request, response, next) {
    try {
        const connectionResult = await client.connect();
        const res = await client.query(query);
        console.log('res ',res);
        response.status(200).send(res.rows)
    } catch (err) {
        console.log(err.stack);
        response.status(400).send(err);
    } finally {
        client.end();
    }
});


app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});1