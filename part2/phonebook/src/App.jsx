import React, { useEffect, useState } from 'react';

import axios from 'axios';

import contacts from './services/contacts';

// let phonebookEntries = [
//   { name: 'Arto Hellas', number: '040-123456', id: 1 },
//   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
//   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
//   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
// ];

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    contacts.getContacts().then((contactList) => setPersons(contactList));
  }, [persons]);

  const handleSubmit = (e) => {
    e.preventDefault();

    handleAddContact();
    setNewName('');
    setNumber('');
  };

  const handleAddContact = () => {
    const id = persons.length > 1 ? Math.max(...persons.map(({ id }) => id)) + 1 : 1;
    const newContact = { id, name: newName.trim(), number: number.trim() };

    if (isExistingContact(persons, newContact)) {
      alert(
        `${newContact.name} already exists in the phonebook, replace the old number with the new one ?`
      );
      handleEditContact(newContact);
      return;
    }

    contacts.createContact(newContact).then(({ newContact }) => {
      setPersons(persons.concat(newContact));
      setTimeout(() => alert(`${newName} is already added to phonebook`), 100);
    });
  };

  const handleDeleteContact = (id) => {
    setPersons(persons.filter((persons) => persons.id !== id));
  };

  const isExistingContact = (persons, newContact) => {
    const existingContact = persons.some((person) => {
      return person.name === newContact.name;
    });
    return existingContact;
  };

  const handleEditContact = (newContact) => {
    const updatedContacts = persons.map((person) => {
      return person.name === newContact.name
        ? { ...person, number: newContact.number }
        : person;
    });
    setPersons(updatedContacts);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        filter={filter}
        setFilter={setFilter}
      />

      <h3>add a new</h3>

      <PersonForm
        number={number}
        newName={newName}
        setNumber={setNumber}
        setNewName={setNewName}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>

      <Persons
        filter={filter}
        persons={persons}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

const Filter = ({ filter, setFilter }) => {
  const handleFilterContacts = (e) => {
    setFilter(e.target.value);
  };

  return (
    <form className='filter__contact-form'>
      <label>
        filter shown with:
        <input
          type='text'
          value={filter}
          onChange={(e) => handleFilterContacts(e)}
        />
      </label>
    </form>
  );
};

const Persons = ({ persons, filter, handleDeleteContact }) => {
  const filteredContacts = persons.filter((person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className='contacts'>
      {filteredContacts?.map(({ id, name, number }) => (
        <div
          key={id}
          className='contact'>
          <span>
            {' '}
            {name} {number}
          </span>
          <button onClick={() => handleDeleteContact(id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

const PersonForm = (props) => {
  const { newName, number, setNewName, setNumber, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:
        <input
          type='text'
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <div>
        number:
        <input
          type='text'
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default App;
