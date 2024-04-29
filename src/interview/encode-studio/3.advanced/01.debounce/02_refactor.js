// 添加第三个参数，是否立即执行一次
function debounce(func, wait, immediate = true) {
    let timer, context, args
    const later = () =>
        setTimeout(function () {
            timer = null
            if (!immediate) {
                func.apply(context, args)
                context = args = null
            }
        }, wait)

    return function () {
        // 判断是否创建了延迟函数
        if (!timer) {
            timer = later()
            if (immediate) {
                func.apply(this, arguments)
            } else {
                context = this
                args = arguments
            }
        } else {
            clearTimeout(timer)
            timer = later()
        }
    }
}
