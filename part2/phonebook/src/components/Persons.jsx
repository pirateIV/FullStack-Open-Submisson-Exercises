
const Persons = ({ persons, filter, handleDeleteContact }) => {
  const filteredContacts = persons.filter((person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className='contacts ' id='contacts'>
      {persons && persons.length > 0
        ? filteredContacts.map(({ id, name, number }) => (
            <div key={id} className='contact' id={`contact-${id.substring(0, 5)}`}>
              <span>
                {' '}
                {name} {number}
              </span>
              <button onClick={() => handleDeleteContact(id)}>Delete</button>
            </div>
          ))
        : persons.length === 0 && (
            <p>
              <i>no contact...</i>
            </p>
          )}
    </div>
  );
};

export default Persons;
