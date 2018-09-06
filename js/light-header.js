// light-header.js

import {render} from './util.js';
import {backBtnBlock} from './back-btn.js';

const headerTemplate = `
  <header class="header">
  </header>
`;

export const lightHeaderBlock = render(headerTemplate);

const headerTag = lightHeaderBlock.querySelector(`.header`);

headerTag.appendChild(backBtnBlock);
