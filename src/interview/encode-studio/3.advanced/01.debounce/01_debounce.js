// use setTimeout
function debounce(func, wait) {
    let timer, context, args
    return function () {
        context = this
        args = arguments
        clearTimeout(timer)
        timer = setTimeout(function () {
            func.apply(context, args)
        }, wait)
    }
}
