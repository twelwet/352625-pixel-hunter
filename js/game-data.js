const LEVELS = {
  START: 1, // Номер первого уровня
  FINISH: 10 // Номер последнего уровня
};

const LIVES = {
  DEFAULT: 3, // Количество жизней по умолчанию
  LAST: 0 // Минимальное количество жизней
};

const POINTS = {
  DEFAULT: 100,
  EXTRA: 50,
  SLOW_RESULT: -50
};

const TIME = { // seconds
  START: 0, // начало отсчета, seconds
  FINISH: 30, // конец отсчета, seconds
  FAST: 10, // максимальное значение быстрого ответа (`150 очков`), seconds
  SLOW: 20 // минимальное значение медленного ответа (`50 очков`), seconds
  // Если `TIME.FAST` < `время ответа` < `TIME.SLOW`, то ответ приносит `100 очков`
};

// Значение, которое возвращается когда игра окончена
export const GAME = {
  FAIL: false, // неуспешно - все жизни потрачены
  OVER: true // успешно
};

// Типы ответов
const ANSWER_TYPES = {
  FAST: 0,
  NORMAL: 1,
  SLOW: 2,
};

/*
Формат ответа:
answer = [
  true, // Верный/неверный ответ
  12  // Время, потраченное на ответ, seconds
];
*/

export const scoring = (answers, numberOfLives) => {
  if (!Array.isArray(answers)) {
    throw new Error(`Answer's format should be of type array`);
  }
  if (answers.length !== LEVELS.FINISH) {
    throw new Error(`Answer's array should have lenght of ${LEVELS.FINISH}`);
  }
  if (!Number.isInteger(numberOfLives) ||
  numberOfLives < LIVES.LAST ||
  numberOfLives > LIVES.DEFAULT) {
    throw new Error(`Number of Lives should be of type number between ${LIVES.LAST} and ${LIVES.DEFAULT}`);
  }
  let numberOfPoints = 0;
  answers.forEach((element) => {
    if (element[0]) {
      numberOfPoints = numberOfPoints + POINTS.DEFAULT;
    }
    if (element[1] <= TIME.FAST) {
      numberOfPoints = numberOfPoints + POINTS.EXTRA;
    } else if (element[1] >= TIME.SLOW) {
      numberOfPoints = numberOfPoints + POINTS.SLOW_RESULT;
    }
  });
  if (numberOfLives > LIVES.LAST) {
    numberOfPoints = numberOfPoints + numberOfLives * POINTS.EXTRA;
  }
  return numberOfPoints;
};

export const manageLives = (numberOfLives, answer) => {
  if (!Number.isInteger(numberOfLives) ||
  numberOfLives < LIVES.LAST ||
  numberOfLives > LIVES.DEFAULT) {
    throw new Error(`Number of Lives should be of type number between ${LIVES.LAST} and ${LIVES.DEFAULT}`);
  }
  if (typeof answer !== `boolean`) {
    throw new Error(`Answer should be of type boolean`);
  }
  let remainingLives = numberOfLives;
  if (!answer && numberOfLives > LIVES.LAST) {
    remainingLives = remainingLives - 1;
  } else if (!answer && numberOfLives === LIVES.LAST) {
    return GAME.FAIL;
  }
  return remainingLives;
};

export const switchLevel = (currentLevel) => {
  if (!Number.isInteger(currentLevel) ||
  currentLevel < LEVELS.START ||
  currentLevel > LEVELS.FINISH
  ) {
    throw new Error(`current Level should be of type number between ${LEVELS.START} and ${LEVELS.FINISH}`);
  }
  let nextLevel = currentLevel;
  if (currentLevel < LEVELS.FINISH) {
    nextLevel = nextLevel + 1;
  } else {
    nextLevel = GAME.OVER;
  }
  return nextLevel;
};

export const returnTypeOfAnswer = (time) => {
  if (!Number.isInteger(time) ||
  time < TIME.START ||
  time > TIME.FINISH) {
    throw new Error(`time should be of type number between ${TIME.START} and ${TIME.FINISH}`);
  }
  let answerType;
  if (time <= TIME.FAST) {
    answerType = ANSWER_TYPES.FAST;
  } else if (time >= TIME.SLOW) {
    answerType = ANSWER_TYPES.SLOW;
  } else {
    answerType = ANSWER_TYPES.NORMAL;
  }
  return answerType;
};
