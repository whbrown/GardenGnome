const mongoose = require('mongoose');
const { Schema } = mongoose;
const personalPlantSchema = new Schema(
  {
    name: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    plantId: { type: Schema.Types.ObjectId, ref: 'DGPlant' },
    lastWatered: Date,
    lastFertilized: Date,
    comments: [{
      comment: String,
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      date: Date
    }],
    offering: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  }
)

const PersonalPlant = mongoose.model('PersonalPlant', personalPlantSchema)
module.exports = PersonalPlant;