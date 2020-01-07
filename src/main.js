import {createMainMenuTemplate} from './components/main-nav';
import {createFilterTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createTaskTemplate} from './components/task';
import {createTaskEditTemplate} from './components/task-edit';
import {createLoadMoreButtonTemplate} from './components/load-more-button';

import {generateTask, generateTasks} from './mock/task';
import {generateFilters} from './mock/filter';


const TASK_NUMBER = 22;


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
tasks.forEach((task) => {
  renderElement(boardTasksContainer, createTaskTemplate(task));
});

// Render LOAD MORE button
renderElement(boardElement, createLoadMoreButtonTemplate());
