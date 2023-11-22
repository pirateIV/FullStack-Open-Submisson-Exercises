import React, { useState, useEffect } from 'react';

import contactsService from './services/contacts';

const { getContacts } = contactsService;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    getContacts().then(contacts => setPersons([...contacts]));
  }, []);

  const handleNames = e => {
    setNewName(e.target.value);
  };

  const handleNumber = e => {
    setNewNumber(e.target.value);
  };

  const handleAddPersons = e => {
    e.preventDefault();

    const person = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };

    setPersons([...persons, person]);
    alert(`${newName} is already added to phonebook`);
    setNewName('');
    setNewNumber('');
  };

  const handleFilterChange = e => {
    setFilter(e.target.value.toLowerCase());
  };

  const filteredPersons = persons.filter(person => {
    return person.name.toLowerCase().includes(filter);
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        persons={handleAddPersons}
        names={handleNames}
        number={handleNumber}
        newName={newName}
        newNaumber={newNumber}
      />

      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

const Filter = ({ filter }) => (
  <div>
    filter shown with <input type='search' onChange={filter} />
  </div>
);

const PersonForm = props => (
  <form onSubmit={props.persons}>
    <div>
      name: <input onChange={props.names} value={props.newName} />
    </div>
    <div>
      number: <input onChange={props.number} value={props.newNumber} />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
);

const Persons = props => (
  <div>
    {props.filteredPersons.map(({ name, number, id }) => (
      <p key={id}>
        {name} {number}
      </p>
    ))}
  </div>
);

export default App;
