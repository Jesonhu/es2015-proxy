/**
 * 方法代理可以轻松地通过一个新构造函数来扩展一个已有的构造函数. 
 */

/**
 * 扩展构造函数.
 * 
 * @param {} sup 要扩展的对象
 * @param {} base 相当于构造函数的定义.
 * @return {} 扩展后的对象.
 */
const extend = function (sup, base) {
// function extend(sup, base) {
  const descriptor = Object.getOwnPropertyDescriptor(base.prototype, 'constructor');

  base.prototype = Object.create(sup.prototype);

  const handler = {
    construct: function (target, args) {
      const obj = Object.create(base.prototype);
      this.apply(target, obj, args);
      return obj;
    },
    apply: function (target, that, args) {
      sup.apply(that, args);
      base.apply(that, args);
    }
  }

  const proxy = new Proxy(base, handler);
  descriptor.value = proxy;
  Object.defineProperty(base.prototype, 'constructor', descriptor);

  return proxy;
}

// 基础构造函数，只有 `name` 属性
const Person = function (name) {
  this.name = name;
}

// 扩展基本构造函数, 并添加 `age` 属性
// 得到扩展后的构造函数.
const Boy = extend(Person, function (name, age) {
  this.age = age;
});

// 扩展后的构造函数添加 `sex` 属性
Boy.prototype.sex = 'M';

// 通过 extend设置了 `Boy` 的构造函数，即:
// function Boy(name, age) {
//   this.name = name;
//   this.age = age;
// }
const peter = new Boy('Peter', 13);

console.log(peter.sex);  // 'M'
console.log(peter.name); // 'Peter'
console.log(peter.age);  // '13'

const Girl = extend(Person, function(name, age, say) {
  this.age = age;
  this.say = say;
});

Girl.prototype.sex = 'W';
const mdm = new Girl('马冬梅', 14, '马什么梅?');

console.log(mdm.sex);
console.log(mdm.name);
console.log(mdm.age);
console.log(mdm.say);

const Test = extend(Person, function(aa) {
  this.aa = aa;
});
Test.prototype.type = '测试';

const test = new Test('Test', 15);

console.log(test.sex);    // undefined
console.log(test.aa);     // 'Test'
console.log(test.name);   // 'Test' 
console.log(test.age);    // undefined



