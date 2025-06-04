const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");

dotenv.config();


const votersRoute = require("./routes/votersRoutes");
const candidatesRoute = require("./routes/candidatesRoutes");
const votesRoute = require("./routes/votesRoutes");
const electionsRoute = require("./routes/electionsRoutes");

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json())

app.use('/voters', votersRoute);
app.use('/candidates', candidatesRoute);
app.use('/votes', votesRoute);
app.use('/elections', electionsRoute);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


