// 数组扁平化-脑子最快出现的想法,这里使用递归，没什么好说的
function arrFormat(arr) {
  if (!Array.isArray(arr)) {
    return [arr];
  }
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      const newArr = arrFormat(arr[i]);
      result.push(...newArr);
      continue;
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

// 数组扁平化-第二个想法
function flatten(arr) {
  const stack = [...arr]; //保证不会破坏原数组
  const result = [];
  while (stack.length) {
    // 每次取出来判断是否数组
    const first = stack.shift();
    if (Array.isArray(first)) {
      stack.unshift(...first);
    } else {
      result.push(first);
    }
  }
  return result;
}

module.exports = { arrFormat, flatten };
