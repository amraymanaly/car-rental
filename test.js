const db = require('./db/db');
const md5 = require('md5');

// db.query('select * from systemUser;', function(error, results, fields) {
//     console.log(fields);
// })


(async function() {
    // const rest = await db.query('select * from systemUser;');
    // console.log(rest);

    const q = `insert into systemUser values ('aloush', ${db.escape(md5('aloush'))});`;
    console.log('query:', q);
    await db.query(q);
    

})();

// var f = async () => {
//     result = await db.query('select * from reservation;');
//     res = result[0];
//     console.log(res);
//     var d = new Date(res.startDate);
//     console.log(d.getYear());




// }

// f();


