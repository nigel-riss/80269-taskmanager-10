import {getRandomInteger} from '../utils';
import {getRandomArrayItem} from '../utils';


const TaskDescriptions = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
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
 * Returns random task
 * @return {Object} task object
 */
const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate(7);

  return {
    description: getRandomArrayItem(TaskDescriptions),
    dueDate,
    repeatingDays: {},
  };
};

export {generateTask};
