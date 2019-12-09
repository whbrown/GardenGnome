// const mongoose = require('mongoose');
// // console.log(levenshteinDistance('rosa', 'rosa'));
// const DGPlant = require('../models/DGPlant');
// const Plant = require('../models/Plant');

// const properties = [
//   'furtherDetails.horticulturalGroup',
//   'characteristics.foliage',
//   'characteristics.habit',
//   'characteristics.fragrance',
//   'characteristics.toxicity',
//   'characteristics.hardiness',
//   'sunlight.sunNeeds',
//   'sunlight.aspect',
//   'sunlight.exposure',
//   'soil.soilTypes',
//   'soil.moistureTypes',
//   'soil.phTypes',
//   'howToCare.pestList',
//   'howtoCare.diseaseList',
// ];

// mongoose
//   .connect('mongodb://localhost/gardengnome', { useNewUrlParser: true })
//   .then(x => {
//     console.log(
//       `Connected to Mongo! Database name: "${x.connections[0].name}"`
//     );
//     const distinctProperties = {};
//     for (let property of properties) {
//       Plant.find()
//         .distinct(property, (err, res) => {
//           if (err) return console.error(err);
//           // console.log(res);
//           distinctProperties[property] = res;
//         })
//         .then(() => console.log(JSON.stringify(distinctProperties), '\n'));
//     }
//     // (async () => {
//     //   for (let property of properties) {
//     //     await DGPlant.find().distinct(
//     //       [property],
//     //       (err, res) => (distinctProperties[property] = res)
//     //     );
//     //     // console.log(distinctProperties);
//     //   }
//     // })();
//   })
//   .catch(err => {
//     console.error('Error connecting to mongo', err);
//   });

// // console.log(distinctProperties);
// // DGPlant.find().distinct('_id', (err, res) => console.log(res));
// // DGPlant.find({}).distinct('waterRequirements.0', (err, res) => {
// //   if (err) return console.error(err);
// //   console.log(res);
// // });

const getLevenshteinDistance = (a, b) => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  let matrix = [];

  // increment along the first column of each row
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // increment each column in the first row
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        );
      }
    }
  }

  // console.log(matrix);
  console.log(matrix);
  return matrix[b.length][a.length];
};

// let plant = {};
// plant.taxonomicInfo = {};

// plant.plantCommonNames = [
//   'Salvia',
//   'Autumn Sage',
//   'Cherry Sage',
//   "Gregg Salvia 'Rosea'",
// ];
// plant.plantLatinName = 'Cryptanthus ';
// plant.taxonomicInfo.plantGenus = 'Bromeliaceae (bro-mee-lee-AY-see-ee)';
// plant.taxonomicInfo.plantFamily = 'Cryptanthus (krip-TAN-thus)';

