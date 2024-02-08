import React, { useEffect, useState } from 'react';

import Filter from './components/Filter';
import Persons from './components/Persons';
import contacts from './services/contacts';
import Form, { Input } from './components/Form';
import Notification from './components/Notification';

const App = () => {
  const [filter, setFilter] = useState('');
  const [number, setNumber] = useState('');
  const [newName, setNewName] = useState('');
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState(null);
  const [statusColor, setStatusColor] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    contacts.getContacts().then((contacts) => {
      setPersons(contacts);
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
        setPersons(updatedContacts);
        handleSetMessage(`${newContact.name} added to the phonebook`, 'green');
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
      setMessage(null);
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

      <Notification message={message} status={statusColor} />

      <Filter filter={filter} setFilter={setFilter} />

      <h3>add a new</h3>

      <Form handleSubmit={handleSubmit}>
        <Input
          value={newName}
          id='nameInput'
          label={'name:'}
          setValue={setNewName}
          placeholder='enter name...'
        />
        <Input
          value={number}
          id='numberInput'
          label='number:'
          setValue={setNumber}
          placeholder='enter number...'
        />

        <div>
          <button type='submit'>add new contact</button>
        </div>
      </Form>

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
