import {assert} from 'chai';
import {scoring, manageLives, switchLevel, returnTypeOfAnswer, GAME} from '../game-data.js';

describe(`scoring`, () => {
  it(`should calculate Game Points properly`, () => {
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
  });
  it(`should cover Error cases`, () => {
    assert.throws(scoring, Error);
    assert.throws(() => scoring([[false, 25], [true, 15], [false, 32]], 2), Error);
    assert.throws(() => scoring({}, 3), Error);
    assert.throws(() => scoring(5, 1), Error);
    assert.throws(() => scoring(false, 0), Error);
    assert.throws(() => scoring(NaN, 3), Error);
    assert.throws(() => scoring(undefined, 0), Error);
    assert.throws(() => scoring([
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
    ], NaN), Error);
    assert.throws(() => scoring([
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
    ], 4), Error);
    assert.throws(() => scoring([
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
    ], [1, 2]), Error);
  });
});

describe(`manageLives`, () => {
  it(`should return correct number of Lives`, () => {
    assert.equal(manageLives(3, true), 3);
    assert.equal(manageLives(2, true), 2);
    assert.equal(manageLives(1, true), 1);
    assert.equal(manageLives(0, true), 0);
    assert.equal(manageLives(3, false), 2);
    assert.equal(manageLives(2, false), 1);
    assert.equal(manageLives(1, false), 0);
    assert.equal(manageLives(0, false), GAME.FAIL);
  });
  it(`should cover Error cases`, () => {
    assert.throws(manageLives, Error);
    assert.throws(() => manageLives(4, false), Error);
    assert.throws(() => manageLives(-42, true), Error);
    assert.throws(() => manageLives(`string`, false), Error);
    assert.throws(() => manageLives([], true), Error);
    assert.throws(() => manageLives({}, false), Error);
    assert.throws(() => manageLives(3, 54), Error);
    assert.throws(() => manageLives(2, `string`), Error);
    assert.throws(() => manageLives(1, []), Error);
    assert.throws(() => manageLives(0, {}), Error);
    assert.throws(() => manageLives(`string`, NaN), Error);
  });
});

describe(`switchLevel`, () => {
  it(`should switch Levels properly`, () => {
    assert.equal(switchLevel(1), 2);
    assert.equal(switchLevel(2), 3);
    assert.equal(switchLevel(3), 4);
    assert.equal(switchLevel(4), 5);
    assert.equal(switchLevel(5), 6);
    assert.equal(switchLevel(6), 7);
    assert.equal(switchLevel(7), 8);
    assert.equal(switchLevel(8), 9);
    assert.equal(switchLevel(9), 10);
    assert.equal(switchLevel(10), GAME.OVER);
  });
  it(`should cover Error cases`, () => {
    assert.throws(switchLevel, Error);
    assert.throws(() => switchLevel(-1), Error);
    assert.throws(() => switchLevel(NaN), Error);
    assert.throws(() => switchLevel(true), Error);
    assert.throws(() => switchLevel(`string`), Error);
    assert.throws(() => switchLevel([3, 2, 1]), Error);
    assert.throws(() => switchLevel({}), Error);
  });
});

describe(`returnTypeOfAnswer`, () => {
  it(`should return correct type of Answer`, () => {
    assert.equal(returnTypeOfAnswer(0), 0);
    assert.equal(returnTypeOfAnswer(5), 0);
    assert.equal(returnTypeOfAnswer(10), 0);
    assert.equal(returnTypeOfAnswer(13), 1);
    assert.equal(returnTypeOfAnswer(20), 2);
    assert.equal(returnTypeOfAnswer(25), 2);
    assert.equal(returnTypeOfAnswer(30), 2);
  });
  it(`should cover Error cases`, () => {
    assert.throws(returnTypeOfAnswer, Error);
    assert.throws(() => returnTypeOfAnswer(-2), Error);
    assert.throws(() => returnTypeOfAnswer(NaN), Error);
    assert.throws(() => returnTypeOfAnswer(false), Error);
    assert.throws(() => returnTypeOfAnswer(undefined), Error);
    assert.throws(() => returnTypeOfAnswer([3, 2, 1]), Error);
    assert.throws(() => returnTypeOfAnswer({}), Error);
  });
});
