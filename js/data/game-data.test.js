import {assert} from 'chai';

const NUMBER_OF_QUESTIONS = 10;

// Если ответ дан меньше чем `FAST_TIME`, то ответ весит `150`
const FAST_TIME = 3000;

// Если ответ дан больше чем `SLOW_TIME`, то ответ весит `50`
const SLOW_TIME = 6000;

// Если `FAST_TIME` < `время ответа` < `SLOW_TIME`, то ответ весит `100`

/*
Формат ответа:
answer = [
  true, // Верный/неверный ответ
  1000  // Время, потраченное на ответ, ms
];
*/

const scoring = (answers, numberOfLives) => {
  // Первый агрумент `answers` должен быть массивом c длиной 10
  if (!Array.isArray(answers) ||
  answers.length !== NUMBER_OF_QUESTIONS ||
  // Второй аргумент `numberOfLives` должен быть целым числом 0 =< `numberOfLives` =< 3
  !Number.isInteger(numberOfLives) ||
  numberOfLives < 0 ||
  numberOfLives > 3
  ) {
    return -1;
  } else {
    let numberOfPoints = 0;
    answers.forEach((element) => {
      if (element[0]) {
        numberOfPoints = numberOfPoints + 100;
      }
      if (element[1] <= FAST_TIME) {
        numberOfPoints = numberOfPoints + 50;
      } else if (element[1] >= SLOW_TIME) {
        numberOfPoints = numberOfPoints - 50;
      }
    });
    if (numberOfLives > 0) {
      numberOfPoints = numberOfPoints + numberOfLives * 50;
    }
    return numberOfPoints;
  }
};

describe(`scoring`, () => {
  describe(`answers`, () => {
    it(`should be an array with length ${NUMBER_OF_QUESTIONS}`, () => {
      assert.equal(scoring([
        [true, 4000],
        [true, 4000],
        [true, 4000],
        [true, 4000],
        [true, 4000],
        [true, 4000],
        [true, 4000],
        [true, 4000],
        [true, 4000],
        [true, 4000]
      ], 3), 1150);
      assert.equal(scoring([
        [true, 1000],
        [false, 2000],
        [true, 4500],
        [true, 5000],
        [false, 6500],
        [true, 2100]
      ], 1), -1);
      assert.equal(scoring({}, 1), -1);
      assert.equal(scoring(5, 1), -1);
      assert.equal(scoring(true, 1), -1);
      assert.equal(scoring(NaN, 1), -1);
      assert.equal(scoring(undefined, 1), -1);
    });
  });

  describe(`numbersOfLives`, () => {
    it(`should be an integer 0 =< number =< 3`, () => {
      assert.equal(scoring([
        [false, 1000],
        [true, 2000],
        [false, 3000],
        [true, 4000],
        [false, 5000],
        [true, 6000],
        [false, 7000],
        [true, 8000],
        [false, 9000],
        [true, 10000]
      ], 3), 550);
      assert.equal(scoring([[], [], [], [], [], [], [], [], [], []], 4), -1);
      assert.equal(scoring([[], [], [], [], [], [], [], [], [], []], 0.523), -1);
      assert.equal(scoring([[], [], [], [], [], [], [], [], [], []], -5), -1);
      assert.equal(scoring([[], [], [], [], [], [], [], [], [], []], -10.657), -1);
    });
  });
});
