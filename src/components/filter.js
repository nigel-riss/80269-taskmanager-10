import AbstractComponent from "./abstract-component";

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


export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}
