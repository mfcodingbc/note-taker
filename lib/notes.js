const fs = require('fs');
const path = require('path');

const { notes } = require('../db/notes.json');

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(body);
  fs.writeFile(
    path.join(__dirname, '../db/notes.json'),
    JSON.stringify({ notes: notesArray }, null, 2),
    (err) => {
      if (err) throw err;
    }
  );

  return note;
};

function deleteNote(id) {
  notes.splice(id, 1);
};

module.exports = {
  createNewNote,
  deleteNote
};