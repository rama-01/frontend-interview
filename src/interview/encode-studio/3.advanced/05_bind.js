Function.prototype.myBind = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('caller is not a function')
    }
    let args = arguments.slice(1),
        //这个变量将在后面用于保存 myBind 被调用时的 this 值,即原始函数。之所以初始化为 null,是因为在这一步我们还无法获取 this 的值,需要在返回的新函数中才能获取。
        fn = null
    return function Fn() {
        return fn.apply(this instanceof Fn ? this : context, arguments.concat(args))
    }
}
