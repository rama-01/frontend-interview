/**
 * 
 * @param {*} func 
 * @param {*} wait 
 * @param {*} options 如果想忽略开始函数的的调用，传⼊{leading: false};如果想忽略结尾函数的调用，传⼊{trailing: false}
 * @returns 
 */

function throttle(func, wait, options) {
    let timeout = null,
        previous = 0,
        context,
        args,
        res

    if (!options) options = {}
    const later = function () {
        previous = options.leading === false ? 0 : +new Date()
        timeout = null
        res = func.apply(context, args)
        context = args = null
    }

    return function () {
        const now = +new Date()
        if (!previous && options.leading === false) previous = now
        const remaining = wait - (now - previous)
        context = this
        args = arguments
        // remaining > wait 这个条件是为了处理系统时间被手动调整导致的特殊情况,确保节流函数在任何情况下都能正常执行,从而提高了代码的健壮性和可靠性
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout)
                timeout = null
            }
            previous = now
            res = func.apply(context, args)
            if (!timeout) context = args = null
        } else if (!timeout && options.trailing === false) {
            timeout = setTimeout(later, remaining)
        }
        return res
    }
}
