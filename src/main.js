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


const renderTask = (task) => {
  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  });

  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  });

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};


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

const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

const tasks = generateTasks(TASK_NUMBER);

// Render tasks
let shownTasksNumber = INITIAL_TASKS_SHOWN_NUMBER;
tasks.slice(0, shownTasksNumber).forEach((task) => {
  renderTask(task);
});

// Render LOAD MORE button
const loadMoreButtonComponent = new LoadMoreButtonComponent();
render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

// LOAD MORE button logic
loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
  const prevShownTasksNumber = shownTasksNumber;
  shownTasksNumber += BY_BUTTON_TASKS_SHOWN_NUMBER;

  tasks.slice(prevShownTasksNumber, shownTasksNumber).forEach((task) => {
    renderTask(task);
  });

  if (shownTasksNumber >= TASK_NUMBER) {
    loadMoreButtonComponent.getElement().remove();
    loadMoreButtonComponent.removeElement();
  }
});
