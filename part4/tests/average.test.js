const average = require('../utils/for_testing').average;

describe('average', () => {
  test('of one value is the value of itself', () => {
    expect(average([1])).toBe(1);
  });
});
