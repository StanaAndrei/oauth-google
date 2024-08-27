const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

require('dotenv').config();
//require('./passport.cfg')

const app = express();

app.use(bodyParser.json())
app.use(passport.initialize())


const HTTP_PORT = 3000;
app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}!`);
})