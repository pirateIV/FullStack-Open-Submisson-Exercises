import React, { useEffect, useState } from 'react';

import contacts from './services/contacts';
import PersonForm from './PersonForm';
import Filter from './Filter';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    contacts.getContacts().then((contactList) => setPersons(contactList));
  };

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
        `${newContact.name} already exists in the phonebook,
          replace the old number with the new one ?`
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
    const confirmMessage = 'Are you sure you want to delete this contact ?';
    if (window.confirm(confirmMessage)) {
      contacts.deleteContact(id).then(() => {
        setPersons(persons.filter((persons) => persons.id !== id));
      });
    }
  };

  const isExistingContact = (persons, newContact) => {
    const existingContact = persons.some((person) => {
      return person.name === newContact.name;
    });
    return existingContact;
  };

  const handleEditContact = (contact) => {
    persons.find((person) => {
      if (person.name === contact.name) {
        contacts.updateContact(person.id, contact).then((contacts) => {
          setPersons(contacts);
        });
      }
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} setFilter={setFilter} />

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

export default App;