const plantVsQueryLevenschteinDistance = (plant, query) => {
  let names = [];

  names = names
    .concat(plant.plantCommonNames)
    .concat([plant.plantLatinName])
    .concat(
      plant.taxonomicInfo.plantGenus
        .match(/[a-zA-Z-]+/g)
        .filter(word => !word.includes('-'))
    )
    .concat(
      plant.taxonomicInfo.plantFamily
        .match(/[a-zA-Z-]+/g)
        .filter(word => !word.includes('-'))
    )
    .filter(word => word);
  return Math.min(
    ...names.map(name => {
      const words = name.match(/\w+/g);
      // const words = name.replace(/\W+/gi, '')
      // console.log(words);
      return Math.min(
        ...words.map(word =>
          // get levenschtein for full name & component words, return whichever is smaller
          getLevenshteinDistance(query.toLowerCase(), word.toLowerCase())
        )
      );
    })
  );
};
// getLevenshteinDistance('this', 'that');
const processedSearchQuery = 'tomato beefmaster';
let [a, b] = [
  {
    taxonomicInfo: {
      plantFamily: 'Solanaceae (so-lan-AY-see-ee)',
      plantGenus: 'Lycopersicon (ly-koh-PER-see-kon)',
      plantSpecies: 'lycopersicum (ly-koh-PER-see-kum)',
      plantCultivar: "Park's Whopper Cr Improved",
    },
    plantCommonNames: ["Tomato 'Park's Whopper Cr Improved'"],
    additionalPhotos: [
      'https://pics.davesgarden.com/pics/2007/04/17/Big_Red/7e4e08_tn.jpg',
      'https://pics.davesgarden.com/pics/2007/04/24/Big_Red/593f4a_tn.jpg',
      'https://pics.davesgarden.com/pics/2007/05/05/Big_Red/f49d79_tn.jpg',
      'https://pics.davesgarden.com/pics/2007/05/20/Big_Red/c0b54a_tn.jpg',
    ],
    category: [],
    class: [],
    height: ['36-48 in. (90-120 cm)'],
    spacing: ['24-36 in. (60-90 cm)'],
    hardiness: [],
    waterRequirements: [],
    sunExposure: ['Full Sun'],
    whereToGrow: [],
    bloomColor: [],
    seedCollecting: [
      'N/A: plant does not set seed, flowers are sterile, or plants will not come true from seed',
    ],
    bloomCharacteristics: [],
    foliage: [],
    foliageColor: [],
    bloomSize: [],
    bloomShape: [],
    flowerFragrance: [],
    bloomTime: [],
    danger: ['Parts of plant are poisonous if ingested'],
    habit: [],
    patentInformation: [],
    otherDetails: [],
    propagationMethods: [],
    pruningInstructions: [],
    detailsPercentage: 0.33,
    plantLatinName: 'Lycopersicon lycopersicum',
    plantImageURL:
      'https://davesgarden.com/guides/pf/thumbnail.php?image=2007/04/15/Big_Red/7d8219.jpg&widht=700&height=312',
  },
  {
    taxonomicInfo: {
      plantFamily: 'Solanaceae (so-lan-AY-see-ee)',
      plantGenus: 'Lycopersicon (ly-koh-PER-see-kon)',
      plantSpecies: 'lycopersicum (ly-koh-PER-see-kum)',
      plantCultivar: 'Beefmaster',
    },
    plantCommonNames: ["Tomato 'Beefmaster'"],
    additionalPhotos: [
      'https://pics.davesgarden.com/pics/2003/07/20/melody/2392d1_tn.jpg',
      'https://pics.davesgarden.com/pics/2003/08/10/JorgeBorges/e4701b_tn.jpg',
      'https://pics.davesgarden.com/pics/2003/10/20/The_Wiz/c330a4_tn.jpg',
      'https://pics.davesgarden.com/pics/2005/08/14/tubbss5/783f51_tn.jpg',
    ],
    category: [],
    class: [],
    height: ['4-6 ft. (1.2-1.8 m)'],
    spacing: ['18-24 in. (45-60 cm)'],
    hardiness: [],
    waterRequirements: [],
    sunExposure: ['Full Sun'],
    whereToGrow: [],
    bloomColor: [],
    seedCollecting: ['Ferment seeds before storing'],
    bloomCharacteristics: [],
    foliage: [],
    foliageColor: [],
    bloomSize: [],
    bloomShape: [],
    flowerFragrance: [],
    bloomTime: [],
    danger: ['Parts of plant are poisonous if ingested'],
    habit: [],
    patentInformation: [],
    otherDetails: [],
    propagationMethods: [],
    pruningInstructions: [],
    detailsPercentage: 0.33,
    plantLatinName: 'Lycopersicon lycopersicum',
    plantImageURL:
      'https://davesgarden.com/guides/pf/thumbnail.php?image=2005/06/03/kingedking/4cd1bd.jpg&widht=700&height=312',
  },
];

const levenschteinA = processedSearchQuery
  .toLowerCase()
  .split(' ')
  .reduce(
    (levenschteinSum, componentQueryTerm) =>
      levenschteinSum + plantVsQueryLevenschteinDistance(a, componentQueryTerm),
    0
  );
