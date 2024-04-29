Function.prototype.myCall = function (context) {
    // 错误处理,判断caller是否为函数类型
    if (typeof this !== 'function') {
        throw new TypeError('caller is not a function')
    }
    let ctx = context || window,
        res = null, //为何不确定函数执行过程中是否会产生返回值
        args = [...arguments].slice(1) //获取传入参数
    ctx.fn = this
    res = ctx.fn(...args)
    delete ctx.fn
    return res
}
