const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors')

require('dotenv').config();
//require('./passport.cfg')

const app = express();

app.use(bodyParser.json())
app.use(passport.initialize())
app.use(
	cors({
		// origin: "http://localhost:3000",
		// methods: "GET,POST,PUT,PATCH,DELETE",
		// credentials: true,
	})
);

const HTTP_PORT = 3001;
app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}!`);
})