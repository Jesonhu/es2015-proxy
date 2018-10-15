/**
 * 对对象A的操作, 同时转发给B.
 */

const target = {};
const p = new Proxy(target, {});

// 转发到目标对象上
p.a = 37;

// 目标对象处理
target.b = 'bbb';

console.log(target.a, p.a);
console.log(target.b, p.b);