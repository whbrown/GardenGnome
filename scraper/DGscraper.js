/* eslint no-loop-func: 0 */

// const axios = require('axios');
// const jsdom = require('jsdom');
const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const DGPlant = require('../models/DGPlant');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/gardengnome');

// const { JSDOM } = jsdom;

(async () => {
  // add { headless: false } as launch param

  // ! update plants 1 thru 380 (they have img: https://davesgarden.comhttps://davesgarden.com/guides/pf/thumbnail.php?image=2004/08/21/ownedbycats/c4e384.jpg&widht=700&height=312)
  const browser = await puppeteer.launch();
  for (let DGID = 7026; DGID < 999999; DGID++) {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(99999999);
    page.setJavaScriptEnabled(false);
    await page.goto(`https://davesgarden.com/guides/pf/go/${DGID}`);
    const delay = time =>
      new Promise(function(resolve) {
        setTimeout(resolve, time);
      });
    // await delay(1000);
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

        const grabPlantName = (schema, plantsFiles) => {
          const plantLatinName = plantsFiles.querySelector('h2').textContent;
          schema.plantLatinName = plantLatinName;
          const plantCommonNames = plantsFiles
            .querySelector('h1')
            .textContent.split(', ');
          schema.plantCommonNames = plantCommonNames;
          return schema;
        };

        const grabPlantImage = (schema, plantsFiles) => {
          const img = plantsFiles.querySelector('.plantfiles-gallery-image img')
            .src;
          schema.plantImageURL = img;
          return schema;
        };

        const grabTaxonomicInfo = (schema, plantsFiles) => {
          const topicKeys = {
              'Family': 'plantFamily',
              'Genus': 'plantGenus',
              'Species': 'plantSpecies',
              'Cultivar': 'plantCultivar',
              'Additional cultivar information': 'additionalCultivarInformation',
              'Hybridized': 'plantHybridizer',
              'Registered or introduced': 'yearRegisteredOrIntroduced',
          }
          schema.taxonomicInfo = {};
          [...taxonomicInfo] = plantsFiles.querySelector(`.plant-details tbody`).children;

          taxonomicInfo.forEach((topic) => {
            const topicTitle = topic.firstChild.innerText;
            let topicValue = topic.lastChild.textContent.split('  ')[0];
            if (topicTitle === 'Registered or introduced:') {
              try {
                topicValue = Number(topicValue);
              } catch (e) {
                console.log(e);
              }
            }
            if (topicKeys[topicTitle.split(':')[0]]) {
              schema.taxonomicInfo[topicKeys[topicTitle.split(':')[0]]] = topicValue;
            }
          })
          return schema;
        };

        const grabAssortedInfo = (schema, plantsFiles) => {
          const [, ...assortedInfo] = plantsFiles.querySelector(
            '.plant-body'
          ).children;
          let currentProp;
          assortedInfo.forEach(el => {
            currentProp = currentProp || null;
            if (el.textContent === 'Unknown - Tell us') {
              // pass
            } else if (el.tagName === 'H4') {
              const h4 = el.textContent;
              currentProp = makeCamelCase(
                el.textContent.slice(0, h4.length - 1)
              );
            } else {
              let info = el.textContent;
              if (currentProp === 'hardiness') info = info.replace(/�/g, '°');
              schema[currentProp] = schema[currentProp]
                ? schema[currentProp].concat([info])
                : [info];
            }
            delete schema.regiona;
            return schema;
          });
          return schema;
        };

        const grabComments = (schema, plantsFiles) => {
          const [, ...comments] = plantsFiles.querySelector(
            '.plant-ratings-table tbody'
          ).children;
          schema.plantComments = [];
          comments.forEach(comment => {
            const commentContainer = {};
            const [rating, commentBody] = comment.children;
            commentContainer.rating = rating.textContent;
            const [commentHeader, commentText] = commentBody.children;
            commentContainer.commentHeader = commentHeader.textContent;
            commentContainer.commentText = commentText.firstChild.textContent;
            schema.plantComments.push(commentContainer);
          });
          return schema;
        };
        try {
          const allPlantInfo = document.querySelector('.plants-files');
          let plantSchema = {};
          plantSchema.detailsPercentage = 0 / 9;

          const scrapeFunctions = [
            grabPlantName,
            grabTaxonomicInfo,
            grabAssortedInfo,
            grabPlantImage,
            grabComments,
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
      DGPlant.create({ ...plantData, DGID: Number(DGID) })
        .then(() => {
          // console.dir(plantData);
          console.dir(`success: ${DGID}`);
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
  }
  await browser.close();
})();