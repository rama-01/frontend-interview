// 原理：判断对象的原型链中能否找到类型的prototype

function Instanceof(left, right) {
    let prototype = right.prototype
    let proto = left.__proto__
    while (true) {
        if (proto === null) return false
        if (proto === prototype) return true
        proto = proto.__proto__
    }
}
