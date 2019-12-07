const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const DGPlant = require('../models/DGPlant');
const getLevenshteinDistance = require('../utils/getLevenshteinDistance');

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

//   Plant.findById(plantId)
//     .populate("tasks")
//     .then(plant => {
//       if (!plant) {
//         res.status(404).json({ message: "Plant not found" });
//       } else res.json(plant);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

// POST /api/plants
// router.post("/", (req, res) => {
// Add a plant to your garden

//   Plant.create({
//     title: req.body.title,
//     description: req.body.description,
//     owner: req.user._id
//   })
//     .then(plant => {
//       res.json(plant);
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
