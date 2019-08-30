const express = require('express');
const cors = require('cors');
const users = require('./users');
// Bring in after
const uc = require('./userController');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/users', (req, res) => {
  res.send(users);
});

app.post('/api/users', (req, res) => {
  let { name } = req.body;
  let id = users.length ? users[users.length - 1].id + 1 : 1;
  users.push({
    id,
    name
  });
  res.send(users);
});

app.put('/api/users/:id', (req, res) => {
  let { id } = req.params;
  let { name } = req.query;
  let index = users.findIndex(user => user.id === parseInt(id));
  if (index !== -1) {
    users[index] = {
      id: users[index].id,
      name: name ? name : users[index].name
    };
  }
  res.send(users);
});

app.delete('/api/users/:id', (req, res) => {
  let { id } = req.params;
  let index = users.findIndex(user => user.id === parseInt(id));
  if (index !== -1) users.splice(index, 1);
  res.send(users);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
