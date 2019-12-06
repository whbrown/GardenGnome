const mongoose = require('mongoose');

const { Schema } = mongoose;

const plantSchema = new Schema(
  {
    plantLatinName: String,
    plantCommonName: String,
    furtherDetails: {
      otherCommonNames: [String],
      synonyms: [String],
      family: String,
      genus: String,
      horticulturalGroup: String,
      details: String,
      plantRange: String,
    },
    characteristics: {
      foliage: String,
      habit: String,
      fragrance: String,
      toxicity: String,
      hardiness: String,
    },
    colour: {
      spring: { foliage: [String], fruit: [String], flower: [String] },
      summer: { foliage: [String], fruit: [String], flower: [String] },
      autumn: { foliage: [String], fruit: [String], flower: [String] },
      winter: { foliage: [String], fruit: [String], flower: [String] },
    },
    sunlight: {
      sunNeeds: [String],
      aspect: [String],
      exposure: [String],
    },
    soil: {
      soilTypes: [String],
      moisture: String,
      moistureTypes: [String],
      soil: String,
      ph: String,
      phTypes: [String],
    },
    size: {
      ultimateHeight: String,
      ultimateSpread: String,
      timeToUltimateHeight: String,
    },
    howToGrow: {
      cultivation: String,
      propagation: String,
      plantingLocation: String,
    },
    howToCare: {
      pruning: String,
      pestList: [String],
      pestsDescription: String,
      diseaseList: [String],
      diseases: String,
    },
    plantImageURL: String,
    RHSID: Number,
    detailsPercentage: Number,
    // comments: []
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const Plant = mongoose.model('Plant', plantSchema);
// plants
module.exports = Plant;
