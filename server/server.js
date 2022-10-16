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
    const db = dbService.getDbServiceInstance();
    var name = request.body;

    var convert = name.convert;
    var pick = name.pick;
    var hmm = (Object.keys(name)).slice(2);
    var ids = [];
    var add = "";
    for(i=1;i<10;i++){                   //doing this automatically needs to wait for a promise 
        try{
        add = ("id_" + i);
        ids.push(name.id_1);
        }
        catch{}
    }
    console.log(hmm);
    const result = db.getLine("2");
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
