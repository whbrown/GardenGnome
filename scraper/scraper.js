const schemaObject = {};

// narrow down total search area for each selection for efficiency
const allPlantInfo = document.querySelector(`.ajaxSearchDetails`);

// characteristics
const [...characteristics] = allPlantInfo
  .querySelector('.char')
  .querySelector('ul').children;
schemaObject.characteristics = {};
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
    schemaObject.characteristics[
      characteristicTypes[characteristicTitle]
    ] = description.join('');
  } else {
    schemaObject.characteristics[characteristicTitle] = description.join('');
  }
});

/* colour */
const [...colour] = allPlantInfo.querySelector(
  '.plant-characteristics'
).children;
schemaObject.colour = {};
colour.forEach(season => {
  const seasonNames = {
    'Colour in Autumn': 'autumn',
    'Colour in Spring': 'spring',
    'Colour in Summer': 'summer',
    'Colour in Winter': 'winter',
  };
  let [seasonTitle, ...colourInfo] = season.children;
  colourInfo = colourInfo[0];
  schemaObject.colour[seasonNames[seasonTitle.innerText]] = {};

  let [...colourBySeasonByType] = colourInfo.children;
  [...colourBySeasonByType] = colourBySeasonByType;
  colourBySeasonByType.forEach(li => {
    let [colourName, ...plantPart] = li.children;
    const plantPartKey = plantPart.reduce((key, p) => key + p.innerText, '');
    const colourNameValue = colourName.querySelector('.tooltip').innerText;
    schemaObject.colour[seasonNames[seasonTitle.innerText]][
      plantPartKey
    ] = colourNameValue;
  });
});

/* sunlight */
const sun = allPlantInfo.querySelector('.sun');

/* soil */
const soil = allPlantInfo.querySelector('.soil');

/* size */
const size = allPlantInfo.querySelector('.size');

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
  schemaObject[howToTypes[howToTitle.innerText]] = {};
  [...instructions].forEach(instruction => {
    // ? change information into spread in case any instructions have more than one \n ... need to check random pages to see if this is an issue
    const [instructionTitle, information] = instruction.innerText.split('\n');

    // for Pests instructionTitle, grab out array of the pests (within anchor tags)
    if (instructionTitle === 'Pests') {
      const [...pests] = instruction.getElementsByTagName('A');
      schemaObject[howToTypes[howToTitle.innerText]].pestList = [];
      if (pests.length) {
        for (let pest of pests) {
          schemaObject[howToTypes[howToTitle.innerText]].pestList.push(
            pest.innerText
          );
        }
      }
    }
    if (instructionTitle === 'Diseases') {
      const [...diseases] = instruction.getElementsByTagName('A');
      schemaObject[howToTypes[howToTitle.innerText]].diseaseList = [];
      if (diseases.length) {
        for (let disease of diseases) {
          schemaObject[howToTypes[howToTitle.innerText]].diseaseList.push(
            disease.innerText
          );
        }
      }
    }
    if (instructionTypes[instructionTitle]) {
      schemaObject[howToTypes[howToTitle.innerText]][
        instructionTypes[instructionTitle]
      ] = information;
    } else {
      schemaObject[howToTypes[howToTitle.innerText]][
        instructionTitle
      ] = information;
    }
  });
});
