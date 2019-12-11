const convertCamelCaseToNormal = string => {
  const convertedString = string.split('').reduce((convertedString, letter) => {
    if (/[A-Z]/.test(letter)) {
      return `${convertedString} ${letter.toLowerCase()}`;
    }
    return `${convertedString}${letter}`;
  });
  return convertedString.slice(0, 1).toUpperCase() + convertedString.slice(1);
};

export default convertCamelCaseToNormal;