const express = require('express');

const app = express();

app.use(express.json());

let phonebookEntries = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

const PORT = 3001;

app.get('/', (request, response) => {
  response.send(`<h1>Phonebook Backend</h1>`);
});

app.get('/api/persons', (request, response) => {
  response.json(phonebookEntries);
});

app.get('/info', (request, response) => {
  const contactsLength = phonebookEntries.length;
  let date = new Date();
  response.send(
    `
      <p>Phonebook has info for ${contactsLength} people</p>
      <p>${date}</p>
    `
  );
});

// get single phonebook entry
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);

  const person = phonebookEntries.find(p => p.id === id);
  person ? response.json(person) : response.status(404).end();
});

// delete single phonebook entry
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);

  phonebookEntries = phonebookEntries.filter(entry => entry.id !== id);
  response.status(204).end();
});

const genrateRandomId = () => {
  let random = '';
  for (let i = 1; i < 8; i++) {
    random += Math.floor(Math.random() * 10);
  }
  return parseInt(random);
};

// add to contact to phonebook
app.post('/api/persons/', (request, response) => {
  const name = request.body.name;
  const number = request.body.number;

  const newContact = {
    id: genrateRandomId(),
    name: name,
    number: number,
  };

  const res = handleErrors.findExistingContact(newContact);
  const isAddedContact = handleErrors.emptyFields(newContact);
  if (res.error) {
    return response.status(409).json(res);
  } else if (isAddedContact.error) {
    console.log(isAddedContact);
    return response.json(isAddedContact);
  } else {
    phonebookEntries = phonebookEntries.concat(newContact);
    return response.status(201).json(res);
  }
});

const handleErrors = {
  findExistingContact: newContact => {
    const existingContact = phonebookEntries.find(
      entry => entry.name === newContact.name
    );
    if (existingContact) {
      return {
        error: `name must be unique, ${newContact.name} already exists in the phonebook`,
      };
    } else {
      return newContact;
    }
  },
  emptyFields: newContact => {
    const { name, number } = newContact;

    if (name === '' || number === '') {
      return { error: 'name or number must not be empty' };
    } else {
      return newContact;
    }
  },
};

app.listen(PORT, () => {
  console.log(`Server is running at url \n\n\n http://localhost:${PORT}`);
});
