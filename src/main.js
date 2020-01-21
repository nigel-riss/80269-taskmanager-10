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
import {render, remove, replace, RenderPosition} from './utils/render';


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
    replace(taskComponent, taskEditComponent);
  };

  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  const taskComponent = new TaskComponent(task);
  taskComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskEditComponent(task);
  taskEditComponent.setSubmitHandler(replaceEditToTask);

  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};


const renderBoard = (boardComponent, tasks) => {
  const isAllTasksArchived = tasks.every((task) => task.isArchive);

  if (isAllTasksArchived || tasks.length === 0) {
    render(boardComponent.getElement(), new NoTasksComponent(), RenderPosition.BEFOREEND);
    return;
  }

  render(boardComponent.getElement(), new SortComponent(), RenderPosition.BEFOREEND);
  render(boardComponent.getElement(), new TasksComponent(), RenderPosition.BEFOREEND);

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

  // Render tasks
  let shownTasksNumber = INITIAL_TASKS_SHOWN_NUMBER;
  tasks.slice(0, shownTasksNumber).forEach((task) => {
    renderTask(taskListElement, task);
  });

  // Render LOAD MORE button
  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  render(boardComponent.getElement(), loadMoreButtonComponent, RenderPosition.BEFOREEND);

  // LOAD MORE button logic
  loadMoreButtonComponent.setClickHandler(() => {
    const prevShownTasksNumber = shownTasksNumber;
    shownTasksNumber += BY_BUTTON_TASKS_SHOWN_NUMBER;

    tasks.slice(prevShownTasksNumber, shownTasksNumber).forEach((task) => {
      renderTask(taskListElement, task);
    });

    if (shownTasksNumber >= TASK_NUMBER) {
      remove(loadMoreButtonComponent);
    }
  });
};


const mainElement = document.querySelector(`.main`);
const mainControlElement = mainElement.querySelector(`.main__control`);

// Render main menu
render(mainControlElement, new SiteMenuComponent(), RenderPosition.BEFOREEND);

// Render filters
const filters = generateFilters();
render(mainElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

// Render board
const boardComponent = new BoardComponent();
render(mainElement, boardComponent, RenderPosition.BEFOREEND);

const tasks = generateTasks(TASK_NUMBER);

renderBoard(boardComponent, tasks);
