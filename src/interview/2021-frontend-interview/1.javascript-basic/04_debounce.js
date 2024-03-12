function debounce(fn, wait) {
    let timer = null
    return function () {
        // 保存fn函数的执行上下文和传递参数
        let context = this, args = arguments
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setInterval(() => {
            fn.apply(context, args)
        }, wait);
    }
}