//connect to database
const mysql = require("mysql");
const util = require('util');

const db = mysql.createConnection({
    connectionLimit:10,
    host:'localhost',
    user:'root', // my username
    password:'', // my password; change to fit ur local setup
    database:'car_rental'
});

db.connect((err)=>{
    if(err){
        throw "database error:" + err;
    } 
    console.log(" mysql connected...");
});

db.query = util.promisify(db.query);

module.exports = db;
