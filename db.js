const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.MYSQL_USERNAME || 'root',
        password: process.env.MYSQL_PASSWORD || 'siriSQL@1',
        database: process.env.MY_DATABASE || 'electionmanagement'
    }
)

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as ID ' + db.threadId);
});

module.exports = db;