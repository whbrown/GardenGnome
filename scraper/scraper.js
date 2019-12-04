const plantSchema = {};

// narrow down total search area for each selection for efficiency
const allPlantInfo = document.querySelector(`.ajaxSearchDetails`);

// characteristics
const [...characteristics] = allPlantInfo
  .querySelector('.char')
  .querySelector('ul').children;
plantSchema.characteristics = {};
characteristics.forEach(characteristic => {
  const characteristicTypes = {
    Foliage: 'foliage',
    Habit: 'habit',
    Hardiness: 'hardiness',
  };
  let [characteristicTitle, ...description] = characteristic.innerText.split(
    '\n'
  );
  // filter out any empty strings from description due to sequential new lines
  description = description.filter(value => value);
  if (characteristicTypes[characteristicTitle]) {
    plantSchema.characteristics[
      characteristicTypes[characteristicTitle]
    ] = description.join('');
  } else {
    plantSchema.characteristics[characteristicTitle] = description.join('');
  }
});

// * colour
const [...colour] = allPlantInfo.querySelector(
  '.plant-characteristics'
).children;
plantSchema.colour = {};
colour.forEach(season => {
  const seasonNames = {
    'Colour in Autumn': 'autumn',
    'Colour in Spring': 'spring',
    'Colour in Summer': 'summer',
    'Colour in Winter': 'winter',
  };
  let [seasonTitle, ...colourInfo] = season.children;
  colourInfo = colourInfo[0];
  plantSchema.colour[seasonNames[seasonTitle.innerText]] = {};

  let [...colourBySeasonByType] = colourInfo.children;
  [...colourBySeasonByType] = colourBySeasonByType;
  colourBySeasonByType.forEach(li => {
    let [colourName, ...plantPart] = li.children;
    const plantPartKey = plantPart.reduce((key, p) => key + p.innerText, '');
    const colourNameValue = colourName.querySelector('.tooltip').innerText;
    plantSchema.colour[seasonNames[seasonTitle.innerText]][
      plantPartKey
    ] = colourNameValue;
  });
});

// * sunlight
const [...sun] = allPlantInfo.querySelector(
  '.sun'
).firstElementChild.firstElementChild.children;
plantSchema.sunlight = {};
const sunNeeds = sun[1].innerText;
plantSchema.sunlight.sunNeeds = sunNeeds;
const sunTopicNames = {
  Aspect: 'aspect',
  Exposure: 'exposure',
};
const [...otherSunlightInfo] = sun[2].querySelectorAll('p');
otherSunlightInfo.forEach(topic => {
  const [topicTitle, ...topicDescription] = topic.innerText.split('\n');
  if (sunTopicNames[topicTitle]) {
    plantSchema.sunlight[sunTopicNames[topicTitle]] = topicDescription.join('');
  } else {
    plantSchema.sunlight[topicTitle.toLowerCase()] = topicDescription.join('');
  }
});

// * soil
const [...soil] = allPlantInfo.querySelector(
  '.soil'
).firstElementChild.firstElementChild.children;
plantSchema.soil = {};
let [...soilTypes] = soil[1].firstElementChild.children;
soilTypes = soilTypes.map(li => li.innerText);
plantSchema.soil.soilTypes = soilTypes;

let [...otherSoilInfo] = soil[2].firstElementChild.children;
const soilTopicNames = {
  Moisture: 'moisture',
  Soil: 'soil',
  pH: 'pH',
};
otherSoilInfo.forEach(li => {
  const [
    topicTitle,
    ...topicDescription
  ] = li.firstElementChild.innerText.split('\n');
  if (soilTopicNames[topicTitle]) {
    plantSchema.soil[soilTopicNames[topicTitle]] = topicDescription.join('');
  } else {
    plantSchema.soil[topicTitle.toLowerCase()] = topicDescription.join('');
  }
  const [...topicTypesArray] = topicDescription.join('').split(', ');
  plantSchema.soil[`${topicTitle.toLowerCase()}Types`] = topicTypesArray;
});

// * size
const size = allPlantInfo.querySelector('.size').firstElementChild
  .firstElementChild;
plantSchema.size = {};
let [...sizeInfo] = size.querySelector('.results-size').children;
const sizeTopicNames = {
  'Ultimate height': 'ultimateHeight',
  'Ultimate spread': 'ultimateSpread',
  'Time to ultimate height': 'timeToUltimateHeight',
};
sizeInfo.forEach(li => {
  const [
    sizePropTitle,
    ...sizePropDescription
  ] = li.firstElementChild.innerText.split('\n');
  if (sizeTopicNames[sizePropTitle]) {
    plantSchema.size[sizeTopicNames[sizePropTitle]] = sizePropDescription.join(
      ''
    );
  } else {
    plantSchema.size[sizePropTitle.toLowerCase()] = sizePropDescription.join(
      ''
    );
  }
});
// * How to grow, how to care

const [...howToDivs] = allPlantInfo.getElementsByClassName(`how-to`);
howToDivs.forEach(howToDiv => {
  const howToTypes = {
    'How to grow': 'howToGrow',
    'How to care': 'howToCare',
  };
  const instructionTypes = {
    Pruning: 'pruning',
    Pests: 'pestsDescription',
    Diseases: 'diseases',
    Cultivation: 'cultivation',
    Propagation: 'propagation',
    'Suggested planting locations and garden types': 'plantingLocation',
  };
  const children = [...howToDiv.children];

  const [howToTitle, ...instructions] = children;
  plantSchema[howToTypes[howToTitle.innerText]] = {};
  [...instructions].forEach(instruction => {
    // ? change information into spread in case any instructions have more than one \n ... need to check random pages to see if this is an issue
    const [instructionTitle, information] = instruction.innerText.split('\n');

    // for Pests instructionTitle, grab out array of the pests (within anchor tags)
    if (instructionTitle === 'Pests') {
      const [...pests] = instruction.getElementsByTagName('A');
      plantSchema[howToTypes[howToTitle.innerText]].pestList = [];
      if (pests.length) {
        for (let pest of pests) {
          plantSchema[howToTypes[howToTitle.innerText]].pestList.push(
            pest.innerText
          );
        }
      }
    }
    if (instructionTitle === 'Diseases') {
      const [...diseases] = instruction.getElementsByTagName('A');
      plantSchema[howToTypes[howToTitle.innerText]].diseaseList = [];
      if (diseases.length) {
        for (let disease of diseases) {
          plantSchema[howToTypes[howToTitle.innerText]].diseaseList.push(
            disease.innerText
          );
        }
      }
    }
    if (instructionTypes[instructionTitle]) {
      plantSchema[howToTypes[howToTitle.innerText]][
        instructionTypes[instructionTitle]
      ] = information;
    } else {
      plantSchema[howToTypes[howToTitle.innerText]][
        instructionTitle.toLowerCase()
      ] = information;
    }
  });
});
