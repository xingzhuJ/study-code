const objType = '[object Object]';
const aryType = '[object Array]';

function type(val) {
  return Object.prototype.toString.call(val);
}

// 对象
function classNamesObj(obj) {
  const { publicName = '' } = this;
  let nameList = [];
  for (let keys in obj) {
    if (!keys || !obj[keys]) continue;
    nameList.push(`${publicName + keys}`);
  }
  return nameList;
}
// 数组
function classNamesAry(ary) {
  let nameList = [];
  for (let keys of ary) {
    if (!keys) continue;
    nameList.push(...classNames(keys));
  }
  return nameList;
}
/**
 * 还未支持Set类型 与 Map等特殊类型。
 * 还未支持嵌套对象， 删除重复数据的情况（得到结果array之后直接重新处理一遍数据）
 * 作业误区： 代码书写完成之后发现了：代码库是不直接使用arguments而是先添加到新数组里， 因为：使用arguments方式会导致函数无法优化
 * https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
 * arguments 数组的方法没有
 * Array.from 直接转
 */
function classNames() {
  let nameList = [];
  const len = arguments.length;
  const args = Array(len);
  for (let i = 0; i < len; i++) {
    args[i] = arguments[i];
  }
  const getPublicName = () => {
    const { publicName = '' } = this || {};
    if (publicName) {
      return String(publicName);
    }
    return '';
  };
  const publicName = getPublicName();
  const classNamesNewObj = classNamesObj.bind(this);
  for (let i = 0; i < args.length; i++) {
    const val = args[i];
    if (!val) continue;
    const typeStr = type(val);
    switch (typeStr) {
      case objType:
        nameList.push(...classNamesNewObj(val));
        break;
      case aryType:
        nameList.push(...classNamesAry(val));
        break;
      default:
        nameList.push(`${publicName + val}`);
        break;
    }
  }
  return nameList.join(' ');
}
module.exports = { classNames };
