/**
 * 验证向一个对象的传值. 
 */

const validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      // 不是整数
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      // > 200
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // 其他属性不使用验证器.
    // 不满足上面的条件时赋值.
    obj[prop] = value;
  }
}

let person = new Proxy({}, validator);

person.age = 100;

console.log(person.age);

// Uncaught TypeError: The age is not an integer
// 程序停止往下运行.
person.age = 'young';

// Uncaught RangeError: The age seems invalid
// 程序停止往下运行.
person.age = 300;

console.log(person.age);