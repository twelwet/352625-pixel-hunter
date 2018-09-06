// back-btn.js

import {changeScreen, render} from './util.js';
import {greetingScreen} from './greeting.js';

const backBtnTemplate = `
  <button class="back">
    <span class="visually-hidden">Вернуться к началу</span>
    <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
      <use xlink:href="img/sprite.svg#arrow-left"></use>
    </svg>
    <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
      <use xlink:href="img/sprite.svg#logo-small"></use>
    </svg>
  </button>
`;

export const backBtnBlock = render(backBtnTemplate);

const backButton = backBtnBlock.querySelector(`.back`);

backButton.addEventListener(`click`, () => changeScreen(greetingScreen));
