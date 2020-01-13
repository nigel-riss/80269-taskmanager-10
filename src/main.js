import {createMainMenuTemplate} from './components/main-nav';
import {createFilterTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createTaskTemplate} from './components/task';
import {createTaskEditTemplate} from './components/task-edit';
import {createLoadMoreButtonTemplate} from './components/load-more-button';

import {generateTask, generateTasks} from './mock/task';
import {generateFilters} from './mock/filter';

import {render, RenderPosition} from './utils';


const TASK_NUMBER = 22;
const INITIAL_TASKS_SHOWN_NUMBER = 8;
const BY_BUTTON_TASKS_SHOWN_NUMBER = 8;


const mainElement = document.querySelector(`.main`);
const mainControlElement = mainElement.querySelector(`.main__control`);
// Render main menu
render(mainControlElement, createMainMenuTemplate(), RenderPosition.BEFOREEND);
// Render filters
render(mainElement, createFilterTemplate(generateFilters()), RenderPosition.BEFOREEND);
// Render board
render(mainElement, createBoardTemplate(), RenderPosition.BEFOREEND);
const boardElement = mainElement.querySelector(`.board`);
const boardTasksContainer = boardElement.querySelector(`.board__tasks`);

// Render tasks
render(boardTasksContainer, createTaskEditTemplate(generateTask()), RenderPosition.BEFOREEND);
const tasks = generateTasks(TASK_NUMBER);
let shownTasksNumber = INITIAL_TASKS_SHOWN_NUMBER;
tasks.slice(1, shownTasksNumber).forEach((task) => {
  render(boardTasksContainer, createTaskTemplate(task), RenderPosition.BEFOREEND);
});

// Render LOAD MORE button
render(boardElement, createLoadMoreButtonTemplate(), RenderPosition.BEFOREEND);

// LOAD MORE button logic
const loadMoreButton = boardElement.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevShownTasksNumber = shownTasksNumber;
  shownTasksNumber += BY_BUTTON_TASKS_SHOWN_NUMBER;

  tasks.slice(prevShownTasksNumber, shownTasksNumber).forEach((task) => {
    render(boardTasksContainer, createTaskTemplate(task), RenderPosition.BEFOREEND);
  });

  if (shownTasksNumber >= TASK_NUMBER) {
    loadMoreButton.remove();
  }
});
