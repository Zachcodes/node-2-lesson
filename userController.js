const users = require('./users');
const axios = require('axios');
let jedi = [];
// axios.get('https://swapi.co/api/people').then(response => {
//   jedi = response.data.results;
// });

module.exports = {
  getUsers(req, res) {
    res.send(users);
  },
  addUser(req, res) {
    let { name } = req.body;
    let id = users.length ? users[users.length - 1].id + 1 : 1;
    users.push({
      id,
      name
    });
    res.send(users);
  },
  updateUser(req, res) {
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
  },
  deleteUser(req, res) {
    let { id } = req.params;
    let index = users.findIndex(user => user.id === parseInt(id));
    if (index !== -1) users.splice(index, 1);
    res.send(users);
  }
};
