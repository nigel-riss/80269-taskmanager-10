export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};


/**
 * Returns HTMLElement from template string
 * @param {String} template HTML markup
 * @return {HTMLElement}
 */
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};


/**
 * Renders HTMLElement into another HTMLElement
 * @param {HTMLElement} container
 * @param {HTMLElement} element
 * @param {String} place
 */
export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
