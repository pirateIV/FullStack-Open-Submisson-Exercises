const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { requestLogger } = require('./utils/middleware/requestLogger');

const app = express();

app.use(express.static('dist'));

// middleware for parsing json requests
app.use(express.json());
app.use(cors());

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// execute middleare for every requests
app.use(requestLogger);

let phonebookEntries = [];

// route used for unknown routes(endpoints)
const unknownEndpoint = (req, res, next) => {
  res.status(400).send({ error: 'unknown endpoint' });
  next();
};

app.use(unknownEndpoint);

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/info', (req, res) => {
  const info = `
    <div>
      <p>Phonebook has info for ${phonebookEntries.length} people</p>
      <p>${new Date()}</p>
    </div>  
`;
  res.send(info);
});

// get all phonebook entries
app.get('/api/persons', (req, res) => {
  res.status(200).json(phonebookEntries);
});

// get single phonebook entry
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);

  const contact = phonebookEntries.find((entry) => entry.id === id);

  if (!contact) {
    res.status(404).json({ error: 'contact not found!' }).end();
  }

  res.status(201).json(contact);
});

// delete single phonebook entry
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    res.status(404).send('contact not found');
    return;
  }

  phonebookEntries = phonebookEntries.filter((entry) => entry.id !== id);

  res.status(204).end();
});

// generate random id for contact
const generateId = () => {
  let id = '';
  for (let i = 0; i < 10; i++) {
    id += Math.floor(Math.random() * 10);
  }
  return Number(id);
};

const checkMissingDetails = (name, number) => {
  if (!name.trim() || !number.trim()) {
    return { err: 'Please fill in the missing details' };
  }
};

const checkExistingContact = (name) => {
  const isExistingContact = phonebookEntries.find((entry) => {
    return entry.name === name;
  });
  if (isExistingContact) {
    return { err: `name must be unique, ${name} already exists` };
  }
};

// create new contact
app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  const newContact = { name, number, id: generateId() };

  let isExisting = checkExistingContact(name);
  let isMissingDetails = checkMissingDetails(name, number);

  if (isExisting) {
    return res.status(400).json(isExisting);
  }

  if (isMissingDetails) {
    return res.status(400).json(isMissingDetails);
  }

  // reach this point if there are no errors
  phonebookEntries = phonebookEntries.concat(newContact);
  return res.status(201).json({ msg: 'new contact added', newContact });
});

// const editContact
app.put('/api/persons/:id', (req, res) => {
  const contactId = Number(req.params.id);

  const { name, number } = req.body;

  const contact = phonebookEntries.find((contact) => contact.id === contactId);

  if (!contact) {
    return res.status(404).json({ err: 'contact not found!' });
  }

  phonebookEntries = phonebookEntries.map((entry) =>
    entry.name === name ? { ...entry, number } : entry
  );

  res.status(200).json(phonebookEntries);
});

module.exports = app;
