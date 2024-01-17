const PersonForm = (props) => {
  const { newName, number, setNewName, setNumber, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:
        <input type='text' value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:
        <input type='text' value={number} onChange={(e) => setNumber(e.target.value)} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;