const express = require('express');

const router = express.Router();
const User = require('../models/User');
const Plant = require('../models/Plant');
const PersonalPlant = require('../models/PersonalPlant');

// const mongoose = require('mongoose');

// GET /api/plants
// router.get('/:id', (req, res) => {
//   // return all plants matching search query
//   const plantName = req.params.id;
//   Plant.find({ plantCommonName: /chinese/i })
//     // Plant.find({ plantCommonName: { $regex: plantName, $options: 'i' } })
//     .limit(50)
//     .exec()
//     .then(plants => {
//       console.log("SUCCESSFUL Router.get FIND: ", plants)
//       res.json(plants);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

// GET /api/plants/mygarden
router.get("/mygarden", (req, res) => {
  // Return your whole garden
  return User.findById(req.user._id)
    .populate({
      path: "garden",
      // model: "PersonalPlant",
      populate: {
        path: "plantId",
        model: "Plant"
      }
    })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// POST /api/plants
router.post("/mygarden", (req, res) => {
  // Add a plant to your garden
  return PersonalPlant.create({
    name: "My Abelia Engleriana",
    owner: req.user._id,
    plantId: "5de850e4d65f1b61b834191c",
  }).then(personalPlant => {
    // Update the user's document by adding the new plant into their garden array
    return User.findByIdAndUpdate(req.user._id,
      {
        $push: { garden: personalPlant._id }
      },
      { new: true })
      // Populate the array of plants in garden for use on the front end
      .populate({
        path: "garden",
        // model: "PersonalPlant",
        populate: {
          path: "plantId",
          model: "Plant"
        }
      })
  })
    .then(user => {
      console.log('NEW USER WITH NEW PLANT ADDED TO GARDEN: ==> ', user)
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// PUT /api/plants/:id
// router.put("/:id", (req, res) => {
// update a plant in your garden

//   Plant.findByIdAndUpdate(
//     req.params.id,
//     {
//       title: req.body.title,
//       description: req.body.description
//     },
//     { new: true }
//   )
//     .then(plant => {
//       res.json(plant);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

// DELETE /api/plants/:id
// router.delete("/:id", (req, res) => {
//   Plant.findByIdAndDelete(req.params.id)
//     // Delete a plant from garden

//     .then(plant => {
//       // Deletes all the documents in the Task collection where the value for the `_id` field is present in the `plant.tasks` array
//       return Task.deleteMany({ _id: { $in: plant.tasks } }).then(() =>
//         res.json({ message: "ok" })
//       );
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

module.exports = router;
