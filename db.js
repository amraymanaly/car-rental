//connect to database
const mysql=require("mysql");
const db = mysql.createConnection({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'',
    database:'car_rental'
});

db.connect((err)=>{
    if(err){
        throw "database error:" + err;
    } 
    console.log(" mysql connected...");
});

module.exports = db;