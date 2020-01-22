import AbstractComponent from './abstract-component';

/**
 * Creates Board template
 * @return {string} Board markup
 */
const createBoardTemplate = () => {
  return (
    `<section class="board container"></section>`
  );
};

export default class Board extends AbstractComponent {
  getTemplate() {
    return createBoardTemplate();
  }
}
