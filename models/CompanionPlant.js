const mongoose = require('mongoose');

const { Schema } = mongoose;
const companionPlantSchema = new Schema(
  {
    commonName: String,
    scientificName: String,
    category: String,
    helps: Array,
    helpedBy: Array,
    attracts: Array,
    repels: Array,
    avoid: Array,
    comments: String,
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

const CompanionPlant = mongoose.model('CompanionPlant', companionPlantSchema);
module.exports = CompanionPlant;
