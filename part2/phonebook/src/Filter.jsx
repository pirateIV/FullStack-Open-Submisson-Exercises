const Filter = ({ filter, setFilter }) => {
  const handleFilterContacts = (e) => {
    setFilter(e.target.value);
  };

  return (
    <form className='filter__contact-form'>
      <label>
        filter shown with:
        <input type='text' value={filter} onChange={(e) => handleFilterContacts(e)} />
      </label>
    </form>
  );
};

export default Filter;
