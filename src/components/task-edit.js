import {COLORS, MONTH_NAMES, DAYS} from '../const';
import {formatTime} from '../utils/common';
import AbstractComponent from './abstract-component';


/**
 * Returns deadline date fieldset markup
 * @param {Date} date date to show
 * @return {String} date fieldset markup
 */
const createDateMarkup = (date) => {
  return (
    `<fieldset class="card__date-deadline">
      <label class="card__input-deadline-wrap">
        <input
          class="card__date"
          type="text"
          placeholder=""
          name="date"
          value="${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${formatTime(date)}"
        />
      </label>
    </fieldset>`
  );
};


/**
 * Returns repeating days markup
 * @param {Array} days array of days
 * @param {Object} repeatingDays repeating days object
 * @return {String} repeating days markup
 */
const createRepeatingDaysMarkup = (days, repeatingDays) => {
  return days
    .map((day) => {
      return (
        `<input
          class="visually-hidden card__repeat-day-input"
          type="checkbox"
          id="repeat-${day}-4"
          name="repeat"
          value="${day}"
          ${repeatingDays[day] ? `checked` : ``}
        />
        <label class="card__repeat-day" for="repeat-${day}-4"
          >${day}</label
        >`
      );
    })
    .join(``);
};


/**
 * Returns tags markup
 * @param {Array} tags array of tags
 * @return {String} tags markup
 */
const createTagsMarkup = (tags) => {
  return tags
    .map((tag) => {
      return (
        `<span class="card__hashtag-inner">
          <input
            type="hidden"
            name="hashtag"
            value="${tag}"
            class="card__hashtag-hidden-input"
          />
          <p class="card__hashtag-name">
            #${tag}
          </p>
          <button type="button" class="card__hashtag-delete">
            delete
          </button>
        </span>`
      );
    })
    .join(``);
};


/**
 * Returns color inputs markup
 * @param {Array} colors array of colors
 * @param {String} currentColor currently selected color
 * @return {String} color inputs markup
 */
const createColorsMarkup = (colors, currentColor) => {
  return colors
    .map((color) => {
      return (
        `<input
          type="radio"
          id="color-${color}-4"
          class="card__color-input card__color-input--${color} visually-hidden"
          name="color"
          value="${color}"
          ${color === currentColor ? `checked` : ``}
        />
        <label
          for="color-${color}-4"
          class="card__color card__color--${color}"
          >${color}</label
        >`
      );
    })
    .join(`\n`);
};


/**
 * Creates Task Edit template
 * @param {Object} task task object
 * @return {string} Task Edit form markup
 */
const createTaskEditTemplate = (task) => {
  const {
    description,
    dueDate,
    repeatingDays,
    tags,
    color,
    // isFavorite,
    // isArchived,
  } = task;

  const isDateShowing = !!dueDate;
  const isExpired = isDateShowing && dueDate < Date.now();
  const isRepeatingTask = Object.values(repeatingDays).some(Boolean);
  const repeatClass = isRepeatingTask ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  const dateMarkup = isDateShowing ? createDateMarkup(dueDate) : ``;
  const repeatingDaysMarkup = isRepeatingTask ? createRepeatingDaysMarkup(DAYS, repeatingDays) : ``;
  const tagsMarkup = createTagsMarkup(Array.from(tags));
  const colorsMarkup = createColorsMarkup(COLORS, color);


  return (

    `<article class="card card--edit card--${color} ${repeatClass} ${deadlineClass}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${isDateShowing ? `yes` : `no`}</span>
                </button>

                ${dateMarkup}

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${isRepeatingTask ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__repeat-days">
                  <div class="card__repeat-days-inner">
                    ${repeatingDaysMarkup}
                  </div>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${tagsMarkup}
                </div>

                <label>
                  <input
                    type="text"
                    class="card__hashtag-input"
                    name="hashtag-input"
                    placeholder="Type new hashtag here"
                  />
                </label>
              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${colorsMarkup}
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};

export default class TaskEdit extends AbstractComponent {
  constructor(task) {
    super();

    this._task = task;
  }

  getTemplate() {
    return createTaskEditTemplate(this._task);
  }
}
