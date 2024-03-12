/* 1. 使用let块级作用域 */
for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i)
    }, i * 1000);
}

// 这里如果将let换成var，那么由于var没有块级作用域，所以最后变成了全部打印5

/* 2. 使用闭包实现 */
for (let i = 0; i < 5; i++) {
    (function (i) {
        setTimeout(() => {
            console.log(i)
        }, i * 1000);
    })(i)
}