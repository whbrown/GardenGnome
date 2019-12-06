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
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1
          )
        ); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};

let plant = {};
plant.taxonomicInfo = {};

plant.plantCommonNames = [
  'Salvia',
  'Autumn Sage',
  'Cherry Sage',
  "Gregg Salvia 'Rosea'",
];
plant.plantLatinName = 'Cryptanthus ';
plant.taxonomicInfo.plantGenus = 'Bromeliaceae (bro-mee-lee-AY-see-ee)';
plant.taxonomicInfo.plantFamily = 'Cryptanthus (krip-TAN-thus)';

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
      return Math.min(
        ...words.map(word =>
          getLevenshteinDistance(query.toLowerCase(), word.toLowerCase())
        )
      );
    })
  );
};

console.log(plantVsQueryEditDistance(plant, 'sage'));
