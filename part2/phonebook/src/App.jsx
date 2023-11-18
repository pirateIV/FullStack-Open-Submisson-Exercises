import React, { useState, useEffect } from 'react';

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

const Persons = (props) => (
  <div>
    {props.filteredPersons.map(({ name, number, id }) => (
      <p key={id}>
        {name} {number}
      </p>
    ))}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  // const 
  // const [note, setNotes] = useState([])

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
  // console.log(filteredPersons)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={handleFilterChange} />

      <h3>add a new</h3>
      <PersonForm
        persons={handleAddPersons}
        names={handleNames}
        number={handleNumber}
        newName={newName}
        newNaumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons}/>
    </div>
  );
};

export default App;
