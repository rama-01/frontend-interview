Function.prototype.myBind = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('caller must be a function')
    }
    let args = [...arguments].slice(1),
        fn = null
    return function Fn() {
        // 根据调用方式，传入不同的调用值，判断函数作为构造函数的情况
        // 在返回的Fn函数中将所有参数并入args
        return fn.apply(this instanceof Fn ? this : context, args.concat(arguments))
    }
}