// FIXME: use db correctly


// Require Express to run server and routes
const express = require('express');
const path = require('path');
const app = express();
const db = require("./db/db");

// Security!
const md5 = require('md5');

// Set EJS as templating engine
app.set('views', path.join(__dirname, 'website', 'views'));
app.set('view engine', 'ejs');

// Housekeeping
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Begin!

let currentUser = null;
let status = null;

async function checkDB(user) { // returns [<id found?>, <user if password matches>]
    // console.log('checking for', user);
    row = null;
    try {
        row = (await db.query(`select userId, password from systemUser where userId = ${db.escape(user.userId)}`))[0];
    } catch { };

    if (row) {
        if (row.password == md5(user.password)) return [true, row];
        return [true, null];
    }

    return [false, null];
}

function addUser(user) {
    return db.query(`insert into systemUser (userId, password) values (${db.escape(user.userId)},${db.escape(md5(user.password))})`);
}

// Setup server routes

app.use('/', express.static(path.join(__dirname, 'website')));

// for logging in and registeration
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
                status = 'Id and/or password is/are incorrect!';
            }
        } else { // register new user
            if (indb[0]) {
                status = 'Id already registered!';
                currentUser = null;
            } else {
                //FIXME: add user info
                addUser(user);
                currentUser = user;
                status = 'new user';
            }
        }

        if (currentUser) {
            console.log('result:', currentUser, status);
            // res.send({resp: `Welcome ${currentUser.userId}!`});
            // res.render('userPanel', {user: (currentUser ? currentUser.userId : null)});
            // FIXME: make it userPanel
            res.send({enter: true}); // user script may get /store
        } else
            res.send({enter: false, msg: status});
    });
});

app.get('/customerHome', async (req, res) => {
    // customer, show own reservations
    res.render('customerReservations', {reservations: await getAllUserReservations()});
});

app.get('/adminPortal', async (req, res) => {
    // admin, show everything
    res.render('adminPortal', {
        cars: await getAllCars(),
        customers: await getAllCustomers(),
        reservation: await getAllReservations()
    });
});

app.post('/searchForACar', async (req, res) => {
    // use search paramters to select cars
});

app.get('/store', async (req, res) => {
    res.render('store', {cars: await getAllCars()});
});

// some common queries, FIXME: change them to views later...

function getAllCars() {
    return db.query('select * from car;');
}

function getAllCustomers() {
    return db.query('select * from customer;');
}

function getAllReservations() {
    return db.query('select * from reservation;');
}

function getAllUserReservations() {
    return db.query(`select * from reservation where customerId = ${db.escape(currentUser.userId)};`);
}

// Start Listening
const port = 3000;

app.listen(port, () => {
    console.log('listening on localhost', port);
});
