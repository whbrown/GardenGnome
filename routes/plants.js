const express = require('express');

const router = express.Router();
const Plant = require('../models/Plant');

// GET /api/plants
router.get('/:id', (req, res) => {
  // return all plants matching search query
  const plantName = req.params.id;
  Plant.find({ plantCommonName: /chinese/i })
    // Plant.find({ plantCommonName: { $regex: plantName, $options: 'i' } })
    .limit(50)
    .exec()
    .then(plants => {
      console.log("SUCCESSFUL Router.get FIND: ", plants)
      res.json(plants);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

const mongoose = require('mongoose');
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
