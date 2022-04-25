const fs = require('fs');

const {
  createNewNote,
  deleteNote
} = require('../lib/notes');
const { notes } = require('../db/notes.json');
jest.mock('fs');

test("creates a note object", () => {
  const note = createNewNote(
    { title: "Test Note", text: "Test Text", id: "45" },
    notes
  );

  expect(note.title).toBe("Test Note");
  expect(note.text).toBe("Test Text");
  expect(note.id).toBe("45");
});

test("deletes a selected note", () => {
  const noteId = "45";

  const noNote = deleteNote(noteId);

  expect(noNote).toBe(undefined);
});