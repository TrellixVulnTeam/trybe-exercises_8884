function secondThirdSmallest(array) {
  let results = []
  results = array.sort((x, y) => {return x - y; });
  results = [array[1], array[2]];
  return results;
};

const parameter = [4, 10, 32, 9, 21, 90, 5, 11, 8, 6];
const result = [5, 6];

//Tests
const assert = require('assert');
assert.deepStrictEqual(secondThirdSmallest(parameter), result);