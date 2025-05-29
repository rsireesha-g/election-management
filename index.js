const express = require('express');
const db = require("./db");

const votersRoute = require("./routes/votersRoutes");
const candidatesRoute = require("./routes/candidatesRoutes");
const votesRoute = require("./routes/votesRoutes");
const electionsRoute = require("./routes/electionsRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use('/voters', votersRoute);
app.use('/candidates', candidatesRoute);
app.use('/votes', votesRoute);
app.use('/elections', electionsRoute);

// db.query('SHOW TABLES', (err, results) => {
//     if (err) throw err;
//     console.log('Tables:', results);
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


