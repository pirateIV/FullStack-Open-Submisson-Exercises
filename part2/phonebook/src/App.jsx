import React, { useEffect, useState } from 'react';

import contacts from './services/contacts';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';

const App = () => {
  const [filter, setFilter] = useState('');
  const [number, setNumber] = useState('');
  const [newName, setNewName] = useState('');
  const [message, setMessage] = useState('');
  const [persons, setPersons] = useState([]);
  const [statusColor, setStatusColor] = useState('');
  const [fetchTrigger, setFetchTrigger] = useState(0);

  useEffect(() => {
    fetchContacts();
  }, [fetchTrigger]);

  const fetchContacts = () => {
    contacts.getContacts().then((contacts) => {
      setPersons(contacts);
      console.log(contacts);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleSubmission();
  };

  const handleSubmission = () => {
    const newContact = { name: newName.trim(), number: number.trim() };

    if (
      !newContact.name ||
      !newContact.number ||
      (!newContact.name && newContact.number)
    ) {
      checkValidity(newContact.name, newContact.number);
      return;
    }

    if (isExistingContact(persons, newContact)) {
      handleEditContact(newContact);
      return;
    }
    handleAddContact(newContact);
  };

  const handleAddContact = async (newContact) => {
    contacts
      .createContact(newContact)
      .then(async () => {
        // get the list of updated contacts
        const updatedContacts = await contacts.getContacts();
        setFetchTrigger((prev) => prev + 1);
        setPersons(updatedContacts);
        handleSetMessage(`${newContact.name} added to the phonebook`, 'green')
        return;
      })
      .catch((error) => {
        const errorMessage = error.response.data.error;
        handleSetMessage(errorMessage, 'red');
      });

    resetForm();
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

  const handleEditContact = async (contact) => {
    const existingContact = persons.find((person) => person.name === contact.name);

    if (!existingContact) {
      console.error('contact not found for editing', error);
    }

    const id = existingContact.id;
    const contactToUpdate = { name: contact.name, number: contact.number };

    try {
      const confirmEdit = window.confirm(
        `${contact.name} already exists in the phonebook, replace the old number with the new one ?`
      );
      if (confirmEdit) {
        await contacts.updateContact(id, contactToUpdate);

        setPersons((persons) => {
          return persons.map((person) =>
            person.id === existingContact.id ? { ...person, ...contactToUpdate } : person
          );
        });

        resetForm();
      }
    } catch (error) {
      const errorMessage = error.response.data.error;
      handleSetMessage(errorMessage, 'red');
    }
  };

  const handleSetMessage = (msg, color) => {
    setMessage(msg);
    setStatusColor(color);
    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

  const checkValidity = (name, number) => {
    if (!name && !number) {
      alert('Please both fields are required');
    } else if (!name) {
      alert('The contact name field is required');
    } else if (!number) {
      alert('The contact number field is required');
    }
  };

  const resetForm = () => {
    setNewName('');
    setNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>

      {message !== '' && (
        <div
          id='message'
          style={{
            color: `${statusColor}`,
            border: `3px solid ${statusColor}`,
          }}>
          {message}
        </div>
      )}

      <Filter filter={filter} setFilter={setFilter} />

      <h3>add a new</h3>

      <PersonForm
        number={number}
        newName={newName}
        setNumber={setNumber}
        setNewName={setNewName}
        handleSubmit={handleSubmit}
      />

      <h3>Numbers</h3>

      <Persons
        filter={filter}
        persons={persons}
        fetchContacts={fetchContacts}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
