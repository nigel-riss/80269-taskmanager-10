import SiteMenuComponent from './components/site-menu';
import FilterComponent from './components/filter';
import BoardComponent from './components/board';
import TaskComponent from './components/task';
import TaskEditComponent from './components/task-edit';
import LoadMoreButtonComponent from './components/load-more-button';

import {generateTasks} from './mock/task';
import {generateFilters} from './mock/filter';

import {render, RenderPosition} from './utils';


const TASK_NUMBER = 22;
const INITIAL_TASKS_SHOWN_NUMBER = 8;
const BY_BUTTON_TASKS_SHOWN_NUMBER = 8;


const mainElement = document.querySelector(`.main`);
const mainControlElement = mainElement.querySelector(`.main__control`);

// Render main menu
render(mainControlElement, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);

// Render filters
const filters = generateFilters();
render(mainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);

// Render board
const boardComponent = new BoardComponent();
render(mainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);

const boardTasksContainer = boardComponent.getElement().querySelector(`.board__tasks`);

const tasks = generateTasks(TASK_NUMBER);

// Render task edit
render(boardTasksContainer, new TaskEditComponent(tasks[0]).getElement(), RenderPosition.BEFOREEND);

// Render tasks
let shownTasksNumber = INITIAL_TASKS_SHOWN_NUMBER;
tasks.slice(1, shownTasksNumber).forEach((task) => {
  render(boardTasksContainer, new TaskComponent(task).getElement(), RenderPosition.BEFOREEND);
});

// Render LOAD MORE button
const loadMoreButtonComponent = new LoadMoreButtonComponent();
render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

// LOAD MORE button logic
loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
  const prevShownTasksNumber = shownTasksNumber;
  shownTasksNumber += BY_BUTTON_TASKS_SHOWN_NUMBER;

  tasks.slice(prevShownTasksNumber, shownTasksNumber).forEach((task) => {
    render(boardTasksContainer, new TaskComponent(task).getElement(), RenderPosition.BEFOREEND);
  });

  if (shownTasksNumber >= TASK_NUMBER) {
    loadMoreButtonComponent.getElement().remove();
    loadMoreButtonComponent.removeElement();
  }
});
