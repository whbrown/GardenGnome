const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    imageUrl: String,
    username: String,
    password: String,
    city: String,
    neighbourhood: String,
    garden: [{ type: Schema.Types.ObjectId, ref: 'PersonalPlant' }],
    GPS: {
      long: Number,
      lat: Number
    },
    followers: [String],
    following: [String],
    wishList: [{ type: Schema.Types.ObjectId, ref: 'Plant' }],
    preferences: {
      plantingSetting: [String],
      soil: {
        moisture: [String],
        type: [String],
        ph: [String]
      },
      sunlight: {
        sunNeeds: [String],
        aspect: [String],
        exposure: [String]
      },
      plantColour: String,
      hardiness: String,
      plantingLocation: [String],
      plantTypes: [String]
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
