const express = require('express');
const fs = require('fs');
const path = require('path');

const { notes } = require('./db/notes');

// Tells the app to use the environment variable from heroku and set it to port 3001
const PORT = process.env.PORT || 3001;
const app = express();

// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');

// Express Middleware
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// instructs the server to make files (within the public folder) static resouces (readily available) and to not gate it behind a server endpoint
app.use(express.static('public'));

// // when client navigates to <ourhost>/api, app will use the router set up in apiRoutes
// app.use('/api', apiRoutes);
// // when client navigates to homepage('/'), the router will serve back the HTML routes
// app.use('/', htmlRoutes);

// route to index (homepage)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// route to notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// route to api call for notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

function createnewNote(body, notesArray) {
  const note = body;
  notesArray.push(body);
  fs.writeFile(
    path.join(__dirname, './db/notes.json'),
    JSON.stringify({ notes: notesArray }, null, 2),
    (err) => {
      if (err) throw err;
    }
  );

  return note;
};

// route to post notes at api database
app.post('/api/notes', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = notes.length.toString();

  console.log(req.body.id);

  const note = createnewNote(req.body, notes);
  
  res.json(note);
});

function deleteNote(id) {
  const newArray = notes.filter( (note, index, arr) => {
    arr.pop()
    return note.id !== id;
  });
};

app.delete('/api/notes/:id', (req, res) => {
  const id = [req.params.id];

  deleteNote(id);

  res.send(`Note with ID of ${id} has been removed.`);
});

// catchall route (BELOW all other routes!)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}! Check http://localhost:3001/`);
});