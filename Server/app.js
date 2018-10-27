// loads environment variables
require('dotenv/config');
const express = require('express');
const cors = require('cors');
const Github = require('./src/Github');
const utils = require('./src/utils');

const app = express();
const port = process.env.PORT || 3000;
const client = new Github({ token: process.env.OAUTH_TOKEN });

// enable CORS for the client app
app.use(cors());

// return informations from user
app.get('/users/:username', (req, res, next) => { // eslint-disable-line no-unused-vars
  client.user(req.params.username)
    .then(user => res.send(user))
    .catch(next);
});

// return all languages used by a user with number of lines of code
app.get('/languages/:username', (req, res, next) => { // eslint-disable-line no-unused-vars
  client.userLanguages(req.params.username)
    .then(utils.getReposLanguagesStats)
    .then(stats => res.send(stats))
    .catch(next);
});

// return the stats of all users repos (only repos created by the user !)
app.get('/stats/:username', (req, res, next) => { // eslint-disable-line no-unused-vars
  client.userStats(req.params.username)
    .then((data) => { return utils.getReposStats(data, req.params.username); })
    .then(stats => res.send(stats))
    .catch(next);
});

// forward 404 to error handler
app.use((req, res, next) => {
  const error = new Error('404 Not found');
  error.status = 404;
  next(error);
});

// error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(err);
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${port}`);
});
