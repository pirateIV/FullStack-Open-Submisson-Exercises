const Persons = ({ persons, filter, handleDeleteContact }) => {
  const filteredContacts = persons.filter((person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className='contacts' id='contacts'>
      {filteredContacts.length > 0 ? (
        filteredContacts.map(({ id, name, number }) => (
          <div key={id} className='contact' id={`contact-${id.substring(0, 5)}`}>
            <div>
              <span>{name}</span>
              <span>{number}</span>
            </div>
            <button onClick={() => handleDeleteContact(id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>
          {filter.length > 0 ? (
            <i>No contact found for "{filter}"...</i>
          ) : (
            <i>No contact available...</i>
          )}
        </p>
      )}
    </div>
  );
};

export default Persons;
