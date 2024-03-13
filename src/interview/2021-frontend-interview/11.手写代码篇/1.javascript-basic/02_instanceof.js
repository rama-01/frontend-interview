// 获取类型的原型，获取对象的原型，然后循环判断类型的原型是否等于对象的原型，直到对象的原型为null
function myInstanceof(left, right) {
    let proto = left.getPrototypeOf()
    prototype = right.prototype
    while (true) {
        if (!proto) return false
        if (proto === prototypes) return true
        proto = Object.getPrototypeOf(proto)
    }
}

// 比较：
// 1.`Object.getPrototypeOf()` 这是一个静态方法，用于获取指定对象的原型对象。
// 2.`__proto__` 或`prototype` 属性：对象的`__proto__` 属性指向该对象的原型对象，而构造函数的`prototype` 属性指向原型对象。通常通过对象实例的`__proto__` 属性来获取原型对象。
