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


/**
 * Returns value in 2 digit zero padding format
 * @param {number} value number to pad
 * @return {String} Zero padded value
 */
const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};


/**
 * Returns formated date
 * @param {Date} date date to format
 * @return {String} formated string (HH:MM am|pm)
 */
const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  const interval = date.getHours() > 11 ? `PM` : `AM`;

  return `${hours}:${minutes} ${interval}`;
};


export {getRandomInteger};
export {getRandomArrayItem};
export {formatTime};
