const mongoose = require('mongoose');
const CompanionPlant = require('../models/CompanionPlant');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/gardengnome');

const unformattedCompanions = [
  {
    'Common name': 'Alfalfa',
    'Scientific name': 'Medicago sativa',
    Helps: 'Cotton',
    'Helped by': '',
    Attracts: 'Assassin bug, big-eyed bug, ladybug, parasitic wasps',
    '-Repels/+distracts': 'Lygus bugs',
    Avoid: 'Tomatoes, fava beans',
    'Comments\\n':
      'Used by farmers to reduce cotton pests, a good crop to improve soil; fixes nitrogen like beans do.\n' +
      '                  Also breaks up hardpan and other tough soil. Alfalfa has demonstrated some allelopathic effects to\n' +
      '                  tomato seedlings\\n',
  },
  {
    'Common name': 'Peanut',
    'Scientific name': 'Arachis\n                    hypogaea',
    Helps:
      'Beans, corn, cucumber, eggplant, lettuce, marigold, melon and sunflower',
    'Helped by': '',
    Attracts: '',
    '-Repels/+distracts': '',
    Avoid: '',
    'Comments\\n': 'Peanuts encourage growth of corn and squash\\n',
  },
  {
    'Common name': 'Walnut tree',
    'Scientific name': 'Juglans spp.',
    Helps:
      'Many types of grass including Kentucky bluegrass\n' +
      '                  (Poa pratensis).',
    'Helped by':
      'European alder (sacrifice plant), hairy vetch, crownvetch, sericea\n' +
      '                  lespedeza',
    Attracts: '',
    '-Repels/+distracts': '',
    Avoid: 'Apple trees, grasses',
    'Comments\\n':
      'Black walnut is harmful to\n' +
      '                  the growth of all nightshade plants, including Datura or Jimson weed, eggplant, mandrake, deadly nightshade or belladonna, capsicum (paprika, chile pepper), potato, tomato, and petunia.\\n',
  },
];

const makeCamelCase = topicTitle => {
  // make strings camelcase to use as prop keys in Plant model
  const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);
  let camelCaseKey = topicTitle.toLowerCase();
  if (topicTitle.split(' ').length > 1) {
    const wordArray = topicTitle.split(' ');
    camelCaseKey = `${wordArray[0].toLowerCase()}${wordArray
      .slice(1)
      .map(word => capitalize(word))
      .join('')}`;
  }
  return camelCaseKey;
};

const formatKeys = {};

const formattedCompanions = unformattedCompanions.map(companion => {
  const props = Object.keys(companion);
  return props.reduce((formattedCompanion, prop) => {
    const parsedProp = prop
      .replace(/_/g, ' ')
      .replace(/\d+/g, '')
      .replace('\\n', '')
      .trim();
    // console.log('parsedProp', parsedProp);
    let formattedKey = makeCamelCase(parsedProp);
    if (formattedKey === '-repels/+distracts') {
      formattedKey = 'repels';
    }
    let formattedValue = companion[prop]
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '')
      .replace('\\n', '')
      .trim();
    // console.log(formattedValue);
    if (
      ['helpedBy', 'helps', 'attracts', 'avoid', 'repels'].includes(
        formattedKey
      )
    ) {
      formattedValue = formattedValue
        .split(/,| and /)
        .map(value => value.trim());
    }
    formattedCompanion.category = 'Other';
    formattedCompanion[formattedKey] = formattedValue;
    return formattedCompanion;
    // console.log('formattedKey', formattedKey);
  }, {});
});
// console.log(formattedCompanions);
formattedCompanions.forEach(plant => {
  CompanionPlant.create({ ...plant })
    .then(res => {
      // console.dir(plantData);
      console.log(`success: ${res}`);
      // page.close();
    })
    .catch(e => {
      console.log(e);
      // page.close();
    });
});
