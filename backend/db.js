const mysql = require('mysql2');

const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

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