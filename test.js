const db = require('./db/db');
const md5 = require('md5');

// db.query('select * from systemUser;', function(error, results, fields) {
//     console.log(fields);
// })


(async function() {
    const rest = await db.query('select * from systemUser;');
    console.log(rest);

    // await db.query('update systemUser set `password` = ' + db.escape(md5('amr')));
    

})();


