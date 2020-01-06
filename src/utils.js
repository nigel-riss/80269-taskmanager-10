/**
 * Returns a random integer in a range
 * @param {number} min minimal number (included)
 * @param {number} max maximal number (included)
 * @return {number} random number
 */
const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};


/**
 * Returns random array element
 * @param {Array} array array
 * @return {*} random array element
 */
const getRandomArrayItem = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};


export {getRandomInteger};
export {getRandomArrayItem};
