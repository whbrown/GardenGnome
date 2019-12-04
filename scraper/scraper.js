let plantSchema = {};

// narrow down total search area for each selection for efficiency
const allPlantInfo = document.querySelector(`.ajaxSearchDetails`);

const plantDetailsKeys = {
  'Other common names': 'otherCommonNames',
  Family: 'family',
  Genus: 'genusInfo',
  Details: 'details',
  'Plant range': 'plantRange',
};

// * plant name
const grabPlantName = schema => {
  const [plantMainName, plantSubName] = allPlantInfo.querySelector(
    '.ib'
  ).children;
  schema.plantMainName = plantMainName.innerText;
  schema.plantSubName = plantSubName.innerText;
  return schema;
};

// * plant image
const grabPlantImage = schema => {
  let plantImage = allPlantInfo.querySelector('.cover-image__img');
  plantImage = plantImage.style.backgroundImage;
  schema.plantImageURL = plantImage.slice(5, plantImage.length - 2);
  return schema;
};
// querySelector('.plant-image')

// * further details
const grabFurtherPlantDetails = schema => {
  const [...furtherPlantDetails] = allPlantInfo.querySelector(
    '#plant_details_desc'
  ).children;

  const furtherDetails = furtherPlantDetails.reduce((furtherDetails, topic) => {
    const [topicTitle, ...description] =
      topic.dataset.facettype === 'description'
        ? topic.innerText.split('\n')
        : topic.firstElementChild.innerText.split('\n');
    furtherDetails[plantDetailsKeys[topicTitle]] = description.join('');
    return furtherDetails;
  }, {});

  schema.furtherDetails = furtherDetails;
  return schema;
};

// * characteristics
const grabPlantCharacteristics = schema => {
  const [...characteristics] = allPlantInfo
    .querySelector('.char')
    .querySelector('ul').children;
  schema.characteristics = {};
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
      schema.characteristics[
        characteristicTypes[characteristicTitle]
      ] = description.join('');
    } else {
      schema.characteristics[characteristicTitle] = description.join('');
    }
  });
  return schema;
};

// * colour
const grabPlantColours = schema => {
  const [...colour] = allPlantInfo.querySelector(
    '.plant-characteristics'
  ).children;
  schema.colour = {};
  colour.forEach(season => {
    const seasonNames = {
      'Colour in Autumn': 'autumn',
      'Colour in Spring': 'spring',
      'Colour in Summer': 'summer',
      'Colour in Winter': 'winter',
    };
    let [seasonTitle, ...colourInfo] = season.children;
    colourInfo = colourInfo[0];
    schema.colour[seasonNames[seasonTitle.innerText]] = {};

    let [...colourBySeasonByType] = colourInfo.children;
    [...colourBySeasonByType] = colourBySeasonByType;
    colourBySeasonByType.forEach(li => {
      let [colourName, ...plantPart] = li.children;
      const plantPartKey = plantPart.reduce((key, p) => key + p.innerText, '');
      const colourNameValue = colourName.querySelector('.tooltip').innerText;
      schema.colour[seasonNames[seasonTitle.innerText]][
        plantPartKey
      ] = colourNameValue;
    });
  });
  return schema;
};

// * sunlight
const grabPlantSunInfo = schema => {
  const [...sun] = allPlantInfo.querySelector(
    '.sun'
  ).firstElementChild.firstElementChild.children;
  schema.sunlight = {};
  const sunNeeds = sun[1].innerText;
  schema.sunlight.sunNeeds = sunNeeds;
  const sunTopicNames = {
    Aspect: 'aspect',
    Exposure: 'exposure',
  };
  const [...otherSunlightInfo] = sun[2].querySelectorAll('p');
  otherSunlightInfo.forEach(topic => {
    const [topicTitle, ...topicDescription] = topic.innerText.split('\n');
    if (sunTopicNames[topicTitle]) {
      schema.sunlight[sunTopicNames[topicTitle]] = topicDescription.join('');
    } else {
      schema.sunlight[topicTitle.toLowerCase()] = topicDescription.join('');
    }
  });
  return schema;
};

// * soil
const grabSoilNeeds = schema => {
  const [...soil] = allPlantInfo.querySelector(
    '.soil'
  ).firstElementChild.firstElementChild.children;
  schema.soil = {};
  let [...soilTypes] = soil[1].firstElementChild.children;
  soilTypes = soilTypes.map(li => li.innerText);
  schema.soil.soilTypes = soilTypes;

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
      schema.soil[soilTopicNames[topicTitle]] = topicDescription.join('');
    } else {
      schema.soil[topicTitle.toLowerCase()] = topicDescription.join('');
    }
    const [...topicTypesArray] = topicDescription.join('').split(', ');
    schema.soil[`${topicTitle.toLowerCase()}Types`] = topicTypesArray;
  });
  return schema;
};

// * size
const grabPlantSize = schema => {
  const size = allPlantInfo.querySelector('.size').firstElementChild
    .firstElementChild;
  schema.size = {};
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
      schema.size[sizeTopicNames[sizePropTitle]] = sizePropDescription.join('');
    } else {
      schema.size[sizePropTitle.toLowerCase()] = sizePropDescription.join('');
    }
  });
  return schema;
};

// * How to grow, how to care
const grabHowToGuide = schema => {
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
    schema[howToTypes[howToTitle.innerText]] = {};
    [...instructions].forEach(instruction => {
      // ? change information into spread in case any instructions have more than one \n ... need to check random pages to see if this is an issue
      const [instructionTitle, information] = instruction.innerText.split('\n');

      // for Pests instructionTitle, grab out array of the pests (within anchor tags)
      if (instructionTitle === 'Pests') {
        const [...pests] = instruction.getElementsByTagName('A');
        schema[howToTypes[howToTitle.innerText]].pestList = [];
        if (pests.length) {
          for (let pest of pests) {
            schema[howToTypes[howToTitle.innerText]].pestList.push(
              pest.innerText
            );
          }
        }
      }
      if (instructionTitle === 'Diseases') {
        const [...diseases] = instruction.getElementsByTagName('A');
        schema[howToTypes[howToTitle.innerText]].diseaseList = [];
        if (diseases.length) {
          for (let disease of diseases) {
            schema[howToTypes[howToTitle.innerText]].diseaseList.push(
              disease.innerText
            );
          }
        }
      }
      if (instructionTypes[instructionTitle]) {
        schema[howToTypes[howToTitle.innerText]][
          instructionTypes[instructionTitle]
        ] = information;
      } else {
        schema[howToTypes[howToTitle.innerText]][
          instructionTitle.toLowerCase()
        ] = information;
      }
    });
  });
  return schema;
};

grabPlantName(plantSchema);
grabPlantImage(plantSchema);
grabPlantCharacteristics(plantSchema);
grabPlantColours(plantSchema);
grabPlantSunInfo(plantSchema);
grabSoilNeeds(plantSchema);
grabPlantSize(plantSchema);
grabHowToGuide(plantSchema);
grabFurtherPlantDetails(plantSchema);
console.log(plantSchema);
