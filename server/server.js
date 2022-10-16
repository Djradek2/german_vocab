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

function randomWord(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

app.post('/get', (request, response) => {  
    const db = dbService.getDbServiceInstance();
    var name = request.body;

    var convert = name.convert;
    var pick = name.pick;
    var ids = (Object.keys(name)).slice(2);
    var many = ids.length;


    if ((convert == 0) && (pick==0)){

    }
    else if ((convert == 0) && (pick==1)){
        
    }
    else if ((convert == 0) && (pick==2)){
        var id = (ids[randomWord(0, many-1)]).slice(3);
    }
    else if ((convert == 1) && (pick==0)){
        
    }
    else if ((convert == 1) && (pick==1)){
        
    }
    else if ((convert == 1) && (pick==2)){
        var id = ids[randomWord(0, many-1)].slice(3);
        
    }
    else if ((convert == 2) && (pick==0)){;

    }
    else if ((convert == 2) && (pick==1)){
        
    }
    else if ((convert == 2) && (pick==2)){
        var id = ids[randomWord(0, many-1)].slice(3);
    }
    //console.log(id);
    const result = db.getLine(id);
    result
    .then(word => response.json({word : word}))
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
