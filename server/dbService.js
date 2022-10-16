const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.SERVER_IP,
    PORT: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSW,
    database: process.env.DB_NAME
});

connection.connect((err)=> {
    if (err) {
        console.log(err.message);
    }
    console.log('db ' + connection.state);
})

class DbService{
    static getDbServiceInstance(){
        return instance ? instance : new DbService();                   //vrátí instanci pokud existuje, jinak ji vytvoří, (Condition ? True : False)
    }

    async getLine(name){
        //console.log(name);
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM `words` WHERE id=(?);"
                connection.query(query,[name], (err,result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }

    async getAllData(){
        try {
            const response = await new Promise((resolve, reject) => {   //Promise = něco udělá, čeká na návrat proměných (resolve/reject)
                const query = "SELECT * FROM words;";

                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                }) 
            });
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }

    async howMany(){
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT COUNT(*) FROM words;";
                        connection.query(query, (err, result) => {
                        if (err) reject(new Error(err.message));
                        resolve(result);
                    }) 
            });
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;