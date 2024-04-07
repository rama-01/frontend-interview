Function.prototype.myBind = function (ctx) {
    if (typeof this !== 'function') {
        throw new TypeError('the callee must be a function')
    }
    const args = [...arguments].slice(1)
    const fn = this
    return function Fn() {
        // 如果这个新函数 Fn 是作为构造函数被调用的(使用 new 关键字),那么 this 就指向新创建的对象实例。此时,三元表达式的结果就是 this。
        fn.apply(this instanceof Fn ? this : fn, args.concat(...arguments))
    }
}