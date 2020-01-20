import {getRandomInteger} from '../utils/common';

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
export const generateFilters = () => {
  return FilterNames.map((it) => {
    return {
      name: it,
      count: getRandomInteger(0, 10),
    };
  });
};
