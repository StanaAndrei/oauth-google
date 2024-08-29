const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./user.router');

require('dotenv').config();
require('./passport.cfg')

const app = express();

app.use(bodyParser.json())
app.use(passport.initialize())
app.use(cors());

const HTTP_PORT = 3001;
app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}!`);
    app.use('/api/user/', userRouter);
    app.get('/', (req, res) => res.status(200).send('HI!'))
    app.get('/fail', (req, res) => res.status(500).send('FAIL!!!'))
    app.get('/success', (req, res) => res.status(500).send('SUCCESS!!!'))
})