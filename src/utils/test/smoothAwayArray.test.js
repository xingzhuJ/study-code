const { arrFormat, flatten } = require('../smoothAwayArray');

describe('test Array', () => {
  const a = [1, [2, 3, [4, 5, [6, 7]], 8, 9]];
  const result = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  test(' Array nesting erased ，Chinese：数组嵌套抹平  ', () => {
    expect(arrFormat(a)).toEqual(result);
    expect(flatten(a)).toEqual(result);
  });
});
