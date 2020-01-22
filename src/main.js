import SiteMenuComponent from './components/site-menu';
import FilterComponent from './components/filter';
import BoardComponent from './components/board';
import BoardController from './controllers/board';

import {generateTasks} from './mock/task';
import {generateFilters} from './mock/filter';
import {render, RenderPosition} from './utils/render';


const TASK_NUMBER = 22;

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

const boardController = new BoardController(boardComponent);
boardController.render(tasks);
