// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const plants = require("../../Gnome Assets/gardengnomeplantDBexport.json")

console.log(plants.length)

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/gardengnome', { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

// let users = [
//   {
//     username: 'alice',
//     password: bcrypt.hashSync('alice', bcrypt.genSaltSync(bcryptSalt)),
//   },
//   {
//     username: 'bob',
//     password: bcrypt.hashSync('bob', bcrypt.genSaltSync(bcryptSalt)),
//   },
// ];
