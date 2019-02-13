/**
 * @description: 对对象类型数据进行深拷贝处理;
 * @param { Boolean | Object } 第一个参数为布尔值或者对象，第一个参数为布尔值时，决定是否执行深拷贝，后续参数为对象
 * @returns 返回合并后对象
 */
let deep = function () {
  let copy, len, items;
  let merged = {};    // 合并后的对象
  let options = Array.prototype.slice.call(arguments);
  let dep = typeof arguments[0] === 'boolean' ? arguments[0] : false;    // 是否执行深拷贝

  /**
   * @description: 判定对象类型是否为函数;
   * @param { any } fn: js任意对象;
   * @returns { Boolean } 参数类型为函数,返回true, 否则返回false;
   */
  let isFn = function (fn) {
    return Object.prototype.toString.call(fn) === '[object Function]';
  }

  /**
   * @description: 判定是否为Object类型
   * @param { any } obj: js任意对象;
   * @returns { Boolean } 参数类型为对象,返回true, 否则返回false;
   */
  let isObj = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }

  /**
   * @description: 判定是否为数组类型;
   * @param { any } obj: js任意对象;
   * @returns { Boolean } 参数类型为数组,返回true, 否则返回false;
   */
  let isArr = function (ar) { return Array.isArray(ar); }

  // 判定对象是否为普通声明对象，此代码摘自jquery3.3版本的isPlainObject方法, 此处不再做详细使用说明
  let isPlainObject = function (obj) {
    let proto, Ctor;
    // (1) null 肯定不是 Plain Object
    // (2) 使用 Object.property.toString 排除部分宿主对象，比如 window、navigator、global
    if (!obj || ({}).toString.call(obj) !== "[object Object]") return false;
    proto = Object.getPrototypeOf(obj);
    // 只有从用 {} 字面量和 new Object 构造的对象，它的原型链才是 null
    if (!proto) return true;
    // (1) 如果 constructor 是对象的一个自有属性，则 Ctor 为 true，函数最后返回 false
    // (2) Function.prototype.toString 无法自定义，以此来判断是同一个内置函数
    Ctor = ({}).hasOwnProperty.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === "function" && Function.prototype.toString.call(Ctor) === Function.prototype.toString.call(Object);
  }

  /**
   * @description: 合并俩个数组，并对合并后的数组去重，所有数据类型去重
   * @param { Array } ar1: 需要合并的数组
   * @param { Array } ar2：需要合并的数组
   * @returns { Array } 返回合并后且去重后的数组
   */
  let unique = function (ar1, ar2) {
    let arr = ar1.concat(ar2);
    let obj = {};
    return arr.filter(function (item) {
      return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
    })
  }

  /**
   * @description: 深度合并俩个对象，合并策略：对数组类型数据进行去重合并，对象类型数据递归调用此方法，其他类型数据，target中的数据覆盖source中的数据
   * @param { Object } source: 需要合并的对象 
   * @param { Object } target：需要合并的对象
   * @returns { Object } 返回合并后的对象
   */
  let merge = function (source, target) {
    for (let key in target) {
      if (target.hasOwnProperty(key)) { // 只合并对象自身属性
        if (source[key] && isObj(source[key]) && isObj(target[key])) { // 俩者都存在且都是对象，递归合并
          merge(source[key], target[key]);
        } else if (source[key] && isArr(source[key]) && isArr(target[key])) { // 俩者都存在且都是数组，去重合并
          console.log(source[key])
          console.log(target[key])
          source[key] = unique(source[key], target[key]);
        } else { // 其余情况直接target属性覆盖source属性
          source[key] = target[key];
        }
      }
    }
    return source;
  }

  if (arguments.length <= 1) return arguments[0] || {};       // 参数不存在或只有一个参数，返回空对象或者参数
  if (arguments.length === 2 && typeof arguments[0] === 'boolean') return arguments[1];
  items = dep ? options.slice(1) : options.slice(0);
  len = items.length;
  copy = dep ? merge : Object.assign;

  for (let i = 0; i < len; i++) {
    if (!isObj(items[i])) return console.error('参数错误');
    copy(merged, items[i]);
  }

  return merged;
}
