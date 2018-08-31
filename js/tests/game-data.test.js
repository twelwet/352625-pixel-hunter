import {assert} from 'chai';
import {scoring, manageLives, switchLevel, returnTypeOfAnswer, LEVELS, TROUBLE, GAME_OVER} from '../game-data.js';

describe(`scoring`, () => {
  describe(`answers`, () => {
    it(`should be an array with length ${LEVELS.FINISH}`, () => {
      assert.equal(scoring([
        [true, 15],
        [true, 15],
        [true, 15],
        [true, 15],
        [true, 15],
        [true, 15],
        [true, 15],
        [true, 15],
        [true, 15],
        [true, 15]
      ], 3), 1150);
      assert.equal(scoring([
        [true, 1000],
        [false, 2000],
        [true, 4500],
        [true, 5000],
        [false, 6500],
        [true, 2100]
      ], 1), TROUBLE);
      assert.equal(scoring({}, 1), TROUBLE);
      assert.equal(scoring(5, 1), TROUBLE);
      assert.equal(scoring(true, 1), TROUBLE);
      assert.equal(scoring(NaN, 1), TROUBLE);
      assert.equal(scoring(undefined, 1), TROUBLE);
    });
  });

  describe(`numberOfLives`, () => {
    it(`should be an integer 0 =< number =< 3`, () => {
      assert.equal(scoring([
        [false, 10],
        [true, 7],
        [false, 23],
        [true, 15],
        [false, 12],
        [true, 20],
        [false, 16],
        [true, 24],
        [false, 19],
        [true, 29]
      ], 3), 550);
      assert.equal(scoring([[], [], [], [], [], [], [], [], [], []], 4), TROUBLE);
      assert.equal(scoring([[], [], [], [], [], [], [], [], [], []], 0.523), TROUBLE);
      assert.equal(scoring([[], [], [], [], [], [], [], [], [], []], -5), TROUBLE);
      assert.equal(scoring([[], [], [], [], [], [], [], [], [], []], -10.657), TROUBLE);
    });
  });
});

describe(`manageLives`, () => {
  it(`should return 'GAME OVER!' when answer is incorrect and there are no lives`, () => {
    assert.equal(manageLives(0, false), GAME_OVER);
  });
  describe(`numberOfLives`, () => {
    it(`should be an integer 0 =< number =< 3`, () => {
      assert.equal(manageLives(3, true), 3);
      assert.equal(manageLives(3, false), 2);
      assert.equal(manageLives(4, false), TROUBLE);
      assert.equal(manageLives(-10, false), TROUBLE);
      assert.equal(manageLives(`string`, false), TROUBLE);
      assert.equal(manageLives([], false), TROUBLE);
      assert.equal(manageLives({}, false), TROUBLE);
    });
  });
  describe(`answer`, () => {
    it(`should be a boolean`, () => {
      assert.equal(manageLives(3, true), 3);
      assert.equal(manageLives(3, false), 2);
      assert.equal(manageLives(3, `string`), TROUBLE);
      assert.equal(manageLives(3, 3.14), TROUBLE);
      assert.equal(manageLives(3, []), TROUBLE);
      assert.equal(manageLives(3, {}), TROUBLE);
    });
  });
});

describe(`switchLevel`, () => {
  describe(`currentLevel`, () => {
    it(`should be an integer 1 =< number =< 10`, () => {
      assert.equal(switchLevel(3), 4);
      assert.equal(switchLevel(10), 10);
      assert.equal(switchLevel(11), TROUBLE);
      assert.equal(switchLevel(-2), TROUBLE);
      assert.equal(switchLevel(`string`), TROUBLE);
      assert.equal(switchLevel([]), TROUBLE);
      assert.equal(switchLevel({}), TROUBLE);
    });
  });
});

describe(`returnTypeOfAnswer`, () => {
  describe(`time`, () => {
    it(`should be an integer 0 =< number =< 30`, () => {
      assert.equal(returnTypeOfAnswer(0), 0);
      assert.equal(returnTypeOfAnswer(10), 0);
      assert.equal(returnTypeOfAnswer(15), 1);
      assert.equal(returnTypeOfAnswer(20), 2);
      assert.equal(returnTypeOfAnswer(25), 2);
      assert.equal(returnTypeOfAnswer(30), 2);
      assert.equal(returnTypeOfAnswer(-10), TROUBLE);
      assert.equal(returnTypeOfAnswer(35), TROUBLE);
      assert.equal(returnTypeOfAnswer(`string`), TROUBLE);
      assert.equal(returnTypeOfAnswer([]), TROUBLE);
      assert.equal(returnTypeOfAnswer({}), TROUBLE);
    });
  });
});
