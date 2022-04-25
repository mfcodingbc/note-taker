const router = require('express').Router();

const { createNewNote, deleteNote } = require('../../lib/notes');
const { notes } = require('../../db/notes.json');

// route to api call for notes
router.get('/notes', (req, res) => {
  res.json(notes);
});

// route to post notes at api database
router.post('/notes', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = notes.length.toString();

  const note = createNewNote(req.body, notes);
  
  res.json(note);
});

router.delete('/notes/:id', (req, res) => {
  const id = [req.params.id];

  deleteNote(id);

  res.send(`Note with ID of ${id} has been removed.`);
});

module.exports = router;