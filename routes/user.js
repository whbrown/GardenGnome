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
      model: "PersonalPlant",
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

// * /api/user/${this.props.targetUser._id}/followers
// * list a user's followers

router.get('/:id/followers', (req, res) => {
  // console.log('followers route triggered');
  const { id } = req.params;
  console.log(id);
  User.findOne({ _id: id }, { _id: 1, username: 1, followers: 1 })
    .populate('followers')
    .then(user => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// * /api/user/${this.props.targetUser._id}/isfollowing
// * rename to following whenever possible (need to rename /following route to /add/following or something)
router.get('/:id/isfollowing', (req, res) => {
  console.log('following route triggered');
  const { id } = req.params;
  console.log(id);
  User.findOne({ _id: id }, { _id: 1, username: 1, following: 1 })
    .populate('following')
    .then(user => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

/* ------------------------------------------------------ Return USER comments ------------------------------------------------------ */
// * GET /api/user/:id/comments
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
    .populate('comments.user')
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    })
);

/* ------------------------------------------------------ Return USER WISHLIST ------------------------------------------------------ */
// * GET /api/user/:id/wishlist
router.get('/:id/wishlist', (req, res) =>
  User.findById(req.user._id)
    .populate({
      path: 'garden',
      // model: "PersonalPlant",
      populate: {
        path: 'plantId',
        // model: "Plant"
      }
    })
    .populate({
      path: 'wishList',
      // model: "PersonalPlant",
      populate: {
        path: "plantId"
      }
    })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    })
);

/* ------------------------------------------------------ COMMENT on user's garden ------------------------------------------------------ */
// * PUT /api/user/:id/comment
router.put('/:id/comment', (req, res) => {
  console.log("WHAT'S IN THE REQ.BODY when you add a comment??: ", req.body);
  User.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        comments: {
          user: req.user._id,
          comment: req.body.comment,
          date: new Date(),
        },
      },
    },
    { new: true }
  )
    .populate('comments.user')
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
/* ------------------------------------------------------ DELETE A COMMENT ------------------------------------------------------ */
// * PUT /api/user/:id/deleteComment
router.put('/:id/deletecomment', (req, res) => {
  console.log("WHAT'S IN THE REQ.BODY when you remove a comment??: ", req.body);
  User.findByIdAndUpdate(
    req.params.id,
    {
      $pull: {
        comments: {
          _id: req.body.commentId,
        },
      },
    },
    { new: true }
  )
    .populate('comments.user')
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

/* ----------------------------------------------- ADD TARGET-USER TO MY "FOLLOWING" ARRAY ---------------------------------------------- */
router.patch('/:id/following', (req, res) =>
  User.findByIdAndUpdate(
    req.user._id,
    {
      $push: { following: req.params.id },
    },
    { new: true }
  )
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

/* -------------------------------------------- ADD MYSELF TO TARGET-USER'S "FOLLOWERS" ARRAY ------------------------------------------- */
router.patch('/:id/follow', (req, res) =>
  User.findByIdAndUpdate(
    req.params.id,
    {
      $push: { followers: req.user._id },
    },
    { new: true }
  )
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

/* ----------------------------------------------- REMOVE TARGET-USER FROM MY "FOLLOWING" ARRAY ---------------------------------------------- */
router.patch('/:id/unfollowing', (req, res) =>
  User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { following: req.params.id },
    },
    { new: true }
  )
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

/* -------------------------------------------- ADD MYSELF TO TARGET-USER'S "FOLLOWERS" ARRAY ------------------------------------------- */
router.patch('/:id/unfollow', (req, res) =>
  User.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { followers: req.user._id },
    },
    { new: true }
  )
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

module.exports = router;
