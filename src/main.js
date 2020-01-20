import SiteMenuComponent from './components/site-menu';
import FilterComponent from './components/filter';
import BoardComponent from './components/board';
import SortComponent from './components/sort';
import TasksComponent from './components/tasks';
import TaskComponent from './components/task';
import TaskEditComponent from './components/task-edit';
import NoTasksComponent from './components/no-tasks';
import LoadMoreButtonComponent from './components/load-more-button';
import {generateTasks} from './mock/task';
import {generateFilters} from './mock/filter';
import {render, RenderPosition} from './utils/render';


const TASK_NUMBER = 22;
const INITIAL_TASKS_SHOWN_NUMBER = 8;
const BY_BUTTON_TASKS_SHOWN_NUMBER = 8;


const renderTask = (taskListElement, task) => {
  const onEscKeyDown = (evt) => {
    const isEscKeyDown = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKeyDown) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEditToTask = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const replaceTaskToEdit = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);

  editButton.addEventListener(`click`, () => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);

  editForm.addEventListener(`submit`, replaceEditToTask);

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};


const renderBoard = (boardComponent, tasks) => {
  const isAllTasksArchived = tasks.every((task) => task.isArchive);

  if (isAllTasksArchived || tasks.length === 0) {
    render(boardComponent.getElement(), new NoTasksComponent().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  render(boardComponent.getElement(), new SortComponent().getElement(), RenderPosition.BEFOREEND);
  render(boardComponent.getElement(), new TasksComponent().getElement(), RenderPosition.BEFOREEND);

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

  // Render tasks
  let shownTasksNumber = INITIAL_TASKS_SHOWN_NUMBER;
  tasks.slice(0, shownTasksNumber).forEach((task) => {
    renderTask(taskListElement, task);
  });

  // Render LOAD MORE button
  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  // LOAD MORE button logic
  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevShownTasksNumber = shownTasksNumber;
    shownTasksNumber += BY_BUTTON_TASKS_SHOWN_NUMBER;

    tasks.slice(prevShownTasksNumber, shownTasksNumber).forEach((task) => {
      renderTask(taskListElement, task);
    });

    if (shownTasksNumber >= TASK_NUMBER) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
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

const tasks = generateTasks(TASK_NUMBER);

renderBoard(boardComponent, tasks);
