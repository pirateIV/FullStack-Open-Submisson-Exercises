const contactRouter = require('express').Router();
const Person = require('../models/persons');

contactRouter.get('/info', async (req, res) => {
  const count = await Person.countDocuments();
  const info = `
    <div>
      <p>Phonebook has info for ${count} people</p>
      <p>${new Date()}</p>
    </div>  
  `;
  res.send(info);
});

contactRouter.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    console.log('phonebook: ');
    persons.forEach(({ name, number }) => {
      console.log(`${name} ${number}`);
    });

    res.json(persons);
  });
});

contactRouter.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((contact) => {
      if (contact) {
        res.json(contact);
      } else {
        res.status(400).end();
      }
    })
    .catch((error) => next(error));
});

contactRouter.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;

  if (!name && !number) {
    return res.status(400).send({ error: 'content is missing' });
  }

  const person = new Person({
    name,
    number,
  });
  person
    .save()
    .then((newContact) => {
      res.json(newContact);
    })
    .catch((error) => next(error));
});

contactRouter.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((err, docs) => {
      if (err) {
        console.log(err);
        res.status(204).end();
      } else {
        console.log(`deleted ${docs}`);
      }
    })
    .catch((error) => next(error));
});

contactRouter.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  const contact = { name, number };

  Person.findByIdAndUpdate(req.params.id, contact, {
    new: true,
    // to run validation when updating
    runValidators: true,
    context: 'query',
  })
    .then((contact) => {
      if (contact) {
        res.json(contact);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

module.exports = contactRouter;