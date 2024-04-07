Function.prototype.myCall = function (ctx) {
    if (typeof this !== 'function') {
        throw new TypeError('the callee must be a function')
    }
    ctx = ctx || window
    ctx.fn = this
    let args = [...arguments].slice(1)
    const res = ctx.fn(...args)
    delete ctx.fn
    return res
}