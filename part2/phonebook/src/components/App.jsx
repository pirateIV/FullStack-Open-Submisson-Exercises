import { useState } from 'react';
import Note from './components/Note';

const App = props => {
  console.log(props);
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  const handleNoteChange = e => {
    setNewNote(e.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter(note => note.important);
  console.log(notesToShow);
  const addNote = e => {
    e.preventDefault();

    const noteObject = {
      id: notes.length + 1,
      important: Math.random() < 0.5,
      content: newNote,
    };
    setNotes(notes.concat(noteObject));
    console.log(noteObject);
    setNewNote('');
  };
  console.log(showAll)
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map(note => (
          <Note key={note.id} note={note} />
        ))}
        <button
          onClick={() => {
            setShowAll(!showAll);
          }}>
          show {showAll ? 'important' : 'all'}
        </button>
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} type='text' onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
    </div>
  );
};

export default App;
