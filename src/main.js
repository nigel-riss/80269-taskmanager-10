import {createMainMenuTemplate} from './components/main-nav';
import {createFilterTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createTaskTemplate} from './components/task';
import {createTaskEditTemplate} from './components/task-edit';
import {createLoadMoreButtonTemplate} from './components/load-more-button';

import {generateTask, generateTasks} from './mock/task';
import {generateFilters} from './mock/filter';


const TASK_NUMBER = 22;
const INITIAL_TASKS_SHOWN_NUMBER = 8;
const BY_BUTTON_TASKS_SHOWN_NUMBER = 8;

/**
 * Renders HTML markup into exact place of HTML Element
 * @param {HTMLElement} parentElement element in which to render HTML markup
 * @param {string} elementMarkup HTML markup to render
 * @param {string} place place in element to place HTML markup
 */
const renderElement = (parentElement, elementMarkup, place = `beforeend`) => {
  parentElement.insertAdjacentHTML(place, elementMarkup);
};


const mainElement = document.querySelector(`.main`);
const mainControlElement = mainElement.querySelector(`.main__control`);
// Render main menu
renderElement(mainControlElement, createMainMenuTemplate());
// Render filters
renderElement(mainElement, createFilterTemplate(generateFilters()));
// Render board
renderElement(mainElement, createBoardTemplate());
const boardElement = mainElement.querySelector(`.board`);
const boardTasksContainer = boardElement.querySelector(`.board__tasks`);

// Render tasks
renderElement(boardTasksContainer, createTaskEditTemplate(generateTask()));
const tasks = generateTasks(TASK_NUMBER);
let shownTasksNumber = INITIAL_TASKS_SHOWN_NUMBER;
tasks.slice(1, shownTasksNumber).forEach((task) => {
  renderElement(boardTasksContainer, createTaskTemplate(task));
});

// Render LOAD MORE button
renderElement(boardElement, createLoadMoreButtonTemplate());

// LOAD MORE button logic
const loadMoreButton = boardElement.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevShownTasksNumber = shownTasksNumber;
  shownTasksNumber += BY_BUTTON_TASKS_SHOWN_NUMBER;

  tasks.slice(prevShownTasksNumber, shownTasksNumber).forEach((task) => {
    renderElement(boardTasksContainer, createTaskTemplate(task));
  });

  if (shownTasksNumber >= TASK_NUMBER) {
    loadMoreButton.remove();
  }
});
