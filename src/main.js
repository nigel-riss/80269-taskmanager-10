import {createMainMenuTemplate} from './components/main-nav';
import {createFilterTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createTaskTemplate} from './components/task';
import {createTaskEditTemplate} from './components/task-edit';
import {createLoadMoreButtonTemplate} from './components/load-more-button';

import {generateTasks} from './mock/task';
import {generateFilters} from './mock/filter';

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

renderElement(mainControlElement, createMainMenuTemplate());
renderElement(mainElement, createFilterTemplate(generateFilters()));

renderElement(mainElement, createBoardTemplate());
const boardElement = mainElement.querySelector(`.board`);
const boardTasksContainer = boardElement.querySelector(`.board__tasks`);

renderElement(boardTasksContainer, createTaskEditTemplate());

const tasks = generateTasks(6);
for (let task of tasks) {
  renderElement(boardTasksContainer, createTaskTemplate(task));
}

renderElement(boardElement, createLoadMoreButtonTemplate());
