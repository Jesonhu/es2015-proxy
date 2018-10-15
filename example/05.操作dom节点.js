/**
 * 有时你希望切换两个不同的元素的属性或类名。下面展示了如何使用 set 
 */

const view = new Proxy(
  {
    selected: null
  },
  {
    set: function(obj, prop, newVal) {
      const oldVal = obj[prop];

      // console.log('obj', obj, prop, newVal, newVal.setAttribue);
      if (prop === 'selected') {
        if (oldVal) {
          oldVal.setAttribute('aria-selected', 'false');
        }
        if (newVal) {
          newVal.setAttribute('aria-selected', 'true');
        }
      }

      // 其他都通过
      obj[prop] = newVal;
    }
  }
);

let i1 = view.selected = document.getElementById('item-1');
console.log(i1.getAttribute('aria-selected'));

let i2 = view.selected = document.getElementById('item-2');
console.log(i1.getAttribute('aria-selected'));
console.log(i2.getAttribute('aria-selected'));