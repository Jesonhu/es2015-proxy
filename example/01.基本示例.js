// 获取设置拦截.
// 存在返回值, 不存在返回 `404`
const handler = {
  get: function(target, name) {
    return name in target ? target[name]: 404;
  }
}

// @see 用法
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
let p = new Proxy({}, handler);

p.a = 1;
p.b = undefined;

console.log(p.a, p.b);

console.log('c' in p, p.c);

// @see 在线链接:
// https://codepen.io/Jesonhu/pen/OBOJRN