const levenschteinB = processedSearchQuery
  .toLowerCase()
  .split(' ')
  .reduce(
    (levenschteinSum, componentQueryTerm) =>
      // console.log(componentQueryTerm);
      levenschteinSum + plantVsQueryLevenschteinDistance(b, componentQueryTerm),
    0
  );

console.log(levenschteinA);
console.log(levenschteinB);
// console.log(levenschteinA);
// console.log(`devil's breath`.replace(/\W+/gi, ''))
// .replace("^\s+|\s+$", "");

// const search = ``.replace(/\W+/gi, '');
// console.log(search);

// function escapeRegex(text) {
//   return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
// }
// const regex = new RegExp(escapeRegex(search), 'gi');
// console.log(regex);
// console.log(regex.test(``Gregg Salvia 'Rosea'``.replace(/\W+/gi, '').toLowerCase()))
// const a = {
//   plantCommonNames: ["Diascia", "Twinspur 'Hannah Rose'"]
// }
// const b = {
//   plantCommonNames: ["Shrub Rose", "Buck Roses Collection 'Aunt Honey'"]
// }
// const plantName = b.plantCommonNames[0].match(/([\w\s])+/g)[0]
// const searchQuery = 'Rose';
// // const firstCommonName = b.plantCommonNames[1].match(/\w+/g)
// console.log(plantName)
// console.log(plantName.match(/\w+/g))

// $or: [
//   { $or: [ { plantLatinName: new RegExp(firstSearchTerm, 'i') }, { plantLatinName: new RegExp(secondSearchTerm, 'i') } ] },
//   { $or: [ { plantCommonNames: { $in: [new RegExp(firstSearchTerm, 'i')] } }, { plantCommonNames: { $in: [new RegExp(secondSearchTerm, 'i')] } } ] },
//   { $or: [ { 'taxonomicInfo.plantGenus': new RegExp(firstSearchTerm, 'i') }, { 'taxonomicInfo.plantGenus': new RegExp(secondSearchTerm, 'i') } ] }
// ],

// console.log(Math.min(
//   ...plantName.match(/\w+/g).map(word =>
//     getLevenshteinDistance(word.toLowerCase(),searchQuery.toLowerCase())
//   )
// ));

// [
//   'Large-Flowered',
//   "Hybrid Tea Rose 'Grande Amore'",
//   'Rosa',
//   'Rosa',
//   'Rosaceae',
// ][('Floribunda', "Hybrid Tea Rose 'Grey Dawn'", 'Rosa', 'Rosa', 'Rosaceae')];
// let names = [
//   'Floribunda',
//   "Hybrid Tea Rose 'Grey Dawn'",
//   'Rosa',
//   'Rosa',
//   'Rosaceae',
// ];
// let query = 'rose';
// console.log(
//   Math.min(
//     ...(names = names.map(name => {
//       // name.map((nameComponent) => {} )
//       const [...words] = name.match(/\w+/g);
//       console.log(words);
//       return Math.min(
//         ...words.map(word =>
//           getLevenshteinDistance(query.toLowerCase(), word.toLowerCase())
//         )
//       );
//     }))
//   )
// );

// console.log(names);
// let names = ['potato', 'rotato'];

// let searchQuery = 'beefmaster tomato';
// console.log(
//   searchQuery
//     .trim()
//     .match(/\w+/g)
//     .slice(1)
//     .find(subsequentTerm => names.includes(subsequentTerm))
// );
// console.log(searchQuery.split(' ').length > 1)
// console.log(firstCommonName.match(/\w+/g))

// console.log(Math.min(
//   ...words.map(word =>
//     getLevenshteinDistance('rose'.toLowerCase(), word.toLowerCase())
//   )
// ));

// console.log(`apple 'something'`.replace(/[<>.,/;:+_*&^%$#@!`~{}[\]|\\]/g, ''))
