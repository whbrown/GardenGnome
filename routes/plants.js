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
  // Plant.find({ plantCommonName: /`${searchQuery}`/i })
  const searchRegExp = new RegExp(searchQuery, 'i');
  DGPlant.find({
    $or: [
      { plantLatinName: searchRegExp },
      { plantCommonNames: { $in: [searchRegExp] } },
      { 'taxonomicInfo.plantGenus': searchRegExp },
    ],
  })
    .sort({ plantComments: -1 })
    .limit(100)
    .exec()
    .then(plants => {
      console.log(searchQuery);
      // const exactMatch = new RegExp(`^${searchQuery}$`, 'i');
      const plantVsQueryLevenschteinDistance = (plant, query) => {
        let names = [];

        names = names
          .concat(plant.plantCommonNames)
          .concat([plant.plantLatinName])
          .concat(
            plant.taxonomicInfo.plantGenus
              .match(/[a-zA-Z-]+/g)
              .filter(word => !word.includes('-'))
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

      plants.sort(
        (a, b) =>
          plantVsQueryLevenschteinDistance(a, searchQuery) -
          plantVsQueryLevenschteinDistance(b, searchQuery)
      );
      console.log('SUCCESSFUL Router.get FIND: ', plants);
      res.json(plants);
    })
    .catch(err => {
      res.status(500).json(err);
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
