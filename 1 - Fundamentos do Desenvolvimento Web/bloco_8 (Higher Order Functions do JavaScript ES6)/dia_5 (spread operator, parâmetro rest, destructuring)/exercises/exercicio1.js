const assert = require('assert');

const rectangleArea = (width, height) => width * height;

const rectangle1 = [1, 2];
const rectangle2 = [3, 5];
const rectangle3 = [6, 9];
const rectangles = [rectangle1, rectangle2, rectangle3];

rectangles.forEach((rectangle) => {
  assert.strictEqual(rectangleArea(...rectangle), rectangle[0] * rectangle[1]) // altere a chamada da funcao rectangleArea
});
