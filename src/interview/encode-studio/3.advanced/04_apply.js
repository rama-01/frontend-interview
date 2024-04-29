// 接受数组或类数组对象作为参数
Function.prototype.myApply = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('caller is not a function')
    }
    let ctx = context || window,
        res = null
    ctx.fn = this
    // 判断函数参数是否传入(数组或者类数组)
    if (arguments[1]) {
        // res = ctx.fn(...arguments[1])
        res = ctx.fn(arguments[1]) //接受数组作为参数
    } else {
        res = ctx.fn()
    }
    delete ctx.fn
    return res
}
