import {getRandomInteger} from '../utils';

const FilterNames = [
  `All`,
  `Overdue`,
  `Today`,
  `Favorites`,
  `Repeating`,
  `Tags`,
  `Archive`,
];


/**
 * Returns an array of filter objects {name, count}
 * @return {Object} filters
 */
const generateFilters = () => {
  return FilterNames.map((it) => {
    return {
      name: it,
      count: getRandomInteger(0, 10),
    };
  });
};


export {generateFilters};
