// util.js

export const render = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

const mainElement = document.querySelector(`#main`);

export const changeScreen = (block) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(block);
};

export const changeScreenWithHeader = (header, block) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(header);
  mainElement.appendChild(block);
};
