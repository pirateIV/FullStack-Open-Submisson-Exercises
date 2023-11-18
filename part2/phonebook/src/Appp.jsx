import { useState } from 'react';
import axios from 'axios';
import Note from './components/Note';

const Appp = props => {
  console.log(props);
  const [notes, setNotes] = useState([]);
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

  const toggleImportanceOf = id => {
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find(n => n.id === id);
    const changedNote = { ...notes, important: !note.important };

    axios.put(url, changedNote).then(response => {
      setNotes(notes.map(n => (n.id !== id ? n : response.data)));
    });
  };

  console.log(showAll);
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map(note => (
          <Note
            key={note.id}
            note={note}
            toggleImportanceOf={() => toggleImportanceOf(note.id)}
          />
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

export default Appp;
