const express = require('express');
const path = require('path');
const app = express();
const db = require("./db/db");
const md5 = require('md5');

// housekeeping
app.set('views', path.join(__dirname, 'website', 'views'));
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let currentUser = {admin: false};

async function checkDB(user) {
    // returns: null if id doesn't match
    //          false if id matches but not password
    //          true if all is good

    let q = await db.query(`select userId, password from systemUser where userId = ${db.escape(user.userId)}`)
    
    if (q.length != 1) return null;

    return q[0].password === md5(user.password);
}

async function addUser(user) {
    // validation checks
    if (/^\s*$/.test(user.password)) // empty password
        return 'Password is empty';

    // all good!
    await db.query(`insert into systemUser (userId, password) values
    (${db.escape(user.userId)}, ${db.escape(md5(user.password))})`);

    await db.query(`insert into customer (customerId, firstName, lastName) values
    (${db.escape(user.userId)}, ${db.escape(user.firstName)}, ${db.escape(user.lastName)})`);

    return false;
}

async function addNewCar(car){
    let res;
    try {
        await db.query(`insert into car (make,model,pricePerDay,status,year,topSpeed_KMperH,color,plateId,countryOfOrigin,image) values
        (${db.escape(car.make)}, ${db.escape(car.model)}, ${db.escape(car.pricePerDay)},
        ${db.escape(car.status)}, ${db.escape(car.year)}, ${db.escape(car.topSpeed_KMperH)},
        ${db.escape(car.color)}, ${db.escape(car.plateId)}, ${db.escape(car.countryOfOrigin)}, ${db.escape(car.image)})`);
    } catch (e) {
        res = e.message;
    }

    return res;
}

// Setup server routes

app.use('/', express.static(path.join(__dirname, 'website')));

app.post('/login', (req, res) => {
    currentUser = null;
    let user = req.body;
    checkDB(user).then(dbRes => {
        if (!dbRes)
            return res.send({enter: false, msg: dbRes == null ? 'User does not exist' : 'Wrong Password'});
        
        currentUser = user;
        db.query(`select * from admin where adminId = ${db.escape(currentUser.userId)};`)
        .then(q => {
            currentUser.admin = q.length == 1;
            res.send({enter: true, admin: currentUser.admin});
        });
    });
});

app.post('/register', (req, res) => {
    currentUser = null;
    let user = req.body;
    console.log('recieved registration request:', user);
    checkDB(user).then(async dbRes => {
        if (dbRes)
            return res.send({enter: false, msg: 'User already registered'});
        
        let add = await addUser(user);
        if (add)
            return res.send({enter: false, msg: add});

        currentUser = user;
        res.send({enter: true});
    });
});

app.post('/addCar', (req, res) => {
    let car = req.body;
    console.log('recieved car registration request:', car);

    let add = await addNewCar(car);

    if (add)
        return res.send({success: false, msg: add});

    return res.send({success: true});
});



app.get('/customerHome', async (req, res) => {
    // customer, show own reservations
    res.render('customerReservations', {reservations: await getAllUserReservations()});
});

app.get('/adminPortal', async (req, res) => {
    if (!currentUser.admin)
        return res.status(401).send('unauthorized access');

    // admin, show everything
    res.render('adminPortal', {
        cars: await getAllCars(),
        customers: await getAllCustomers(),
        reservations: await getAllReservations()
    });
});

app.get('/store', async (req, res) => {
    res.render('store', {cars: await getAllCars()});
});

app.get('/logout', (req, res) => {
    currentUser = null;
});

function getAllCars() {
    return db.query('select * from car;');
}

function getAllCustomers() {
    return db.query('select * from customer;');
}

function getAllReservations() {
    return db.query('select * from customer_reservation_car;');
}

function getAllUserReservations() {
    return db.query(`select * from customer_reservation_car where customerId = ${db.escape(currentUser.userId)};`);
}

// Start Listening
const port = 3000;

app.listen(port, () => {
    console.log('listening on localhost', port);
});
