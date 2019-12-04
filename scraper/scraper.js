const schemaObject = {};

// characteristics
const [...characteristics] = document
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
// colour
const [...colour] = document
  .querySelector('.colour')
  .querySelector('ul').children;
schemaObject.colour = {};
colour.forEach(characteristic => {
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
    schemaObject.colour[
      characteristicTypes[characteristicTitle]
    ] = description.join('');
  } else {
    schemaObject.colour[characteristicTitle] = description.join('');
  }
});

// sunlight
const sun = document.querySelector('.sun');

// soil
const soil = document.querySelector('.soil');

// size
const size = document.querySelector('.size');

// * How to grow, how to care

const [...howToDivs] = document.getElementsByClassName(`how-to`);
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
  console.log(children);
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
