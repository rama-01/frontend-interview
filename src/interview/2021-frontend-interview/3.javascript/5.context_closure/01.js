for (var i = 1; i <= 5; i++) {
    setTimeout(() => console.log(i), 1000 * i)
}

// 1. use IIEF
for (var i = 1; i <= 5; i++) {
    (function (j) {
        setTimeout(() => console.log(i), 1000 * i)
    })(i)
}

// 2. use the third parameter of setTimeout
for (var i = 1; i <= 5; i++) {
    setTimeout(() => console.log(i), 1000 * i, i)
}

// 3. use let ，因为let，const声明的变量具有块级作用域