import {createElement} from '../utils';

/**
 * Returns filter markup
 * @param {Object} filter filter object
 * @param {boolean} isChecked if filter is checked
 * @return {String} filter markup
 */
const createFilterMarkup = (filter, isChecked) => {
  const {name, count} = filter;

  return (
    `<input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${count ? `` : `disabled`}
      ${isChecked ? `checked` : ``}
    />
    <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span></label
    >`
  );
};


/**
 * Creates Filter template
 * @param {Array} filters array of filter objects
 * @return {string} Filter markup
 */
const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it, i) => {
    return createFilterMarkup(it, i === 0);
  }).join(`\n`);

  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`
  );
};

export {createFilterTemplate};

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
