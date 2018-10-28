// loads environment variables
require('dotenv/config');
const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
const Github = require('./src/Github');
const utils = require('./src/utils');

const app = express();
const port = process.env.PORT || 3000;
const client = new Github({ token: process.env.OAUTH_TOKEN });

/* test database
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTS}/${process.env.DB_NAME}?${process.env.DB_OPTIONS}`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'ERROR : Server not connected to the DB : '));
db.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('Server connected to the DB');
});

const { Schema } = mongoose;
const userSchema = new Schema({ name: { type: String, required: true } });
const User = mongoose.model('User', userSchema);
const lionel = new User({ name: 'LionelNanchen' });
lionel.save().then(() => console.log('User saved'));
*/

// enable CORS for the client app
app.use(cors());

// return informations from user
app.get('/', (req, res) => {
  res.send('API working fine.');
});

// return informations from user
app.get('/users/:username', (req, res, next) => {
  client.user(req.params.username)
    .then(user => res.send(user))
    .catch(next);
});

// return the stats of all users repos (only repos created by the user !)
app.get('/stats/:username', (req, res, next) => {
  client.userStats(req.params.username)
    .then((data) => { return utils.getReposStats(data, req.params.username); })
    .then(stats => res.send(stats))
    .catch(next);
});

// return followers users
app.get('/following/:username', (req, res, next) => {
  client.userFollowing(req.params.username)
    .then(stats => res.send(stats))
    .catch(next);
});

// return following users
app.get('/followers/:username', (req, res, next) => {
  client.userFollowers(req.params.username)
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
app.use((err, req, res) => {
  console.error(err);
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${port}`);
});
