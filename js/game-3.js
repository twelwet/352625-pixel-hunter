// game-3.js

import {changeScreenWithHeader, render} from './util.js';
import {lightHeaderBlock} from './light-header.js';
import {statsScreen} from './stats.js';

const template = `
  <section class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="http://placehold.it/304x455" alt="Option 2" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 3" width="304" height="455">
      </div>
    </form>
    <ul class="stats">
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--correct"></li>
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--unknown"></li>
    </ul>
  </section>
`;

export const gameThreeBlock = render(template);

const gameOptions = [...gameThreeBlock.querySelectorAll(`.game__option`)];

gameOptions.forEach((element) => element.addEventListener(`click`, () => changeScreenWithHeader(lightHeaderBlock, statsScreen)));
