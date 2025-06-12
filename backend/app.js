const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const swaggerUIPath = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");

dotenv.config();

const votersRoute = require("./routes/votersRoutes");
const candidatesRoute = require("./routes/candidatesRoutes");
const votesRoute = require("./routes/votesRoutes");
const electionsRoute = require("./routes/electionsRoutes");
const userAuthRoute = require("./routes/userAuthRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use('/voters', votersRoute);
app.use('/candidates', candidatesRoute);
app.use('/votes', votesRoute);
app.use('/elections', electionsRoute);
app.use('/auth', userAuthRoute);

const file = fs.readFileSync("./docs/swagger.yaml", "utf-8");
const swaggerDoc = YAML.parse(file);

app.use("/api-docs", swaggerUIPath.serve, swaggerUIPath.setup(swaggerDoc));

module.exports = app;