const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const Plant = require('../models/Plant');
const DGPlant = require('../models/DGPlant');
const PersonalPlant = require('../models/PersonalPlant');
const getLevenshteinDistance = require('../utils/getLevenshteinDistance');
const colours = require('../utils/colours.json');

const router = express.Router();

/* ------------------------------------------------------ Return your whole garden ------------------------------------------------------ */
// * GET /api/plants/mygarden
router.get('/mygarden', (req, res) =>
  User.findById(req.user._id)
    .populate({
      path: 'garden',
      // model: "PersonalPlant",
      populate: {
        path: 'plantId',
        // model: "Plant"
      },
    })
    .then(user => {
      console.log('HELLOOOO?:', user);
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    })
);

/* ----------------------------------------------------- Add a plant to your garden ----------------------------------------------------- */
// * POST /api/plants
router.post('/mygarden', (req, res) =>
  PersonalPlant.create({
    name: 'My Abelia Engleriana',
    owner: req.user._id,
    plantId: '5de850e4d65f1b61b834191c',
  })
    .then(personalPlant =>
      // Update the user's document by adding the new plant into their garden array
      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { garden: personalPlant._id },
        },
        { new: true }
      )
        // Populate the array of plants in garden for use on the front end
        .populate({
          path: 'garden',
          // model: "PersonalPlant",
          populate: {
            path: 'plantId',
            model: 'Plant',
          },
        })
    )
    .then(user => {
      console.log('NEW USER WITH NEW PLANT ADDED TO GARDEN: ==> ', user);
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    })
);

/* --------------------------------------------------- LEVENSCHTEIN DISTANCE FUNCTION --------------------------------------------------- */
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
    )
    .filter(word => word);
  return Math.min(
    ...names.map(name => {
      const words = name.match(/\w+/g);
      return Math.min(
        ...words.map(word =>
          // get levenschtein for full name & component words, return whichever is smaller
          getLevenshteinDistance(query.toLowerCase(), word.toLowerCase())
        )
      );
    })
  );
};

/* ------------------------------------------------------- SEARCHING PLANT DETAILS ------------------------------------------------------ */
// * GET /api/plants/search/id=:id&latinName=
router.get('/search/id=:id&latinName=:latinName', (req, res) => {
  console.log('found route');
  const plantId = req.params.id;
  const plantLatinName = req.params.latinName;
  return Promise.all([
    Plant.findOne({ plantLatinName: /plantLatinName/i }),
    DGPlant.findById(plantId),
  ])
    .then(([rhsInfo, dgInfo]) => {
      const genus = new RegExp(
        `${plantLatinName.trim().match(/^\w+/)[0]} `,
        'i'
      );
      console.log('genus:', genus);
      if (!rhsInfo) {
        return Promise.all([
          Plant.findOne({ plantLatinName: genus }).sort({
            detailsPercentage: -1,
          }),
          dgInfo,
        ]);
      }
      return [rhsInfo, dgInfo];
    })

    .then(([rhsInfo, dgInfo]) => res.json({ rhsInfo, dgInfo }))
    .catch(err => {
      console.error(err);
      return res.status(500).json(err);
    });
});

/* ---------------------------------------------------- RETURN ALL USERS IN DATABASE ---------------------------------------------------- */
// GET /api/plants/gnomes
router.get('/gnomes', (req, res) => {
  return User.find()
    .then(users => {
      res.json(users)
    })
})

/* ----------------------------------------------- return all plants matching search query ---------------------------------------------- */
// * GET /api/plants/search/:q
router.get('/search/:q', (req, res) => {
  // return all plants matching search query
  const searchQuery = req.params.q;
  console.log('req.params', req.params);
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
  console.log('processed search query is', processedSearchQuery);
  // console.log('split query:', searchQuery.trim().split(' ')[0]);
  // let searchRegExp = new RegExp(searchQuery, 'i');
  const splitQuery = processedSearchQuery.split(' ');
  let searchRegExp =
    colours.includes(splitQuery[1]) && splitQuery.length > 1
      ? new RegExp(escapeRegex(splitQuery[1]), 'i')
      : new RegExp(escapeRegex(splitQuery[0]), 'i');
  console.log('search param:', searchRegExp);
  console.time('MongoDB request');
  // TODO: add projections to limit data retrieval
  return DGPlant.find(
    {
      $or: [
        { plantLatinName: searchRegExp },
        { plantCommonNames: { $in: [searchRegExp] } },
        // { 'taxonomicInfo.plantGenus': searchRegExp },
      ],
    },
    {
      plantLatinName: 1,
      plantCommonNames: 1,
      waterRequirements: 1,
      taxonomicInfo: 1,
      plantImageURL: 1,
      hardiness: 1,
      sunExposure: 1,
      danger: 1,
      _id: 1,
    }
  )
    .sort({ plantComments: -1 })
    .limit(2000)
    .exec()
    .then(plants => {
      console.timeEnd('MongoDB request');
      return plants;
    })
    .then(plants => {
      if (!plants.length) return res.json(null);
      console.time('sort results');
      plants
        .sort((a, b) => {
          const levenschteinA = processedSearchQuery
            .toLowerCase()
            .split(' ')
            .reduce(
              (levenschteinSum, componentQueryTerm) =>
                levenschteinSum +
                plantVsQueryLevenschteinDistance(a, componentQueryTerm),
              0
            );
          const levenschteinB = processedSearchQuery
            .toLowerCase()
            .split(' ')
            .reduce(
              (levenschteinSum, componentQueryTerm) =>
                // console.log(componentQueryTerm);
                levenschteinSum +
                plantVsQueryLevenschteinDistance(b, componentQueryTerm),
              0
            );
          return levenschteinA - levenschteinB;
        })
        .sort((a, b) => {
          // final sort pass to prioritize plants with pictures (decent heuristic for relevance & looks nicer)
          if (a.plantImageURL && !b.plantImageURL) return -1;
          if (b.plantImageURL && !a.plantImageURL) return 1;
          const plantName = a.plantCommonNames[0]
            .match(/([\w\s])+/g)[0]
            .match(/\w+/g);
          // console.log(plantName);
          // ! comment out this sort if there's performance issues:
          // maybe could have cultivar name give an extra cost in the levenstein implementation to bypass the need for this sort
          if (
            Math.min(
              ...plantName.map(word =>
                getLevenshteinDistance(
                  word.toLowerCase(),
                  searchQuery.toLowerCase()
                )
              )
            ) === 0
          )
            return -1;
          return 0;
        });
      console.log(`query returned ${plants.length} results.`);
      console.timeEnd('sort results');
      return res.json(plants.slice(0, 200));
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
