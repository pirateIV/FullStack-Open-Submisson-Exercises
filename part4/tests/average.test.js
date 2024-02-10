const average = require('../utils/for_testing').average;

describe('average', () => {
  test('of one value is the value of itself', () => {
    expect(average([1])).toBe(1);
  });

  test('of many is calculated right', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5);
  });
});
