const mysql = require('mysql2');

const user = process.env.MYSQL_USERNAME;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MY_DATABASE;

const db = mysql.createConnection(
    {
        host: 'localhost',
        user,
        password,
        database
    }
)

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as ID ' + db.threadId);
});

// db.query('SHOW TABLES', (err, results) => {
//     if (err) throw err;
//     console.log('Tables:', results);
// });

module.exports = db;