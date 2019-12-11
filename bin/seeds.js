// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require('fs');
const http = require('http');
const User = require('../models/User');
const DGPlant = require('../models/DGPlant');

// const plants = require("../../Gnome Assets/gardengnomeplantDBexport.json")

// console.log(plants.length);

const json = JSON.stringify(require('../../dgslug1.json'));

console.log(json.length);

const bcryptSalt = 10;

mongoose
  .connect(
    'mongodb://heroku_6gswz486:ib0jgentjr303pnsra9almok68@ds353738.mlab.com:53738/heroku_6gswz486',
    {
      useNewUrlParser: true,
    }
  )
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    return DGPlant.findOne({ DGID: 1 });
  })
  .then(res => {
    console.log('successfully accessed heroku DB');

    DGPlant.create(json[0]).then(response => console.log(response));
    // http
    //   .createServer(function(req, res) {
    //     const filename = __dirname + req.url;
    //     const readStream = fs.createReadStream('../../dgslug1.txt');
    //     readStream.on('open', function() {
    //       // This just pipes the read stream to the response object (which goes to the client)
    //       readStream.pipe(res);
    //     });

    //     // This catches any errors that happen while creating the readable stream (usually invalid names)
    //     readStream.on('error', function(err) {
    //       res.end(err);
    //     });
    //   })
    //   .listen(8080);
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

// (async () => {
//   for (let i = 0; i < 350; i++) {
//     await DGPlant.findOne({
//       plantImageURL: {
//         $regex: 'https://davesgarden.comhttps://davesgarden',
//       },
//     })
//       .then(res => {
//         console.log('found:', res.DGID);
//         const newImgURL = res.plantImageURL.replace(
//           'https://davesgarden.comhttps://',
//           'https://www.'
//         );
//         return DGPlant.findOneAndUpdate(
//           {
//             DGID: res.DGID,
//           },
//           { plantImageURL: newImgURL },
//           { new: true }
//         );
//       })
//       .then(res => console.log(res.DGID, res.plantImageURL))
//       .catch(err => console.error(err));
//   }
// })();
