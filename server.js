// FIXME: use db correctly


// Require Express to run server and routes
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();

const db = require("./db/db");

// Security!
const md5 = require('md5');

// Set EJS as templating engine
// app.set('views', path.join(__dirname, 'website', 'home'));
// app.set('view engine', 'ejs');

// Housekeeping
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Begin!

let currentUser = null;
let status = null;

async function checkDB(user) { // returns [<email found>, <user if password matches>]
    // console.log('checking for', user);
    const row = await db.get('select email, name, password from user where email = ?', user.email);
    let result = [];

    if (row) {
        result.push(true);
        if (row.password == md5(user.password))
            result.push(row);
        else
            result.push(null);
    } else result = [false, null];

    return result;
}

function addUser(user) {
    db.run("insert into user (email, name, password) values (?,?,?)",
        user.email, user.name, md5(user.password));
}

// Setup server routes

app.use('/', express.static(path.join(__dirname, 'website')));

app.post('/welcome', (req, res) => {
    // console.log('user now:', currentUser);
    console.log('request recieved', req.body);
    let user = req.body;
    checkDB(user).then( indb => {
        if (req.body.action == 'login') {
            currentUser = indb[1];
            // console.log(indb);
            if (currentUser) {
                status = 'old user';
            } else {
                status = 'Email and/or password is/are incorrect!';
            }
        } else { // register new user
            if (indb[0]) {
                status = 'Email already registered!';
                currentUser = null;
            } else {
                addUser(user);
                currentUser = user;
                status = 'new user';
            }
        }

        if (currentUser) {
            console.log('result:', currentUser, status);
            res.send({resp: `Welcome ${currentUser.name}!`});
            // res.render('index', {user: (currentUser ? currentUser.name : null)});
        } else
            res.send({resp: status});
    });
});

// Start Listening
const port = 3000;

app.listen(port, () => {
    console.log('listening on localhost', port);
});
