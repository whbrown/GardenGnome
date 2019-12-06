const mongoose = require('mongoose');
const { Schema } = mongoose;
const personalPlantSchema = new Schema(
  {
    name: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    plantId: { type: Schema.Types.ObjectId, ref: 'Plant' },
    lastWatered: Date,
    lastFertilized: Date,
    comments: [{
      comment: String,
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      date: Date
    }]
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