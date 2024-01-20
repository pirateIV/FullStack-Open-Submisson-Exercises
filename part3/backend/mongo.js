const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// middleware for parsing json requests
app.use(express.json());
app.use(cors());

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const Person = require('./models/persons');

const PORT = process.env.PORT || 3001;

const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('password argument is required!');
  process.exit(1);
}

const password = process.argv[2];

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    console.log('phonebook: ');
    persons.forEach(({ name, number }) => {
      console.log(`${name} ${number}`);
    });

    res.json(persons);
    mongoose.connection.close();
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
