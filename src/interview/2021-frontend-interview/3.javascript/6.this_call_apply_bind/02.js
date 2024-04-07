Function.prototype.myApply = function (ctx) {
    if (typeof this !== 'function') {
        throw new TypeError('the callee must be a function')
    }
    ctx = ctx || window
    ctx.fn = this
    let args = [...arguments][1]
    let res = null
    if (args) {
        res = ctx.fn(...args)
    } else {
        res = res.fn()
    }
    delete ctx.fn
    return res
}