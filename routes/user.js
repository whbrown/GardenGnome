const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const PersonalPlant = require('../models/PersonalPlant');
const colours = require('../utils/colours.json');

const router = express.Router();

/* ------------------------------------------------------ Return all USER'S plants ------------------------------------------------------ */
// * GET /api/user/:id/plants
router.get('/:id/plants', (req, res) =>
  User.findById(req.params.id)
    .populate({
      path: 'garden',
      // model: "PersonalPlant",
      populate: {
        path: 'plantId',
        // model: "Plant"
      },
    })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    })
);

/* ------------------------------------------------------ Return USER comments ------------------------------------------------------ */
// * GET /api/user/:id/plants
router.get('/:id/comments', (req, res) =>
  User.findById(req.params.id)
    .populate({
      path: 'garden',
      // model: "PersonalPlant",
      populate: {
        path: 'plantId',
        // model: "Plant"
      },
    })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    })
);

/* ------------------------------------------------------------ FOLLOW A USER ----------------------------------------------------------- */
router.patch('/:id/follow', (req, res) =>
  User.findByIdAndUpdate(
    req.params.id,
    {
      $push: { followers: req.user._id },
    },
    { new: true }
  ).then(user => {
    res.status(200).json(user);
  })
    .catch(err => {
      res.status(500).json(err);
    })
)

module.exports = router;