let foo = function() { console. log( 1 ) }

(function foo() {
foo = 10 // 由于foo在函数中只为可读， 因此赋值无效
console.log(foo)
}())