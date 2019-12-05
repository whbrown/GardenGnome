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
  const browser = await puppeteer.launch();
  for (let DGID = 1; DGID < 100; DGID++) {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(99999999);
    page.setJavaScriptEnabled(false);
    await page.goto(`https://davesgarden.com/guides/pf/go/${DGID}`);
    const delay = time =>
      new Promise(function(resolve) {
        setTimeout(resolve, time);
      });
    await delay(1500);
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
          schema.plantImageURL = `https://davesgarden.com${img}`;
          return schema;
        };

        const grabTaxonomicInfo = (schema, plantsFiles) => {
          schema.taxonomicInfo = {};
          const props = ['plantFamily', 'plantGenus', 'plantSpecies'];
          for (let i = 1; i <= 3; i++) {
            const propKey = props[i - 1];
            const propValue = plantsFiles.querySelector(
              `.plant-details tr:nth-child(${i})`
            ).lastChild.firstChild.textContent;
            schema.taxonomicInfo[propKey] = propValue;
          }
          return schema;
        };

        const grabAssortedInfo = (schema, plantsFiles) => {
          const [, ...assortedInfo] = plantsFiles.querySelector(
            '.plant-body'
          ).children;
          let currentProp;
          const props = assortedInfo.reduce((plantProps, el) => {
            currentProp = currentProp || null;
            if (el.textContent === 'Unknown - Tell us') return plantProps;
            if (el.tagName === 'H4') {
              const h4 = el.textContent;
              currentProp = makeCamelCase(
                el.textContent.slice(0, h4.length - 1)
              );
            } else {
              let info = el.textContent;
              if (currentProp === 'hardiness') info = info.replace(/�/g, '°');
              plantProps[currentProp] = plantProps[currentProp]
                ? plantProps[currentProp].concat([info])
                : [info];
            }
            delete plantProps.regiona;
            return plantProps;
          }, {});
          plantSchema = { ...schema, ...props };
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

// const makeCamelCase = topicTitle => {
//   // make strings camelcase to use as prop keys in Plant model
//   const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);
//   let camelCaseKey = topicTitle.toLowerCase();
//   if (topicTitle.split(' ').length > 1) {
//     const wordArray = topicTitle.split(' ');
//     camelCaseKey = `${wordArray[0].toLowerCase()}${wordArray
//       .slice(1)
//       .map(word => capitalize(word))
//       .join('')}`;
//   }
//   return camelCaseKey;
// };

// const grabPlantName = (schema, plantsFiles) => {
//   const plantLatinName = plantsFiles.querySelector('h2').textContent;
//   schema.plantLatinName = plantLatinName;
//   const plantCommonNames = plantsFiles
//     .querySelector('h1')
//     .textContent.split(', ');
//   schema.plantCommonNames = plantCommonNames;
//   return schema;
// };

// const grabPlantImage = (schema, plantsFiles) => {
//   const img = plantsFiles.querySelector('.plantfiles-gallery-image img').src;
//   schema.plantImageURL = `https://davesgarden.com${img}`;
//   return schema;
// };

// const grabTaxonomicInfo = (schema, plantsFiles) => {
//   schema.taxonomicInfo = {};
//   const props = ['plantFamily', 'plantGenus', 'plantSpecies'];
//   for (let i = 1; i <= 3; i++) {
//     const propKey = props[i - 1];
//     const propValue = plantsFiles.querySelector(
//       `.plant-details tr:nth-child(${i})`
//     ).lastChild.firstChild.textContent;
//     schema.taxonomicInfo[propKey] = propValue;
//   }
//   return schema;
// };

// const grabAssortedInfo = (schema, plantsFiles) => {
//   const [, ...assortedInfo] = plantsFiles.querySelector('.plant-body').children;
//   let currentProp;
//   const props = assortedInfo.reduce((plantProps, el) => {
//     currentProp = currentProp || null;
//     if (el.textContent === 'Unknown - Tell us') return plantProps;
//     if (el.tagName === 'H4') {
//       const h4 = el.textContent;
//       currentProp = makeCamelCase(el.textContent.slice(0, h4.length - 1));
//     } else {
//       let info = el.textContent;
//       if (currentProp === 'hardiness') info = info.replace(/�/g, '°');
//       plantProps[currentProp] = plantProps[currentProp]
//         ? plantProps[currentProp].concat([info])
//         : [info];
//     }
//     delete plantProps.regiona;
//     return plantProps;
//   }, {});
//   plantSchema = { ...schema, ...props };
//   return schema;
// };

// const grabComments = (schema, plantsFiles) => {
//   const [, ...comments] = plantsFiles.querySelector(
//     '.plant-ratings-table tbody'
//   ).children;
//   schema.plantComments = [];
//   comments.forEach(comment => {
//     const commentContainer = {};
//     const [rating, commentBody] = comment.children;
//     commentContainer.rating = rating.textContent;
//     const [commentHeader, commentText] = commentBody.children;
//     commentContainer.commentHeader = commentHeader.textContent;
//     commentContainer.commentText = commentText.firstChild.textContent;
//     schema.plantComments.push(commentContainer);
//   });
//   return schema;
// };

// const scrapeDG = (url, DGID) =>
//   axios
//     .get(url)
//     .then(res => {
//       if (res.status === 200) {
//         const html = res.data;
//         const { document } = new JSDOM(res.data).window;
//         const plantsFiles = document.querySelector('.plants-files');
//         try {
//           plantSchema = {};
//           let detailsPercentage = 0 / 9;
//           const scrapeFunctions = [
//             grabPlantName,
//             grabTaxonomicInfo,
//             grabAssortedInfo,
//             grabPlantImage,
//             grabComments,
//           ];
//           // grabPlantName(plantSchema, plantsFiles);
//           // plantSchema.detailsPercentage += Number((1 / 9).toFixed(2));
//           for (let i = 0; i <= scrapeFunctions.length; i++) {
//             try {
//               scrapeFunctions[i](plantSchema, plantsFiles);
//               if (
//                 !plantSchema.plantLatinName
//                 // || (i === 3 && !plantSchema.characteristics) // ! uncomment if scraping speed is an issue to short-circuit sparse pages early
//               ) {
//                 break;
//               }
//               detailsPercentage += Number((1 / 9).toFixed(2));
//             } catch (e) {
//               // delete plantSchema.null;
//               console.dir(e);
//             }
//           }
//           plantSchema.detailsPercentage = detailsPercentage;
//           if (plantSchema.plantLatinName) {
//             if (detailsPercentage === 0.99) {
//               // dumb floats
//               detailsPercentage = 1;
//             }
//             // console.dir('found');
//             console.log('sending to DB');
//             plantSchema.detailsPercentage = detailsPercentage;
//             DGPlant.create({ ...plantData, DGID: Number(DGID) })
//               .then(res => {
//                 console.log(`mongoose:`, res);
//                 console.dir(`success: ${DGID}`);
//               })
//               .catch(e => {
//                 console.log(`mongoose failure: ${DGID}; ${e}`);
//               });
//           }
//         } catch (e) {
//           console.log(e);
//         }
//         // return plantSchema;
//       }
//       return res.status;
//     })
//     .catch(e => console.error(e));

// // for (let plantId = 1; plantId < 300000; plantId++) {
// //   // scrape here `https://davesgarden.com/guides/pf/go/${plantId}/`

// // }

// const sendData = (plantData, DGID) => {
//   // console.log(plantData);
//   DGPlant.create({ ...plantData, DGID: Number(DGID) })
//     .then(res => {
//       console.log(`mongoose:`, res);
//       console.dir(`success: ${DGID}`);
//     })
//     .catch(e => {
//       console.log(`mongoose failure: ${DGID}; ${e}`);
//     });
// };

// for (let DGID = 1; DGID < 5; DGID++) {
//   setTimeout(() => {
//     scrapeDG(`https://davesgarden.com/guides/pf/go/${DGID}`)
//       .then(response =>
//         // send to db
//         sendData(response, DGID)
//       )
//       .then(res => {
//         // do something with response? celebrate?
//         console.log(`response from database: ${res}`);
//       })
//       .catch(e => console.log(e));
//   }, 5000);
// }
