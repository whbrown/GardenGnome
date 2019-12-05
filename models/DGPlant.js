const mongoose = require('mongoose');

const { Schema } = mongoose;

const DGplantSchema = new Schema(
  {
    plantLatinName: String,
    plantCommonNames: [String],
    plantImageURL: String,
    taxonomicInfo: {
      plantFamily: String,
      plantGenus: String,
      plantSpecies: String,
    },
    category: [String],
    class: [String],
    height: [String],
    spacing: [String],
    hardiness: [String],
    waterRequirements: [String],
    sunExposure: [String],
    whereToGrow: [String],
    bloomColor: [String],
    seedCollecting: [String],
    bloomCharacteristics: [String],
    foliage: [String],
    foliageColor: [String],
    bloomSize: [String],
    bloomShape: [String],
    flowerFragrance: [String],
    bloomTime: [String],
    danger: [String],
    habit: [String],
    patentInformation: [String],
    otherDetails: [String],
    propagationMethods: [String],
    pruningInstructions: [String],
    plantComments: [
      { rating: String, commentHeader: String, commentText: String },
    ],
    DGID: Number,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const DGPlant = mongoose.model('DGPlant', DGplantSchema);
module.exports = DGPlant;

console.log('Mongoose has finished scraping and is going to sleep!');
