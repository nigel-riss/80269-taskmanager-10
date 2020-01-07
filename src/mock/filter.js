import {getRandomInteger} from '../utils';

const FilterNames = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `tags`,
  `archive`,
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
