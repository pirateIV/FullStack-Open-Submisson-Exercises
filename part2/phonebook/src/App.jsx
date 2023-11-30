import React, { useState, useEffect } from 'react';

import contactsService from './services/contacts';

const { getContacts, createContact, deleteContact, updatedContact } =
  contactsService;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState('');
  const [messageState, setMessageState] = useState('');

  useEffect(() => {
    getContacts().then(contacts => setPersons([...contacts]));
  }, []);

  const handleNames = e => {
    setNewName(e.target.value);
  };

  const handleNumber = e => {
    try {
      setNewNumber(e.target.value);
    } catch (error) {}
  };

  const handleAddContacts = async e => {
    e.preventDefault();

    const person = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };

    const updateContact = persons.find(p => p.name === person.name);
    const updateContactMsg = `${person.name} is already added to phonebook, replace the old number with the new one ?`;

    if (updateContact !== undefined) {
      if (window.confirm(updateContactMsg)) {
        await updatedContact(updateContact.id, person);
        getContacts()
          .then(contacts => setPersons([...contacts]))
          .catch(error => {
            setMessage(
              `Information if ${updateContact.name} has already been removed from server`
            );
            setMessageState('error');
            setTimeout(() => {
              setMessage(null);
              setMessageState('');
            });
            console.log(error.message);
          });
      }
    } else {
      createContact(person).then(contact => {
        setPersons([...persons, contact]);
        setMessage(`Added ${newName} to phonebook`);
        setMessageState('success');
        setTimeout(() => {
          setMessage(null);
          setMessageState('');
        }, 3000);
      });

      setNewName('');
      setNewNumber('');
    }
  };

  const handleFilterChange = e => {
    setFilter(e.target.value.toLowerCase());
  };

  const handleDeleteContact = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      deleteContact(id).then(() => {
        setPersons([...persons]);
        // update contacts
        getContacts().then(contacts => setPersons([...contacts]));
      });
    }
  };

  const filteredPersons = persons.filter(person => {
    return person.name.toLowerCase().includes(filter);
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageState} />
      <Filter filter={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        persons={handleAddContacts}
        names={handleNames}
        number={handleNumber}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>
      <Persons
        deleteContact={handleDeleteContact}
        filteredPersons={filteredPersons}
      />
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

const Persons = props => {
  return (
    <div>
      {props.filteredPersons.map(({ name, number, id }) => (
        <p key={id}>
          {name} {number}{' '}
          <button onClick={() => props.deleteContact(id, name)}>delete</button>
        </p>
      ))}
    </div>
  );
};

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  return <div className={type}>{message}</div>;
};

export default App;
