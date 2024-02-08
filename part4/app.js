const express = require('express');
const app = express();

const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const connectDB = require('./config/db');

mongoose.set('strictQuery', false);

connectDB();

app.use(express.json());
app.use(cors());

module.exports = app;
