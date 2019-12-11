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

/* ----------------------------------------------- ADD TARGET-USER TO MY "FOLLOWING" ARRAY ---------------------------------------------- */
router.patch('/:id/following', (req, res) =>
  User.findByIdAndUpdate(
    req.user._id,
    {
      $push: { following: req.params.id },
    },
    { new: true }
  ).then(user => {
    res.status(200).json(user);
  })
    .catch(err => {
      res.status(500).json(err);
    })
)

/* -------------------------------------------- ADD MYSELF TO TARGET-USER'S "FOLLOWERS" ARRAY ------------------------------------------- */
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