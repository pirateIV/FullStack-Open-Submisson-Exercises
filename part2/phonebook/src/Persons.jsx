const Persons = ({ persons, filter, handleDeleteContact }) => {
  const filteredContacts = persons.filter((person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className='contacts'>
      {persons.length > 0
        ? filteredContacts?.map(({ id, name, number }) => (
            <div key={id} className='contact'>
              <span>
                {' '}
                {name} {number}
              </span>
              <button onClick={() => handleDeleteContact(id)}>Delete</button>
            </div>
          ))
        : persons.length === 0 && (
            <p>
              <i>No contacts found...</i>
            </p>
          )}
    </div>
  );
};

export default Persons;
