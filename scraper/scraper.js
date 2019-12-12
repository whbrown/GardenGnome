const axios = require('axios');
const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const Plant = require('../models/Plant');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/gardengnome');

(async () => {
  // add { headless: false } as launch param
  const browser = await puppeteer.launch();
  const mostRecentPlant = await Plant.findOne({}).sort({ RHSID: -1 });
  // mostRecentPlant.RHSID + 1
  for (let RHSID = 11649; RHSID < 1000000; RHSID++) {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(99999999);
    await page.goto(
      `https://www.rhs.org.uk/Plants/${RHSID}/i-Viburnum-opulus-i/Details`
    );
    const delay = time =>
      new Promise(function(resolve) {
        setTimeout(resolve, time);
      });
    try {
      let plantData = await page.evaluate(() => {
        // * // * // * //
        const makeCamelCase = topicTitle => {
          // make strings camelcase to use as prop keys in Plant model
          const capitalize = string =>
            string.charAt(0).toUpperCase() + string.slice(1);
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

        // * plant name
        const grabPlantName = (schema, allPlantInfo) => {
          schema.detailsPercentage = 0 / 9;
          const [plantLatinName, plantCommonName] = allPlantInfo.querySelector(
            '.ib'
          ).children;
          schema.plantLatinName = plantLatinName.innerText;
          schema.plantCommonName = plantCommonName.innerText;
          return schema;
        };

        // * plant image
        const grabPlantImage = (schema, allPlantInfo) => {
          let plantImage = allPlantInfo.querySelector('.cover-image__img');
          plantImage = plantImage.style.backgroundImage;
          schema.plantImageURL = plantImage.slice(5, plantImage.length - 2);
          return schema;
        };

        // * further details
        const grabFurtherPlantDetails = (schema, allPlantInfo) => {
          const [...furtherPlantDetails] = allPlantInfo.querySelector(
            '#plant_details_desc'
          ).children;

          const furtherDetails = furtherPlantDetails.reduce(
            (furtherDetails, topic) => {
              const [topicTitle, ...description] =
                topic.dataset.facettype === 'description'
                  ? topic.innerText.split('\n')
                  : topic.firstElementChild.innerText.split('\n');
              if (
                ['otherCommonNames', 'synonyms'].includes(
                  makeCamelCase(topicTitle)
                )
              ) {
                furtherDetails[makeCamelCase(topicTitle)] = description;
              } else {
                furtherDetails[makeCamelCase(topicTitle)] = description.join(
                  ', '
                );
              }
              return furtherDetails;
            },
            {}
          );

          schema.furtherDetails = furtherDetails;
          return schema;
        };

        // * characteristics
        const grabPlantCharacteristics = (schema, allPlantInfo) => {
          const [...characteristics] = allPlantInfo
            .querySelector('.char')
            .querySelector('ul').children;
          schema.characteristics = {};
          characteristics.forEach(characteristic => {
            let [
              characteristicTitle,
              ...description
            ] = characteristic.innerText.split('\n');
            // filter out any empty strings from description due to sequential new lines
            description = description.filter(value => value);
            schema.characteristics[
              makeCamelCase(characteristicTitle)
            ] = description.join('');
          });
          return schema;
        };

        // * colour
        const grabPlantColours = (schema, allPlantInfo) => {
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
            // * sorry for the desperately ugly syntax in the rest of this function, in need of refactoring
            let [seasonTitle, ...colourInfo] = season.children;
            colourInfo = colourInfo[0];
            schema.colour[seasonNames[seasonTitle.innerText]] = {};

            let [...colourBySeasonByType] = colourInfo.children;
            [...colourBySeasonByType] = colourBySeasonByType;
            colourBySeasonByType.forEach(li => {
              let [colourName, ...plantPart] = li.children;
              const plantPartKey = plantPart.reduce(
                (key, p) => key + p.innerText,
                ''
              );
              const colourNameValue = colourName
                .querySelector('.tooltip')
                .innerText.split();

              // ? can this outrageously long property access be shortened?
              // ? doesn't seem to work if assigned to a variable

              // concat to existing colour array if exists, else just assign
              if (
                schema.colour[seasonNames[seasonTitle.innerText]][plantPartKey]
              ) {
                schema.colour[seasonNames[seasonTitle.innerText]][
                  plantPartKey
                ] = schema.colour[seasonNames[seasonTitle.innerText]][
                  plantPartKey
                ].concat(colourNameValue);
              } else {
                schema.colour[seasonNames[seasonTitle.innerText]][
                  plantPartKey
                ] = colourNameValue;
              }
            });
          });
          return schema;
        };

        // * sunlight
        const grabPlantSunInfo = (schema, allPlantInfo) => {
          const [...sun] = allPlantInfo.querySelector(
            '.sun'
          ).firstElementChild.firstElementChild.children;
          schema.sunlight = {};
          // split out requirements into array, filter out falsy values in case of double newlines
          const sunNeeds = sun[1].innerText.split('\n').filter(value => value);
          schema.sunlight.sunNeeds = sunNeeds;
          const [...otherSunlightInfo] = sun[2].querySelectorAll('p');
          otherSunlightInfo.forEach(topic => {
            const [topicTitle, ...topicDescription] = topic.innerText.split(
              '\n'
            );
            const topicDescriptionArray = topicDescription
              .join('')
              .split(' or ');
            schema.sunlight[makeCamelCase(topicTitle)] = topicDescriptionArray;
            // schema.sunlight[makeCamelCase(topicTitle)] = topicDescription.join('');
          });
          return schema;
        };

        // * soil
        const grabSoilNeeds = (schema, allPlantInfo) => {
          const [...soil] = allPlantInfo.querySelector(
            '.soil'
          ).firstElementChild.firstElementChild.children;
          schema.soil = {};
          let [...soilTypes] = soil[1].firstElementChild.children;
          soilTypes = soilTypes.map(li => li.innerText);
          schema.soil.soilTypes = soilTypes;

          let [...otherSoilInfo] = soil[2].firstElementChild.children;
          otherSoilInfo.forEach(li => {
            const [
              topicTitle,
              ...topicDescription
            ] = li.firstElementChild.innerText.split('\n');
            schema.soil[makeCamelCase(topicTitle)] = topicDescription.join('');
            const [...topicTypesArray] = topicDescription.join('').split(', ');
            schema.soil[`${makeCamelCase(topicTitle)}Types`] = topicTypesArray;
          });
          return schema;
        };

        // * size
        const grabPlantSize = (schema, allPlantInfo) => {
          const size = allPlantInfo.querySelector('.size').firstElementChild
            .firstElementChild;
          schema.size = {};
          let [...sizeInfo] = size.querySelector('.results-size').children;
          sizeInfo.forEach(li => {
            const [
              sizePropTitle,
              ...sizePropDescription
            ] = li.firstElementChild.innerText.split('\n');
            schema.size[
              makeCamelCase(sizePropTitle)
            ] = sizePropDescription.join('');
          });
          return schema;
        };

        // * How to grow, how to care
        const grabHowToGuide = (schema, allPlantInfo) => {
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
              'Suggested planting locations and garden types':
                'plantingLocation',
            };
            const children = [...howToDiv.children];

            const [howToTitle, ...instructions] = children;
            schema[howToTypes[howToTitle.innerText]] = {};
            [...instructions].forEach(instruction => {
              // ? change information into spread in case any instructions have more than one \n ... need to check random pages to see if this is an issue
              const [
                instructionTitle,
                information,
              ] = instruction.innerText.split('\n');

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

        try {
          const allPlantInfo = document.querySelector(`.ajaxSearchDetails`);
          let plantSchema = {};
          plantSchema.detailsPercentage = 0 / 9;

          const scrapeFunctions = [
            grabPlantName,
            grabFurtherPlantDetails,
            grabHowToGuide,
            grabPlantCharacteristics,
            grabPlantSunInfo,
            grabSoilNeeds,
            grabPlantSize,
            grabPlantColours,
            grabPlantImage,
          ];
          for (let i = 0; i <= scrapeFunctions.length; i++) {
            try {
              scrapeFunctions[i](plantSchema, allPlantInfo);
              if (
                !plantSchema.plantLatinName
                // || (i === 3 && !plantSchema.characteristics) // ! uncomment if scraping speed is an issue to short-circuit sparse pages early
              ) {
                break;
              }
              plantSchema.detailsPercentage += Number((1 / 9).toFixed(2));
            } catch (e) {
              console.dir(e);
            }
          }
          // return plantSchema;
          if (plantSchema.plantLatinName) {
            if (plantSchema.detailsPercentage === 0.99) {
              // dumb floats
              plantSchema.detailsPercentage = 1;
            }
            console.dir('found');
            return plantSchema;
          }
          console.dir('pass');
          return null;
        } catch (e) {
          console.dir(e);
          console.log(e);
        }
        // * // * // * //
      });
      Plant.create({ ...plantData, RHSID: Number(RHSID) })
        .then(() => {
          // console.dir(plantData);
          console.dir(`success: ${RHSID}`);
          page.close();
        })
        .catch(e => {
          console.dir(e);
          page.close();
        });
    } catch (e) {
      console.log(e);
      page.close();
    }
    // console.dir(plantData);
    // array.push(plantData);
    // page.close();
  }
  await browser.close();
})();
