const Persons = ({ persons, filter, handleDeleteContact }) => {
  const filteredContacts = persons.filter((person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className='contacts'>
      {filteredContacts?.map(({ id, name, number }) => (
        <div key={id} className='contact'>
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

export default Persons;
