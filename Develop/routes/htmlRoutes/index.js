const path = require('path');
const router = require('express').Router();

// route to index (homepage)
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

// route to notes page
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/notes.html"));
});

// // catchall route (BELOW all other routes!)
// router.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, "../../public/index.html"));
// });

module.exports = router;