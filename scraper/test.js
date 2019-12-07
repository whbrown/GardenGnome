// console.log(levenshteinDistance('rosa', 'rosa'));

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
    );

  return Math.min(
    ...names.map(name => {
      const words = name.match(/\w+/g);
      // const words = name.replace(/\W+/gi, '')
      // console.log(words);
      return Math.min(
        ...words.map(word => {
          // get levenschtein for full name & component words, return whichever is smaller
          getLevenshteinDistance(query.toLowerCase(), word.toLowerCase())
        }
        )
      );
    })
  );
};
getLevenshteinDistance('this', 'that')


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
let searchQuery = 'beefmaster tomato';
// console.log(searchQuery.split(' ').length > 1)
// console.log(firstCommonName.match(/\w+/g))

// console.log(Math.min(
//   ...words.map(word =>
//     getLevenshteinDistance('rose'.toLowerCase(), word.toLowerCase())
//   )
// ));

// console.log(`apple 'something'`.replace(/[<>.,/;:+_*&^%$#@!`~{}[\]|\\]/g, ''))
