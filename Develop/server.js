const express = require('express');

// Tells the app to use the environment variable from heroku and set it to port 3001
const PORT = process.env.PORT || 3001;
const app = express();

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Express Middleware
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// instructs the server to make files (within the public folder) static resouces (readily available) and to not gate it behind a server endpoint
app.use(express.static('public'));

// when client navigates to <ourhost>/api, app will use the router set up in apiRoutes
app.use('/api', apiRoutes);
// when client navigates to homepage('/'), the router will serve back the HTML routes
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}! Check http://localhost:3001/`);
});