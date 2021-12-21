import React, { useRef, useState } from 'react';
import { cloneDeep } from './utils/cloneDeep';

// 深拷贝测试
const x = { y: 1 };
const h = [2, 3, x];
const z = new Set([1, x, h, 4]);
let y: any = {
  a: 1,
  b: { a1: 1, b1: { b2: { b3: 4 } } },
  c: () => {
    console.log('hahah');
  },
  d: [{ x: x }],
  e: {},
  f: undefined,
  g: null,
  h: true,
  i: false,
  j: BigInt(9007199254740991),
  k: z,
};
// y.m = y;
const dd = cloneDeep(y);
y.b.b1.b2.b3 = '嵌套嵌套在嵌套了改成功了吗？---b.b1.b2.b3 ';
y.h = '修改布尔值，你成功了吗？----y.h';
x.y = '修改了x.y的值';
y.c = '我改了函数--y.c';
x.__proto__ = { c: 'yu原型变了变哦' };
const bigType = typeof dd.j;
console.log(dd, 'dd----类型变化了吗？-----');
console.log(x, 'x----原型变化了吗？-----');
console.log(y, 'x---原型变化了吗？-----');

export default function App() {
  return <div>hahahah</div>;
}
