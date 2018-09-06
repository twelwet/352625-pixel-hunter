// game-header.js

import {lightHeaderBlock} from '.light-header.js';
import {gameTimerBlock} from './game-timer.js';
import {gameLivesBlock} from './game-lives.js';

export const gameHeaderBlock = lightHeaderBlock;

const headerTag = gameHeaderBlock.querySelector(`.header`);

headerTag.appendChild(gameTimerBlock);

headerTag.appendChild(gameLivesBlock);
