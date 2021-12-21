/**
 *
 * @param obj 传入的对象
 * @returns  新对象
 * Object.create  创建一个新的对象，第一个参数： 创建对象的原型，继承原有对象的原型， 第二个参数：属性描述对象的集合
 * Object.getPrototypeOf  指定对象的原型（内部[[Prototype]]属性的值。
 * Object.getOwnPropertyDescriptors 获取一个对象的所有自身属性的描述符。
 * 函数就是一段逻辑，而不是数据,理解上不需要copy
 * Symbol Map未支持
 */
const setType = '[object Set]';
function type(val) {
  return Object.prototype.toString.call(val);
}

function copySet(obj) {
  let set = new Set();
  obj.forEach((item) => {
    if (item && typeof item === 'object') {
      set.add(cloneDeep(item));
    } else {
      set.add(item);
    }
  });
  return set;
}

function cloneDeep(obj) {
  // 先深拷贝第一层, 基本类型都能满足， 顺带把相关的原型链也关联了。
  const newObj = Object.create(
    Object.getPrototypeOf(obj),
    Object.getOwnPropertyDescriptors(obj),
  );

  const keys = Object.keys(newObj);
  for (let i = 0; i < keys.length; i++) {
    let item = newObj[keys[i]];
    if (type(item) === setType) {
      item = copySet(item);
      continue;
    } else if (item && typeof item === 'object') {
      item = cloneDeep(item);
      continue;
    }
  }
  return newObj;
}

export { cloneDeep };
