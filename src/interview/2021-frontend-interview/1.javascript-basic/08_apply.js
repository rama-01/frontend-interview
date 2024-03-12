Function.prototype.myApply = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('caller must be a function')
    }
    let context = context || window,
        res = null
    context.fn = this
    if (arguments[1]) {
        res = context.fn(arguments[1])  //接收数组或者类数组对象
        // res = context.fn(...arguments[1])
    } else {
        res = context.fn()
    }
    delete context.fn
    return res
}