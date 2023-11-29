import { useEffect, useState } from 'react';
import axios from 'axios';
import Note from './components/Note';
import noteService from './services/notes2';

const Appp = props => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService.getAll().then(initialRes => setNotes(initialRes));
  }, []);

  const handleNoteChange = e => {
    setNewNote(e.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter(note => note.important);
  const addNote = e => {
    e.preventDefault();

    const noteObject = {
      id: notes.length + 1,
      important: Math.random() < 0.5,
      content: newNote,
    };

    noteService.create(noteObject).then(({ data }) => {
      setNotes(notes.concat(data));
      setNewNote('');
    });

    setNotes(notes.concat(noteObject));
    setNewNote('');
  };

  const toggleImportanceOf = id => {
    const url = `http://localhost:3000/notes/${id}`;
    const note = notes.find(n => n.id === id);

    const changeNote = { ...note, important: !note.important };

    noteService.update(id, changeNote).then(updatedNote => {
      setNotes(notes.map(n => n.id !== id ? n : updatedNote))
    })
  };

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
