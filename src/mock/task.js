import {getRandomInteger} from '../utils';
import {getRandomArrayItem} from '../utils';


const TaskDescriptions = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const DefaultRepeatingDays = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
};


/**
 * Returns a date with a random limited deviation from current date
 * @param {number} deviationDays deviation limit in days
 * @return {Date} random date
 */
const getRandomDate = (deviationDays) => {
  const randomDate = new Date();
  const deviationMS = deviationDays * 24 * 60 * 60 * 1000;

  randomDate.setTime(randomDate.getTime() + getRandomInteger(-deviationMS, deviationMS));

  return randomDate;
};


/**
 * Returns an object of randomized repeating days
 * @return {Object} repeating days
 */
const generateRepeatingDays = () => {
  const repeatingDays = {};

  for (let key in DefaultRepeatingDays) {
    // Calling Cthulhu 🐙 here to check if I can use for..in
    // Cause of ESLint rules
    // I DO understand what I'm doing here, but still looks weird
    if (Object.prototype.hasOwnProperty.call(DefaultRepeatingDays, key)) {
      repeatingDays[key] = Math.random() > 0.5;
    }
  }

  return repeatingDays;
};


/**
 * Returns random task
 * @return {Object} task object
 */
const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate(7);

  return {
    description: getRandomArrayItem(TaskDescriptions),
    dueDate,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
  };
};

export {generateTask};
