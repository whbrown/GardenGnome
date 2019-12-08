const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const DGPlant = require('../models/DGPlant');
const getLevenshteinDistance = require('../utils/getLevenshteinDistance');

const plantVsQueryLevenschteinDistance = (plant, query) => {
  let names = [];
  names = names
    .concat(plant.plantCommonNames)
    .concat([plant.plantLatinName.trim()])
    .concat(plant.taxonomicInfo.plantGenus.match(/[a-zA-Z-]+/g)[0].trim())
    .concat(plant.taxonomicInfo.plantFamily.match(/[a-zA-Z-]+/g)[0].trim());
  Math.min(
    ...(names = names.map(name => {
      const [...componentWords] = name.match(/[\w']+/g);

      return Math.min(
        ...componentWords.map(word =>
          getLevenshteinDistance(query.toLowerCase(), word.toLowerCase())
        )
      );
    }))
  );
};

// GET /api/plants
router.get('/:id', (req, res) => {
  // return all plants matching search query
  const searchQuery = req.params.id;
  // console.log('searching for: ', searchQuery);
  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
  // Plant.find({ plantCommonName: /`${searchQuery}`/i })
  // console.log('sending search', searchQuery);
  // console.log('typeof search', typeof searchQuery);
  if (searchQuery === 'undefined') {
    return;
  }
  // const queryWords = searchQuery.trim().split(' ');
  let processedSearchQuery = searchQuery.trim();
  // console.log('split query:', searchQuery.trim().split(' ')[0]);
  // let searchRegExp = new RegExp(searchQuery, 'i');
  let searchRegExp = new RegExp(
    escapeRegex(processedSearchQuery.split(' ')[0]),
    'i'
  );
  console.log('search param:', searchRegExp);
  return DGPlant.find({
    $or: [
      { plantLatinName: searchRegExp },
      { plantCommonNames: { $in: [searchRegExp] } },
      { 'taxonomicInfo.plantGenus': searchRegExp },
    ],
  })
    .sort({ plantComments: -1 })
    .limit(300)
    .exec()
    .then(
      plants =>
        // if (!plants.length) return res.json(null);
        // if (!plants.length && searchQuery.split(' ').length > 1) {
        //   console.log('split ');
        //   searchRegExp = new RegExp(searchQuery.split(' ')[0], 'i');
        //   return DGPlant.find({
        //     $or: [
        //       { plantLatinName: searchRegExp },
        //       { plantCommonNames: { $in: [searchRegExp] } },
        //       { 'taxonomicInfo.plantGenus': searchRegExp },
        //     ],
        //   })
        //     .sort({ plantComments: -1 })
        //     .limit(200)
        //     .exec();
        // }
        plants
    )
    .then(plants => {
      if (!plants.length) return res.json(null);
      // TODO: if empty, split the searchQuery on spaces and make a new query with the first word,
      // returning that to the front end. compromise due to the inability of mongodb
      // to handle fuzzy requests like elasticsearch
      // const exactMatch = new RegExp(`^${searchQuery}$`, 'i');
      // console.time();
      console.time('sort results');
      plants
        .sort((a, b) => {
          // check if exact levenschtein match on first common name, excluding cultivar name
          const plantName = a.plantCommonNames[0]
            .match(/([\w\s])+/g)[0]
            .match(/\w+/g);
          if (
            Math.min(
              ...plantName.map(word =>
                getLevenshteinDistance(
                  word.toLowerCase(),
                  processedSearchQuery.toLowerCase()
                )
              )
            ) === 0
          )
            return -1;
          // check levenschtein match for all other names
          const levenschteinA = plantVsQueryLevenschteinDistance(
            a,
            processedSearchQuery
          );
          const levenschteinB = plantVsQueryLevenschteinDistance(
            b,
            processedSearchQuery
          );
          // if (levenschteinA - levenschteinB === 0 && queryWords.length > 1) {
          //   const newQuery = queryWords[1];
          //   return (
          //     plantVsQueryLevenschteinDistance(a, newQuery) -
          //     plantVsQueryLevenschteinDistance(b, newQuery)
          //   );
          // }
          return levenschteinA - levenschteinB;
        })
        .sort((a, b) => {
          // final sort pass to prioritize plants with pictures (decent heuristic for relevance & looks nicer)
          if (a.plantImageURL && !b.plantImageURL) return -1;
          if (b.plantImageURL && !a.plantImageURL) return 1;
          return 0;
          // const newQuery = queryWords[1];
          // console.log(newQuery);
          // return (
          //   plantVsQueryLevenschteinDistance(a, newQuery) -
          //   plantVsQueryLevenschteinDistance(b, newQuery)
          // );
          // return (
          //   console.log()
          //   plantVsQueryLevenschteinDistance(
          //     a,
          //     searchQuery.trim().split(' ')[1]
          //   ) -
          //   plantVsQueryLevenschteinDistance(
          //     b,
          //     searchQuery.trim().split(' ')[1]
          //   )
          // );
        });
      // console.log('SUCCESSFUL Router.get FIND: ', plants);
      console.timeEnd('sort results');
      return res.json(plants);
    })
    .catch(err => {
      console.error(err);
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
