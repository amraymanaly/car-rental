const db = require('./db/db');
const md5 = require('md5');

// db.query('select * from systemUser;', function(error, results, fields) {
//     console.log(fields);
// })


(async function() {
    // const rest = await db.query('select * from systemUser;');
    // console.log(rest);

    const q = `insert into systemUser values ('amr', ${db.escape(md5('amr'))});`;
    console.log('query:', q);
    await db.query(q);
    

})();

var f = async () => {
    rest = await db.query('select * from systemUser;');
    console.log(rest);
}

f();
