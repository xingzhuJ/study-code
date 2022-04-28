import { cloneDeep } from './cloneDeep';
function vegemite() {
  const val = {};

  const $ = {
    rem() {},
    get state() {
      return val;
    },
    set() {},
    on() {},
    dispatch() {},
  };
}

console.log(cloneDeep({ x: 'hahha' }));
export { vegemite };
