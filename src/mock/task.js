import {getRandomInteger} from '../utils';
import {getRandomArrayItem} from '../utils';
import { COLORS } from '../const';

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

const Tags = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
];


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
 * Returns a Set of up to 3 randomly selected tags
 * @return {Set} tags
 */
const generateTags = () => {
  const tags = new Set();

  const tagsNumber = getRandomInteger(0, 3);
  const tempArray = Array.from(Tags);
  for (let i = 0; i < tagsNumber; i++) {
    tags.add(tempArray.splice(getRandomInteger(0, tempArray.length - 1), 1)[0]);
  }

  return tags;
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
    tags: generateTags(),
    color: getRandomArrayItem(COLORS),
    isFavorite: Math.random() > 0.5,
    isArchived: Math.random() > 0.5,
  };
};


/**
 * Returns array of generated tasks
 * @param {number} numberOfTasks number of tasks to generate
 * @return {Array} array of tasks
 */
const generateTasks = (numberOfTasks) => {
  return new Array(numberOfTasks)
    .fill(``)
    .map(generateTask);
};


export {generateTask, generateTasks};
