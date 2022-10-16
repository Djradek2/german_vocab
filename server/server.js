const express = require('express');
const app = express();
const cors = require('cors');
const env = require('dotenv');
const dbService = require('./dbService');
env.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

//const db = dbService.getDbServiceInstance();

app.post('/get', (request, response) => {  
    var name = request.body;
    name = name.lol;
    //console.log(name);   
    const db = dbService.getDbServiceInstance();
    const result = db.getLine(name);
    result
    .then(word => response.json({word: word}))
    .catch(err => console.log(err));
});

app.get('/getAll', (request, response) => {         //function for getting all SQL entries
    const db = dbService.getDbServiceInstance();
    
    const result = db.getAllData();

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.post('/send', (request, response) => {
    var name = request.body;
});

app.listen(process.env.SERVER_PORT, () => console.log('server online'));