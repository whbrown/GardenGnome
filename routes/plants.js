const express = require('express');

const router = express.Router();
const User = require('../models/User');
const Plant = require('../models/Plant');
const PersonalPlant = require('../models/PersonalPlant');

// const mongoose = require('mongoose');
const mongoose = require('mongoose');
const DGPlant = require('../models/DGPlant');
const getLevenshteinDistance = require('../utils/getLevenshteinDistance');

// GET /api/plants/mygarden
router.get("/mygarden", (req, res) => {
  // Return your whole garden
  return User.findById(req.user._id)
    .populate({
      path: "garden",
      // model: "PersonalPlant",
      populate: {
        path: "plantId",
        // model: "Plant"
      }
    })
    .then(user => {
      console.log("HELLOOOO?:", user)
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

// GET /api/plants
router.get('/:id', (req, res) => {
  // return all plants matching search query
  const searchQuery = req.params.id;
  console.log('searching for: ', searchQuery);
  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
  // Plant.find({ plantCommonName: /`${searchQuery}`/i })
  console.log('sending search', searchQuery)
  let searchRegExp = new RegExp(searchQuery, 'i');
  DGPlant.find({
    $or: [
      { plantLatinName: searchRegExp },
      { plantCommonNames: { $in: [searchRegExp] } },
      { 'taxonomicInfo.plantGenus': searchRegExp },
    ],
  })
    .sort({ plantComments: -1 })
    .limit(200)
    .exec()
    .then(plants => {
      // if (!plants.length) return res.json(null);
      if (!plants.length && searchQuery.split(' ').length > 1) {
        console.log('split ')
        searchRegExp = new RegExp(searchQuery.split(' ')[0], 'i');
        return DGPlant.find({
          $or: [
            { plantLatinName: searchRegExp },
            { plantCommonNames: { $in: [searchRegExp] } },
            { 'taxonomicInfo.plantGenus': searchRegExp },
          ],
        })
          .sort({ plantComments: -1 })
          .limit(200)
          .exec()
      }
      return plants;
    }).then(
      plants => {
        if (!plants.length) return res.json(null);
        // TODO: if empty, split the searchQuery on spaces and make a new query with the first word, 
        // returning that to the front end. compromise due to the inability of mongodb
        // to handle fuzzy requests like elasticsearch
        // const exactMatch = new RegExp(`^${searchQuery}$`, 'i');
        const plantVsQueryLevenschteinDistance = (plant, query) => {
          let names = [];

          names = names
            .concat(plant.plantCommonNames)
            .concat([plant.plantLatinName])
            .concat(
              plant.taxonomicInfo.plantGenus
                .match(/[a-zA-Z-]+/g)
            )
            .concat(
              plant.taxonomicInfo.plantFamily
                .match(/[a-zA-Z-]+/g)
                .filter(word => !word.includes('-'))
            );

          return Math.min(
            ...names.map(name => {
              const words = name.match(/\w+/g);
              return Math.min(
                ...words.map(word =>
                  getLevenshteinDistance(query.toLowerCase(), word.toLowerCase())
                )
              );
            })
          );
        };
        // console.time();
        console.time('sort results')
        plants.sort(
          (a, b) => {
            // check if exact levenschtein match on first common name, excluding cultivar name
            const plantName = a.plantCommonNames[0].match(/([\w\s])+/g)[0].match(/\w+/g);
            if (Math.min(
              ...plantName.map(word =>
                getLevenshteinDistance(word.toLowerCase(), searchQuery.toLowerCase())
              )
            ) === 0) return -1;
            // check levenschtein match for all other names
            return plantVsQueryLevenschteinDistance(a, searchQuery) -
              plantVsQueryLevenschteinDistance(b, searchQuery)
          }
        )
          .sort((a, b) => {
            // final sort pass to prioritize plants with pictures (decent heuristic for relevance & looks nicer)
            if (a.plantImageURL && !b.plantImageURL) return -1;
            else if (b.plantImageURL && !a.plantImageURL) return 1;
          })
          ;
        // console.log('SUCCESSFUL Router.get FIND: ', plants);
        console.timeEnd('sort results')
        return res.json(plants);
      })
    .catch(err => {
      return res.status(500).json(err);
    });
});

// GET /api/plants/:id
// router.get("/:id", (req, res) => {
//   // return 1 plant w/ a given id
//   const plantId = req.params.id;

//   if (!mongoose.Types.ObjectId.isValid(plantId)) {
//     res.status(400).json({ message: "PlantId is not valid" });
//     return;
//   }

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
