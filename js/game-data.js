export const LEVELS = {
  START: 1, // Номер первого уровня
  FINISH: 10 // Номер последнего уровня
};

const LIVES = {
  DEFAULT: 3, // Количество жизней по умолчанию
  LAST: 0 // Минимальное количество жизней
};

const TIME = { // seconds
  START: 0, // начало отсчета, seconds
  FINISH: 30, // конец отсчета, seconds
  FAST: 10, // максимальное значение быстрого ответа (`150 очков`), seconds
  SLOW: 20 // минимальное значение медленного ответа (`50 очков`), seconds
  // Если `TIME.FAST` < `время ответа` < `TIME.SLOW`, то ответ приносит `100 очков`
};

// Значение, которое возвращается когда `что-то пошло не так`
export const TROUBLE = -1;

// Значение, которое возвращается когда игра окончена
export const GAME_OVER = `GAME OVER!`;

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
  // Первый агрумент `answers` должен быть массивом c длиной 10
  if (!Array.isArray(answers) ||
  answers.length !== LEVELS.FINISH ||
  // Второй аргумент `numberOfLives` должен быть целым числом 0 =< `numberOfLives` =< 3
  !Number.isInteger(numberOfLives) ||
  numberOfLives < LIVES.LAST ||
  numberOfLives > LIVES.DEFAULT
  ) {
    return TROUBLE;
  } else {
    let numberOfPoints = 0;
    answers.forEach((element) => {
      if (element[0]) {
        numberOfPoints = numberOfPoints + 100;
      }
      if (element[1] <= TIME.FAST) {
        numberOfPoints = numberOfPoints + 50;
      } else if (element[1] >= TIME.SLOW) {
        numberOfPoints = numberOfPoints - 50;
      }
    });
    if (numberOfLives > 0) {
      numberOfPoints = numberOfPoints + numberOfLives * 50;
    }
    return numberOfPoints;
  }
};

export const manageLives = (numberOfLives, answer) => {
  // Аргумент `numberOfLives` должен быть целым числом 0 =< `numberOfLives` =< 3
  if (!Number.isInteger(numberOfLives) ||
  numberOfLives < LIVES.LAST ||
  numberOfLives > LIVES.DEFAULT ||
  // Аргумент `answer` должен быть `boolean`
  typeof answer !== `boolean`
  ) {
    return TROUBLE;
  } else {
    let remainingLives = numberOfLives;
    if (!answer && numberOfLives > LIVES.LAST) {
      remainingLives = remainingLives - 1;
    } else if (!answer && numberOfLives === LIVES.LAST) {
      return GAME_OVER;
    }
    return remainingLives;
  }
};

export const switchLevel = (currentLevel) => {
  // Аргумент `currentLevel` должен быть целым числом 1 =< `numberOfLives` =< 10
  if (!Number.isInteger(currentLevel) ||
  currentLevel < LEVELS.START ||
  currentLevel > LEVELS.FINISH
  ) {
    return TROUBLE;
  } else {
    let nextLevel = currentLevel;
    if (currentLevel < LEVELS.FINISH) {
      nextLevel = nextLevel + 1;
    }
    return nextLevel;
  }
};

export const returnTypeOfAnswer = (time) => {
  // Аргумент `time` должен быть целым числом 0 =< `time` =< 30
  if (!Number.isInteger(time) ||
  time < TIME.START ||
  time > TIME.FINISH) {
    return TROUBLE;
  } else {
    let answerType;
    if (time <= TIME.FAST) {
      answerType = ANSWER_TYPES.FAST;
    } else if (time >= TIME.SLOW) {
      answerType = ANSWER_TYPES.SLOW;
    } else {
      answerType = ANSWER_TYPES.NORMAL;
    }
    return answerType;
  }
};
